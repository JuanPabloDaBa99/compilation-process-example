const fs = require('fs');

class jsonAdapter {
    static startNumbers = [];

    static getWeakJson (sourceJsonPath, weakJsonPath) {
        this._errorIfFileDoesntExists(sourceJsonPath, 'source JSON');
        
        const sourceJson = this._readJsonFile(sourceJsonPath);
        const weakJsonOld = this._readJsonFile(weakJsonPath);
        this._initializeStartNumber(weakJsonOld);

        const weakJsonNew = [];
        const classes = this._getClasses(sourceJson);
        for(const thisClass of classes) {
            weakJsonNew.push(this._adaptClassJson(thisClass));
        }

        return JSON.stringify(weakJsonNew, null, 4);
    }

    static _adaptClassJson (thisClass, weakJsonOld) {
        const name = thisClass['name'];
        const type = thisClass['type'];
        const startNumber = this._getNextStartNumber(name, weakJsonOld, type);
        const contains = thisClass['contains'].map(object => object.name);

        const jsonClass = {
            name: name,
            type: type,
            startNumber: startNumber,
            contains: contains,
        }

        return jsonClass;
    }


    static _getNextStartNumber (className, classType, weakJsonOld) {
        if(classType !== 'Enumerators') return 0;
        if(!weakJsonOld || weakJsonOld.length === 0) return this._getNewStartNumber();
        const objectFromName = weakJsonOld.find(object => object.name === className);
        return objectFromName? objectFromName.startNumber : this._getNewStartNumber();
    }

    static _getNewStartNumber () {
        var nextNumber = 0;
        
        for (var i = 0; i < this.startNumbers.length -1; i++) {
            if(this.startNumbers[i + 1] - this.startNumbers[i] > 1) {
                nextNumber = this.startNumbers[i] +1;
            }
        }

        if(nextNumber === 0 && this.startNumbers.length > 0) {
            nextNumber = this.startNumbers[this.startNumbers.length -1] +1;
        }

        this._addToStartNumbers(nextNumber);
        return nextNumber;
    }

    static _initializeStartNumber (weakJsonOld) {
        if(!weakJsonOld || weakJsonOld.length === 0) return;

        const result = weakJsonOld.map(object => object.startNumber);
        if(result.length === 0) return;

        result.filter(value => value !== null && value !== undefined);
        if(result.length === 0) return;

        this.startNumbers = result;
        this._sortStartNumbers();
    }

    static _sortStartNumbers() {
        this.startNumbers = this.startNumbers.sort((a, b) => b - a);
    }

    static _addToStartNumbers(nextNumber) {
        this.startNumbers.push(nextNumber);
        if(nextNumber + 1 === this.startNumbers.length) return;
        this._sortStartNumbers();
    }

    static _getClasses (sourceJson) {
        return sourceJson.classes;
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

module.exports = jsonAdapter;