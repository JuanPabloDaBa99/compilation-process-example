const fs = require('fs');
const { sourceJsonPath, weakJsonPath } = require('./../../config/paths')
const jsonAdapter = require('./jsonAdapterService');

const weakJson = jsonAdapter.getWeakJson(sourceJsonPath, weakJsonPath);

fs.writeFileSync(weakJsonPath, weakJson);