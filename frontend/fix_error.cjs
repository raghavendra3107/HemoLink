const fs = require('fs');
const filepath = 'src/pages/admin/GetAllDonors.jsx';
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace("import {\r\nimport { API } from \"../../config.js\";", "import { API } from \"../../config.js\";\r\nimport {");
content = content.replace("import {\nimport { API } from \"../../config.js\";", "import { API } from \"../../config.js\";\nimport {");

fs.writeFileSync(filepath, content, 'utf8');
console.log("Fixed syntax error");
