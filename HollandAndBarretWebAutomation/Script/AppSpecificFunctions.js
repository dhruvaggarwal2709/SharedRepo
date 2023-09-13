//USEUNIT GeneralFunctions

/*=============================================================================================================
Function Name : fnClickOnAcceptConscent
Description : This function Checks for AcceptCookies Pop up and Clicks on Accept If it Exists.
Parameters : strProcessName - Name of Process to be terminated (ProcessName Proprty shown in Test complete)
Return Value : Returns boolean Value true if successfuly executed, If any error occurs returns false
Date Created : September-2023
Author: Dhruv
Reviewed By : NA
**************Update History*************
Modified BY:
Modified Date : 
Reviwed By :
================================================================================================================*/
function fnClickOnAcceptConscent()
{
  try
  {
    var boolClicked = true;
    if(Aliases.browser.pageHollandBarrett.panelCookieConsentWrapper.btnAcceptCookiesConscent.Exists)
    {
      Aliases.browser.pageHollandBarrett.panelCookieConsentWrapper.btnAcceptCookiesConscent.Click()
      Log.CheckPoint("Conscent message displayed, Clicked on Accept Cookies")
    }
    else
    {
      Log.Message("Conscent message not displayed")
    }
  }
  catch(err)
  {
    Log.Error(err.message)
    boolClicked = false;
  }
  finally
  {
    return boolClicked;
  }
}

function checkUserLoggedInAndSignOut()
{
 if(!Aliases.browser.pageHollandBarrett.headerHollandBarrett.panelHollandBarrett.txtNodeHelloUser.Exists)
    {
      return;
     }
   else
   {
     Aliases.browser.pageHollandBarrett.headerHollandBarrett.panelHollandBarrett.txtNodeHelloUser.HoverMouse()
      aqUtils.Delay(300);
      Aliases.browser.pageHollandBarrett.headerHollandBarrett.buttonSignOut.Click()
   }
 }

function clickOnRewardsLinkOnHomeScreen()
{
  try
  {
   
    var boolClicked =  false;
    if(Aliases.browser.pageHollandBarrett.panelAccount.panelAccount.navmyRewards.WaitProperty("VisibleOnScreen", true, 2000))
    {
      Aliases.browser.pageHollandBarrett.panelAccount.panelAccount.navmyRewards.Click();
      Log.Checkpoint("Successfully Clicked On Rewards Button");
      boolClicked = true;
    }
    else
    {
      Log.Error("Failed to Click on Rewards button, Please verify!!");
    }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    return boolClicked;
  }
}


function getUsrFirstNameAndLastName()
{
  try
  {
    var strUserFirstName,strPwd,strUserLastName; 
    strUserFirstName = "AutoTest"+fncreateRandomStringOfChars(6) 
    Log.Message(strUserFirstName)
    if(!Project.Variables.VariableExists("UserFirstName"))
      Project.Variables.AddVariable("UserFirstName","String")
      
      Project.Variables.$set("VariableByName","UserFirstName", strUserFirstName);
      
     if(!Project.Variables.VariableExists("UserLastName")) 
      Project.Variables.AddVariable("UserLastName", "String");
      
     strUserLastName = "AutoTest"+fncreateRandomStringOfChars(6)
      
     Project.Variables.$set("VariableByName","UserLastName", strUserLastName)
      
     if(!Project.Variables.VariableExists("Password")) 
      Project.Variables.AddVariable("Password", "Password");
      
     strPwd = "AutoTest"+fncreateRandomStringOfChars(8)
      
     Project.Variables.$set("VariableByName","Password", strPwd)
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    
  }
}


function fnClickCreateAccount()
{
  try
  {
    boolClicked = false;
    Aliases.browser.pageHollandBarrett.articleCreateAnAccount.userForm.btnCreateAnAccount.Click();
    Log.Checkpoint("Clicked on Cerate Account Button")
    aqUtils.Delay(500,"Clicked on Cerate Account Button,Waiting for Page to Load")
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
   return boolClicked;
  }
}


