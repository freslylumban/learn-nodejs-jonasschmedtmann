// WRAPPER FUNCTIONS
// console.log(arguments);
// console.log(require('module').wrapper);

// EXPORTING AND IMPORTING using module.exports
// module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.multiply(2,5));

// EXPORTS SHORTHAND
// exports
// const calc2 = require('./test-module-2');
const { add, multiply, divide, minus } = require('./test-module-2');
console.log(add(7, 7));

// CATCHING
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
