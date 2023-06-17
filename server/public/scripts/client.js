$(document).ready(onReady);

let operator = ""

function onReady() {
    console.log('jQuery is loaded!');

    getPreviousMathAnswers();

    $('#plus-btn').on('click', operatorPlus);
    $('#minus-btn').on('click', operatorMinus);
    $('#mutliply-btn').on('click', operatorMultiply);
    $('#divide-btn').on('click', operatorDivide);
    $('#equals-btn').on('click', solveMathEquation);
    $('#clear-inputs-btn').on('click', clearAllInputs);


}


// Created get function to request from server any saved information
// ✅TODO - ADD RENDER TO getPreviousMathAnswers
function getPreviousMathAnswers() {
    $.ajax({
        method: 'GET',
        url: '/savedPreviousMathAnswers'
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
    // creating object to package and send to server
    let mathObjectToSend = {
        varA: $('#var-a-input').val(),
        varB: $('#var-b-input').val(),
        operatorNotation: operator
    }
    if(mathObjectToSend.varA === nil || mathObjectToSend.varB === nil) {
        console.log('Error! Please enter at least one variable');
    } else {
        $.ajax({
            method: 'POST',
            url: '/savedPreviousMathAnswers',
            data: mathObjectToSend
        }).then(function(response) {
            console.log('Success!', repsonse);
            getPreviousMathAnswers();
        }).catch(function(error) {
            alert('Uh Oh! You have an error!');
            console.log('Error with post', error);
        })
    }
    // Creating call to empty both input blocks
    $('#var-a-input').val('');
    $('#var-b-input').val('');
}

function render(response) {
    console.log('Render is running');
    $('#math-history-results').remove();
    for(let i = 0; i < response.length; i++) {
        $('#math-history-results').append(`
            <li>
                ${response.varA} ${response.operatorNotation} ${response.varB} = ${response.answer}
            </li>
        `)
    }

}


// Creating a different on-click for each type of operation button.
function operatorPlus() {
    operator = "plus";
    console.log('Addition selected')
}

function operatorMinus(){
    operator = "minus";
    console.log('Subtraction selected')
}

function operatorMultiply(){
    operator = "multiply";
    console.log('Multiplication selected')
}

function operatorDivide() {
    operator = "divide";
    console.log('Division selected')
}

function clearAllInputs(){
    $('#var-a-input').val('');
    $('#var-b-input').val('');
}

