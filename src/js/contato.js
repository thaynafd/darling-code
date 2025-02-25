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
        return; // Impede o envio do formulário se o telefone for inválido
    }

    // Dados do formulário
    const formData = {
        nome,
        email,
        telefone,
        mensagem
    };

    // Enviar para a função serverless no Netlify
    fetch('/.netlify/functions/sendWebhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Mostra a mensagem de sucesso ou erro
        document.getElementById("contact-form").reset();  // Limpa o formulário
    })
    .catch(error => {
        alert('Erro ao enviar a mensagem.');
    });
});
