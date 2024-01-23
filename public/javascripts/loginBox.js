const closeBtn = document.querySelector('.closeBtn');
const loginBox = document.querySelector('.loginBox');
closeBtn.addEventListener('click', () => {
    gsap.to(loginBox, {
        opacity: 0,
        scale: 0,
        duration: .3,
    })
});

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
togglePassword.addEventListener('click', (e) => {
    password.type === 'password' ? password.type = "text" : password.type = "password";
    e.target.classList.toggle('fa-eye');
})

const alert = document.querySelector('.alert');
gsap.from(alert, {
    y: 10,
    display: "block",
    opacity: 0,
    duration: .2,
})
gsap.to(alert, {
    y: -10,
    delay: 2,
    opacity: 0,
    duration: .2,
    display: 'none',
})