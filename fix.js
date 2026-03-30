const fs=require("fs");let c=fs.readFileSync("src/App.js","utf8");c=c.replace(/\uFEFF/g,"");fs.writeFileSync("src/App.js",c,"utf8");console.log("Fixed!");
