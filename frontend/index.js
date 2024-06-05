document.addEventListener('DOMContentLoaded', () => {
    const server_url = "http://localhost:3000/api";
    const loginForm = document.getElementById('login-form');
    const loginMessageDiv = document.getElementById('login-message');

    // Handle login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = loginForm['username'].value;
        const password = loginForm['password'].value;

        try {
            const response = await fetch(`${server_url}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                loginMessageDiv.textContent = 'Login successful. Redirecting...';

                // Redirect based on role
                if (data.user.role === 'admin') {
                    window.location.href = 'products.html';
                } else {
                    window.location.href = 'home.html';
                }
            } else {
                loginMessageDiv.textContent = `Error: ${data.message}`;
            }
        } catch (error) {
            console.error('Error:', error);
            loginMessageDiv.textContent = 'An error occurred during login.';
        }
    });
});
