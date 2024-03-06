const fs = require('fs');
const { weakJsonPath, compiledFilePath } = require('./../../config/paths')
const CompilationFromWeak = require('./compilationFromWeak');

const compiledFile = CompilationFromWeak.getCompiledFile(weakJsonPath);

fs.writeFileSync(compiledFilePath, compiledFile);