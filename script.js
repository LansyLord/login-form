const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

document.querySelector('.register form').addEventListener('submit', function (e) {
    e.preventDefault();  // Impede o envio do formulário

    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="register-email"]').value.trim();
    const password = document.querySelector('input[name="register-password"]').value.trim();

    // Recupera os usuários existentes
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se já existe um usuário com o mesmo e-mail
    const userExists = existingUsers.some(user => user.email === email);

    if (userExists) {
        alert("Este e-mail já está registrado!");
    } else {
        const newUser = { name, email, password };
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        alert("Usuário registrado com sucesso!");

        // Exibe o formulário de login
        container.classList.remove('active');
    }
});


// Função para fazer o login
document.querySelector('.login form').addEventListener('submit', function (e) {
    e.preventDefault();  // Impede o envio do formulário

    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Senha"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Login bem-sucedido!");
        // Aqui você pode redirecionar para uma página interna ou outro conteúdo
        document.querySelector('.login form').reset();
    } else {
        alert("E-mail ou senha incorretos.");
    }
});
