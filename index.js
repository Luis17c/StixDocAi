const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const { DirectoryMapper } = require('./src/contracts/DirectoryMapper');
const openai = require('./src/gateways/OpenAI');
const preset = require('./src/presets/first-preset');

(async () => {
    const rl = readline.createInterface({ input, output });

    const directory = await rl.question('Digite o diretório: ');
    const directoryMapper = new DirectoryMapper(directory);

    await directoryMapper.init();

    console.log(directoryMapper.imports['create-users-at-control.atm.js'], "\n")
    console.log(directoryMapper.automations['create-users-at-control.atm.js'].fullContent)

    rl.close();

    const message = `${directoryMapper.imports['create-users-at-control.atm.js'].join('\n')}\n${directoryMapper.automations['create-users-at-control.atm.js'].fullContent}`;
    const gpt = new openai()

    const response = await gpt.send(message, preset())

    console.log(response);

    return 0;
})();
