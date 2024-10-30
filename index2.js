const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
const fs = require('fs');
const path = require('path');

// Lê o arquivo JavaScript principal
let code = fs.readFileSync('src/contracts/teste.js', 'utf-8');
console.log("Código original:", code);

const ast = esprima.parseScript(code);
const functionsMap = {};
const addedFunctions = new Set();

const loadModuleFunctions = (filePath) => {
    const moduleCode = fs.readFileSync(filePath, 'utf-8');
    code = `\\*\\n${moduleCode}\\n*\\\n${code}`;
};

estraverse.traverse(ast, {
    enter(node) {
        if (node.type === 'FunctionDeclaration') {
            const functionName = node.id.name;
            functionsMap[functionName] = escodegen.generate(node);
        } else if (
            node.type === 'VariableDeclaration' &&
            node.declarations[0].init &&
            ['FunctionExpression', 'ArrowFunctionExpression'].includes(node.declarations[0].init.type)
        ) {
            const functionName = node.declarations[0].id.name;
            functionsMap[functionName] = escodegen.generate(node);
        } else if (
            node.type === 'CallExpression' &&
            node.callee.name === 'require'
        ) {
            const requiredPath = node.arguments[0].value;
            const absolutePath = path.resolve(path.dirname('src/contracts/teste.js'), requiredPath);

            console.log(`Carregando funções do módulo: ${absolutePath}`);
            const importedFunctions = loadModuleFunctions(absolutePath);
            console.log(`Funções importadas de ${absolutePath}:`, importedFunctions);

            Object.assign(functionsMap, importedFunctions);
        }
    }
});

console.log("Código final:", code);
