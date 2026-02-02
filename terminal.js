document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Sections
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-cmd');

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

    sections.forEach(section => {
        observer.observe(section);
    });

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

    // Typing Effect for Hero Title (Simple Glitch/Typing)
    const heroText = document.querySelector('.glitch');
    const originalText = heroText.getAttribute('data-text');
    let i = 0;
    
    // Clear and retype
    heroText.textContent = "";
    
    function typeWriter() {
        if (i < originalText.length) {
            heroText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);

    // Form Submission (Mock)
    const form = document.getElementById('contact-form');
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
});
