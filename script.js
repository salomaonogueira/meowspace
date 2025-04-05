// Selecionando elementos do DOM
const loginForm = document.querySelector('form');
const usernameInput = document.querySelector('input[name="username"]');
const passwordInput = document.querySelector('input[name="password"]');

// Expressões regulares para validação
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

// Função para formatar o número de telefone
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        if (value.length > 9) {
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
    }
    input.value = value;
}

// Função para validar o formulário
function validateForm(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    let isValid = true;

    // Validação do username (email ou telefone)
    if (username === '') {
        showError(usernameInput, 'Por favor, insira seu email ou telefone');
        isValid = false;
    } else if (!emailRegex.test(username) && !phoneRegex.test(username)) {
        showError(usernameInput, 'Email ou telefone inválido. Use o formato exemplo@dominio.com ou (99) 99999-9999');
        isValid = false;
    }

    // Validação da senha
    if (password === '') {
        showError(passwordInput, 'Por favor, insira sua senha');
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        showError(passwordInput, 'Senha inválida. Use pelo menos 6 caracteres, incluindo números e caracteres especiais (@$!%*#?&)');
        isValid = false;
    }

    if (isValid) {
        handleLogin(username, password);
    }
}

// Função para mostrar mensagens de erro
function showError(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.error-message');

    if (!errorMessage) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formControl.appendChild(errorElement);
    } else {
        errorMessage.textContent = message;
    }

    input.classList.add('error');
}

// Função para remover mensagens de erro
function removeError(input) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.error-message');

    if (errorMessage) {
        formControl.removeChild(errorMessage);
    }

    input.classList.remove('error');
}

// Função para simular o processo de login
function handleLogin(username, password) {
    const submitButton = loginForm.querySelector('input[type="submit"]');
    submitButton.disabled = true;
    submitButton.value = 'Entrando...';

    // Simulando um delay de rede
    setTimeout(() => {
        // Simulando credenciais válidas
        if ((username === 'teste@email.com' || username === '(11) 99999-9999') && password === 'Teste@123') {
            showSuccessMessage('Login realizado com sucesso!');
            // Redirecionar para a página principal após 2 segundos
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        } else {
            showError(usernameInput, 'Credenciais inválidas');
            showError(passwordInput, 'Credenciais inválidas');
        }

        submitButton.disabled = false;
        submitButton.value = 'Entrar';
    }, 1500);
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;

    const form = document.querySelector('form');
    form.insertAdjacentElement('beforebegin', successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Adicionando eventos
document.addEventListener('DOMContentLoaded', () => {
    usernameInput.addEventListener('input', () => {
        if (usernameInput.value.replace(/\D/g, '').length > 0) {
            formatPhoneNumber(usernameInput);
        }
        removeError(usernameInput);
    });

    passwordInput.addEventListener('input', () => removeError(passwordInput));
    loginForm.addEventListener('submit', validateForm);
});

// Adicionando efeito de hover nos botões de download
const appButtons = document.querySelectorAll('.app-buttons a');
appButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
        button.style.transition = 'transform 0.3s ease';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});