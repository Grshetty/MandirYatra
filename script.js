document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollToTopBtn = document.querySelector('#scrollToTop');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const visionSection = document.querySelector('.vision-section');

    // Chatbot functionality
    const chatbotBubble = document.getElementById('chatbotBubble');
    const chatbotPopup = document.getElementById('chatbotPopup');
    const chatbotClose = document.getElementById('chatbotClose');
    const feedbackChatbot = document.getElementById('feedbackChatbot');
    let chatbotPopupShown = false;
    let chatbotVisible = false;
    let popupInterval;

    // Function to show/hide chatbot based on scroll position
    function updateChatbotVisibility() {
        const heroSection = document.getElementById('home');
        if (heroSection) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition > heroBottom - 100) {
                // Show chatbot after hero section
                if (!chatbotVisible) {
                    feedbackChatbot.style.opacity = '1';
                    feedbackChatbot.style.visibility = 'visible';
                    feedbackChatbot.style.transform = 'translateY(0)';
                    chatbotVisible = true;
                    
                    // Show popup 3 seconds after chatbot becomes visible
                    setTimeout(function() {
                        if (!chatbotPopupShown) {
                            chatbotPopup.classList.add('show');
                            chatbotPopupShown = true;
                        }
                    }, 3000);
                }
            } else {
                // Hide chatbot in hero section
                feedbackChatbot.style.opacity = '0';
                feedbackChatbot.style.visibility = 'hidden';
                feedbackChatbot.style.transform = 'translateY(20px)';
                chatbotVisible = false;
                chatbotPopup.classList.remove('show');
                chatbotPopupShown = false;
                
                // Clear interval when returning to hero section
                if (popupInterval) {
                    clearInterval(popupInterval);
                }
            }
        }
    }

    // Function to show popup
    function showChatbotPopup() {
        if (!chatbotPopupShown) {
            chatbotPopup.classList.add('show');
            chatbotPopupShown = true;
        }
    }

    // Function to close popup and start interval
    function closeChatbotPopup() {
        chatbotPopup.classList.remove('show');
        chatbotPopupShown = false;
        
        // Clear any existing interval
        if (popupInterval) {
            clearInterval(popupInterval);
        }
        
        // Start interval to show popup every 5 seconds
        popupInterval = setInterval(showChatbotPopup, 5000);
    }

    // Initially hide chatbot
    feedbackChatbot.style.opacity = '0';
    feedbackChatbot.style.visibility = 'hidden';
    feedbackChatbot.style.transform = 'translateY(20px)';
    feedbackChatbot.style.transition = 'all 0.5s ease';

    // Check scroll position
    window.addEventListener('scroll', updateChatbotVisibility);

    // Toggle chatbot popup when clicking bubble
    chatbotBubble.addEventListener('click', function() {
        if (chatbotPopupShown) {
            closeChatbotPopup();
        } else {
            showChatbotPopup();
            // Clear interval when manually opened
            if (popupInterval) {
                clearInterval(popupInterval);
            }
        }
    });

    // Close chatbot popup
    chatbotClose.addEventListener('click', closeChatbotPopup);

    // Close chatbot popup when clicking outside
    document.addEventListener('click', function(event) {
        if (!chatbotBubble.contains(event.target) && !chatbotPopup.contains(event.target)) {
            if (chatbotPopupShown) {
                closeChatbotPopup();
            }
        }
    });

    // Popup functionality
    const popup = document.getElementById('launchPopup');
    let popupShown = false;

    function showPopup() {
        if (!popupShown && popup) {
            popup.classList.add('show');
            popupShown = true;
            // Prevent body scroll when popup is open
            document.body.style.overflow = 'hidden';
        }
    }

    function closePopup() {
        if (popup) {
            popup.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    // Show popup after 2 seconds
    setTimeout(showPopup, 2000);

    // Close popup when clicking on overlay
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopup();
            }
        });
    }

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupShown) {
            closePopup();
        }
        if (e.key === 'Escape' && chatbotPopupShown) {
            chatbotPopup.classList.remove('show');
            chatbotPopupShown = false;
        }
    });

    // Make closePopup function global
    window.closePopup = closePopup;

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Navbar scroll effect and timeline dot animation
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer-section');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Show/hide scroll to top button only when reaching footer
        if (footer) {
            const footerTop = footer.offsetTop;
            const windowHeight = window.innerHeight;
            const scrollPosition = currentScroll + windowHeight;
            
            if (scrollPosition >= footerTop + 100) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        }
        
        // Animate timeline dots based on scroll
        if (visionSection) {
            const sectionTop = visionSection.offsetTop;
            const sectionHeight = visionSection.offsetHeight;
            const scrollProgress = Math.max(0, Math.min(1, (currentScroll - sectionTop + 200) / (sectionHeight - 200)));
            
            timelineDots.forEach((dot, index) => {
                const dotProgress = Math.max(0, Math.min(1, (scrollProgress * 4) - index));
                if (dotProgress > 0) {
                    const scale = 1 + (dotProgress * 0.3);
                    const opacity = 0.5 + (dotProgress * 0.5);
                    dot.style.transform = `scale(${scale})`;
                    dot.style.opacity = opacity;
                    dot.style.background = 'linear-gradient(135deg, #ff9500 0%, #ff7a00 100%)';
                } else {
                    dot.style.transform = 'scale(1)';
                    dot.style.opacity = '1';
                    dot.style.background = '#ff7a00';
                }
            });
        }
        
        lastScroll = currentScroll;
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
