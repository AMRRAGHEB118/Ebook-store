async function signUp() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;
    const message = document.getElementsByClassName('message');

    if (!username || !email || !password || !confirmPassword || !role) {
        message.innerHTML = 'Please fill in all fields.';
        return;
    }

    if (password.length < 8) {
        message.innerHTML = 'Password must be at least 8 characters long. Please try again.';
        return;
    }

    if (password !== confirmPassword) {
        message.innerHTML = 'Passwords do not match. Please try again.';
        return;
    }

    try {
        const response = await axios.post(`${backendUrl}/user/signup`, {
            username: username,
            email: email,
            password: password,
            role: role
        });

        localStorage.setItem('userDetails', JSON.stringify(response.data.data));
        message.innerHTML = 'Sign-up successful. Redirecting...';

        setTimeout(() => {
            window.location.href = './index.html';
        }, 2000);
    } catch (error) {
        console.error('Error during sign-up:', error);
    
        message.innerHTML = 'Sign-up failed. Please try again later.';
    }
}