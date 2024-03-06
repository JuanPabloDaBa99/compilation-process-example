const fs = require('fs');

const POSITIONS_TO_SAVE = 100;

class CompilationFromWeak {
    static getCompiledFile (absolutePath) {
        this._errorIfFileDoesntExists(absolutePath, 'weak JSON');
        
        const weakJson = this._readJsonFile(absolutePath);
        let compiledFile = "";
        
        if(!weakJson || weakJson.length === 0) throw new Error('Empty weak JSON');
        
        for(const thisClass of weakJson) {
            compiledFile = compiledFile.concat(this._transformJsonInClass(thisClass));
        }

        compiledFile = this._addImports(compiledFile);
        compiledFile = this._addExports(compiledFile, weakJson);

        return compiledFile;
    }

    static _transformJsonInClass (thisClass) {
        const className = thisClass['name'];
        const variableNames = thisClass['contains'];
        const startNumber = thisClass['startNumber'];
        const type = thisClass['type'];

        const variableData = this._getVariablesData(variableNames, startNumber * POSITIONS_TO_SAVE);
        
        let staticValues = "";
        let staticGetters = "";
        let staticProperties = "";
        for(const data of variableData) {
            staticValues += this._staticValuesConstructor(data.name, data.position);
            staticGetters += this._staticGetterConstructor(data.name);
            if(type === 'Enumerator') staticProperties += this._staticPropertyConstructor(data.name, data.position);
            else staticProperties += this._staticPropertyConstructor(data.name, data.name);
        }

        staticValues = `\n\tstatic _values_ = {${staticValues}\n\t}`;

        return `\n\nclass ${className} extends Enumerator {${staticProperties}\n${staticValues}\n${staticGetters}\n}`;
    }

    static _addImports (compiledFile) {
        const importDefinitions = 'import { Enumerator } from "./../../src/Enums/Enumerator";';
        return importDefinitions + compiledFile;
    }

    static _addExports (compiledFile, weakJson) {
        const classNames = weakJson.map(object => object['name']);
        const exports = classNames.join(', ');
        return compiledFile + `\n\nexport { ${exports} }`;
    }

    static _getVariablesData (variableNames, startNumber) {
        const values = [];

        let nextNumber = startNumber;
        for(const thisName of variableNames) {
            if(!this._isSkippableName(thisName)) {
                values.push({
                    name: thisName,
                    position: nextNumber});
            }
            nextNumber++;
        }

        return values;
    }

    static _staticValuesConstructor (name, value) {
        return `\n\t\t${name}: ${value},`;
    }

    static _staticGetterConstructor (name) {
        return `\n\tstatic get ${name}() {\n\t\treturn this.${this._formatPrivateName(name)};\n\t}`;
    }

    static _staticPropertyConstructor (name, value) {
        return `\n\tstatic ${this._formatPrivateName(name)} = ${value};`;
    }

    static _formatName (name) {
        return name.toUpperCase();
    }

    static _formatPrivateName (name) {
        return `_${name.toLowerCase()}_`;
    }

    static _isSkippableName (name) {
        return !name || name.length === 0 || name.charAt(0) === '_';
    }

    static _errorIfFileDoesntExists (absolutePath, fileName) {
        try {
            fs.accessSync(absolutePath, fs.constants.F_OK);
        } catch (error) {
            throw new Error(`The path to ${fileName} doesnt work`);
        }
        return;
    }

    static _readJsonFile (absolutePath) {
        try {
            const roughData = fs.readFileSync(absolutePath, 'utf8');
            const jsonData = JSON.parse(roughData);
            return jsonData;
        } catch (error) {
            return null;
        }
    }
}

module.exports = CompilationFromWeak;