// URL do webhook do Discord
const webhookURL = `${secrets.webhook}`;  // URL do webhook do Discord

// Função para validar o telefone com DDD
function validarTelefone(telefone) {
    const regex = /^\(\d{2}\)\s?\d{5}-\d{4}$/;
    return regex.test(telefone);  // Retorna true se o telefone for válido, ou false se não for
}

// Função para lidar com o envio do formulário
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const mensagem = document.getElementById("mensagem").value;

    // Validação do telefone
    if (!validarTelefone(telefone)) {
        alert("Por favor, insira um número de telefone válido com o formato: (XX) XXXXX-XXXX");
        return; // Impede o envio do formulário se o telefone for inválido
    }

    // Criando o Embed com os dados
    const embed = {
        "embeds": [
            {
                "title": "<a:obsidian:1229497555000234138> Contato Recebido",
                "description": `<:obsidian:1229727889268674641> **Nome**: ${nome}\n`,
                "color": 0x9e26d6,  // Cor do embed em formato hexadecimal (ex: roxo)
                "footer": {
                    "text": "Atenciosamente Obsidian Codes™",
                    "icon_url": "https://cdn.discordapp.com/attachments/1281996602743066664/1343818881952776255/home.png"  // URL da imagem que você quer colocar no rodapé
                },
                "thumbnail": {
                    "url": "https://cdn.discordapp.com/attachments/1281996602743066664/1343818881952776255/home.png"  // Link para a imagem que aparece no embed
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
            }
        ]
    };

    // Enviando o embed para o Webhook do Discord
    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(embed)
    })
    .then(response => {
        if (response.ok) {
            alert("Mensagem enviada com sucesso para o Discord!");
            document.getElementById("contact-form").reset(); // Limpa o formulário
        } else {
            alert("Erro ao enviar a mensagem.");
        }
    })
    .catch(() => {
        alert("Erro ao enviar a mensagem.");
    });
});
