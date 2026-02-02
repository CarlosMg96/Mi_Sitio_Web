document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('section-container');
    const navLinks = document.querySelectorAll('.nav-cmd');

    // Section Mapping
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];

    // Load content function
    async function loadSection(sectionName) {
        // Simple client-side cache checking could be added here
        try {
            const response = await fetch(`sections/${sectionName}.html`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            
            // Create a wrapper for the section to preserve styling and ID
            const sectionWrapper = document.createElement('section');
            sectionWrapper.id = sectionName;
            sectionWrapper.classList.add('section', 'visible'); // Add visible immediately
            sectionWrapper.innerHTML = html;
            
            return sectionWrapper;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    // Initialize - Load all sections sequentially (simulating boot) or on demand?
    // User wanted a single page feel, so let's load all of them into the DOM
    // so scrolling works like before.
    
    async function init() {
        container.innerHTML = ''; // Clear loading message
        
        for (const section of sections) {
            const element = await loadSection(section);
            if (element) {
                container.appendChild(element);
                
                // Re-attach specific listeners if needed (like Typing effect)
                if (section === 'home') initTyping();
                if (section === 'contact') initContactForm();
            }
        }
        
        // After DOM is populated, setup observer
        setupObserver();
    }

    init();

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if(targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Sections
    function setupObserver() {
        const renderedSections = document.querySelectorAll('.section');
        
        const observerOptions = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Active Nav State
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if(link.getAttribute('href').substring(1) === entry.target.id) {
                            link.classList.add('active');
                        }
                    });

                    // Trigger Skill Animation if it's the skills section
                    if (entry.target.id === 'skills') {
                        animateSkills();
                    }
                }
            });
        }, observerOptions);

        renderedSections.forEach(section => {
            observer.observe(section);
        });
    }

    // Skills Animation
    function animateSkills() {
        const bars = document.querySelectorAll('.fill');
        bars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Typing Effect for Hero Title
    function initTyping() {
        const heroText = document.querySelector('.glitch');
        if(!heroText) return;
        
        const originalText = heroText.getAttribute('data-text');
        let i = 0;
        heroText.textContent = "";
        
        function typeWriter() {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // Form Submission (Mock)
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if(!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalBtnText = btn.innerText;
            
            btn.innerText = "[ SENDING... ]";
            
            setTimeout(() => {
                btn.innerText = "[ SENT SUCCESS ]";
                btn.style.color = "#27c93f";
                btn.style.borderColor = "#27c93f";
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = originalBtnText;
                    btn.style.color = "";
                    btn.style.borderColor = "";
                }, 3000);
            }, 1500);
        });
    }
});
