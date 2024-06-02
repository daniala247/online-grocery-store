
document.addEventListener('DOMContentLoaded', () => {
    const server_url = "http://localhost:3000/api"
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const messageDiv = document.getElementById('message');

    // Handle registration
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = registerForm.username.value;
        const password = registerForm.password.value;

        try {
            const response = await fetch(server_url+'/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                messageDiv.textContent = 'Registration successful. Please log in.';
            } else {
                messageDiv.textContent = `Error: ${data.message}`;
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.textContent = 'An error occurred during registration.';
        }
    });

    // Handle login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = loginForm.username.value;
        const password = loginForm.password.value;
        
        try {
            console.log("login clicky")
            const response = await fetch(server_url+'/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                messageDiv.textContent = 'Login successful.';
                // Redirect to the main page or another authenticated page if needed
                window.location.href = '../products.html';
                // console.log(location.hostname)
            } else {
                messageDiv.textContent = `Error: ${data.message}`;
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.textContent = 'An error occurred during login.';
        }
    });
});
