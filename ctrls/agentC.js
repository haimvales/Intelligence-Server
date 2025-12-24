import { fileJsonToArr, writeFileToJson } from "../utils/utilsFile.js"


const getAllAgent = async (req, res) => {
    try {
        const users = await fileJsonToArr("./db/agentD.json")
        res.json({users:users})
    }catch (err){
        return res.status(500).json({err:err})
    }
}

const getAgentById = async (req, res) => {
    try {
        const agents = await fileJsonToArr("./db/agentD.json")
        const findAgent = agents.find((agent) => {return agent.id === req.params.id}) 
            if(findAgent === undefined)
                return res.status(404).json("Not Found")
            else{
            return res.json(findAgent)            
            }
    }catch (err){
        return res.status(500).json({err:err})
    }
}

const createAgent = async (req, res) => {
    try {        
        const agents = await fileJsonToArr("./db/agentD.json")
        const {id,name,nickname,reportsCount} = req.body  
        if(!id || !name || !nickname || reportsCount !== 0 || Object.keys(req.body).length !== 4)
            return res.status(400).json("Bad Request")
        for (const property in req.body){
        if(property !== "reportsCount" && (typeof( req.body[property])!=='string')){
            return res.status(400).json(`${property} is not a string`)
        }
        const findagent = agents.find((agent) => {return agent.id === req.body.id}) 
         if(findagent !== undefined)
             return res.status(409).json("Conflict")
         else{
         agents.push(req.body)
         await writeFileToJson("./db/agentD.json",agents)
         return res.json({agents:agents})            
        }
        }
    }catch (err){
        console.log(err.name)
        console.log(err.name.type)
        return res.status(500).json({err})
    }
}

const updeteAgent = async (req, res) => {
    try {
        const agents = await fileJsonToArr("./db/agentD.json")
        const findagentsIndex = agents.findIndex((agent) => {return agent.id === req.params.id}) 
        if(findagentsIndex === -1)
            return res.status(404).json("Not Found")
        if( !req.body.name || !req.body.nickname )
            return res.status(400).json("Bad Request")
        if(typeof( req.body.name)!=='string' || typeof( req.body.nickname)!=='string')
            return res.status(400).json(`valus are not a string`)
        const newObjAgents = {"id":req.params.id,"name":req.body.name,"nickname":req.body.nickname,"reportsCount":agents[findagentsIndex].reportsCount}
        console.log(newObjAgents)
        agents[findagentsIndex] = newObjAgents
        await writeFileToJson("./db/agentD.json",agents)
        return res.json({agents:agents})
    }catch (err){
        return res.status(500).json({err})
    }
}

const deleteAgentById = async (req, res) => {
    try {
        const agents = await fileJsonToArr("./db/agentD.json")
        const findaAentIndex = agents.findIndex((agent) => {return agent.id === req.params.id}) 
        if(findaAentIndex === -1)
            return res.status(404).json("Not Found")
        const reports = await fileJsonToArr("./db/reportD.json")
        const arrReportIndex = []
        reports.forEach( (report ,index) =>  {
            if(report.agentId === req.params.id)
                arrReportIndex.push(index)
            })
        arrReportIndex.forEach( (index) =>  {
            reports.splice(index,1)
            })
        agents.splice(findaAentIndex,1)
        await writeFileToJson("./db/agentD.json",agents)
        await writeFileToJson("./db/reportD.json",reports)
        return res.json({agents:agents})
    }catch (err){
        return res.status(500).json({err:err})
    }
}

export {
    getAllAgent,
    getAgentById,
    createAgent,
    updeteAgent,
    deleteAgentById
}