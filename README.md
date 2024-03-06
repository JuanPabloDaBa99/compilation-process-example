The compilation process follow four steps:

1. Create the source 'EnumeratorCenter.js' in src/source.
2. Generate the source JSON using 'createSourceJson.js' in src/fileProcessor.
3. Adapt that JSON to get the weak JSON using 'createWeakJson.js' in src/jsonAdapter.
4. Create the compiled file using 'compilationService.js' in src/fileCompiler.

Execute 'npm run build' to run the compilation process.