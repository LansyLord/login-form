const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const errorAlertBox = document.querySelector('.alert-error');
const successAlertBox = document.querySelector('.alert-success');
const loginTitle = document.querySelector('.container h1.title');
const emailInput = document.querySelector('input[placeholder="Email"]');
const passwordInput = document.querySelector('input[placeholder="Senha"]');
const emailInputBox = document.querySelector('.input-box.email');


// Mostrar o alerta
function showErrorAlert() {
    errorAlertBox.style.display = 'block'; // Define o display
    setTimeout(() => {
        errorAlertBox.classList.add('active');
        loginTitle.classList.add('active');
        emailInputBox.classList.add('active'); // Inicia o fade-in
    }, 0); // Pequeno atraso para ativar a transição
}

// Esconder o alerta
function hideErrorAlert() {
    errorAlertBox.classList.remove('active');
    loginTitle.classList.remove('active');
    emailInputBox.classList.remove('active'); // Inicia o fade-out
    setTimeout(() => {
        errorAlertBox.style.display = 'none'; // Remove completamente após o fade-out
    }, 500); // Duração do fade-out em ms
}

// Mostrar o alerta
function showSuccessAlert() {
    successAlertBox.style.display = 'block'; // Define o display
    setTimeout(() => {
        successAlertBox.classList.add('active');
        loginTitle.classList.add('active');
        emailInputBox.classList.add('active'); // Inicia o fade-in
    }, 0); // Pequeno atraso para ativar a transição
}

// Esconder o alerta
function hideSuccessAlert() {
    successAlertBox.classList.remove('active');
    loginTitle.classList.remove('active');
    emailInputBox.classList.remove('active'); // Inicia o fade-out
    setTimeout(() => {
        successAlertBox.style.display = 'none'; // Remove completamente após o fade-out
    }, 500); // Duração do fade-out em ms
}

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

window.addEventListener('load', function () {
    localStorage.removeItem('users');
});


// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


const registerEmailWarning = document.querySelector('.register-email-warning');
const registerPasswordWarning = document.querySelector('.register-password-warning');

const registerEmailInput = document.querySelector('input[name="register-email"]');
const registerPasswordInput = document.querySelector('input[name="register-password"]');

// Adiciona eventos de input para remover os avisos dinamicamente
registerEmailInput.addEventListener('input', function () {
    if (isValidEmail(registerEmailInput.value)) {
        registerEmailWarning.classList.remove('active');
    }
});

registerPasswordInput.addEventListener('input', function () {
    if (registerPasswordInput.value.length >= 6) {
        registerPasswordWarning.classList.remove('active');
    }
});

document.querySelector('.register form').addEventListener('submit', function (e) {
    e.preventDefault();  // Impede o envio do formulário

    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="register-email"]').value.trim();
    const password = document.querySelector('input[name="register-password"]').value.trim();

    if (!isValidEmail(email)) {
        registerEmailWarning.classList.add('active');
    }

    if (password.length < 6) {
        registerPasswordWarning.classList.add('active');
    }

    // Recupera os usuários existentes
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se já existe um usuário com o mesmo e-mail
    const userExists = existingUsers.some(user => user.email === email);

    if (userExists) {
        alert("Este e-mail já está registrado!");
    } else if (isValidEmail(email) && password.length >= 6) {
        const newUser = { name, email, password };
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        alert("Usuário registrado com sucesso!");

        // Exibe o formulário de login
        container.classList.remove('active');
    }
});


// Seleciona o elemento de aviso
const emailWarning = document.querySelector('.email-warning');
const passwordWarning = document.querySelector('.password-warning');



// Adiciona eventos de input para remover os avisos dinamicamente
emailInput.addEventListener('input', function () {
    if (isValidEmail(emailInput.value)) {
        emailWarning.classList.remove('active');
    }
});

passwordInput.addEventListener('input', function () {
    if (passwordInput.value.length >= 6) {
        passwordWarning.classList.remove('active');
    }
});

// Função para fazer o login
document.querySelector('.login form').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!isValidEmail(email)) {
        emailWarning.classList.add('active');
        hideErrorAlert();
    }

    if (password.length < 6) {
        passwordWarning.classList.add('active');
        hideErrorAlert();
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (isValidEmail(email) && password.length >= 6) {
        if (user) {
            document.querySelector('.login form').reset();
            hideErrorAlert();
            showSuccessAlert();
        } else {
            hideSuccessAlert();
            showErrorAlert();
            warning.classList.remove('active');
        }
    }
});

