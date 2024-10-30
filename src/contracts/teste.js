const testeNestedFucntion = require("../gateways/testeNested.js");

module.exports = class testeClass {
    constructor () {}

    async testeMethod (testeParam) {
        const teste = testeNestedFucntion({ 
            testeArg: testeParam, 
            returnNumber: 1 
        })
    }
}