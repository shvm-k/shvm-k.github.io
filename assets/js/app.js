const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = document.querySelectorAll(".reveal");
const yearNode = document.querySelector("#year");
const themeToggle = document.querySelector(".theme-toggle");
const themeStorageKey = "shvm-theme";

const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
};

const storedTheme = localStorage.getItem(themeStorageKey);
const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(storedTheme || (preferredDark ? "dark" : "light"));

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

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem(themeStorageKey, nextTheme);
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
