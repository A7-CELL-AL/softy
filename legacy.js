document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const body = document.body;
    
    // Helper functions for opening and closing sidebar
    function openSidebar() {
        sidebar.classList.add('sidebar-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        body.classList.add('sidebar-active');
        sidebar.setAttribute('aria-hidden', 'false');
    }

    function closeSidebar() {
        sidebar.classList.remove('sidebar-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        body.classList.remove('sidebar-active');
        sidebar.setAttribute('aria-hidden', 'true');
    }

    // Mobile: Toggle sidebar on button click
    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (sidebar.classList.contains('sidebar-open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // Mobile: Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (
            sidebar.classList.contains('sidebar-open') &&
            !sidebar.contains(event.target) &&
            !toggleBtn.contains(event.target)
        ) {
            closeSidebar();
        }
    });

    // Close sidebar on Escape key for accessibility
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && sidebar.classList.contains('sidebar-open')) {
            closeSidebar();
        }
    });
    
    // Initialize ARIA attributes
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-controls', 'sidebar');
    sidebar.setAttribute('aria-hidden', 'true');
    
    // Handle different screen sizes
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    
    function handleScreenSizeChange(e) {
        if (e.matches) {
            // Desktop behavior: hover functionality
            sidebar.addEventListener('mouseenter', function() {
                sidebar.setAttribute('aria-hidden', 'false');
                toggleBtn.setAttribute('aria-expanded', 'true');
            });
            
            sidebar.addEventListener('mouseleave', function() {
                sidebar.setAttribute('aria-hidden', 'true');
                toggleBtn.setAttribute('aria-expanded', 'false');
            });
            
            // Reset any mobile state when switching to desktop
            if (sidebar.classList.contains('sidebar-open')) {
                closeSidebar();
            }
        } else {
            // Mobile behavior: ensure proper state
            // Remove desktop-specific event listeners
            sidebar.removeEventListener('mouseenter', null);
            sidebar.removeEventListener('mouseleave', null);
        }
    }
    
    // Initial check
    handleScreenSizeChange(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleScreenSizeChange);
});
