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
// writeFileToJson('./db/user_D.json',[{ name: 'John', age: 30, city: 'New York' }]);

async function appendToFileText(filePath,data) {
  try {
    // Append a timestamped log entry
    const logEntry = `${new Date().toISOString()}: Application started\n`;
    await fs.appendFile(filePath, {time:logEntry} , 'utf8');
    await fs.appendFile(filePath, data, 'utf8');

    console.log('Log entry added');
  } catch (err) {
    console.error('Error appending to file:', err);
  }
}




export {
    fileJsonToArr,
    writeFileToJson,
    appendToFileText
}
    
