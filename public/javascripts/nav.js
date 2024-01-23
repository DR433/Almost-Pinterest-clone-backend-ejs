const menuBtn = document.querySelector('#menu');
const closeBtn = document.querySelector('#close');
const options = document.querySelector('#options');

menuBtn.addEventListener('click', (e) => {
    // options.classList.remove('translate-y-full');
    // options.classList.add('translate-y-none');
    // e.target.style.display = "none";
    // closeBtn.style.display = "block";
    const tl = gsap.timeline();
    tl.to(options, {
        y: 0,
        duration: .4,
    })
    tl.to(menuBtn, {
        display: 'none',
        duration: .1,
    })
    tl.to(closeBtn, {
        display: 'block',
        duration: .1,
    })
});
closeBtn.addEventListener('click', (e) => {
    // options.classList.remove('translate-y-none');
    // options.classList.add('translate-y-full');
    // e.target.style.display = "none";
    // menuBtn.style.display = "block";
    const tl = gsap.timeline();
    tl.to(options, {
        y: -900,
        duration: .4,
    })
    tl.to(closeBtn, {
        display: 'none',
        duration: .1,
    })
    tl.to(menuBtn, {
        display: 'block',
        duration: .1,
    })
});