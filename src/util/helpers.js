// var loadDataFiles = () => {
//   try {
//     var files = fs.readdirSync(path.resolve(config.basePath, './src/data'));
//     var dataFiles = {};
//     files.map((file) => {
//       dataFiles[file.split(path.extname(file))[0]] = `data/${file}`;
//     });
//     return dataFiles;
//   } catch(e) {
//     return {};
//   }
// };