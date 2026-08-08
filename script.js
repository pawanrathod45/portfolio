// Narendra Portfolio JavaScript Logic

// Live Coding Canvas Animation
(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const codeLines = [
        'const pawan = new Developer();',
        'pawan.skills = ["React", "Node.js", "Python", "AI/ML"];',
        'async function buildSolution(idea) {',
        '  const app = await pawan.code(idea);',
        '  return app.deploy();',
        '}',
        'import tensorflow as tf',
        'model = tf.keras.Sequential([',
        '  Dense(128, activation="relu"),',
        '  Dense(64, activation="relu"),',
        '  Dense(1, activation="sigmoid")',
        '])',
        'history = model.fit(X_train, y_train,',
        '  epochs=50, batch_size=32)',
        'const [data, setData] = useState([]);',
        'useEffect(() => {',
        '  fetchProjects().then(setData);',
        '}, []);',
        'app.use("/api/v1", router);',
        'await mongoose.connect(MONGO_URI);',
        'const token = jwt.sign({id}, SECRET);',
        'router.post("/crop", auth, recommend);',
        'res.status(200).json({ success: true });',
        'docker build -t kisan-setu .',
        'docker push pawanrathod/kisan-setu',
        'git add . && git commit -m "feat: AI"',
        'npm run build && vercel --prod',
        'if (accuracy > 0.92) model.save();',
        'grad_cam = GradCAM(model, last_conv)',
        'cv2.imshow("Heatmap", visualization)',
        'SELECT * FROM crops WHERE season=?;',
        'const socket = io(SERVER_URL);',
        'socket.emit("join", { room: userId });',
    ];

    let streams = [];

    function resize() {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        initStreams();
    }

    function initStreams() {
        streams = [];
        const colW = 200;
        const count = Math.ceil(canvas.width / colW) + 1;
        for (let i = 0; i < count; i++) {
            streams.push(createStream(i * colW + 20, true));
        }
    }

    function createStream(x, randomY) {
        const fontSize = 13;
        return {
            x,
            y: randomY ? Math.random() * -canvas.height * 1.5 : -100,
            fontSize,
            lineH: fontSize + 10,
            speed: 0.4 + Math.random() * 0.5,
            color: Math.random() > 0.5 ? '#58a6ff' : '#3fb950',
            lines: generateBlock(),
            alpha: 0.55 + Math.random() * 0.35,
            drawn: 0,
            charIdx: 0,
            lineIdx: 0,
            ticksPerChar: 1 + Math.floor(Math.random() * 2),
            tick: 0,
        };
    }

    function generateBlock() {
        const start = Math.floor(Math.random() * codeLines.length);
        const len   = 8 + Math.floor(Math.random() * 8);
        const block = [];
        for (let i = 0; i < len; i++) {
            block.push(codeLines[(start + i) % codeLines.length]);
        }
        return block;
    }

    window.addEventListener('resize', resize);
    resize();

    function drawStream(s) {
        ctx.font = `${s.fontSize}px "Courier New", monospace`;

        // Advance typing
        s.tick++;
        if (s.tick >= s.ticksPerChar) {
            s.tick = 0;
            if (s.lineIdx < s.lines.length) {
                if (s.charIdx < s.lines[s.lineIdx].length) {
                    s.charIdx++;
                } else {
                    s.lineIdx++;
                    s.charIdx = 0;
                }
            }
        }

        // Draw each fully/partially typed line
        for (let i = 0; i < s.lineIdx; i++) {
            const lineY = s.y + i * s.lineH;
            if (lineY < -20 || lineY > canvas.height + 20) continue;
            // Fade older lines
            const ageFade = 0.3 + 0.7 * ((i + 1) / (s.lineIdx + 1));
            ctx.globalAlpha = s.alpha * ageFade;
            ctx.fillStyle = s.color;
            ctx.fillText(s.lines[i], s.x, lineY);
        }

        // Draw currently typing line
        if (s.lineIdx < s.lines.length) {
            const lineY = s.y + s.lineIdx * s.lineH;
            if (lineY >= -20 && lineY <= canvas.height + 20) {
                const partial = s.lines[s.lineIdx].slice(0, s.charIdx);
                ctx.globalAlpha = s.alpha;
                ctx.fillStyle = '#e6edf3';
                ctx.fillText(partial, s.x, lineY);
                // Blinking cursor
                if (Math.floor(Date.now() / 500) % 2 === 0) {
                    const tw = ctx.measureText(partial).width;
                    ctx.fillStyle = '#58a6ff';
                    ctx.fillRect(s.x + tw, lineY - s.fontSize + 2, 2, s.fontSize + 2);
                }
            }
        }

        ctx.globalAlpha = 1;

        // Scroll down
        s.y += s.speed;

        // Reset when block scrolled off bottom
        const blockBottom = s.y + s.lines.length * s.lineH;
        if (blockBottom > canvas.height + 60) {
            s.y = -s.lines.length * s.lineH - 40;
            s.lines = generateBlock();
            s.lineIdx = 0;
            s.charIdx = 0;
            s.tick = 0;
            s.color = Math.random() > 0.5 ? '#58a6ff' : '#3fb950';
            s.speed = 0.4 + Math.random() * 0.5;
            s.alpha = 0.55 + Math.random() * 0.35;
        }
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        streams.forEach(drawStream);
        requestAnimationFrame(loop);
    }

    loop();
}());

