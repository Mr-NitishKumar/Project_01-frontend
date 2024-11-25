document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile();

    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('https://mnsingh.pythonanywhere.com/users/1', {  // Replace 1 with the actual user ID
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User updated successfully') {
                alert('Profile updated successfully!');
            } else {
                alert('Update failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error updating profile:', error));
    });
});

function fetchUserProfile() {
    fetch('https://mnsingh.pythonanywhere.com/users/1')  // Replace 1 with the actual user ID
        .then(response => response.json())
        .then(user => {
            document.getElementById('username').value = user.username;
            document.getElementById('email').value = user.email;
        })
        .catch(error => console.error('Error fetching user profile:', error));
}
