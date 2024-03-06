const fs = require('fs');
const { sourceFilePath, sourceJsonPath } = require('./../../config/paths')
const fileProcessing = require('./fileProcessingService');

const sourceJson = fileProcessing.getSourceJson(sourceFilePath);

fs.writeFileSync(sourceJsonPath, sourceJson);