import { fileJsonToArr } from "../utils/utilsFile.js"


const getAllUsers = async (req, res) => {
    try {
        const users = await fileJsonToArr("./db/userD.json")
        res.json({users:users})
    }catch (err){
        return res.status(500).json({err:err})
    }
}




export {
    getAllUsers
}























// if(req.body['action'] === 'cat fact'){
//     const test = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1`,{
//             headers:{'x-api-key': 'live_altmEqH7Xoit5vkdJkk2Vxkr1kGI20W5zAqpUBLwqCyE9aN0Nzi5m97sHWiqi7Cv'}
//         }
//     )
//     const data = await test.json()
//     res.json({'cat fact':data,'length':data.length})
// }