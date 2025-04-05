// Selecionando elementos do DOM
const signupForm = document.querySelector('form');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const phoneInput = document.querySelector('input[name="phone"]');
const passwordInput = document.querySelector('input[name="password"]');
const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');

// Expressões regulares para validação
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
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
function validateSignupForm(event) {
    event.preventDefault();
    console.log('Formulário submetido'); // Debug

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    let isValid = true;

    // Validação do nome
    if (!nameRegex.test(name)) {
        showError(nameInput, 'Nome inválido. Use apenas letras e no mínimo 3 caracteres');
        isValid = false;
    }

    // Validação do email
    if (!emailRegex.test(email)) {
        showError(emailInput, 'Email inválido. Use o formato exemplo@dominio.com');
        isValid = false;
    }

    // Validação do telefone
    if (!phoneRegex.test(phone)) {
        showError(phoneInput, 'Telefone inválido. Use o formato (99) 99999-9999');
        isValid = false;
    }

    // Validação da senha
    if (!passwordRegex.test(password)) {
        showError(passwordInput, 'A senha deve ter pelo menos 6 caracteres, incluindo números e caracteres especiais (@$!%*#?&)');
        isValid = false;
    }

    // Validação da confirmação de senha
    if (password !== confirmPassword) {
        showError(confirmPasswordInput, 'As senhas não coincidem');
        isValid = false;
    }

    if (isValid) {
        handleSignup(name, email, phone, password);
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

// Função para simular o processo de cadastro
function handleSignup(name, email, phone, password) {
    const submitButton = signupForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Cadastrando...';

    // Simulando um delay de rede
    setTimeout(() => {
        // Simulando um cadastro bem-sucedido
        showSuccessMessage('Cadastro realizado com sucesso!');
        submitButton.disabled = false;
        submitButton.textContent = 'Cadastrar';

        // Limpar o formulário
        signupForm.reset();

        // Redirecionar para a página de login após 2 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
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
    console.log('DOM carregado'); // Debug

    nameInput.addEventListener('input', () => removeError(nameInput));
    emailInput.addEventListener('input', () => removeError(emailInput));
    phoneInput.addEventListener('input', () => {
        formatPhoneNumber(phoneInput);
        removeError(phoneInput);
    });
    passwordInput.addEventListener('input', () => removeError(passwordInput));
    confirmPasswordInput.addEventListener('input', () => removeError(confirmPasswordInput));

    signupForm.addEventListener('submit', validateSignupForm);
});