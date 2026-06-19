/* =========================================
   1. Dynamic Typing Effect (Mechanical Engineer)
   ========================================= */
const textAnimate = document.querySelector('.text-animate');
const roles = ["Mechanical Engineer", "CAD Designer", "Robotics Enthusiast", "Innovator"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        textAnimate.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textAnimate.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Wait before deleting
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    setTimeout(typeEffect, typeSpeed);
}
document.addEventListener("DOMContentLoaded", typeEffect);


/* =========================================
   2. Injecting Animation Styles (Magic CSS)
   ========================================= */
const style = document.createElement('style');
style.innerHTML = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 1s ease;
    }
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
    /* 3D Tilt Effect */
    .project-card, .skill-box {
        transition: transform 0.1s;
        perspective: 1000px;
    }
`;
document.head.appendChild(style);


/* =========================================
   3. Scroll Reveal Animation Logic
   ========================================= */
const revealElements = document.querySelectorAll('section, .project-card, .skill-box, .timeline-item');

// Sabhi elements ko 'reveal' class de do
revealElements.forEach(el => el.classList.add('reveal'));

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
};
window.addEventListener("scroll", revealOnScroll);
// Page load hone par ek baar check karo
revealOnScroll();


/* =========================================
   4. 3D Tilt Effect on Cards (Gaming Feel)
   ========================================= */
const cards = document.querySelectorAll('.project-card, .skill-box');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate tilt
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    // Reset jab mouse hate
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});


/* =========================================
   5. Active Navbar Link Highlighting
   ========================================= */
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active'); // Agar CSS mein .active class ho
        li.style.color = "#94a3b8"; // Default color reset
        if (li.getAttribute('href').includes(current)) {
            li.style.color = "#00d2ff"; // Active Neon Color
        }
    });
});