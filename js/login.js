async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (!email || !password) {
        message.innerHTML = 'Please enter both email and password.';
        return;
    }
    try {
        const response = await axios.post(`${backendUrl}/user/login`, {
            email: email,
            password: password
        });
        console.log(response);

        localStorage.setItem('userDetails', JSON.stringify(response.data.data));
        message.innerHTML = 'Login successful. Redirecting...';

        setTimeout(() => {
            window.location.href = './index.html';
        }, 2000);
    } catch (error) {
        message.innerHTML = 'Invalid email or password. Please try again.';
    }
}

