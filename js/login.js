document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('https://mnsingh.pythonanywhere.com/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login successful') {
                alert('Login successful! Redirecting to profile...');
                window.location.href = 'profile.html';
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error logging in:', error));
    });
});
