document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // Reveal Animation on Scroll
    // ============================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // ============================
    // Smooth Scroll for Anchors
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = document.querySelector('#mobile-toggle i');
                    if (icon) {
                        icon.classList.remove('ph-x');
                        icon.classList.add('ph-list');
                    }
                }
            }
        });
    });

    // ============================
    // Mobile Menu Toggle
    // ============================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }

    // ============================
    // AI Demo Tab Switching
    // ============================
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetDemo = tab.dataset.demo;

            // Update active tab
            demoTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active panel
            demoPanels.forEach(panel => {
                panel.classList.remove('active');
            });

            const targetPanel = document.getElementById('demo-' + targetDemo);
            if (targetPanel) {
                targetPanel.classList.add('active');

                // Re-trigger reveal animation for newly shown content
                targetPanel.querySelectorAll('.reveal').forEach(el => {
                    el.classList.remove('active');
                    void el.offsetWidth; // Force reflow
                    el.classList.add('active');
                });
            }
        });
    });

    // ============================
    // Animated Counter for Metrics
    // ============================
    function animateCounter(element, target, duration) {
        let start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    // Observe metrics section
    const metricsSection = document.querySelector('.metrics-bar');
    if (metricsSection) {
        let metricsAnimated = false;

        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !metricsAnimated) {
                    metricsAnimated = true;

                    // Animate all counter elements
                    document.querySelectorAll('[data-target]').forEach(el => {
                        const target = parseInt(el.dataset.target);
                        animateCounter(el, target, 1500);
                    });
                }
            });
        }, { threshold: 0.3 });

        metricsObserver.observe(metricsSection);
    }

    // ============================
    // Active Nav Link Highlight
    // ============================
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navAnchors.forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + id) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ============================
    // Header shrink on scroll
    // ============================
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '0.5rem 0';
                header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
            } else {
                header.style.padding = '1rem 0';
                header.style.boxShadow = 'none';
            }
        });
    }
});
