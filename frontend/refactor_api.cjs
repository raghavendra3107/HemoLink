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

const srcPath = path.join(__dirname, 'src');
const configPath = path.join(srcPath, 'config.js');
const files = walk(srcPath).filter(f => f !== configPath);

let updatedFilesCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  let hasChanges = false;

  if (content.includes('import.meta.env.VITE_API_URL') || content.includes('http://localhost:5000')) {
      hasChanges = true;
      
      // Calculate relative path for import
      let relativePathToConfig = path.relative(path.dirname(file), configPath).replace(/\\/g, '/');
      if (!relativePathToConfig.startsWith('.')) {
          relativePathToConfig = './' + relativePathToConfig;
      }
      
      const importStatement = `import { API } from "${relativePathToConfig}";`;
      
      // Ensure import doesn't already exist
      if (!content.includes('import { API }')) {
          // Put import at top after other imports
          // Find the last import
          const importsRegex = /^import .*(from)?.*$/gm;
          let lastIndex = 0;
          let match;
          while ((match = importsRegex.exec(content)) !== null) {
              lastIndex = match.index + match[0].length;
          }
          if (lastIndex > 0) {
              content = content.slice(0, lastIndex) + '\n' + importStatement + content.slice(lastIndex);
          } else {
              content = importStatement + '\n' + content;
          }
      }

      // Replace template literals and unquoted
      content = content.replace(/\$\{import\.meta\.env\.VITE_API_URL\}/g, '${API}');
      content = content.replace(/import\.meta\.env\.VITE_API_URL/g, 'API');
      
      // Just in case any string literals survived earlier attempts
      content = content.replace(/(["'])http:\/\/localhost:5000([^"']*)(["'])/g, '`${API}$2`');
      content = content.replace(/http:\/\/localhost:5000/g, '${API}');
  }

  if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated: ${path.relative(__dirname, file)}`);
      updatedFilesCount++;
  }
});

console.log(`\nSuccessfully updated ${updatedFilesCount} files.`);
