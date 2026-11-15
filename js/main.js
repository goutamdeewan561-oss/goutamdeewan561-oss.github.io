// AOS Initialization (Clean & Fast)
AOS.init({
    duration: 800,
    once: true,
    offset: 40,
    easing: 'ease-out-cubic'
});

// Preloader (Snappy fade out)
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 600);
    }
});

// Single Unified Throttled Scroll Listener (Zero Jank)
const navbar = document.querySelector('.navbar');
const scrollProgress = document.getElementById('scroll-progress');
let backToTop = null;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            
            // Navbar
            if (navbar) {
                if (scrollY > 40) navbar.classList.add('scrolled');
                else navbar.classList.remove('scrolled');
            }

            // Back to top
            if (backToTop) {
                if (scrollY > 400) backToTop.classList.add('show');
                else backToTop.classList.remove('show');
            }

            // Scroll Progress
            if (scrollProgress) {
                const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                if (totalHeight > 0) {
                    scrollProgress.style.width = `${(scrollY / totalHeight) * 100}%`;
                }
            }

            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

if (menuToggle && mobileMenu) {
    const toggleMobileMenu = () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMobileMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('.mobile-menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// Featured Projects on Homepage (Web + Graphic Design + Security)
const featuredProjects = [
    { 
        id: "react-weather", 
        title: "React Weather Dashboard", 
        category: "Frontend Dev", 
        description: "Modern responsive weather application with real-time location forecasts, atmospheric metrics, and OpenWeather API.", 
        tech: ["React", "JavaScript", "REST API", "CSS3"], 
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1000",
        liveUrl: "https://react-weather-app-zeta-lime.vercel.app"
    },
    { 
        id: "goroute-branding", 
        title: "Go Route - Tour Branding & Social Campaign", 
        category: "Graphic Design", 
        description: "Complete visual identity, promotional posters, and travel package campaigns for Kashmir, Hunza & Naran Valley tours.", 
        tech: ["Adobe Photoshop", "Illustrator", "Branding", "Social Media"], 
        image: "assets/graphics/graphic_page_06.jpg",
        liveUrl: "projects.html"
    },
    { 
        id: "ai-quiz", 
        title: "AI Protected Security Quiz Portal", 
        category: "Security & SOC", 
        description: "Intelligent testing platform featuring proactive cheating prevention, real-time sync, and SOC-inspired monitoring.", 
        tech: ["React", "Node.js", "AI Protocols", "Socket.io"], 
        image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1000",
        liveUrl: "https://ai-protected-quiz-app.vercel.app"
    },
    { 
        id: "marketing-brochure", 
        title: "Creative Marketing Agency - Corporate Brochure", 
        category: "Graphic Design", 
        description: "High-impact tri-fold corporate brochure, layout typography, and brand identity designed for modern digital agencies.", 
        tech: ["Adobe Photoshop", "InDesign", "Print Design", "Canva"], 
        image: "assets/graphics/graphic_page_15.jpg",
        liveUrl: "projects.html"
    }
];

const projectsGrid = document.querySelector('.projects-grid');
if (projectsGrid) {
    projectsGrid.innerHTML = featuredProjects.map((p, index) => `
        <div class="project-card" data-aos="fade-up" data-aos-delay="${index * 80}">
            <div class="project-image">
                <img src="${p.image}" alt="${p.title}" class="project-img-display" loading="lazy">
            </div>
            <div class="project-info">
                <span class="project-category">${p.category}</span>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="project-tech">
                    ${p.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${p.id.startsWith('goroute') || p.id.startsWith('marketing') ? 'projects.html' : 'project-details.html?id=' + p.id}" class="project-link">View Details <i class="fas fa-arrow-right"></i></a>
                    ${p.liveUrl && p.liveUrl !== 'projects.html' ? `<a href="${p.liveUrl}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    // Smooth drag scroll without continuous interval loop
    let isDown = false;
    let startX;
    let scrollLeft;

    projectsGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        projectsGrid.classList.add('active');
        startX = e.pageX - projectsGrid.offsetLeft;
        scrollLeft = projectsGrid.scrollLeft;
    });

    projectsGrid.addEventListener('mouseleave', () => {
        isDown = false;
        projectsGrid.classList.remove('active');
    });

    projectsGrid.addEventListener('mouseup', () => {
        isDown = false;
        projectsGrid.classList.remove('active');
    });

    projectsGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - projectsGrid.offsetLeft;
        const walk = (x - startX) * 1.5;
        projectsGrid.scrollLeft = scrollLeft - walk;
    });
}

