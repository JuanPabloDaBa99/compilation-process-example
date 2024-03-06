require('dotenv').config();
const path = require('path');

const basePath = process.env.BASE_PATH || '.';
const sourceFilePath = path.resolve(basePath, process.env.SOURCE_PATH || './src/source/EnumeratorCenter.js');
const sourceJsonPath = path.resolve(basePath, process.env.SOURCE_JSON_PATH || './dist/FilesFromCompilation/sourceJson.json');
const weakJsonPath = path.resolve(basePath, process.env.WEAK_JSON_PATH || './dist/FilesFromCompilation/weakJson.json');
const compiledFilePath = path.resolve(basePath, process.env.COMPILED_FILE_PATH || './dist/Enumerators/EnumeratorCenter.js');

module.exports = { basePath, sourceFilePath, sourceJsonPath, weakJsonPath, compiledFilePath };