function fnFillCreateAccountForm(strFirstName,strLastName,strEmail,strPassword)
{
  try
  {
    var objUserFirstName,objUserLastName,objUserEmail,objUserPassowrd;
    
    objUserFirstName = Aliases.browser.pageHollandBarrett.articleCreateAnAccount.userForm.fieldsetFirstName.txtBoxFirstName
    objUserFirstName.Keys("^a"+strFirstName)
    
    objUserLastName = Aliases.browser.pageHollandBarrett.articleCreateAnAccount.userForm.fieldsetFirstName.txtBoxLastName
    objUserLastName.Keys("^a"+strLastName);

    if(objUserFirstName.Text == strFirstName)
    {
      Log.CheckPoint("Entered User's First Name : "+strFirstName)
    }
    else
    {
      Log.Error("First Name not enetered correctly!!, Please check.")
    }
    
    if(objUserLastName.Text == strLastName)
    {
      Log.CheckPoint("Entered User's Last Name : "+strLastName)
    }
    else
    {
      Log.Error("Last Name not enetered correctly!!, Please check.")
    }
    
    if(fnValidateEmailAddress(strEmail))
    {
      objUserEmail = Aliases.browser.pageHollandBarrett.articleCreateAnAccount.userForm.inpuEmailAddress
      objUserEmail.Keys("^a"+strEmail);
      
      aqUtils.Delay(300,"Enetred Email Address");
      if(objUserEmail.Text == strEmail)
      {
        Log.CheckPoint("Entered User's Email : "+strEmail)
      }
      else
      {
        Log.Error("EMail not enetered correctly!!, Please check.");
      }
    }
    else
    {
      Log.Error("Email ID is not Valid!, Please pass valid email ID")
    }
    
    
    Aliases.browser.pageHollandBarrett.articleCreateAnAccount.userForm.pwdboxCreateAPassword.Keys("^a[Del]")
    Aliases.browser.pageHollandBarrett.articleCreateAnAccount.userForm.pwdboxCreateAPassword.SetText(strPassword)
    if(Aliases.browser.pageHollandBarrett.articleCreateAnAccount.txtPasswordError.Exists)
    {
      Log.Error("Password does not match the requirement, Please give Strong Password with atleast 1 Upper case Letter,1 Lower Case and 1 Number and with length more than 7")
    }
    else
    {
      Log.Checkpoint("Password entered correctly")
    }
    Aliases.browser.pageHollandBarrett.articleCreateAnAccount.userForm.InputConfirmEmailAddress.Keys("^a[Del]")
    Aliases.browser.pageHollandBarrett.articleCreateAnAccount.userForm.InputConfirmEmailAddress.SetText(strEmail);
    if(Aliases.browser.pageHollandBarrett.articleCreateAnAccount.txtPassWordMatchError.Exists)
    {
      Log.Error("Passwword and Confirm Email does not match, Please check!!")
    }
    else
    {
      Log.Checkpoint("Confirm Password and Password Matched")
    }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
}











function fnValidateEmailAddress(strEmailAddress)
{
  try
  {
  boolEmailValidation = false  
  regExp = /\w+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,6}/ig;
  if(strEmailAddress.match(regExp) != null) 
  {
    Log.Message("Valid Email ID")
    boolEmailValidation = true;
  }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    return boolEmailValidation
  }
}


function fnGetEmailID()
{
  try
  {
    var strEmailID; 
    dt =new Date()
    strEmailID = "AutoTest"+dt.getTime()+"@gmail.com"
    Log.Message(strEmailID)
    if(!Project.Variables.VariableExists("UserEmailID"))
      Project.Variables.AddVariable("UserEmailID","String")
      
      Project.Variables.$set("VariableByName","UserEmailID", strEmailID);

  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    }
  
}


function SelectRewardsForLifeRadioOption(strUserSelection = "not today")
{
  try
  {
    var objUserFOrm,objRadioButton;
    objUserFOrm = Aliases.browser.pageHollandBarrett.articleCreateAnAccount.userForm;
    strUserSelection = strUserSelection.toLowerCase();
    if(strUserSelection == "join jewards for life today")
    {
      strValue = "OPT_IN"
    }
    else if(strUserSelection == "i signed up in store")
    {
      strValue = "ALREADY_JOINED"
    }
    else if(strUserSelection == "not today")
    {
      strValue = "OPT_OUT"
    }
    objRadioButton = objUserFOrm.FindChild(Array("ObjectType","value"),Array("RadioButton",strValue),10)
    objRadioButton.Click();
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    
  }
}

