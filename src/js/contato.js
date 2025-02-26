// Função para carregar o webhookURL do arquivo .json
async function getWebhookURL() {
    const response = await fetch('webhook.json');
    const data = await response.json();
    return data.webhookURL;  // Retorna a URL do webhook
}

function hamburg() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(0px)";
    navbar.style.display = "block"; // Certifique-se de que o dropdown esteja visível
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(-500px)";
    setTimeout(() => {
        navbar.style.display = "none"; // Esconde o dropdown após a animação
    }, 200); // O tempo deve ser igual ao tempo da animação
}

// Função para enviar os dados ao Discord
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const mensagem = document.getElementById("mensagem").value;

    // Validação do telefone
    const regex = /^\(\d{2}\)\s?\d{5}-\d{4}$/;
    if (!regex.test(telefone)) {
        alert("Por favor, insira um número de telefone válido com o formato: (XX) XXXXX-XXXX");
        return;
    }

    // Criando o Embed com os dados
    const embed = {
        "embeds": [
            {
                "title": "<a:obsidian:1229497555000234138> Contato Recebido",
                "description": `<:obsidian:1229727889268674641> **Nome**: ${nome}\n`,
                "color": 0x9e26d6,
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
            }
        ]
    };

    // Obter o webhookURL de forma assíncrona e enviar os dados
    getWebhookURL().then(webhookURL => {
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
});
