import express from "express";
import { createUser, deleteUser, getAllUsers, updeteUsers } from "../ctrls/userC.js";
import { validateUser } from "../middlerwares/userM.js";


const router = express.Router();


router.get("/", validateUser,getAllUsers);
router.post("/", validateUser, createUser);
router.put("/:username", validateUser, updeteUsers);
router.delete("/:username", validateUser, deleteUser);


export default router;

































// if(req.body['action'] === 'cat fact'){
//     const test = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1`,{
//             headers:{'x-api-key': 'live_altmEqH7Xoit5vkdJkk2Vxkr1kGI20W5zAqpUBLwqCyE9aN0Nzi5m97sHWiqi7Cv'}
//         }
//     )
//     const data = await test.json()
//     res.json({'cat fact':data,'length':data.length})
// }