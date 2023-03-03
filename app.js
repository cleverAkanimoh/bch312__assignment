const date = document.querySelector('#date');
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');
const navbar = document.querySelector('#nav');

const slides = document.querySelectorAll('.slides');
const slides2 = document.querySelectorAll('.slides2');
const slides3 = document.querySelectorAll('.slides3');

const leftBtn = document.querySelectorAll('.left');
const rightBtn = document.querySelectorAll('.right');

const readMore = document.querySelectorAll('.read_more');

const overlay = document.querySelectorAll('.overlay');
const bottomBtn = document.querySelector('.bottomBtn');
const groupBtn = document.querySelector('#group');
const coverBtn = document.querySelector('#cover');


let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let d = new Date()
date.innerText = `${months[d.getMonth()]} ${d.getFullYear()}`;

// nav toggle

navToggle.onclick = () => {
    // linksContainer.classList.toggle('show-links');
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }
};

// fixed navbar 
const topLink = document.querySelector('.top-link');
window.onscroll = () => {
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;

    if (scrollHeight > navHeight) {
        navbar.classList.add('fixed-nav');
    } else {
        navbar.classList.remove('fixed-nav');
    }

    if (scrollHeight > 500) {
        topLink.classList.add('show-link');
        bottomBtn.style.display = 'none';

        overlay.forEach(layer => layer.classList.remove('show_overlay'))
    } else {
        topLink.classList.remove('show-link');
        bottomBtn.style.display = 'flex';
    }
};

// smooth scroll
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link) => {
    link.onclick = (e) => {
        e.preventDefault();
        // navigte to a specific spot
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        // calculate the heights
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height
        const fixedNav = navbar.classList.contains('fixed-nav');
        let position = element.offsetTop - navHeight;
        if (!fixedNav) {
            position = position - navHeight - 10;
        }
        if (navHeight > 82) {
            position = position + containerHeight - 20
        }

        window.scrollTo({
            left: 0,
            top: position,
        });
        linksContainer.style.height = 0;
    };
});

function moveSlides() {
    let count = 0;

    leftBtn.forEach(btn => btn.onclick = () => {
        count--;
        slideMove();
        slideMove2();
        slideMove3();
        clearInterval(intervals)
    })

    rightBtn.forEach(btn => btn.onclick = () => {
        count++;
        slideMove();
        slideMove2();
        slideMove3();
        clearInterval(intervals)
    })

    const slideMove = () => {
        if (count > slides.length - 1) {
            count = 0;
            slideFunc()
        } else if (count < 0) {
            count = slides.length - 1;
        }

        slides.forEach(slide => {
            slide.style.transform = `translateX(-${count * 100}%)`;
        })
    }

    const slideMove2 = () => {
        if (count > slides2.length - 1) {
            count = 0;
            slideFunc()
        } else if (count < 0) {
            count = slides2.length - 1;
        }

        slides2.forEach(slide => {
            slide.style.transform = `translateX(-${count * 100}%)`;
        })
    }

    const slideMove3 = () => {
        if (count > slides3.length - 1) {
            count = 0;
            slideFunc()
        } else if (count < 0) {
            count = slides3.length - 1;
        }

        slides3.forEach(slide => {
            slide.style.transform = `translateX(-${count * 100}%)`;
        })
    }

    const slideFunc = () => {
        count++;
        slideMove();
        slideMove2();
        slideMove3();
    }

    const intervals = setInterval(slideFunc, 15000)
}
moveSlides();


readMore.forEach(btn => btn.onclick = (e) => {
    let target = e.target;
    let aside = target.previousElementSibling;

    target.innerText = 'see less';
    aside.classList.toggle('show')
    if (!aside.classList.contains('show')) target.innerText = 'continue reading';
});

// toggle cover page and group page

function toggleOverlays(className, index, text) {
    className.onclick = () => {
        className.innerHTML = '*close overlay';
        overlay[index].classList.toggle('show_overlay');
        if (!overlay[index].classList.contains('show_overlay')) {
            className.innerText = text;
        }
    }
}
toggleOverlays(groupBtn, 0, 'see group members');
toggleOverlays(coverBtn, 1, 'view cover page');

setTimeout(() => overlay[1].classList.remove('show_overlay'), 3000)