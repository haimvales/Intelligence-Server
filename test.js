import fs from 'fs/promises'
async function fileJsonToArr(filePath){
    try{
        const res = await fs.readFile(filePath,'utf-8')
        const users = await JSON.parse(res)
        return users
    } catch(err){
        console.error(err)
    }}

let a = await fileJsonToArr("./db/userD.json")
console.log(a)

const getAllUsers = async (req, res) => {
    
    
    try {
        const users = await fileJsonToArr("./db/userD.json")
        return {users:users}
    }catch (err){
        return {err:err}
    }
}

console.log(await getAllUsers())
export async function getObjPeople(){
    try{
        const res = await fs.readFile('PEOPLE.json','utf8')
        const data = JSON.parse(res)
        return data
    }
    catch(err){
        console.log(`ERR: `,err)
    }

}