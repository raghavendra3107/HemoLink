const fs = require('fs');
const path = require('path');

function walk(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      if (!filepath.includes('node_modules') && !filepath.includes('dist')) {
        filelist = walk(filepath, filelist);
      }
    } else {
      if (filepath.endsWith('.jsx') || filepath.endsWith('.js')) {
        filelist.push(filepath);
      }
    }
  });
  return filelist;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.match(/import\s*\{\s*(\r)?\n\s*import\s*\{\s*API\s*\}/)) {
      content = content.replace(/import\s*\{\s*(\r)?\n\s*import\s*\{\s*API\s*\}\s*from\s*"([^"]+)";/g, 'import { API } from "$2";\nimport {');
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Fixed multi-line import in: ${file}`);
  }
});
