const EventEmitter = require('events');
const http = require('http');

// const myEmitter = new EventEmitter();


// myEmitter.on('ravi', ()=>{
//     console.log('ravi is a bad boy.');
// })

// myEmitter.on('ravi',(birthday,year) =>{
//     console.log(`Ravi was born on ${birthday} September ${year}.`);
// })

// myEmitter.emit('ravi',25,2002);


class Birth extends EventEmitter{
    // birth is the child class and Eventemitter is the parent/super class
    constructor(){
        super();
    }
}

const myEmitter = new Birth;

myEmitter.on('ravi', ()=>{
        console.log('ravi is a bad boy.');
    })
    
    myEmitter.on('ravi',(birthday,year) =>{
        console.log(`Ravi was born on ${birthday} September ${year}.`);
    })
    
    myEmitter.emit('ravi',25,2002);

//Creating a web server. using built-in node.js module.

const server = http.createServer();

server.on('request', (req,res)=>{
    console.log('request recieved!');
    res.end('request recieved!');
})

server.listen(3000,'127.0.0.1',()=>{
    console.log('waiting for the request........');
})
