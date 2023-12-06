const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

if(userDetails) {
    if(userDetails.user.role === "admin"){
        window.location.href = "/";
    }
} else {
    window.location.href = "login.html";
}

const submitContactForm = async () => {
    const message = document.getElementById('contactMessage').value;

    if(!userDetails.user || !message) {
        return;
    }

    const response = await axios.post(`${backendUrl}/contact`, {
        name: userDetails.user.username,
        email: userDetails.user.email,
        message: message
    })

    if(response.data.success) {
        document.getElementById('contact-message').style.color = "green";
    } else {
        document.getElementById('contact-message').style.color = "red";
    }
    document.getElementById('contact-message').innerHTML = response.data.message;

    setTimeout(() => {
        window.location.href = "/";
    }, 2000);
}
