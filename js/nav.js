// Import the navWorker module
import { initializeNavWorker } from './navWorker.js';

// Initialize the navWorker
const navWorker = new Worker('./navWorker.js');
navWorker.postMessage({ initialize: true });

// Update IntersectionObserver logic to communicate with the navWorker
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        navWorker.postMessage({ scrollPosition: entry.isIntersecting });
    });
});

// Additional handling for initial active link
// ...
navWorker.postMessage({ scrollPosition: true }); // Assuming initial section is visible

// Listen for messages from the navWorker and update DOM accordingly
navWorker.onmessage = function (event) {
    const { navBgColor, navbarTransition, backdropFilter, linkColor } = event.data;
    
    const navBg = document.querySelector(".nav .nav-bg");
    const navbar = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav .links span a");
    
    navBg.style.backgroundColor = navBgColor;
    navbar.style.transition = navbarTransition;
    navBg.style.backdropFilter = backdropFilter;
    navLinks.forEach(link => {
        link.style.color = linkColor;
    });
};
