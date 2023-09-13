
function TestKillProcess()
{
  fnTerminateProcessByName("WINWORD")
}

/*=============================================================================================================
Function Name : fnTerminateProcessByName
Description : This function can be used to Kill/Terminate Process if already running. It checks for Process by Name If Its running Terminates else It returns true. 
              Called this function recursively in case if more than once instances are running.
Parameters : strProcessName - Name of Process to be terminated (ProcessName Proprty shown in Test complete)
Return Value : Returns boolean Value true if successfuly executed, If any error occurs returns false
Date Created : Sep-2023
Author: Dhruv
Reviewed By : NA
**************Update History*************
Modified BY:
Modified Date : 
Reviwed By :
================================================================================================================*/
function fnTerminateProcessByName(strProcessName)
{
  try
  {
    var boolProcessKilled = false;
    var arrObjectProcess = Sys.FindAllChildren(Array("ProcessName","IsOpen"),Array(strProcessName,true),1);
    if(arrObjectProcess.length >= 1)
    {
      arrObjectProcess[0].Terminate();
      fnTerminateProcessByName(strProcessName)
    }
    else
    {
      Log.Checkpoint("Process "+strProcessName+" Terminated successfully")
      boolProcessKilled =  true;
    }
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    return boolProcessKilled;
  }
}
function testLaunchBrowser()
{
  fnTerminateProcessByName("chrome")
  fnLaunchBrowser("chRome","https://www.hollandandbarrett.com/en-au/")
}
function fnLaunchBrowserAndNavigate(strBrowserName,strUrl)
{
  try
  {
    var boolBrowserLaunch = false;
    if(strBrowserName.toUpperCase() == "CHROME")
    {
      strBrowserName = "btChrome"
    }
    Browsers.Item(eval(strBrowserName)).Run(strUrl);
    //Browsers.Item(btChrome).Run("http://smartbear.com");
    
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    
  }
}



function getUsrPassword(intLength=8)
{
  try
  {
    var strPwd; 
     Log.Message("Length :"+intLength)
     if(!Project.Variables.VariableExists("Password")) 
      Project.Variables.AddVariable("Password", "Password");
     Project.Variables.$set("VariableByName","Password", "") 
     strPwd = fncreateRandomStringOfCharsAndNumbersForPwd(intLength)
      
     Project.Variables.$set("VariableByName","Password", strPwd)
  }
  catch(err)
  {
    Log.Error(err.message)
  }
  finally
  {
    return strPwd;
  }
}

function fncreateRandomStringOfChars(lengthOfRequiredString) {
    var result = "";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    var counter = 0;
    while (counter < lengthOfRequiredString) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    Log.Message(result)
    return result;
}

function fncreateRandomStringOfCharsAndNumbersForPwd(lengthOfRequiredString = 8) {
  try
  {
   if(lengthOfRequiredString<=7)
    {
      Log.Warning("Password length should be Greater than equl to 8, Please send length greater than 7");
      return;
    }
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charactersLength = characters.length;
    var counter = 0;
    while (counter < 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    
    characters = "abcdefghijklmnopqrstuvwxyz"
    charactersLength = characters.length;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    
    characters = "320192364567894435423263";
    charactersLength = characters.length;
    while (counter < lengthOfRequiredString) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    Log.Message(result);
//    if(result.legnth <7)
//    {
//      while (counter < 10) {
//      result += characters.charAt(Math.floor(Math.random() * charactersLength));
//      counter += 1;
//    }
//    }
    }
    catch(err)
    {
      Log.Error(err.message)
    }
    finally
    {
      return result;
    }
}