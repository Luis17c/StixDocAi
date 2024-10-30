module.exports = async ({ automation, AI}) => {
    await Promise.all(Object.values(automation.methods).map(async (method) => {
        const logicBlocks = await AI.logicBlocks({ content: method.body })
    }))
}