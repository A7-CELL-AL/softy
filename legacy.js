document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const body = document.body;
    let hoverTimeout;
    
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

    // Toggle sidebar on button click (mobile)
    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (sidebar.classList.contains('sidebar-open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // Close sidebar when clicking outside (mobile)
    document.addEventListener('click', function(event) {
        if (
            sidebar.classList.contains('sidebar-open') &&
            !sidebar.contains(event.target) &&
            !toggleBtn.contains(event.target)
        ) {
            closeSidebar();
        }
    });

    // Close sidebar on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && sidebar.classList.contains('sidebar-open')) {
            closeSidebar();
        }
    });

    // Desktop hover functionality (only on larger screens)
    function handleHoverInteractions() {
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        
        function setupHoverListeners(matches) {
            if (matches) {
                // Desktop behavior
                sidebar.addEventListener('mouseenter', function() {
                    clearTimeout(hoverTimeout);
                    openSidebar();
                });
                
                sidebar.addEventListener('mouseleave', function() {
                    hoverTimeout = setTimeout(function() {
                        closeSidebar();
                    }, 300); // Small delay to prevent accidental closing
                });
            } else {
                // Mobile behavior - remove hover listeners
                sidebar.removeEventListener('mouseenter', openSidebar);
                sidebar.removeEventListener('mouseleave', closeSidebar);
            }
        }
        
        // Initial setup
        setupHoverListeners(mediaQuery.matches);
        
        // Listen for changes
        mediaQuery.addEventListener('change', function(e) {
            setupHoverListeners(e.matches);
        });
    }
    
    handleHoverInteractions();

    // Initialize ARIA attributes
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-controls', 'sidebar');
    sidebar.setAttribute('aria-hidden', 'true');
    sidebar.setAttribute('role', 'navigation');
});
