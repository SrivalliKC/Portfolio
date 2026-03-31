/* ============================================
   INTERACTIVE DATA CANVAS — JS Interactions
   GSAP, ScrollTrigger, Magnetic Buttons, Scatter Plot
   ============================================ */

// Wait for GSAP to load
window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ═════ SLIDER ARROW BUTTONS ═════
    document.querySelectorAll('.slider-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const visual = btn.closest('.project-visual');
            const slider = visual.querySelector('.project-slider');
            const slideWidth = slider.querySelector('.slide').offsetWidth;
            const direction = btn.classList.contains('next') ? 1 : -1;
            slider.scrollBy({ left: direction * slideWidth, behavior: 'smooth' });
        });
    });

    document.querySelectorAll('.magnetic, .magnetic-hover').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const h = rect.width / 2;
            
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - (rect.height / 2);

            gsap.to(btn, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // ═════ HERO ANIMATIONS ═════
    const heroTl = gsap.timeline();
    
    // Fade up elements
    heroTl.fromTo('.fade-up', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
    );

    // ═════ TYPEWRITER EFFECT ═════
    const titleText = "I transform complex enterprise data into strategic business value through advanced analytics, Power BI, and Dynamics 365.";
    const titleEl = document.getElementById('heroTitle');
    if(titleEl) {
        let i = 0;
        function typeWriter() {
            if (i < titleText.length) {
                titleEl.innerHTML += titleText.charAt(i);
                i++;
                setTimeout(typeWriter, 35);
            } else {
                // Add blinking cursor
                titleEl.innerHTML += '<span class="type-cursor" style="animation: blink 1s infinite;">|</span>';
            }
        }
        setTimeout(typeWriter, 1200); // Start after fade up
    }

    // Number Counters
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.dataset.val);
        gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            ease: "power2.out",
            delay: 0.5
        });
    });

    // ═════ SCROLL REVEAL (GSAP staggers) ═════
    const revealElements = document.querySelectorAll('.gs-reveal');
    revealElements.forEach(el => {
        let direction = 1;
        let x = 0, y = 40;
        
        if (el.classList.contains('right')) { x = 40; y = 0; }
        else if (el.classList.contains('left')) { x = -40; y = 0; }
        else if (el.classList.contains('up')) { x = 0; y = 60; }

        gsap.fromTo(el, 
            { x: x, y: y, opacity: 0 },
            {
                x: 0, y: 0, opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // ═════ SCATTER PLOT SIMULATION ═════
    const scatterContainer = document.getElementById('scatterDots');
    if (scatterContainer) {
        // Generate random dots biased towards top right (high impact, high complexity)
        for(let i=0; i<35; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            
            // Bias logic
            const isHighPerformant = Math.random() > 0.4;
            const xPct = isHighPerformant ? (Math.random() * 50 + 40) : (Math.random() * 80 + 10);
            const yPct = isHighPerformant ? (Math.random() * 50 + 40) : (Math.random() * 80 + 10);
            
            dot.style.left = `${xPct}%`;
            dot.style.bottom = `${yPct}%`;
            
            scatterContainer.appendChild(dot);
        }

        // Animate dots expanding outwards on scroll
        gsap.fromTo('.dot', 
            { scale: 0, opacity: 0, xPercent: -50, yPercent: 50 },
            {
                scale: 1, opacity: 1, 
                stagger: 0.05,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".scatter-container",
                    start: "top 70%"
                }
            }
        );

        // Trendline animation
        ScrollTrigger.create({
            trigger: ".scatter-container",
            start: "top 60%",
            onEnter: () => document.querySelector('.trend-line').classList.add('active')
        });
    }

    // ═════ GAUGE ANIMATIONS ═════
    document.querySelectorAll('.gauge').forEach(gauge => {
        const val = gauge.style.getPropertyValue('--val');
        gauge.style.setProperty('--val-current', '0%');
        
        ScrollTrigger.create({
            trigger: gauge,
            start: "top 80%",
            onEnter: () => {
                gauge.style.setProperty('--val-current', val);
            }
        });
    });

    // ═════ CSS CHART ANIMATION ═════
    const charts = document.querySelectorAll('.css-chart');
    charts.forEach(chart => {
        ScrollTrigger.create({
            trigger: chart,
            start: "top 75%",
            onEnter: () => chart.classList.add('active')
        });
    });

    // ═════ NAV SCROLL ═════
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });
});
