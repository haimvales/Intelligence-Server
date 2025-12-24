import { fileJsonToArr, writeFileToJson } from "../utils/utilsFile.js"


const getAllUsers = async (req, res) => {
    try {
        const users = await fileJsonToArr("./db/userD.json")
        res.json({users:users})
    }catch (err){
        return res.status(500).json({err:err})
    }
}

const createUser = async (req, res) => {
    try {
        const users = await fileJsonToArr("./db/userD.json")
        if(typeof(req.body.password) !== String)
            return res.status(400).json("Bad Request")
        if(!req.body.username || !req.body.password || Object.keys(req.body).length !== 2)
            return res.status(400).json("Bad Request")
        else{
           const findUser = users.find((user) => {return user.username === req.body.username}) 
            if(findUser !== undefined)
                return res.status(409).json("Conflict")
            else{
            users.push(req.body)
            await writeFileToJson("./db/userD.json",users)
            return res.json({users:users})            
            }
        }
    }catch (err){
        return res.status(500).json({err:err})
    }
}

const updeteUsers = async (req, res) => {
    try {
        const users = await fileJsonToArr("./db/userD.json")
        const findUserIndex = users.findIndex((user) => {return user.username === req.params.username}) 
        if(findUserIndex === -1)
            return res.status(404).json("Not Found")
        else{
            users[findUserIndex].password = req.body.password
            await writeFileToJson("./db/userD.json",users)
            return res.json({users:users})
        }
    }catch (err){
        return res.status(500).json({err:err})
    }
}

const deleteUser = async (req, res) => {
    try {
        const users = await fileJsonToArr("./db/userD.json")
        const findUserIndex = users.findIndex((user) => {return user.username === req.params.username}) 
        if(findUserIndex === -1)
            return res.status(404).json("Not Found")
        else{
            users.splice(findUserIndex,1)
            await writeFileToJson("./db/userD.json",users)
            return res.json({users:users})
        }
    }catch (err){
        return res.status(500).json({err:err})
    }
}

export {
    getAllUsers,
    createUser,
    updeteUsers,
    deleteUser
}























// if(req.body['action'] === 'cat fact'){
//     const test = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1`,{
//             headers:{'x-api-key': 'live_altmEqH7Xoit5vkdJkk2Vxkr1kGI20W5zAqpUBLwqCyE9aN0Nzi5m97sHWiqi7Cv'}
//         }
//     )
//     const data = await test.json()
//     res.json({'cat fact':data,'length':data.length})
// }