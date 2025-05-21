window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.error-message').forEach(function(msg) {
    msg.style.display = 'none';
  });
});

let inputAmount = document.getElementById('amount');
let inputTerm = document.getElementById('term');
let inputRate = document.getElementById('rate');


let P = parseFloat(inputAmount.value);
let N = parseFloat(inputTerm.value);
let MN = N/12;
let R = parseFloat(inputRate.value)/100;

let inputFieldAmount =  document.getElementById
  ("input-field-amount");
let inputFieldAmountIcon =  document.getElementById("input-field-amount-icon");

let inputFieldTerm = document.getElementById("input-field-term");
let inputFieldTermIcon = document.getElementById("input-field-term-icon");

let inputFieldRate = document.getElementById("input-field-rate");
let inputFieldRateIcon = document.getElementById("input-field-rate-icon");

const repaymentRadio = document.getElementById("repayment-radio");
const interestRadio = document.getElementById("interest-radio");

let isRadioValid;

const emptyResult = document.getElementById("empty-results-section");

const filledResult = document.getElementById("filled-results-section");

function validateForms(formName, inputName){
  const value = document.forms[formName][inputName].value.trim();

  const inputElement  = document.forms[formName][inputName];

  const wrapper = inputElement.closest(".form-entry");
  
  const errormsg = wrapper.querySelector(".error-message");


  if(value === ""){
    errormsg.style.display = "block";
    return false;
  }else{
    errormsg.style.display = "none";
    return true;
  }
  
}

// function validateRadio(firstRadio, secondRadio){
//   if(firstRadio.checked || secondRadio.checked){
//     document.getElementById("radio-error-msg").style.display = "none";
//     isRadioValid = true;

//   }
//   else{
//     document.getElementById("radio-error-msg").style.display = "block";
//     isRadioValid = false;
//   }
  
// }

// repaymentRadio.addEventListener('change', function() {
//   validateRadio(repaymentRadio, interestRadio);
// });
// interestRadio.addEventListener('change', function() {
//   validateRadio(repaymentRadio, interestRadio);
//  });


function inputFocus(x,y){
  
  x.style.border = "1px solid hsl(61, 70%, 52%)";

  x.style.transition = "0.3s ease";

  y.style.background = "hsl(61, 70%, 52%)";

  y.style.transition = "0.3s ease";

  y.style.color = "hsl(202, 55%, 16%)";

}

function inputOutFocus(x,y){
  x.style.border = "1px solid hsla(202, 55%, 16%, 0.6)";

  y.style.borderRadius = "4px 0 0 4px";

  y.style.background = "hsl(202, 86%, 94%)";

  
}

function inputOutFocus2(x,y){
  x.style.border = "1px solid hsla(202, 55%, 16%, 0.6)";

  y.style.borderRadius = "0 4px 4px 0";

  y.style.background = "hsl(202, 86%, 94%)";
  
}




inputAmount.addEventListener("focus", () => {
  inputFocus(inputFieldAmount,inputFieldAmountIcon)
});

inputAmount.addEventListener("blur", () => {
  inputOutFocus(inputFieldAmount,inputFieldAmountIcon)
});


inputTerm.addEventListener("focus", () => {
  inputFocus(inputFieldTerm, inputFieldTermIcon);
});
inputTerm.addEventListener("blur", () => {
  inputOutFocus2(inputFieldTerm, inputFieldTermIcon);
});


inputRate.addEventListener("focus", () => {
  inputFocus(inputFieldRate, inputFieldRateIcon);
});
inputRate.addEventListener("blur", () => {
  inputOutFocus2(inputFieldRate, inputFieldRateIcon);
});


const radios = document.querySelectorAll("input[type = 'radio']");

document.querySelectorAll(".radio-field").forEach(wrapper => {
  wrapper.classList.remove("checked");
})

radios.forEach(radio => {
  radio.addEventListener("change", () => {
    document.querySelectorAll(".radio-field").forEach(wrapper => {
      wrapper.classList.remove("checked");
    })

    radio.closest(".radio-field").classList.add("checked");
  })
})




const calcBtn = document.getElementById("calculate-btn");

calcBtn.addEventListener("click", (e) => {
  e.preventDefault(); 

  const isAmount = validateForms("mortgageForm", "amount");
  const isTerm = validateForms("mortgageForm", "term");
  const isRate = validateForms("mortgageForm", "rate");
  // validateRadio("repaymentRadio", "interestRadio");

  if(repaymentRadio.checked){
    document.getElementById("radio-error-msg").style.display = "none";
    isRadioValid = true;
  } else if(interestRadio.checked){
    document.getElementById("radio-error-msg").style.display = "none";
    isRadioValid = true;
  } else{
    document.getElementById("radio-error-msg").style.display = "block";
    isRadioValid = false;
  }

  if(isAmount && isTerm && isRate && isRadioValid){
    emptyResult.style.display = "none";
    emptyResult.style.transition = "0.3s none";
    filledResult.style.display = "flex";
    filledResult.style.flexDirection = "column";
    filledResult.style.alignItems = "start";
    filledResult.style.justifyContent = "center";

    

    filledResult.style.transition = "0.3s ease";
    if(repaymentRadio.checked){
      let monthlyRepay = document.getElementById("mortgage-answer-monthly");
      let yearlyRepay = document.getElementById("mortgage-answer-yearly");

      
      let monthlyRepayValue = 0;
      let yearlyRepayValue = 0;

      let P = parseFloat(inputAmount.value);
      let N = parseFloat(inputTerm.value);
      let MN = N/12;
      let R = parseFloat(inputRate.value)/100;

      monthlyRepayValue = P * ((R * (1 + R) ** N) / (((1 + R) ** N) - 1));

      yearlyRepayValue = monthlyRepayValue * 12 * N;

      monthlyRepay.innerHTML = monthlyRepayValue.toFixed(2);
      yearlyRepay.innerHTML = yearlyRepayValue.toFixed(2);

      
    }

    if(interestRadio.checked){

      let monthlyRepay = document.getElementById("mortgage-answer-monthly");
      let yearlyRepay = document.getElementById("mortgage-answer-yearly");

      let P = parseFloat(inputAmount.value);
      let N = parseFloat(inputTerm.value);
      let MN = N/12;
      let R = parseFloat(inputRate.value)/100;

      monthlyRepayValue = P * ((R)/12);

      yearlyRepayValue = monthlyRepayValue * 12 * 25;

      monthlyRepay.innerHTML = monthlyRepayValue.toFixed(2);
      yearlyRepay.innerHTML = yearlyRepayValue.toFixed(2);

    }
  }
});


