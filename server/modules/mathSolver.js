console.log('Hello from mathSolver.js');

function mathSovler(x, y, z) {
    let answer = 0;
    if ( z === "plus" ) {
        answer = x + y;
    } else if( z === "minus" ) {
        answer = x - y;
    } else if( z === "multiply" ) {
        answer = x * y;
    } else if( z === "divide" ) {
        answer = x / y;
    }

    return answer;
}

module.exports = mathSovler