function fnSelectTermsAndConditionCheckBOx()
{
  try
  {
    var objUserForm,objRadioButton,objTermsConditionCheckBox;
    var boolSelected = false;
    objUserForm = Aliases.browser.pageHollandBarrett.articleCreateAnAccount.userForm;
    
    objTermsConditionCheckBox = objUserForm.FindChild(Array("ObjectType","ObjectIdentifier"),Array("Checkbox","terms"),10)
    if(objTermsConditionCheckBox.value == "true")
    {
      Log.Checkpoint("Terms And Conditions is already selected")
      boolSelected = true;
    }
    else
    {
      objTermsConditionCheckBox.Click();
      aqUtils.Delay(300,"Selected Terms and Condition");
      objUserForm.Refresh();
      objTermsConditionCheckBox = objUserForm.FindChild(Array("ObjectType","ObjectIdentifier"),Array("Checkbox","terms"),10)
      if(objTermsConditionCheckBox.value == "true")
      {
        Log.Checkpoint("Successfully Selected Terms and Condition")
        boolSelected = true;
      }
    }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    return boolSelected;
  }
}

function fnValidateAccountCreation()
{
  try
  {
    var UserFirstName = Project.Variables.UserFirstName
    if(Aliases.browser.pageHollandBarrett.articleCreateAnAccount.txtAccountCreated.WaitProperty("Exists", true, 5000))
    {
    
      if(Aliases.browser.pageHollandBarrett.articleCreateAnAccount.txtAccountCreated.Visible)
      {
        Log.Checkpoint("Account Created successfully for User : "+Project.Variables.UserFirstName)
      }
      else
      {
        Log.Error("Failed to create User accout for User : "+UserFirstName);
      }
    }
    else
    {
      Log.Error("Failed to create User accout for User : "+UserFirstName);
    }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
}


function dummy()
{
  if(Aliases.browser.pageHollandBarrett.articleCreateAnAccount.txtPasswordError.Exists)
    {
      Log.Error("Password does not match the requirement, Please give Strong Password with atleast 1 Upper case Letter,1 Lower Case and 1 Number and with length more than 7")
    }
    else
    {
      Log.Checkpoint("Password entered correctly")
    }
}


function fnClickOnSignInAccountButton()
{
  try
  {
    var boolAuthPageLoaded = false;
    if(Aliases.browser.pageHollandBarrett.headerHollandBarrett.panelHollandBarrett.btnAccountHomeScreen.WaitProperty("Visible", true, 5000))
    {
      Aliases.browser.pageHollandBarrett.headerHollandBarrett.panelHollandBarrett.btnAccountHomeScreen.Click();
      if(Aliases.browser.AuthenticationPage.WaitProperty("Visible", true, 5000))
      {
        Log.Checkpoint("Authentication Page Loaded");
        boolAuthPageLoaded = true;
      }
      else
      {
        Log.Error("Authentication Page Not loaded after Clicking on Account Button On HomeScreen");
      }
    }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    return boolAuthPageLoaded;
  }
}

function entreEmailAndPasswordOnSignIn()
{
  try
  {
    var strEmailID =  Project.Variables.UserEmailID;
    var strPassword = Project.Variables.Password;
    if(Aliases.browser.AuthenticationPage.WaitProperty("Visible", true, 5000))
      {
        Aliases.browser.AuthenticationPage.sectionMyAccount.loginForm.txtBoxEmailAddress.Keys("^a[Del]"+strEmailID)
        aqUtils.Delay(200,"Entering Password")
        Aliases.browser.AuthenticationPage.sectionMyAccount.loginForm.pwdboxPassword.Keys("^a[Del]")
        Aliases.browser.AuthenticationPage.sectionMyAccount.loginForm.pwdboxPassword.SetText(strPassword)
      }
      else
      {
        Log.Error("Authentication Page Not loaded!");
      }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
}

function fnClickSignIn()
{
  try
  {
    Aliases.browser.AuthenticationPage.sectionMyAccount.btnSignIn.Click();
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally{
    
  }
}



function fnVerifyLoginUser(strExpectedUserName)
{
  try
  {
    var strActualUserName;
    if(Aliases.browser.pageHollandBarrett.headerHollandBarrett.panelHollandBarrett.txtNodeHelloUser.WaitProperty("Exists", true, 5000))
    {
      strActualUserName = Aliases.browser.pageHollandBarrett.headerHollandBarrett.panelHollandBarrett.txtNodeHelloUser.contentText
      strActualUserName = strActualUserName.toLowerCase();
      strExpectedUserName = strExpectedUserName.toLowerCase();
      if(aqString.Find(strActualUserName,strExpectedUserName,0,true)>=0)
      {
        Log.Checkpoint(strExpectedUserName + " User Logged In Successfully, Verified Hello Message displayed with User Name")
      }
      else
      {
        Log.Error(strExpectedUserName + " User Log In is not Successfully, Hello Message displayed wrong user Name "+strActualUserName)
      }
    }
    else
    {
      
    }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally{
    
  }
}


function fnCLickOnProductsFromNavigationBar(strLinkText,strSubProductName)
{
  try
  {
    var boolClicked = false;
    var objNavigationBar,objProductLink,objSubProductLink
    objNavigationBar  = Aliases.browser.pageHollandBarrett.headerHollandBarrett.sectionProducts.naviagationBarProducts
    objProductLink = objNavigationBar.FindChild(Array("ObjectType","contentText","Visible"),Array("Link",strLinkText,true),2)
    if(objProductLink.Exists)
    {
      objProductLink.HoverMouse();
      aqUtils.Delay(2000,"Waiting for Drop down of Sub Products");
      objNavigationBar.Refresh();
      var objPanelCbdOilCapsules = Aliases.browser.pageHollandBarrett.headerHollandBarrett.sectionProducts.naviagationBarProducts.panelCbdOilCapsules;
      objSubProductLink = objPanelCbdOilCapsules.Parent.FindChild(Array("ObjectType","ObjectLabel","Visible"),Array("Link",strSubProductName,true),6);
      objSubProductLink.Click();
      boolClicked = true;
      Log.Checkpoint("Clicked on "+strSubProductName)
    }
    else
    {
      Log.Error("Failed to Click on "+strLinkText+" Link does not exists Please check!!")
    }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    return boolClicked;
  }
}

function fnClickOnFoodAndDrinksProductsFromNavigationBar(strLinkText,strSubProductName)
{
  try
  {
    var boolClicked = false;
    var objNavigationBar,objProductLink,objSubProductLink
    objNavigationBar  = Aliases.browser.pageHollandBarrett.headerHollandBarrett.sectionProducts.naviagationBarProducts
    objProductLink = objNavigationBar.FindChild(Array("ObjectType","contentText","Visible"),Array("Link",strLinkText,true),2)
    if(objProductLink.Exists)
    {
      objProductLink.HoverMouse();
      aqUtils.Delay(2000,"Waiting for Drop down of Sub Products");
      objNavigationBar.Refresh();
      var objPanelSnacks = Aliases.browser.pageHollandBarrett.headerHollandBarrett.sectionProducts.naviagationBarProducts.panelSnacks;
      objSubProductLink = objPanelSnacks.Parent.FindChild(Array("ObjectType","ObjectLabel","Visible"),Array("Link",strSubProductName,true),6);
      objSubProductLink.Click();
      boolClicked = true;
      Log.Checkpoint("Clicked on "+strLinkText)
    }
    else
    {
      Log.Error("Failed to Click on "+strLinkText+" Link does not exists Please check!!")
    }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    return boolClicked;
  }
}





function fnSelectProduct(strProductName)
{
  try
  {
    var boolSelected = false;
    var objAddToBasketBtn,objProductContainer,objProduct
    objProductContainer = Aliases.browser.pageHollandBarrett.FindChild(Array("ObjectType","className"),Array("Panel","productListItemsContainerWrapper"),10)
    objProduct = objProductContainer.FIndChild(Array("ObjectType","textContent"),Array("Link",strProductName),10)
//    objProduct.Click()
    Sys.HighLightObject(objProduct.Parent)
    objAddToBasketBtn = objProduct.Parent.FindChild(Array("ObjectType","textContent"),Array("Button","Add to Basket"),6);
    Sys.HighlightObject(objAddToBasketBtn)
    objAddToBasketBtn.Click();
    boolSelected = true;
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    return boolSelected
  }
}


function fnIncreaseQuantity(strProductName,intQuantity)
{
  try
  {
    var boolSelected = false;
    var objAddToBasketBtn,objProductContainer,objProduct,objQutityPanel
    objProductContainer = Aliases.browser.pageHollandBarrett.FindChild(Array("ObjectType","className"),Array("Panel","productListItemsContainerWrapper"),10)
    objProduct = objProductContainer.FIndChild(Array("ObjectType","textContent"),Array("Link",strProductName),10)
//    objProduct.Click()
    for(var i=0;i<intQuantity-1;i++)
    {
      objAddToBasketBtn = objProduct.Parent.FindChild(Array("ObjectType","className"),Array("Button","*secondary atb-plus-btn"),6);
      Sys.HighlightObject(objAddToBasketBtn)
      objAddToBasketBtn.Click();
    }
    aqUtils.Delay(1000,"Waiting for Quantity to update")
    //jsx-614208329 jsx-1683373294 jsx-4064773798 jsx-3520119591 jsx-3297718312 jsx-1764354291 plus-minus-quantity
    objProductContainer = Aliases.browser.pageHollandBarrett.FindChild(Array("ObjectType","className"),Array("Panel","productListItemsContainerWrapper"),10)
    objProduct = objProductContainer.FIndChild(Array("ObjectType","textContent"),Array("Link",strProductName),10)
    objQutityPanel = objProduct.Parent.FindChild(Array("ObjectType","className"),Array("Panel","*plus-minus-quantity"),10)
    if(objQutityPanel.contentText == intQuantity)
    {
      Log.Checkpoint("Added Item "+strProductName+" Changed Quantity to "+intQuantity);
       boolSelected = true;
    }
    else
    {
      Log.Eorror("Added Item "+strProductName+" but failed change Quantity to "+intQuantity)
    }
    
   
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    return boolSelected
  }
}



function fnClickOnBasket()
{
  try
  {
    var boolNavigated = false;
    if(Aliases.browser.pageHollandBarrett.panelNext.textnodeYourBasket.Exists)
    {
      Log.Message("Alreasy in Basket Page");
      boolNavigated = true
    }
    else
    {
    Aliases.browser.pageHollandBarrett.headerHollandBarrett.panelHollandBarrett.textnodeBasket.Click()
    if(Aliases.browser.pageHollandBarrett.panelNext.textnodeYourBasket.WaitProperty("Visible",true,5000))
    {
      Log.Checkpoint("Successfully Navigated to Basket  Page");
      boolNavigated = true;
    }
    else
    {
      Log.Error("Failed to Navigate to Basket")
    }
    }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    return boolNavigated;
  }
}


function fnVerifyProductOnBasketPage(strProductToBeValidated)
{
  try
  {
    var boolItemFound = false
    var objProductSection = Aliases.browser.pageHollandBarrett.panelNext.section;
    var arrObjProductinBasket = objProductSection.FindAllChildren("ObjectType","Article",2)
    if(arrObjProductinBasket.length >= 0)
    {
      for(var i = 0; i<= arrObjProductinBasket.length-1;i++)
      {
        if(aqString.Find(arrObjProductinBasket[i].contentText,strProductToBeValidated,0,true)>=0)
        {
          Sys.HighlightObject(arrObjProductinBasket[i])
          Log.Checkpoint("Product present in Basket, Product Name : "+strProductToBeValidated);
          boolItemFound =  true;
          break;
        }
      }
      if(!boolItemFound)
      {
        Log.Error("Product "+strProductToBeValidated+" not found in Basket")
      }
    }
    else
    {
      Log.Error("No Items present in Basket - "+strProductToBeValidated+" not found")
    }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    return boolItemFound;
  }
}



function fnValidateTotalSubTotalPriceInBasket()
{
  try
  {
    var boolItemFound = false
    var EachItemTotalPrice = 0
    var objProductSection = Aliases.browser.pageHollandBarrett.panelNext.section;
    var arrObjProductinBasket = objProductSection.FindAllChildren("ObjectType","Article",2)
    if(arrObjProductinBasket.length >= 0)
    {
      for(var i = 0; i<= arrObjProductinBasket.length-1;i++)
      {
        var strCurrentProductName = arrObjProductinBasket[i].FindChild(Array("ObjectType","className"),Array("TextNode","*product__title"),10).contentText
        var strCurrentProductPrice = arrObjProductinBasket[i].FindChild(Array("ObjectType","className"),Array("Panel","*product__price-now"),10).contentText
        strCurrentProductPrice = strCurrentProductPrice.split("£")[1]
        EachItemTotalPrice = EachItemTotalPrice + (aqConvert.VarToFloat(strCurrentProductPrice))
      }
    }
    else
    {
      Log.Error("No Items present in Basket")
    }
    
    //Verifying SubTotal
    var objPanelNext = Aliases.browser.pageHollandBarrett.panelNext
    var objSubTotal = objPanelNext.FindChild(Array("ObjectType","contentText"),Array("Panel","Subtotal*"),20)
    var fltSubTotal = (aqConvert.VarToFloat((objSubTotal.contentText).split("£")[1]))
    var objSavings = objPanelNext.FindChild(Array("ObjectType","contentText"),Array("Panel","Savings"),20).Parent
    var fltSavings = (aqConvert.VarToFloat((objSavings.contentText).split("£")[1]))
    fltSubTotal = fltSubTotal.toFixed(2)
    fltSavings = fltSavings.toFixed(2)
    EachItemTotalPrice = EachItemTotalPrice.toFixed(2)
    Log.Message("Total Price Of Each Item : "+EachItemTotalPrice)
    var fltSavingsPlusEachItemPrice = aqConvert.VarToFloat(fltSavings)+aqConvert.VarToFloat(EachItemTotalPrice)
    if(fltSubTotal == (fltSavingsPlusEachItemPrice))
    {
      Log.Checkpoint("SubTotal Verification Passed, SubTotal "+fltSubTotal+" Equal to Total Of Each Item Price "+EachItemTotalPrice +" plus Savings "+fltSavings)
    }
    else
    {
      Log.Error("Subtotal not matched!! Please Verify! Expected Subtotal is "+fltSavingsPlusEachItemPrice+" But Actual is"+fltSubTotal)
    }
    
    var objTotal = objPanelNext.FindChild(Array("ObjectType","contentText"),Array("Panel","Total*"),10)
    var fltTotal = aqConvert.VarToFloat((objTotal.contentText).split("£")[1])
    fltTotal = fltTotal.toFixed(2)
    if(fltTotal == EachItemTotalPrice)
    {
      Log.Checkpoint("Total Price Verification Passed, It is Equal to Total Of Each Item Price "+EachItemTotalPrice)
    }
    else
    {
      Log.Error("Total Price not matched!! Please Verify! Expected Subtotal is "+EachItemTotalPrice+" But Actual is"+fltTotal)
    }
    
  }
  catch(err)
  {
    Log.Error(err.message)
  }
}
function fnClearBasket()
{
  
    var objProductLink,objProductSection
    
    if(Aliases.browser.pageHollandBarrett.panelNext.textnodeYourBasket.Exists)
    {
      Log.Message("Already in Basket Page");
    }
    else
    {
      if(Aliases.browser.pageHollandBarrett.headerHollandBarrett.panelHollandBarrett.textnodeBasket.Exists)
      {  
        Aliases.browser.pageHollandBarrett.headerHollandBarrett.panelHollandBarrett.textnodeBasket.Click()
      }
      else
      {
      objNavigationBar  = Aliases.browser.pageHollandBarrett.headerHollandBarrett.sectionProducts.naviagationBarProducts
      objProductLink = objNavigationBar.FindChild(Array("ObjectType","contentText","Visible"),Array("Link","Sports Nutrition",true),2)
      objProductLink.Click();
      aqUtils.Delay(3000)
      Aliases.browser.pageHollandBarrett.headerHollandBarrett.panelHollandBarrett.textnodeBasket.Click()
      }
      
      aqUtils.Delay(3000,"Clearing Basket")
      if(Aliases.browser.pageHollandBarrett.panelNext.FindChild(Array("ObjectType","contentText"),Array("TextNode","*your basket is empty"),10).Exists)
      {
        Log.Message("Basket Is Empty");
        return;
      }
    }
    objProductSection = Aliases.browser.pageHollandBarrett.panelNext.section;
    arrObjProductinBasket = objProductSection.FindAllChildren("ObjectType","Article",2);
    if(arrObjProductinBasket.length >= 1)
    {
      for(var i = 0; i<= arrObjProductinBasket.length-1; i++)
      {
        arrObjProductinBasket[i].FindChild(Array("ObjectType","contentText"),Array("Button","Remove"),15).Click()
        aqUtils.Delay(2000,"Waiting for Page to Load")
      }
    }
    else
    {
      Log.Message("Basket is Empty")
    }


}
  

