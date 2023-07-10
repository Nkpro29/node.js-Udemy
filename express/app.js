const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.status(200).send('hello form the side');
})

const port = 3000;
app.listen(port, ()=>{
    console.log(`running on port ${port}`);
});