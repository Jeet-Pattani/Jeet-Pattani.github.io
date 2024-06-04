self.addEventListener('message', (event) => {
    if (event.data.initialize) {
        // Initialize tasks if needed
        // ...
    }
    
    const { scrollPosition } = event.data;
    
    // Perform the navbar styling logic based on scroll position
    let navBgColor, navbarTransition, backdropFilter, linkColor;
    if (!scrollPosition) {
        // Navbar styling when the page is scrolled
        navBgColor = "#000000a8";
        navbarTransition = "0.25s ease-in-out";
        backdropFilter = "blur(3px)";
        linkColor = "#b7b7b7";
    } else {
        // Navbar styling when it is back on the hero section
        navBgColor = "transparent";
        navbarTransition = "0.25s ease-in-out";
        backdropFilter = "blur(0px)";
        linkColor = "silver";
    }

    // Send results back to the main thread
    self.postMessage({ 
        navBgColor,
        navbarTransition,
        backdropFilter,
        linkColor
    });
});
