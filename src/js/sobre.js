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