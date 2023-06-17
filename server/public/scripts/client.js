$(document).ready(onReady);

let operator = ""

function onReady() {
    console.log('jQuery is loaded!');

    getPreviousMathAnswers();

    // $('#plus-btn').on('click', operatorPlus);
    // $('#minus-btn').on('click', operatorMinus);
    // $('#multiply-btn').on('click', operatorMultiply);
    // $('#divide-btn').on('click', operatorDivide);
    $('.operator-btn').on('click', operatorSelection)

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
    let input1 = $('#var-a-input').val();
    let input2 = $('#var-b-input').val();
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
    $('#var-a-input').val('');
    $('#var-b-input').val('');
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


// Creating a different on-click for each type of operation button.
function operatorSelection(){
    operator = $(this).val()
    console.log('Operator selected: ', operator)
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
    $('#var-b-input').val('');
}

