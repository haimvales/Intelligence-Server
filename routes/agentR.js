import express from "express";

import { validateUser } from "../middlerwares/userM.js";
import { getAgentById, getAllAgent , createAgent,updeteAgent,deleteAgentById} from "../ctrls/agentC.js";


const router = express.Router();




router.get("/",validateUser,getAllAgent);
router.get("/:id",validateUser,getAgentById);
router.post("/",validateUser,createAgent);
router.put("/:id",validateUser,updeteAgent);
router.delete("/:id",validateUser,deleteAgentById);






export default router;