// Testimonials
const testimonials = [
    { name: "Muhammad Bilal", initials: "MB", color: "#00f5a0", position: "Project Lead, Glavion Solutions", content: "Gautam is exceptional at translating UI concepts into responsive React interfaces and maintaining bulletproof IT infrastructure.", rating: 5 },
    { name: "Kashif Ali", initials: "KA", color: "#6366f1", position: "Marketing Director, Virex Social", content: "His graphic design work on our social media campaigns and Go Route promotions was creative, sharp, and delivered before deadlines.", rating: 5 },
    { name: "Suresh Kumar", initials: "SK", color: "#10b981", position: "Senior IT Consultant, Hyderabad", content: "Strong grasp of networking, CCNA concepts, and SOC monitoring tools. Gautam's technical problem-solving is second to none.", rating: 5 },
    { name: "Hamza Sheikh", initials: "HS", color: "#f59e0b", position: "Operations Manager, Skills Hunger", content: "Outstanding computer and Python trainer. Passionate, patient, and knowledgeable across both software development and cybersecurity.", rating: 5 }
];

const testimonialsContainer = document.getElementById('testimonials');
if (testimonialsContainer) {
    testimonialsContainer.innerHTML = testimonials.map((t, index) => `
        <div class="testimonial-card" data-aos="fade-up" data-aos-delay="${index * 80}">
            <i class="fas fa-quote-left"></i>
            <p>"${t.content}"</p>
            <div class="testimonial-author">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,${t.color},${t.color}aa);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;color:#070a12;flex-shrink:0;font-family:'Space Grotesk',sans-serif;">${t.initials}</div>
                    <div>
                        <strong>${t.name}</strong><br>
                        <small>${t.position}</small>
                    </div>
                </div>
                <div class="rating">${'★'.repeat(t.rating)}</div>
            </div>
        </div>
    `).join('');
}

// Smooth Anchor Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Number Counter Animation
const counters = document.querySelectorAll('.counter-value');
if (counters.length > 0) {
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            let count = 0;
            const inc = Math.max(1, Math.ceil(target / 40));
            
            const timer = setInterval(() => {
                count += inc;
                if (count >= target) {
                    counter.innerText = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.innerText = count + suffix;
                }
            }, 25);
        });
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) statsObserver.observe(statsSection);
}

// Typing Effect (Gautam's 4 Core Pillars)
const typedTextSpan = document.querySelector(".typed-text");
if (typedTextSpan) {
    const textArray = [
        "Security & SOC Analyst",
        "Frontend Developer",
        "Graphic Designer",
        "Networking & IT Specialist",
        "Founder @ Glavion Solutions"
    ];
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 90);
        } else {
            setTimeout(erase, 1600);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, 800);
        }
    }

    setTimeout(type, 400);
}

// TagCloud Sphere
document.addEventListener("DOMContentLoaded", () => {
    const sphereContainer = document.getElementById('skill-sphere');
    if (sphereContainer && typeof TagCloud !== 'undefined') {
        const skills = [
            'React.js', 'JavaScript', 'HTML5', 'CSS3', 'Node.js',
            'Python', 'PHP', 'Java', 'Kotlin', 'C++',
            'Splunk (SIEM)', 'ELK Stack', 'Wireshark', 'Nmap', 'Snort',
            'Photoshop', 'Illustrator', 'Canva', 'Branding',
            'Cisco Packet Tracer', 'VLAN & Routing', 'IT Support'
        ];
        const calculateRadius = () => {
            const width = window.innerWidth;
            if (width < 480) return 120;
            if (width < 768) return 145;
            return 175;
        };

        TagCloud('#skill-sphere', skills, {
            radius: calculateRadius(),
            maxSpeed: 'normal',
            initSpeed: 'normal',
            direction: 135,
            keep: true
        });
    }

    // Back to Top Button
    backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Zero-Lag Ambient Cursor Follower (Native pointer remains 100% instant)
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        let mouseX = -100, mouseY = -100;
        let isHovered = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            const offset = isHovered ? 25 : 14;
            cursor.style.transform = `translate3d(${mouseX - offset}px, ${mouseY - offset}px, 0)`;
        }, { passive: true });

        document.querySelectorAll('a, button, input, select, textarea, .project-card, .service-card, .filter-btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                isHovered = true;
                cursor.classList.add('hover');
                cursor.style.transform = `translate3d(${mouseX - 25}px, ${mouseY - 25}px, 0)`;
            }, { passive: true });
            el.addEventListener('mouseleave', () => {
                isHovered = false;
                cursor.classList.remove('hover');
                cursor.style.transform = `translate3d(${mouseX - 14}px, ${mouseY - 14}px, 0)`;
            }, { passive: true });
        });
    }
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (icon) {
        if (savedTheme === 'light') icon.classList.replace('fa-moon', 'fa-sun');
        else icon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        if (icon) {
            if (next === 'light') icon.classList.replace('fa-moon', 'fa-sun');
            else icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}
