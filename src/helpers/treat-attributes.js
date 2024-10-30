module.exports = ({ content, imports }) => {
    const attributes = {};

    const attributeRegex = /this\.(\w+)\s*=\s*(.+?);/g;
    let match;

    while ((match = attributeRegex.exec(content)) !== null) {
        const attributeName = match[1].trim();
        const attributeValue = match[2].trim();

        if (attributeValue.startsWith('{') && attributeValue.endsWith('}')) {
            const objectAttributes = {};

            const nestedAttributeRegex = /(\w+)\s*:\s*(.+?)(,|})/g;
            let nestedMatch;

            while ((nestedMatch = nestedAttributeRegex.exec(attributeValue)) !== null) {
                const key = nestedMatch[1].trim();
                const value = nestedMatch[2].trim();

                if (imports.has(key)) {
                    attributes[key] = imports.get(key)
                } else {
                    attributes[key] = value
                }
            }

            Object.assign(attributes, objectAttributes);
        } else if (imports.has(attributeName)) {
            attributes[attributeName] = imports.get(attributeName);
        } else {
            attributes[attributeName] = attributeValue;
        }
    }

    return attributes;
};
