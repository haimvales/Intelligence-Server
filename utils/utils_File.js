import fs from 'fs/promises'

async function fileJsonToArr(filePath){
    try{
        const res = await fs.readFile(filePath,'utf-8')
        const users = await JSON.parse(res)
        return users
    } catch(err){
        console.error(err)
    }}

async function writeFileToJson(filePath,data) {
  try {
    // Write text to a file
    // await fs.writeFile(filePath, 'Hello, World!', 'utf8');

    // Write JSON data
    // const data = { name: 'John', age: 30, city: 'New York' };
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Files created successfully');
  } catch (err) {
    console.error('Error writing files:', err);
  }
}

// writeFileToJson('./db/user_D.json',{ name: 'John', age: 30, city: 'New York' });



export {
    fileJsonToArr
}
    
