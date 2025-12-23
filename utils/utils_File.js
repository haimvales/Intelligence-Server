import fs from 'fs/promises'

async function fileJsonToArr(filePath){
    try{
        const res = await fs.readFile(filePath,'utf-8')
        const users = await JSON.parse(res)
        return users
    } catch(err){
        console.error(err)
    }}





export {
    fileJsonToArr
}
    
