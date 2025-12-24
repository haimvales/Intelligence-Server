import { fileJsonToArr, writeFileToJson } from "../utils/utilsFile.js"


const getAllReport = async (req, res) => {
    try {
        const reports = await fileJsonToArr("./db/reportD.json")
        res.json({reports:reports})
    }catch (err){
        return res.status(500).json({err:err})
    }
}

const getReportById = async (req, res) => {
    try {
        const reports = await fileJsonToArr("./db/reportD.json")
        const findRepor = reports.find((report) => {return report.id === req.params.id}) 
            if(findRepor === undefined)
                return res.status(404).json("Not Found")
            else{
            return res.json(findRepor)            
            }
    }catch (err){
        return res.status(500).json({err:err})
    }
}



const createReport = async (req, res) => {
    try {        
        const reports = await fileJsonToArr("./db/reportD.json")
        const {id,content,agentId} = req.body  
        if(!id ||  !content || !agentId || Object.keys(req.body).length !== 3)
            return res.status(400).json("Bad Request")
        for (const property in req.body){
        if( (typeof( req.body[property])!=='string')){
            return res.status(400).json(`${property} is not a string`)
        }}
        const findreport = reports.find((report) => {return report.id === req.body.id}) 
        if(findreport !== undefined)
            return res.status(409).json("Conflict")
        const agents = await fileJsonToArr("./db/agentD.json")
        const findagent = agents.find((agent) => {return agent.id === agentId}) 
         if(findagent === undefined)
             return res.status(400).json("Not Found")
         const newobjreport = {"id":id,"date":new Date().toISOString(),"content":content,"agentId":agentId}
         reports.push(newobjreport)
         findagent.reportsCount += 1
         await writeFileToJson("./db/reportD.json",reports)
         await writeFileToJson("./db/agentD.json",agents)
         return res.json({reports:reports})            
    }catch (err){
        console.log(err.name)
        console.log(err.name.type)
        return res.status(500).json({err})
    }
}


const updateReport = async (req, res) => {
    try {
        const { content, agentId } = req.body;
        const reportId = req.params.id;

        // 1. ולידציה בסיסית
        if (!content || !agentId) 
            return res.status(400).json("Bad Request: Missing content or agentId");
        if (typeof content !== 'string' || typeof agentId !== 'string')
            return res.status(400).json("Values are not strings");

        const reports = await fileJsonToArr("./db/reportD.json");
        const agents = await fileJsonToArr("./db/agentD.json");

        // 2. מציאת הדוח הקיים
        const reportIndex = reports.findIndex(r => r.id === reportId);
        if (reportIndex === -1) return res.status(404).json("Report Not Found");

        const oldAgentId = reports[reportIndex].agentId;
        const newAgentId = agentId;

        // 3. עדכון מונים של סוכנים (רק אם הסוכן השתנה)
        if (oldAgentId !== newAgentId) {
            const oldAgent = agents.find(a => a.id === oldAgentId);
            const newAgent = agents.find(a => a.id === newAgentId);

            if (!newAgent) return res.status(400).json("New Agent Not Found");

            if (oldAgent) oldAgent.reportsCount -= 1; // הורדה מהסוכן הישן
            newAgent.reportsCount += 1;             // הוספה לסוכן החדש
        }

        // 4. עדכון אובייקט הדוח
        const updatedReport = {
            id: reportId,
            date: new Date().toISOString(),
            content: content,
            agentId: newAgentId
        };

        reports[reportIndex] = updatedReport;

        // 5. שמירה לקבצים
        await writeFileToJson("./db/reportD.json", reports);
        await writeFileToJson("./db/agentD.json", agents);

        return res.json({ message: "Updated successfully", reports });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const deleteReport = async (req, res) => {
    try {
        const reportId = req.params.id;

        // 1. טעינת הנתונים
        const reports = await fileJsonToArr("./db/reportD.json");
        const agents = await fileJsonToArr("./db/agentD.json");

        // 2. מציאת הדוח לפני המחיקה כדי לדעת מי הסוכן שלו
        const reportToDelete = reports.find(r => r.id === reportId);
        
        if (!reportToDelete) {
            return res.status(404).json("Report Not Found");
        }

        // 3. עדכון המונה של הסוכן
        const agent = agents.find(a => a.id === reportToDelete.agentId);
        if (agent) {
            // הקטנת המונה ב-1 (חשוב לוודא שלא ירד מתחת ל-0, ליתר ביטחון)
            agent.reportsCount = Math.max(0, agent.reportsCount - 1);
        }

        // 4. מחיקת הדוח מהמערך
        const updatedReports = reports.filter(r => r.id !== reportId);

        // 5. שמירה של שני הקבצים
        await writeFileToJson("./db/reportD.json", updatedReports);
        await writeFileToJson("./db/agentD.json", agents);

        return res.json({ message: "Report deleted and agent count updated" });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};



export {
    getAllReport,
    getReportById,
    createReport,
    updateReport,
    deleteReport

}