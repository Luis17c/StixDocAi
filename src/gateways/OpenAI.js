const AI = require('../contracts/AI')
const axios = require('axios');

class OpenAI extends AI {
    constructor () { 
        super();
        this.apiKey = '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'
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
    }

    async send(message, preset) {
        try {
            const response = await axios.post(
                this.apiUrl,
                {
                    model: "gpt-4",
                    messages: [
                        { role: "system", content: preset },
                        { role: "user", content: message }
                    ]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error("Erro ao enviar a mensagem:", error);
        }
    }
}

module.exports = OpenAI;