const fs = require('fs');

const classNameRegex = /class\s+(\w+)/g;
const classRegex = /class\s+(\w+).*?}/gs;
const classProcess = /class\s+(\w+)\sextends\s+(\w+)\s*{([\s\S]*?)\}/;

class fileProcessing {
    static getSourceJson (absolutePath) {
        const sourceFile = fs.readFileSync(absolutePath, 'utf-8');
        const classNames = this._classNamesFromSource(sourceFile);

        const sourceJson = {
            classes: []
        }

        for(const className of classNames) {
            const classSection = this._getClassSection(className, sourceFile);
            sourceJson.classes.push(this._transformClassToJson(classSection, className));
        }

        return JSON.stringify(sourceJson, null, 4);
    }

    static _classNamesFromSource (sourceFile) {
        const classNames = [];
        let match;

        while ((match = classNameRegex.exec(sourceFile)) !== null) {
            classNames.push(match[1]);
        }
        return classNames;
    }

    static _getClassSection (className, sourceFile) {
        var classSection = null;
        let match;
        classSection = null;

        while ((match = classRegex.exec(sourceFile)) !== null) {
            const currentClassName = match[1].trim();

            if(currentClassName === className) {
                classSection = match[0].trim();
            }
        }
        return classSection;
    }

    static _transformClassToJson (classSection, className) {
        const classObject = {};
        classObject["name"] = className;

        const match = classSection.match(classProcess);
        if(!match || match.length < 4) return null;

        classObject["type"] = match[2];
        
        const classProperties = match[3];
        classObject["contains"] = this._transformPropertiesInJson(classProperties);

        return classObject;
    }

    static _transformPropertiesInJson (classProperties) {
        const properties = classProperties.split(";")
            .map(property => this._propertiesMapping(property))
            .filter(property => property.isFunction !== true)
            .filter(property => property.name !== null && property.name.length > 0)
            .filter(property => property.name.charAt(0) !== '_');
        
        const propertiesObject = [];
        for(var i = 0; i < properties.length; i++) {
            const property = properties[i];

            propertiesObject.push({
                name: property.name,
                discontinued: property.discontinued,
                position: i,
            });
        }

        return propertiesObject;
    }

    static _propertiesMapping(property) {
        const splittedProperty = property.trim().split('=');
        var name = null;
        var isFunction = false;
        var discontinued = false;

        if (splittedProperty && splittedProperty.length > 0) {
            name = splittedProperty[splittedProperty.length -1].trim();
            isFunction = property.includes('(');
        }

        if (name && name.charAt(0) === '_') {
            name = "";
            discontinued = true;
        }

        return {
            name: name,
            isFunction: isFunction
        };
    }
}

module.exports = fileProcessing;