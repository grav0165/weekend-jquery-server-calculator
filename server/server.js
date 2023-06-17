// TODO - Source in express
const express = require('express');

// TODO - source in body parser
const bodyParser = require('body-parser');

// TODO - initialize express
const app = express();

// TODO - Source PORT
const port = 5000;

// TODO - tell express to use body parser
app.use(bodyParser.urlencoded({ extended: true }))

// TODO - Source in savedPreviousMathAnswers array module
let savedPreviousMathAnswers = require('./modules/savedAnswers')

// TODO - Source in mathSolver function
let mathSolver = require('./modules/mathSolver')

// TODO - add express static information
app.use(express.static('server/public'));

app.get('/savedPreviousMathAnswers', function(req,res) {
    console.log('Request for /savedPreviousMathAnswers was made');
    res.send(savedPreviousMathAnswers);
})

app.post('/savedPreviousMathAnswers', function(req,res) {
    console.log('in POST request! Here is the data: ', req.body);
    let solution = mathSolver(Number(req.body.varA), Number(req.body.varB), req.body.operatorNotation);
    console.log(solution);
    req.body.answer = solution
    savedPreviousMathAnswers.push(req.body);
    res.sendStatus(200);
})






















app.listen(port, () => {
    console.log('listening on port', port);
  })