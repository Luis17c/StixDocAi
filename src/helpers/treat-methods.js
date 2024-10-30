module.exports = ({ content }) => {
    const methods = {};

    const methodRegex = /(async\s+)?(\w+)\s*\(([^)]*)\)\s*{([^}]*)}/g;
    let match;

    while ((match = methodRegex.exec(content)) !== null) {
        const isAsync = !!match[1];
        const methodName = match[2].trim();
        const methodParams = match[3]
            .split(',')
            .map((param) => param.trim())
            .filter((param) => param.length > 0);
        const methodBody = match[4].trim();

        methods[methodName] = {
            isAsync,
            params: methodParams,
            body: methodBody,
        };
    }

    return methods;
}