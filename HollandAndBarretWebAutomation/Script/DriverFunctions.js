//USEUNIT AppSpecificFunctions
//USEUNIT GeneralFunctions
/*
Test Case 1 : Create User Account and Validate
1. Open the website.
2. Click on Rewards section. (Note: Creating an account directly throws an error, instead click on any sections eg: Rewards, store will be helpful to create an account, Website maintenance issue)
3. Click on account and then “Create account”
4. Register for an account, please update the details.
5. Verify whether the account has been created.
*/
function CreateUserAccountAndValidate()
{
  try
  {
  Log.AppendFolder("Test Case 1 : Create User Account and Validate")
  fnTerminateProcessByName("chrome");
  //1. Open the website
  fnLaunchBrowserAndNavigate("Chrome","https://www.hollandandbarrett.com/en-au/"); 
  fnClickOnAcceptConscent();
  //2. Click on Rewards section. (Note: Creating an account directly throws an error, instead click on any sections eg: Rewards, store will be helpful to create an account, Website maintenance issue)
  clickOnRewardsLinkOnHomeScreen(); 
  //3. Click on account and then “Create account”
  checkUserLoggedInAndSignOut();
  getUsrFirstNameAndLastName()
  getUsrPassword(12)
  fnGetEmailID()
  //4. Register for an account, please update the details
  fnFillCreateAccountForm(Project.Variables.UserFirstName,Project.Variables.UserLastName,Project.Variables.UserEmailID,Project.Variables.Password)
  SelectRewardsForLifeRadioOption("i signed up in store");
  fnSelectTermsAndConditionCheckBOx();
  fnClickCreateAccount();
  //5. Verify whether the account has been created.
  fnValidateAccountCreation();
  }
  catch(err)
  {
    Log.Error(err.Meassage)
  }
  finally
  {
  Log.PopLogFolder();
  }
}

/*
Test case 2:
1. Open the website.
2. Login with the registered user.
3. Add any Vitamin C products from 'Vitamins & Supplements' to the basket.
4. Add any Vegan Chocolate products from 'Vegan' to the basket.
5. Verify both the products are added to the basket.
*/
function VerifyItemsInBasket()
{
  try
  {
    Log.AppendFolder("Test Case 2 : Login With Existing user Add Item to Basket and Validate Basket")
    fnTerminateProcessByName("chrome");
    fnLaunchBrowserAndNavigate("Chrome","https://www.hollandandbarrett.com/en-au/");
    checkUserLoggedInAndSignOut();
    clickOnRewardsLinkOnHomeScreen();
    fnClickOnSignInAccountButton()
    entreEmailAndPasswordOnSignIn()
    fnClickSignIn()
    fnVerifyLoginUser(Project.Variables.UserFirstName);
    aqUtils.Delay(3000,"Clearing Basket to If Any Product is Already Added by the user")
    //Clearing Basket to If Any Product is Already Added by the user
    fnClearBasket();
    fnCLickOnProductsFromNavigationBar("Vitamins & Supplements","Vitamin C")
    aqUtils.Delay(10000, "Waiting for Page to load")
    strProductName = "Holland & Barrett High Strength Slow Release Vitamin C 1500mg 120 Tablets*"
    fnSelectProduct(strProductName);
    aqUtils.Delay(5000, "Waiting for Page to load")
    fnClickOnFoodAndDrinksProductsFromNavigationBar("Food & Drink","Vegan Baking");
   // strProductName = "Holland & Barrett Natural Almonds Whole 800g*"
    strProductName = "Holland & Barrett Vegan Rice Chocolate Drops 125g*"
    aqUtils.Delay(10000, "Waiting for Page to load")
    fnSelectProduct(strProductName);
    aqUtils.Delay(2000, "Waiting for Page to load")
    fnClickOnBasket();
    strProductName = "Holland & Barrett High Strength Slow Release Vitamin C 1500mg 120 Tablets";
    fnVerifyProductOnBasketPage(strProductName);
    strProductName = "Holland & Barrett Vegan Rice Chocolate Drops 125g";
    fnVerifyProductOnBasketPage(strProductName);
   }
 catch(err)
  {
    Log.Error(err.Meassage)
  }
  finally
  {
    Log.PopLogFolder();
  }
}






/*
Test case 3:
1. Open the website.
2. Login with the registered user.
3. Add any 2 Vitamin C products from 'Vitamins & Supplements' to the basket.
4. Add any 3 Vegan Chocolate products from 'Vegan' to the basket. - Added Vegan Baked prodcuts instead of Vegan as I did not see Vegan menu on Menu Bar
5. Verify all the products are added to the basket.
6. Verify the subtotal of the products (quantity * price) and total of the basket.
*/
function VerifyItemsInBasketWithQuantity()
{
try
  {
    Log.AppendFolder("Test Case 3 : Login With Existing user Add Item to Basket and Validate Basket with Quantity and Price")
    var strProduct1 = "Holland & Barrett High Strength Slow Release Vitamin C 1500mg 120 Tablets*"
    var strProduct2 = "Holland & Barrett Vegan Rice Chocolate Drops 125g*"
    var intProduct1Quantity = 2;
    var intProduct2Quantity = 3;
    fnTerminateProcessByName("chrome");
    fnLaunchBrowserAndNavigate("Chrome","https://www.hollandandbarrett.com/en-au/");
    checkUserLoggedInAndSignOut();
    clickOnRewardsLinkOnHomeScreen();
    fnClickOnSignInAccountButton()
    entreEmailAndPasswordOnSignIn()
    fnClickSignIn()
    fnVerifyLoginUser(Project.Variables.UserFirstName);
    aqUtils.Delay(3000,"Clearing Basket to If Any Product is Already Added by the user")
    //Clearing Basket to If Any Product is Already Added by the user
    fnClearBasket();
    fnCLickOnProductsFromNavigationBar("Vitamins & Supplements","Vitamin C")
    aqUtils.Delay(10000, "Waiting for Page to load")
    fnSelectProduct(strProduct1)
    aqUtils.Delay(500,"Waiting For Quantity to update")
    fnIncreaseQuantity(strProduct1,intProduct1Quantity)
    aqUtils.Delay(5000, "Waiting for Page to load")
    fnClickOnFoodAndDrinksProductsFromNavigationBar("Food & Drink","Vegan Baking");
    aqUtils.Delay(10000, "Waiting for Page to load")
    fnSelectProduct(strProduct2);
    aqUtils.Delay(2000, "Waiting for Page to load")
    fnIncreaseQuantity(strProduct2,intProduct2Quantity)
  
    //Verify Product Name in Basket
    fnClickOnBasket();
    strProductName1 = "Holland & Barrett High Strength Slow Release Vitamin C 1500mg 120 Tablets";
    fnVerifyProductOnBasketPage(strProductName1);
    strProductName2 = "Holland & Barrett Vegan Rice Chocolate Drops 125g";
    fnVerifyProductOnBasketPage(strProductName2);
    fnValidateTotalSubTotalPriceInBasket()
  }
  catch(err)
  {
    Log.Error(err.Meassage)
  }
  finally
  {
    Log.PopLogFolder();
  }
}



function tetstss()
{
  fnClickOnFoodAndDrinksProductsFromNavigationBar("Food & Drink","Vegan food");
  strProductName = "Holland & Barrett Natural Almonds Whole 800g*"
  aqUtils.Delay(5000, "Waiting for Page to load")
  fnSelectProduct(strProductName);
}