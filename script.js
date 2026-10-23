/* ========================================
   KHAI PORTFOLIO ANIMATIONS
======================================== */


/* ========================================
   1. PAGE LOADER
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Create loader automatically
    const loader = document.createElement("div");

    loader.className = "page-loader";

    loader.innerHTML = `
        <div class="loader-content">

            <div class="loader-number">
                000
            </div>

            <div class="loader-label">
                KHAIRI YUSOF — PORTFOLIO
            </div>

            <div class="loader-line">
                <div class="loader-progress"></div>
            </div>

        </div>
    `;

    document.body.appendChild(loader);

    const number = loader.querySelector(".loader-number");
    const progressBar = loader.querySelector(".loader-progress");

    let progress = 0;

    const loadingInterval = setInterval(function () {

        progress += Math.floor(Math.random() * 8) + 3;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
        }

        number.textContent = String(progress).padStart(3, "0");

        progressBar.style.width = progress + "%";

        if (progress === 100) {

            setTimeout(function () {

                loader.classList.add("hide");

                setTimeout(function () {
                    loader.remove();
                }, 900);

            }, 300);

        }

    }, 70);

});


/* ========================================
   2. SCROLL REVEAL
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Elements that will animate when scrolling
    const elements = document.querySelectorAll(
        ".hero-content, .hero-image, " +
        ".section-heading, .project-card, " +
        ".about-hero, .about-section, " +
        ".esports-section, .esports-hero, " +
        ".contact-hero, .project-hero, " +
        ".project-section"
    );

    // Add reveal class
    elements.forEach(function (element, index) {

        element.classList.add("reveal");

        // Small delay between elements
        element.style.transitionDelay =
            (index % 4) * 100 + "ms";

    });

    // Observe elements entering the screen
    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    // Stop observing after animation
                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    elements.forEach(function (element) {

        observer.observe(element);

    });

});


/* ========================================
   3. SMOOTH SCROLL FOR INTERNAL LINKS
======================================== */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* ========================================
   4. PROJECT CARD MOUSE EFFECT
======================================== */

document.querySelectorAll(".project-card").forEach(function (card) {

    card.addEventListener("mousemove", function (event) {

        const rect = card.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - mouseY) / 35;
        const rotateY = (mouseX - centerX) / 35;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

    });

    card.addEventListener("mouseleave", function () {

        card.style.transform = "";

    });

});


/* ========================================
   5. NAVIGATION ACTIVE EFFECT
======================================== */

const currentPage = window.location.pathname
    .split("/")
    .pop();

document.querySelectorAll(".nav-links a").forEach(function (link) {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {

        link.classList.add("active");

    }

});


/* ========================================
   6. FOOTER YEAR
======================================== */

document.querySelectorAll(".current-year").forEach(function (element) {

    element.textContent = new Date().getFullYear();

});



/* ========================================
   INTERACTIVE MOUSE GLOW
======================================== */

(function () {
    const body = document.body;

    // Disable on devices without a mouse
    if (window.matchMedia("(max-width: 768px)").matches) {
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    document.addEventListener("mousemove", function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    function animateGlow() {
        // Smooth movement
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;

        body.style.setProperty("--mouse-x", currentX + "px");
        body.style.setProperty("--mouse-y", currentY + "px");

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
})();


/* ========================================
   PROFILE IMAGE PARALLAX
======================================== */

(function () {
    const heroImage = document.querySelector(".hero-image");
    const imageBox = document.querySelector(".image-box");

    if (!heroImage || !imageBox) return;

    // Disable effect on mobile and reduced-motion settings
    if (
        window.matchMedia("(max-width: 768px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let animationFrame;

    heroImage.addEventListener("mousemove", function (event) {
        const rect = heroImage.getBoundingClientRect();

        const mouseX =
            (event.clientX - rect.left) / rect.width;

        const mouseY =
            (event.clientY - rect.top) / rect.height;

        // Keep the movement subtle
        targetY = (mouseX - 0.5) * 8;
        targetX = (0.5 - mouseY) * 8;

        if (!animationFrame) {
            animationFrame = requestAnimationFrame(animate);
        }
    });

    function animate() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        imageBox.style.transform =
            `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

        if (
            Math.abs(targetX - currentX) > 0.01 ||
            Math.abs(targetY - currentY) > 0.01
        ) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            animationFrame = null;
        }
    }

    heroImage.addEventListener("mouseleave", function () {
        targetX = 0;
        targetY = 0;

        if (!animationFrame) {
            animationFrame = requestAnimationFrame(animate);
        }
    });
})();