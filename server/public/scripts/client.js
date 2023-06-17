$(document).ready(onReady);

let operator = "";
let input1 = "";
let input2 = "";
let numberConcat = "";


function onReady() {
    console.log('jQuery is loaded!');

    getPreviousMathAnswers();

    // $('#plus-btn').on('click', operatorPlus);
    // $('#minus-btn').on('click', operatorMinus);
    // $('#multiply-btn').on('click', operatorMultiply);
    // $('#divide-btn').on('click', operatorDivide);
    $('.operator-btn').on('click', operatorSelection)
    $('.number-btn').on('click', numberWrite)

    $('#equals-btn').on('click', solveMathEquation);
    $('#clear-inputs-btn').on('click', clearAllInputs);


}


// Created get function to request from server any saved information
// ✅TODO - ADD RENDER TO getPreviousMathAnswers
function getPreviousMathAnswers() {
    $.ajax({
        method: 'GET',
        url: '/savedAnswers'
    }).then(function(response){
        console.log('getPreviousMathAnswers function!', response)
        render(response);
    }).catch(function(error){
        alert('Uh oh! You have an error!');
        console.log('Error server', error);
    })
}

function solveMathEquation(event) {
    console.log('in solveMathEquation');
    // Preventing default form functions in HTML
    event.preventDefault();
    console.log('Input 2 locked in: ', input2)
    // creating object to package and send to server
    let mathObjectToSend = {
        varA: input1,
        varB: input2,
        operatorNotation: operator
    }
    if(mathObjectToSend.varA || mathObjectToSend.varB) {
    
        $.ajax({
            method: 'POST',
            url: '/savedAnswers',
            data: mathObjectToSend
        }).then(function(response) {
            console.log('Success!', response);
            getPreviousMathAnswers();
        }).catch(function(error) {
            alert('Uh Oh! You have an error!');
            console.log('Error with post', error);
        })
    } else if(operator == ""){
        console.log('Error! No operator is selected!');
        $('#math-result').append('Please select an math function to continue');
    } else {
        console.log('Error! Please enter at least one variable');
        $('#math-result').append('Please input two numbers')
    }
    // Creating call to empty both input blocks
    clearAllInputs();
}

function render(response) {
    console.log('Render is running');
    $('#math-history-results').empty();
    for(let i=response.length-1; i >= 0; i--) {
        let item = response[i];
        $('#math-history-results').append(`
            <li>
                ${item.varA} ${item.operatorNotation} ${item.varB} = ${item.answer}
            </li>
        `)
    for(let i=0; i < response.length; i++){
        item = response[i];
        $('#math-result').empty();
        $('#math-result').append(`${item.answer}`)
    }
    }
}

function numberWrite() {
    // Display number clicked to DOM
        // Concat to any prior numbers already in DOM

    // Save to a variable which will become input1

    // Switch to variable input2, after operatorSelected
    if(operator) {
        input2 += $(this).val();
        console.log('Input 2 is: ', input2)
        numberConcat += $(this).val()
        console.log('numbers concat together as ', numberConcat)

        $('#var-a-input').val(numberConcat)
    } else {
        numberConcat += $(this).val()
        console.log('Input 1 is: ', numberConcat)
        $('#var-a-input').val(numberConcat)    
    }
    
}


// Creating a different on-click for each type of operation button.
function operatorSelection(){
    // save operator section to a variable operator
    operator = $(this).val();
    // concat to DOM
    input1 = numberConcat;
    numberConcat += operator;
    $('#var-a-input').val(numberConcat)
}


// function operatorPlus(event) {
//     event.preventDefault()
//     operator = "+";
//     console.log('Addition selected')
// }

// function operatorMinus(event){
//     event.preventDefault()
//     operator = "-";
//     console.log('Subtraction selected')
// }

// function operatorMultiply(event) {
//     event.preventDefault()
//     operator = "*";
//     console.log('Multiplication selected')
// }

// function operatorDivide(event) {
//     event.preventDefault()
//     operator = "/";
//     console.log('Division selected')
// }

function clearAllInputs(){
    $('#var-a-input').val('');
    input1 = "";
    input2 = "";
    operator = "";
    numberConcat = "";
}

