$(document).ready(onReady);

let operators = ""

function onReady() {
console.log('jQuery is loaded!');

('#plus-btn').on('click', operatorPlus);
('#minus-btn').on('click', operatorMinus);
('#mutliply-btn').on('click', operatorMultiply);
('#divide-btn').on('click', operatorDivide);



}


// Creating a different on-click for each type of operation button.
function operatorPlus() {
    operators = "plus";
    console.log('Addition selected')
}

function operatorMinus(){
    operators = "minus";
    console.log('Subtraction selected')
}

function operatorMultiply(){
    operators = "multiply";
    console.log('Multiplication selected')
}

function operatorDivide() {
    operators = "divide";
    console.log('Division selected')
}

