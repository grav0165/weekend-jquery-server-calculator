console.log('Hello from mathSolver.js');

function mathSovler(x, y, z) {
    let answer = 0;
    if ( z === "+" ) {
        answer = x + y;
    } else if( z === "-" ) {
        answer = x - y;
    } else if( z === "*" ) {
        answer = x * y;
    } else if( z === "/" ) {
        answer = x / y;
    }

    return answer;
}

module.exports = mathSovler