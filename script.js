document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    const sections = document.querySelectorAll('section');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Handle Navbar on Scroll
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // ScrollSpy: Update active nav link on scroll
    const scrollSpy = () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    };

    // Smooth Scroll for Nav Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Project Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const projectCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === projectCategory) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Reveal Animation on Scroll
    const revealOnScroll = () => {
        const cards = document.querySelectorAll('.stat-item, .skill-card, .contact-card, .about-card, .project-card, .resume-paper, .skills-category');
        cards.forEach(card => {
            if (card.style.display === 'none') return;
            
            const cardTop = card.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.9;
            
            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                if (card.classList.contains('skill-card') || card.classList.contains('skills-category')) {
                    card.classList.add('revealed');
                }
            }
        });

        // Handle progress bars
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            if (bar.dataset.animated) return;
            
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < window.innerHeight * 0.9) {
                // Pre-animation: mark as animated to prevent multiple triggers
                bar.dataset.animated = 'true';
                
                // Get target width from data-width or current style width
                const targetWidth = bar.dataset.width || bar.style.width || '0%';
                
                // Ensure initial state is 0
                bar.style.width = '0';
                
                // Trigger reflow to ensure the transition happens
                void bar.offsetWidth;

                // Animate to target
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 50);
            }
        });
    };

    // Initialize Card styles for animation
    const cardsToAnimate = document.querySelectorAll('.stat-item, .skill-card, .contact-card, .about-card, .project-card, .resume-paper');
    cardsToAnimate.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    // Scroll listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        scrollSpy();
        revealOnScroll();
    });

    // Initial triggers
    handleNavbarScroll();
    scrollSpy();
    revealOnScroll();
});
