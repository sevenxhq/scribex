// export const readFile = async () => {
//   const fse = require("fs-extra");
//   const path = require('path');
//   const projectsPath = path.resolve("./public//bcs-hi_irv.tit.usfm")
//   return new Promise((resolve) => {
//     if (fs.existsSync(projectsPath)) {
//       const fileContent = fs.readFileSync(
//         path.join(projectsPath),
//         'utf8',
//       );
//       resolve(fileContent);
//     }
//   });
// };