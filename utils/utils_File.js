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

async function deleteFile(filePath) {
//   const filePath = 'file-to-delete.txt';
  try {
    // Check if file exists before deleting
    await fs.access(filePath);

    // Delete the file
    await fs.unlink(filePath);
    console.log('File deleted successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File does not exist');
    } else {
      console.error('Error deleting file:', err);
    }
  }
}



async function deleteFiles(arrFilePath) {
  const filesToDelete = arrFilePath
  try {
    // Delete all files in parallel
    await Promise.all(
      filesToDelete.map(file =>
        fs.unlink(file).catch(err => {
          if (err.code !== 'ENOENT') {
            console.error(`Error deleting ${file}:`, err);
          }
        })
      )
    );

    console.log('Files deleted successfully');
  } catch (err) {
    console.error('Error during file deletion:', err);
  }
}


async function renameFile(oldPath,newPath) {
  try {
    // Check if source file exists
    await fs.access(oldPath);

    // Check if destination file already exists
    try {
      await fs.access(newPath);
      console.log('Destination file already exists');
      return;
    } catch (err) {
      // Destination doesn't exist, safe to proceed
    }
    // Perform the rename
    await fs.rename(oldPath, newPath);
    console.log('File renamed successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Source file does not exist');
    } else {
      console.error('Error renaming file:', err);
    }
  }
}



export {
    fileJsonToArr,
    writeFileToJson,
    appendToFileText,
    deleteFile,
    deleteFiles,
    renameFile
}
    
