// functions/sendWebhook.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { nome, email, telefone, mensagem } = JSON.parse(event.body);

    // Validação do telefone (regex para validar o formato)
    const regex = /^\(\d{2}\)\s?\d{5}-\d{4}$/;
    if (!regex.test(telefone)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Telefone inválido. Utilize o formato (XX) XXXXX-XXXX.' })
        };
    }

    // Criar o Embed para o Discord
    const embed = {
        "embeds": [{
            "title": "<a:obsidian:1229497555000234138> Contato Recebido",
            "description": `<:obsidian:1229727889268674641> **Nome**: ${nome}\n**Email**: ${email}\n**Telefone**: ${telefone}\n**Mensagem**: ${mensagem}`,
            "color": 0x9e26d6,  // Cor do embed em formato hexadecimal (ex: roxo)
            "footer": {
                "text": "Atenciosamente Obsidian Codes™",
                "icon_url": "https://cdn.discordapp.com/attachments/1281996602743066664/1343818881952776255/home.png"
            },
            "thumbnail": {
                "url": "https://cdn.discordapp.com/attachments/1281996602743066664/1343818881952776255/home.png"
            },
            "fields": [
                {
                    "name": "<:obsidian:1229727889268674641> Detalhes do contato",
                    "value": `Email: ${email}\nTelefone: ${telefone}`,
                    "inline": true
                },
                {
                    "name": "Mensagem",
                    "value": mensagem,
                    "inline": false
                }
            ],
            "actions": [
                {
                    "type": 1,
                    "label": "Responder",
                    "url": "https://discord.com/channels/1229106476799234180/1229106514829246494"
                }
            ]
        }]
    };

    const webhookURL = process.env.DISCORD_WEBHOOK_URL; // Pegando a variável de ambiente do webhook

    try {
        // Envia a requisição para o webhook do Discord
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(embed)
        });

        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Mensagem enviada com sucesso!' })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Erro ao enviar a mensagem.' })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao enviar a mensagem.' })
        };
    }
};
