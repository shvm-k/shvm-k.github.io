const nav = document.querySelector("nav");
const menuToggle = document.querySelector(".nav-menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sectionTargets = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

if (menuToggle && nav && navPanel) {
    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("nav-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

const closeNav = () => {
    if (!nav || !menuToggle) {
        return;
    }

    nav.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
};

navLinks.forEach((link) => {
    link.addEventListener("click", closeNav);
});

if (sectionTargets.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const activeId = `#${entry.target.id}`;

                navLinks.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === activeId);
                });
            });
        },
        {
            rootMargin: "-35% 0px -45% 0px",
            threshold: 0.1
        }
    );

    sectionTargets.forEach((section) => observer.observe(section));
}

const scrollBtn = document.getElementById("scroll-top");

if (scrollBtn) {
    window.addEventListener("scroll", () => {
        const show = window.scrollY > 300;
        scrollBtn.style.opacity = show ? "1" : "0";
        scrollBtn.style.pointerEvents = show ? "auto" : "none";
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

const tiltWrap = document.getElementById("tiltWrap");
const tiltCard = document.getElementById("tiltCard");

if (tiltWrap && tiltCard) {
    const maxTilt = 12;

    tiltWrap.addEventListener("mousemove", (event) => {
        const rect = tiltWrap.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const px = (x / rect.width) - 0.5;
        const py = (y / rect.height) - 0.5;

        tiltCard.style.setProperty("--rx", `${px * maxTilt * 2}deg`);
        tiltCard.style.setProperty("--ry", `${py * -maxTilt * 2}deg`);
    });

    tiltWrap.addEventListener("mouseleave", () => {
        tiltCard.style.setProperty("--rx", "0deg");
        tiltCard.style.setProperty("--ry", "0deg");
    });
}

const proofSection = document.getElementById("proof");
const proofStatus = document.getElementById("proofStatus");
const proofCounts = Array.from(document.querySelectorAll(".sys-proof-count"));

if (proofSection && proofStatus && proofCounts.length) {
    const startDelays = [500, 1200, 1900, 2600];
    const countDuration = 600;

    const animateCount = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / countDuration, 1);
            const value = Math.round(progress * target);
            el.textContent = `${value}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const runSequence = () => {
        proofStatus.textContent = "SYS.STATUS // INITIALIZING";

        proofCounts.forEach((el, index) => {
            setTimeout(() => animateCount(el), startDelays[index] ?? index * 700);
        });

        setTimeout(() => {
            proofStatus.textContent = "STATUS: READY";
        }, 3000);
    };

    const proofObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    runSequence();
                    observer.disconnect();
                }
            });
        },
        { threshold: 0.4 }
    );

    proofObserver.observe(proofSection);
}
