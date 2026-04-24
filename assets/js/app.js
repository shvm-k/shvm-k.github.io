const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = document.querySelectorAll(".reveal");
const yearNode = document.querySelector("#year");

const closeMenu = () => {
    if (!menuToggle || !siteNav) {
        return;
    }

    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
};

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!expanded));
        siteNav.classList.toggle("is-open", !expanded);
        document.body.classList.toggle("menu-open", !expanded);
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

const setActiveLink = () => {
    const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
    });

    navLinks.forEach((link) => {
        const targetId = link.getAttribute("href");
        link.classList.toggle("is-active", current && targetId === `#${current.id}`);
    });
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.18
});

revealItems.forEach((item) => {
    revealObserver.observe(item);
});

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("resize", setActiveLink);
setActiveLink();

if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
}
