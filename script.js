let search = document.querySelector('.search-box');
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('#login-btn');
    const profileLink = document.querySelector('#profile-btn');

    const userId = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');

    if (userId) {
        loginBtn.style.display = 'none';
        profileLink.style.display = 'block';
        profileLink.textContent = `Welcome, ${username}`;
        profileLink.href = 'profile.html';
    } else {
        loginBtn.style.display = 'block';
        profileLink.style.display = 'none';
    }
});
document.querySelector('#search-icon').onclick = ()  => {
    search.classList.toggle('active');
    menu.classList.remove('active');
}

let menu = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = ()  => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}

// Hide Menu And Search Box On Scroll
window.onscroll = () => {
    menu.classList.remove('active');
    search.classList.remove('active');

}



//header
let header = document.querySelector('header');


window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);

});