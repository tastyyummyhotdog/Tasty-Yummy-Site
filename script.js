// Load and display menu from JSON
async function loadMenu() {
    const menuContainer = document.getElementById('menu-container');
    
    try {
        // Show loading state
        menuContainer.innerHTML = `
            <div class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                <p class="text-lg text-gray-600 mt-4">Loading our delicious menu...</p>
            </div>
        `;
        
        const response = await fetch('menu.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const menuData = await response.json();
        
        // Clear loading state
        menuContainer.innerHTML = '';
        
        generateWelcomeSection(menuData);
        generateMenuSections(menuData);
        generateFooter(menuData);
        generateNavigation();
        
    } catch (error) {
        console.error('Error loading menu:', error);
        menuContainer.innerHTML = `
            <div class="text-center py-12">
                <div class="text-red-600 text-6xl mb-4">🚫</div>
                <p class="text-lg text-red-600 mb-4">Oops! We couldn't load our menu right now.</p>
                <p class="text-gray-600 mb-6">Please try refreshing the page or contact us directly.</p>
                <button onclick="loadMenu()" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Try Again
                </button>
            </div>
        `;
    }
}

// Generate welcome section from JSON data
function generateWelcomeSection(menuData) {
    const welcomeSection = document.getElementById('welcome-section');
    const container = welcomeSection.querySelector('.container');
    
    container.innerHTML = `
        <div class="inline-block p-2 mb-4">
             <img src="images/Logo.svg" alt="${menuData.restaurant_name} Logo" class="mx-auto h-32 md:h-40" onerror="this.alt='${menuData.restaurant_name} Logo'; this.src='https://placehold.co/200x133/E02B2B/FFD700?text=Logo&font=luckiest-guy';">
        </div>
        <h2 class="font-luckiest text-5xl text-red-600 mb-4">${menuData.welcome.title}</h2>
        <div class="text-lg text-gray-700 mb-6 max-w-2xl mx-auto bilingual-container">
            <span class="english-text">${menuData.welcome.description}</span>
            <div class="language-separator"></div>
            <span class="french-text">${menuData.welcome.description_french}</span>
        </div>
        <div class="no-tax-banner mb-6">${menuData.welcome.special_offer}</div>
    `;
}

// Generate footer from JSON data
function generateFooter(menuData) {
    const footer = document.getElementById('contact');
    const container = footer.querySelector('.container');
    
    container.innerHTML = `
        <h2 class="font-luckiest text-4xl text-yellow-400 mb-6">${menuData.events.title}</h2>
        <div class="text-xl mb-8 max-w-xl mx-auto bilingual-container">
            <span class="english-text">${menuData.events.description}</span>
            <div class="language-separator"></div>
            <span class="french-text">${menuData.events.description_french}</span>
        </div>
        <a href="tel:${menuData.phone}" class="btn-primary inline-block mb-8">${menuData.events.call_to_action} ${menuData.phone}</a>

        <div class="mb-6">
            <p class="font-semibold text-lg">${menuData.footer.contact_title}</p>
            <p><a href="mailto:${menuData.email}" class="hover:text-yellow-300">📧 ${menuData.email}</a></p>
            <p class="mt-2">📍 ${menuData.address}</p>
            <p>🕒 ${menuData.hours}</p>
        </div>

        <div class="mt-8 border-t border-red-500 pt-6">
            <p class="text-sm">&copy; <span id="currentYear"></span> ${menuData.footer.copyright}</p>
            <p class="text-xs mt-1">${menuData.footer.tagline}</p>
        </div>
    `;
    
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Generate menu sections from JSON data
function generateMenuSections(menuData) {
    const menuContainer = document.getElementById('menu-container');
    
    // Create restaurant info section
    const infoSection = document.createElement('div');
    infoSection.className = 'text-center mb-8 p-6 bg-red-50 rounded-lg border border-red-200';
    infoSection.innerHTML = `
        <h2 class="font-luckiest text-2xl text-red-600 mb-4">${menuData.restaurant_name}</h2>
        <div class="grid md:grid-cols-3 gap-4 text-center">
            <div>
                <p class="text-gray-700"><span class="font-semibold text-red-600">📍</span></p>
                <p class="text-gray-700">${menuData.address}</p>
            </div>
            <div>
                <p class="text-gray-700"><span class="font-semibold text-red-600">📞</span></p>
                <p class="text-gray-700"><a href="tel:${menuData.phone}" class="hover:text-red-600">${menuData.phone}</a></p>
            </div>
            <div>
                <p class="text-gray-700"><span class="font-semibold text-red-600">📧</span></p>
                <p class="text-gray-700"><a href="mailto:${menuData.email}" class="hover:text-red-600">${menuData.email}</a></p>
            </div>
        </div>
        <div class="mt-4">
            <p class="text-gray-700"><span class="font-semibold text-red-600">🕒</span> Mon - Sat: 12pm - 7pm</p>
        </div>
    `;
    menuContainer.appendChild(infoSection);
    
    // Create menu section with all items
    const menuSection = document.createElement('section');
    menuSection.id = 'menu';
    menuSection.className = 'mb-16 scroll-mt-20';
    
    menuSection.innerHTML = `
        <h2 class="section-title">🍽️ Our Menu / Notre Menu 🍽️</h2>
        <div class="text-center text-gray-600 mb-8 bilingual-container">
            <span class="english-text">Fresh and delicious food made to order!</span>
            <div class="language-separator"></div>
            <span class="french-text">Des plats frais et délicieux préparés sur commande!</span>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="menu-items">
            ${menuData.menu.map(item => `
                <div class="menu-card">
                    <h3 class="menu-item-name">${item.item}</h3>
                    ${item.item_french ? `<p class="menu-item-fr">${item.item_french}</p>` : ''}
                    <p class="menu-item-price">${item.price}</p>
                </div>
            `).join('')}
        </div>
        ${menuData.notes ? `<p class="text-center text-sm text-gray-500 mt-6 italic">* ${menuData.notes}</p>` : ''}
    `;
    
    menuContainer.appendChild(menuSection);
}

// Generate navigation links
function generateNavigation() {
    const desktopNav = document.getElementById('desktop-nav');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Add menu link to desktop navigation (before contact)
    const menuLink = '<a href="#menu" class="nav-link">Menu</a>';
    const existingContact = desktopNav.querySelector('a[href="#contact"]');
    existingContact.insertAdjacentHTML('beforebegin', menuLink);
    
    // Add menu link to mobile navigation (before contact)
    const mobileMenuLink = '<a href="#menu" class="block nav-link text-center py-3">Menu</a>';
    const existingMobileContact = mobileMenu.querySelector('a[href="#contact"]');
    existingMobileContact.insertAdjacentHTML('beforebegin', mobileMenuLink);
    
    // Reinitialize mobile menu links after adding new ones
    initializeMobileMenuLinks();
}

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
function initializeMobileMenuLinks() {
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

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
window.addEventListener('load', () => {
    updateActiveNavLink();
    loadMenu(); // Load menu from JSON on page load
});