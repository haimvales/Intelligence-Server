import { fileJsonToArr } from "../utils/utilsFile.js"

export const validateUser = async (req,res,next)=>{
    const {username,password}=  req.headers
    let users = null
    try{
       users = await fileJsonToArr("./db/userD.json") 
    }catch(err){
        res.json({err:err.name})
    }
    const findUser = users.find((user) => {return user.username === username && user.password === password})
    if (findUser){
        next()        
    }
    else
        return res.status(401).json({msg:'Unauthorized'}) 
}