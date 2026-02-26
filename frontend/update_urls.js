const fs = require('fs');
const path = require('path');

function walk(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walk(filepath, filelist);
    } else {
      if (filepath.endsWith('.jsx') || filepath.endsWith('.js')) {
        filelist.push(filepath);
      }
    }
  });
  return filelist;
}

// target the src directory
const srcPath = path.join(__dirname, 'src');
const files = walk(srcPath);

let updatedFilesCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Replace exact strings in single or double quotes, turning them into template literals
  // e.g. "http://localhost:5000/api/auth" -> `${import.meta.env.VITE_API_URL}/api/auth`
  content = content.replace(/(["'])http:\/\/localhost:5000([^"']*)(["'])/g, '`${import.meta.env.VITE_API_URL}$2`');
  
  // 2. Replace any remaining http://localhost:5000 (like those already inside template literals or unquoted)
  // e.g. `http://localhost:5000/api/donor/${id}` -> `${import.meta.env.VITE_API_URL}/api/donor/${id}`
  content = content.replace(/http:\/\/localhost:5000/g, '${import.meta.env.VITE_API_URL}');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${path.relative(__dirname, file)}`);
    updatedFilesCount++;
  }
});

console.log(`\nSuccessfully updated ${updatedFilesCount} files.`);
