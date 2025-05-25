// Function to initialize dark mode functionality
function initializeDarkMode() {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    // Only proceed if we found the toggle element
    if (!modeToggle) {
        console.error('Dark mode toggle element not found');
        return;
    }
    
    // Check if user has a preference stored
    const savedMode = localStorage.getItem('darkMode');
    
    // Set initial state based on saved preference or default to dark mode
    if (savedMode === 'light') {
        body.classList.remove('dark-mode');
        modeToggle.checked = false;
    } else {
        // Default to dark mode
        body.classList.add('dark-mode');
        modeToggle.checked = true;
    }
    
    // Toggle dark/light mode when the switch is clicked
    modeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'light');
        }
    });
    
    // Also detect system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? 'dark' : 'light';
        
        if (newColorScheme === 'dark') {
            body.classList.add('dark-mode');
            modeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            modeToggle.checked = false;
        }
        
        localStorage.setItem('darkMode', newColorScheme);
    });
}

// Initialize dark mode after the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // If sections are loaded dynamically, we should wait for them
    if (typeof initializeMainScripts === 'function') {
        // Dark mode will be initialized by section-loader.js after all sections are loaded
    } else {
        // If not using dynamic section loading, initialize immediately
        initializeDarkMode();
    }
});

// Export the function so it can be called from section-loader.js
window.initializeDarkMode = initializeDarkMode;