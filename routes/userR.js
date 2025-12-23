import express from "express";
import { getAllUsers } from "../ctrls/userC.js";
import { validateUser } from "../middlerwares/userM.js";


// import { addUser, deleteUser, getAllUsers, getPostById, updateUser } from "../ctrls/userC.js";
// import { logger } from "../middlewares/logger.js";
// import { validateUser } from "../middlewares/auth.js";

const router = express.Router();


router.get("/", validateUser,getAllUsers);
router.post("/", validateUser, getPostById);

// router.get("/", logger, getAllUsers);
// router.post("/:id/posts", logger, validateUser, getPostById);
// router.post("/", logger, addUser);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;

































// if(req.body['action'] === 'cat fact'){
//     const test = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1`,{
//             headers:{'x-api-key': 'live_altmEqH7Xoit5vkdJkk2Vxkr1kGI20W5zAqpUBLwqCyE9aN0Nzi5m97sHWiqi7Cv'}
//         }
//     )
//     const data = await test.json()
//     res.json({'cat fact':data,'length':data.length})
// }