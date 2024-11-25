
async function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`https://mnsingh.pythonanywhere.com/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, mobile, password })
    });

    const result = await response.json();
    alert(`User created with ID: ${result.id}`);
    
}

async function getUsers() {
    const response = await fetch(`https://mnsingh.pythonanywhere.com/users`);
    const users = await response.json();
    const usersList = document.getElementById('users');
    usersList.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Mobile: ${user.mobile}`;
        usersList.appendChild(li);
    });
}
