const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req,res)=>{

    //solution 1
    // fs.readFile('./stream.txt',(err,data)=>{
    //     if(err) console.log(err);
    //     res.end(data);
    // })

    //solution 2:streams 
    // const readable = fs.createReadStream('./streammm.txt');
    // readable.on('data',chunk=>{
    //     res.write(chunk);
    // })
    // readable.on('error',error =>{
    //     console.log(error);
    //     res.statusCode = 500;
    //     res.end('file not found!');
    // })
    // readable.on('close',() =>{
    //     res.end('server closed');
    // });

    //solution 3
    const readable = fs.createReadStream('./stream.txt');
    readable.pipe(res);
    //readableSource.pipe(writableDestination);
    //pipe operator solves the problem of back pressure. it is the best solution. 
});

server.listen(4000,'127.0.0.1',()=>{
    console.log('listening.........');
})