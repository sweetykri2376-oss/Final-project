import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { PortalPage } from "../pages/PortalPage";
import { AuthPage } from "../pages/AuthPage";
import { BugPage } from "../pages/BugPage";
import { OrderPage } from "../pages/OrderPage";
import { CreditCardPage } from "../pages/CreditCardPage";

//test.json contains all the static values as key value pairs
import Data from "../test.json";

test.describe("Sharelane Tests", () => {
  // This before each is going to open the sharelane website
  // and also click the ENTER link.
  test.beforeEach(async ({ page }) => {
    // creating object with HomePage class to access its methods
    const home = new HomePage(page);
    await home.open();
    await home.clickEnter();
  });

  // Below test is for successful creation of account
  test("Happy Path Account Creation @smoke @ui", async ({ page }, testInfo) => {
    // home and auth are objects created using the classes mentioned below
    // const home = new HomePage(page);
    const auth = new AuthPage(page);

    // importing data from test.json and sending to signUp method
    await auth.signUp(
      Data.happyPath.zip,
      Data.happyPath.firstName,
      Data.happyPath.lastName,
      Data.happyPath.email,
      Data.happyPath.password,
    );

    // Assertion to verify account creation
    await auth.expectSignUpSuccess(Data.happyPath.successMessage);

    await page.screenshot({ path: "./screenshots/test-1.png" });
    await testInfo.attach("Account created successfully", {
      path: "./screenshots/test-1.png",
      contentType: "image/png",
    });
  });

  test("Sad Path Account Creation @ui", async ({ page }, testInfo) => {
    // const home = new HomePage(page);
    const auth = new AuthPage(page);

    // await home.open();
    // await home.clickEnter();
    await auth.signUp(
      Data.sadPath.zip,
      Data.sadPath.firstName,
      Data.sadPath.lastName,
      Data.sadPath.email,
      Data.sadPath.password,
    );

    await auth.expectSignUpFailure(Data.sadPath.errorMessage);

    await page.screenshot({ path: "./screenshots/test-2.png" });
    await testInfo.attach("Showing Error Message", {
      path: "./screenshots/test-2.png",
      contentType: "image/png",
    });
  });

  test("@regression Full Bug Submission Flow @e2e", async ({
    page,
  }, testInfo) => {
    // const home = new HomePage(page);
    const portal = new PortalPage(page);
    const auth = new AuthPage(page);
    const bug = new BugPage(page);

    // await home.open();
    await page.pause();

    // await home.clickEnter();
    await portal.openTestPortal();
    await portal.openTrainingBTS();
    await portal.openSubmitBug();
    await auth.createAccountAutoLogin();

    await portal.openTestPortal();
    await portal.openTrainingBTS();

    await portal.openSubmitBug();
    await bug.populateResolutionOptions(); // Scan and populate dropdown values
    await bug.submitBug(
      "Login page not reloaded properly",
      "When I enter the username and password the login page is not loading properly.",
    );
    // await bug.updateBug();
    // await page.pause()

    await page.screenshot({ path: "./screenshots/test-3.png" });
    await testInfo.attach("Bug Submission", {
      path: "./screenshots/test-3.png",
      contentType: "image/png",
    });
  });

  test("Register and Order Flow @ui @e2e", async ({ page }, testInfo) => {
    // const home = new HomePage(page);
    await page.pause();

    const auth = new AuthPage(page);
    const portal = new PortalPage(page);
    const order = new OrderPage(page);
    const card = new CreditCardPage(page);

    // await home.open();
    // await home.clickEnter();
    await auth.signUp(
      Data.happyPath.zip,
      Data.happyPath.firstName,
      Data.happyPath.lastName,
      Data.happyPath.email,
      Data.happyPath.password,
    );

    const creds = await auth.getCredentials();
    await auth.login(creds.email, creds.password);

    await order.addBookAndCheckout();
    await portal.openTestPortal();
    await portal.openCreditCardGenerator();
    const cardNumber = await card.generateCard();
    await card.pay(cardNumber);

    await expect(page.getByText(Data.bookOrder.orderSuccess)).toBeVisible();
    // await page.pause()

    await page.screenshot({ path: "./screenshots/test-4.png" });
    await testInfo.attach("Register and order", {
      path: "./screenshots/test-4.png",
      contentType: "image/png",
    });
  });
});
