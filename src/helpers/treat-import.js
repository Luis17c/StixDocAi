module.exports = ({ content }) => {
    const imports = {};

    let match;

    const singleImportRegex = /(const|let)\s+(\w+)\s*=\s*require\(['"](.+?)['"]\);/g;
    const multipleImportRegex = /(const|let)\s+{\s*([^}]+)\s*}\s*=\s*require\(['"](.+?)['"]\);/g;
    
    while ((match = singleImportRegex.exec(content)) !== null) {
        const variableName = match[2].trim();
        const sourcePath = match[3].trim(); 

        imports[sourcePath] = variableName;
    }

    while ((match = multipleImportRegex.exec(content)) !== null) {
        const importedItems = match[2].split(',').map((item) => item.trim());
        const sourcePath = match[3].trim();

        importedItems.forEach((item) => {
            imports[sourcePath] = item;
        });
    }

    return imports;
}