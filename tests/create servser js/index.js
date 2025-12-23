import express from "express"

const app =  express();
const port = 3000;

app.use(express.json());

app.get('/greet',(req,res) => {
    console.log({ msg: `hi from get endpoint ${new Date}` })
    return res.json({ msg: `hi from get endpoint ${new Date}` })
})

app.get('/greet/:name',(req,res) => {
    console.log(`i got name: ${req.params.name}`)
    res.json({msg:`i got name: ${req.params.name}`})
})

app.get('/test',async (req,res) => {
    try{
    const testname = 'haim'
    const test = await fetch(`http://localhost:3000/greet/${testname}`)
    const data = await test.json()
    if(data.msg && data.msg.split("i got name: ")[1] === testname)
        res.json({ "result": "ok" })
    else
        res.json({ "result": "fail" })
    }
    catch(err){
        console.error(err)
    }
})

// app.post('/action' , (req,res) => {

// })

app.post('/action',async (req,res)=>{
    try{
        
        if(!(req.body['action']))
            res.status(400).json({ "msg": "body is malformed ! (req.action)" })
        else if(req.body['action'] !== 'joke' && req.body['action'] !== 'cat fact')
            res.status(400).json({ "msg": "body is malformed ! (req.action !== 'joke' && req.action !== 'cat fact')" })
        if(req.body['action'] === 'joke'){
            const test = await fetch(`https://official-joke-api.appspot.com/random_joke`)
            const data = await test.json()
            res.json({'joke':`${data['setup'].toUpperCase()}  ${data['punchline'].toUpperCase()}`})
        }
        if(req.body['action'] === 'cat fact'){
            const test = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1`,{
                    headers:{'x-api-key': 'live_altmEqH7Xoit5vkdJkk2Vxkr1kGI20W5zAqpUBLwqCyE9aN0Nzi5m97sHWiqi7Cv'}
                }
            )
            const data = await test.json()
            res.json({'cat fact':data,'length':data.length})
        }   
    }

    catch(err){
        console.error(err)
    }
})

app.listen(port , () => {
    console.log(`server runing on http://localhost:${port}`)
})