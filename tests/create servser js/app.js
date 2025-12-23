import express from "express";

// const express = require('express')
const app = express();
const port = 3002;

app.use(express.json());




// app.get('/', (req, res) => {
//     console.log(req.url)
//     // req.console.log(req)
//     res.send('Hello World!')
//     res.json({msg:'Hello frome servsr'})
// })

// app.get('/', (req, res) => {
//     for (let i = 0; i<100;i++)
//         console.log(i)
//     res.send()
// })

// app.post('/', (req,res)=>{
//     console.log(req.body)
//     res.json(req.body)
// })

app.post('/', (req,res)=>{
    console.log(req.headers[''])
    res.json(req.headers[''])
})

// access query params from url
app.get('/',(req,res)=>{
    console.log(req.query);
    if (req.query.momo)
        res.send('access');
    else
        res.send('False');
})

app.get('/:id/:name',(req,res)=>{
    console.log(req.params.id);
    console.log(req.params.name);
    res.send();
})

app.listen(port, () => {
  console.log(`server runing on http://localhost:${port}`)
})
