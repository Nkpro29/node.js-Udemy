// const hello = 'hello world';
// console.log(hello);

const fs = require('fs'); // file system 
//taking input of the file.

const http = require('http');

//blocking, synchronous
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

// //taking output of the file.
// const textOut = `this is what I know about the fox in the text:${textIn}`;
// console.log(textOut);
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('file written!');

//non-blocking, asynchronous 
fs.readFile('./txt/start.txt', 'utf-8', (err,data1) => {

    if(err) return console.log("ERROR!");

    fs.readFile(`./txt/${data1}.txt`,'utf-8', (err,data2) =>{
        console.log(data2);
        fs.readFile('./txt/append.txt','utf-8', (err,data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt',`${data2} \n ${data3}`,'utf-8', err =>{
                console.log('file has been written.');
            })
        });
    });
});
console.log('Will read file!');


//SERVER
    const server = http.createServer((req,res) => {
        // console.log(req);
        res.end('hello, from the server');
    });

    server.listen(4000,'127.0.0.1',() =>{
        console.log('listening to requests on port 4000');
    });