import express from "express";

import { validateUser } from "../middlerwares/userM.js";
import { createReport, getAllReport, getReportById, updateReport,deleteReport } from "../ctrls/reportC.js";



const router = express.Router();




router.get("/",validateUser,getAllReport);
router.get("/:id",validateUser,getReportById);
router.post("/",validateUser,createReport);
router.put("/:id",validateUser,updateReport);
router.delete("/:id",validateUser,deleteReport);



    
    


export default router;