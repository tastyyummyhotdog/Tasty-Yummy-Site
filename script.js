// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileNavLinks = mobileMenu.querySelectorAll('a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Active navigation link highlighting (simple version based on hash)
function updateActiveNavLink() {
    const sections = document.querySelectorAll('main section, footer#contact');
    const navLinks = document.querySelectorAll('header a.nav-link');
    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150; // Adjusted offset
        if (window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('nav-link-active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('nav-link-active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink); // Also on load