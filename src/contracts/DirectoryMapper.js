const fs = require('fs');
const treatImport = require('../helpers/treat-import');
const treatAttributes = require('../helpers/treat-attributes');
const treatMethods = require('../helpers/treat-methods');
const path = require('path');

class DirectoryMapper {
    constructor(directory) {
        this.directoryPath = directory;
        this.automations = {};
        this.imports = {};
    }

    async init() {
        const automationFilenames = fs.readdirSync(this.directoryPath + '\\automations');

        await Promise.all(automationFilenames.map(async (automationFilename) => {
            const automationContent = fs.readFileSync(`${this.directoryPath}\\automations\\${automationFilename}`);
            this.automations[automationFilename] = new Automation(automationContent.toString(), []);
            

            await Promise.all(Object.entries(this.automations).map(async ([key, value]) => {
                await value.init()
                console.log(value.fileImports)
                this.imports[key] = await Promise.all(Object.entries(value.fileImports).map(async ([importPath]) => {
                    if (!importPath.includes('..') || importPath.includes('util')) {
                        return;
                    }
                    const treatedPath = importPath.split('/');
                    treatedPath[treatedPath.length - 1] = treatedPath[treatedPath.length - 1] + '.js'
                    const importContent = fs.readFileSync(path.resolve(this.directoryPath, 'automations', ...treatedPath)).toString();
                    const imports = treatImport({ content: importContent });
                    const nestedImports = await Promise.all(Object.entries(imports).map(([nestedImportPath, nestedImportVariable]) => {
                        if (!nestedImportPath.includes('..') || nestedImportPath.includes('util')) {
                            return;
                        }
                        const nestedImportTreatedPath = nestedImportPath.split('/');
                        nestedImportTreatedPath[nestedImportTreatedPath.length - 1] = nestedImportTreatedPath[nestedImportTreatedPath.length - 1] + '.js';
                        console.log(this.directoryPath),
                        console.log('automations'),
                        console.log(...treatedPath.slice(0, treatedPath.length - 1)),
                        console.log(...nestedImportTreatedPath)
                        console.log(nestedImportVariable)
                        return fs.readFileSync(
                            path.resolve(
                                this.directoryPath, 'automations', 
                                ...treatedPath.slice(0, treatedPath.length - 1), 
                                ...nestedImportTreatedPath
                            )
                        ).toString();
                    }))
                    return `${nestedImports.join('\n')}'\n${importContent}`; 
                }))
            }))
        }));
    }
}

class Automation {
    constructor(content, businessRules) {
        this.fileImports = {};
        this.attributes = {};
        this.methods = null;
        this.fullContent = content;
        this.businessRules = businessRules;
    }

    async init() {
        const [imports, automation] = this.fullContent.split('class Automation');

        this.fileImports = treatImport({ content: imports });
    }
}

// Exporting classes with module.exports
module.exports = {
    DirectoryMapper,
    Automation
};
