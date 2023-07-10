// console.log(arguments);
// console.log('entering inside require.');

// console.log(require('module').wrapper);

//module exports
const C = require('./test-module1');
const calc1 = new C();
console.log(calc1.add(2,6));

const calc2 = require('./test-module2');
console.log(calc2.add(2,6));

//caching
require('./test-module3')();
require('./test-module3')();
require('./test-module3')();