document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const backToTopBtn = document.getElementById('back-to-top');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Sticky Navbar & Back-to-Top visibility on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Active Section Link Highlight
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Mobile Menu Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Scroll to Top
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Project Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: "43TsqjoiCvqkTClw8" });
    }

    // Contact Form Submission (EmailJS Integration)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            const submitBtn = contactForm.querySelector('.submit-btn');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();

            // Basic email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !subject || !message) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please fill out all fields before submitting.';
                return;
            }

            if (!emailRegex.test(email)) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please enter a valid email address.';
                return;
            }

            const originalBtnText = submitBtn.innerHTML;

            // Loading state animation
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
            submitBtn.disabled = true;
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };

            emailjs.send('service_hrw5veq', 'template_935e2od', templateParams)
                .then(() => {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Message sent successfully! Pawan will get back to you soon.';
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('EmailJS Error:', error);
                    formStatus.className = 'form-status error';
                    formStatus.textContent = 'Failed to send message. Please try again or reach out directly.';
                })
                .finally(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;

                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.className = 'form-status';
                    }, 6000);
                });
        });
    }

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = () => {
        if (animated) return;
        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const rect = heroStats.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const suffix = stat.textContent.replace(/[0-9]/g, '');
                let count = 0;
                const speed = target / 30;

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        stat.textContent = Math.ceil(count) + suffix;
                        setTimeout(updateCount, 30);
                    } else {
                        stat.textContent = target + suffix;
                    }
                };
                updateCount();
            });
            animated = true;
        }
    };

    window.addEventListener('scroll', animateStats);
    animateStats(); // Initial check

    // Page Visibility API - Pause video marquee when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const marqueeTrack = document.querySelector('.video-marquee-track');
        if (!marqueeTrack) return;
        if (document.hidden) {
            marqueeTrack.classList.add('is-paused');
        } else {
            marqueeTrack.classList.remove('is-paused');
        }
    });

    // Reviews Carousel Arrow Navigation Controls
    const reviewsTrack = document.getElementById('reviews-track');
    const prevBtn = document.getElementById('reviews-prev');
    const nextBtn = document.getElementById('reviews-next');

    if (reviewsTrack && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const cardWidth = reviewsTrack.querySelector('.review-card')?.offsetWidth || 340;
            reviewsTrack.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            const cardWidth = reviewsTrack.querySelector('.review-card')?.offsetWidth || 340;
            reviewsTrack.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
        });
    }
});
