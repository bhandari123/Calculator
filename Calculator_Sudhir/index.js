import {newsUrl} from "./constants.js"
//gives current value of text box
function getTextInputValue(){
  return document.getElementById("textInput").value;
}
document.getElementById("factorialButton").addEventListener('click',factorialButton)
//find factorial
function factorialButton(){
    document.getElementById("textInput").value = factorial(getTextInputValue());
}
function factorial(x) 
{ 

  if (x === 0)
 {
    return 1;
 }
  return x * factorial(x-1);
         
}
document.getElementById("reciButton").addEventListener('click',reciButton)

//find reciprocal
function reciButton(){
  document.getElementById("textInput").value = 1/Number(getTextInputValue());

  
}
document.getElementById("squareRoot").addEventListener('click',squareRoot);
function squareRoot(){
  //finds the value of expression then only calcualtes the squareroot.
    let sqrtValue = Math.sqrt(eval(getTextInputValue()));
    console.log(sqrtValue)
    // if(isNaN(sqrtValue)){
    //   document.getElementById("textInput").value = 'iNVALID';
    // }else{
    //   document.getElementById("textInput").value = sqrtValue;
    // }
    sqrtValue = isNaN(sqrtValue)?"Invalid Expression":sqrtValue
    document.getElementById("textInput").value = sqrtValue;
    

}


// function leftParentheses(){
//   document.getElementById("textInput").value += "(";

//   console.log("Left parentheses clicked..")
  
// }
document.getElementById("rightParentheses").addEventListener('click',rightParentheses);
function rightParentheses(){
  document.getElementById("textInput").value += ")";

  console.log("Left parentheses clicked..")
  
}

document.getElementById("backBtn").addEventListener('click',backBtn);
function backBtn(){
  let itemValue = document.getElementById("textInput").value;
  itemValue = itemValue.substring(0,itemValue.length
    -1)
    document.getElementById("textInput").value = itemValue;
}
document.getElementById("equalBtn").addEventListener('click',equalBtn)
function equalBtn(){
  try {
    document.getElementById("textInput").value = eval(document.getElementById("textInput").value );
    
  } catch (error) {
    console.log(error)
  }
}
document.getElementById("clearBtn").addEventListener('click',clearBtn)
function clearBtn(){
  document.getElementById("textInput").value = "";
}


const nonComputedArr = document.querySelectorAll('.nonComputedBtn');
console.log(nonComputedArr);


nonComputedArr.forEach(item=>{
  document.getElementById("myAlert").style="display:none";



  item.addEventListener('click',()=>{
    // console.log(item.innerHTML);
    let itemValue = document.getElementById("textInput").value;
    let lastElement = itemValue.substring(itemValue.length-1, itemValue.length)
    let pressedElement = item.innerHTML;
    console.log(`last element is: ${lastElement}`)
    if((lastElement=="+" ||lastElement=="-" ||lastElement=="*" ||lastElement=="/" ||lastElement=="%" || lastElement==".") && (pressedElement=="+" ||pressedElement=="-" ||pressedElement=="*" ||pressedElement=="/" ||pressedElement=="%" || pressedElement==".")){
      document.getElementById("myAlert").style="display:block"
      setTimeout(()=>{
        document.getElementById("myAlert").style = "display: none"
      },2000)
      
    }
    else{
      document.getElementById("textInput").value += pressedElement;
    }
    
  })



})
document.querySelector("#morebtn").addEventListener('click',currencyConvert);
function currencyConvert(){
  
  //console.log(document.getElementsByClassName("moreContainer"))
  document.getElementById("morebtnContainer").style="display:none";
  document.getElementById("mainDiv").style="display:none";
  document.getElementById("mainCalcbtnContainer").style = "display:true"
  document.getElementById("currencyDiv").style="display:true";
  //document.querySelectorAll("body").style = "display:flex;justify-content:center;align-items:center;background-color:red"
  document.querySelector("#mainCalcBtn").style = "display:true"
  //document.getElementsByClassName("moreContainer").style="display:none";
}

document.querySelector("#mainCalcBtn").addEventListener('click',mainCalculator);
function mainCalculator(){
  document.getElementById("morebtnContainer").style="display:true";
  document.getElementById("mainDiv").style="display:true";
  document.getElementById("currencyDiv").style="display:none";
  document.querySelector("#mainCalcBtn").style = "display:none"
  //document.querySelectorAll("body").style = "display:flex;justify-content:center;align-items:center;background-color:red"
}

window.addEventListener('keydown',e=>{
  // console.log(e.key)
  //enabling the keyboard typing. as most users might prefer keyboard typing one.
  const components = ["1","2","3","4","5","6","7","8","9","0",".","(",")", "+", "-","*","/"]
  if(components.includes(e.key)){
    document.getElementById("textInput").value += e.key;

  }


  switch(e.key){
    case "Enter":
      equalBtn();
      break;
    
    case "Backspace":
      backBtn();
      break;
    
    case "Delete":
      clearBtn();
      break;
    
  }
  
})



//for currency converter

//handing news 
function httpGet(theUrl) {
  let xmlHttpReq = new XMLHttpRequest();
  xmlHttpReq.open("GET", theUrl, false); 
  xmlHttpReq.send(null);
  return xmlHttpReq.responseText;
}
let newsData = httpGet(newsUrl);
newsData = JSON.parse(newsData);
console.log(newsData.articles[0]);


//adding listners to the input and select tags.
const firstInput=document.querySelector("#firstCurrency");
firstInput.addEventListener('input',inputChanged);
document.querySelector("#dropDown1").addEventListener('change',inputChanged)
document.querySelector("#dropDown2").addEventListener('change',inputChanged)

//handling input in currency input boxes...
async function inputChanged(){
  const amount = document.getElementById("firstCurrency").value;
  //console.log(`Amount is: ${amount} type is ${typeof amount}`)
  if(amount==""){
      document.getElementById("secondCurrency").value = "0.00";
  }
  const firstCurrency = (document.getElementById("dropDown1").value).toString();
  const secondCurrency = (document.getElementById("dropDown2").value).toString();
  const host = 'api.frankfurter.app';
  const url = `https://${host}/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`;
  //demo url
  //https://api.frankfurter.app/latest?amount=30&from=US&to=AUD
  //const url = 'https://api.frankfurter.app/latest?amount=30&from=US&to=AUD'
  console.log(url);
  try {
  let promiseHolder = await fetch(url);
  let result = await promiseHolder.json();

  let rates = result["rates"];
  let concatResult = `${firstCurrency} = ${secondCurrency}`
  document.getElementById("secondCurrency").value = rates[`${secondCurrency}`];
  } catch (error) {
      console.log(error);
  }
}
