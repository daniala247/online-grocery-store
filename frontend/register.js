document.addEventListener('DOMContentLoaded', () => {
    const server_url = "https://online-grocery-store-w7fa.vercel.app/api";
    const registerForm = document.getElementById('register-form');
    const registerMessageDiv = document.getElementById('register-message');

    // Handle registration
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = registerForm['username'].value;
        const password = registerForm['password'].value;

        try {
            const response = await fetch(`${server_url}/auth/register`, {
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
                registerMessageDiv.textContent = 'Registration successful. Redirecting...';
                window.location.href = 'home.html';
            } else {
                registerMessageDiv.textContent = `Error: ${data.message}`;
            }
        } catch (error) {
            console.error('Error:', error);
            registerMessageDiv.textContent = 'An error occurred during registration.';
        }
    });

});
