const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('../modules/replaceTemplate');

const data = fs.readFileSync(`${__dirname}/Api/nodefarm.json`,'utf-8');
    const dataObj = JSON.parse(data);//convert json to js

const slugs = dataObj.map(e => slugify(e.productName,{lower:true}))
console.log(slugs);
    
//server
const server = http.createServer((req,res) => {
    // console.log(req.url);
    // const pathname = req.url;   

    const {query,pathname} = url.parse(req.url,true);

    const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');   
    const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');   
    const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
    
    
    //overview page 

    if (pathname === '/' || pathname === '/overview'){
        res.writeHead(200,{'Content-type':'text/html'}); 
        
        const cardHtml = dataObj.map(e => replaceTemplate(tempCard,e));
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g,cardHtml);

        res.end(output);
    }

    //product page 
    else if (pathname === '/product'){
        res.writeHead(200,{'Content-type':'text/html'});     
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct,product);
        res.end(output);
    }

    //api page
    else if (pathname === '/api'){
        res.writeHead(200,{ 'Content-type': 'application/json'});
        res.end(data);
    }

    //Not found page 
    else{
        // res.end('page not found!!');
        res.writeHead(404,{
            'Content-type': 'text/html',
            'my-own-header' : 'hello-world'
        });  
        res.end('<h1>404, page not found </h1>');
    }
});

server.listen(4000,'127.0.0.1',() =>{
    console.log('listening to requests on port 4000');
});