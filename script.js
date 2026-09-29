document.addEventListener("DOMContentLoaded", () => {

    // INTRO SCREEN
    const intro = document.getElementById("intro");
    const enterButton = document.getElementById("enterButton");

    document.body.classList.add("intro-active");

    function closeIntro() {
        if (!intro) return;

        intro.classList.add("hidden");
        document.body.classList.remove("intro-active");
    }

    if (enterButton) {
        enterButton.addEventListener("click", closeIntro);
    }


    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

        });

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    // ACTIVE NAVIGATION LINK
    const pageSections = document.querySelectorAll("main section[id]");

    const sectionObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const currentId = entry.target.id;

            navLinks.forEach(link => {

                const target = link.getAttribute("href");

                link.classList.toggle(
                    "active",
                    target === `#${currentId}`
                );

            });

        });

    }, {
        rootMargin: "-35% 0px -55% 0px"
    });

    pageSections.forEach(section => sectionObserver.observe(section));


    // SCROLL REVEAL
    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        revealItems.forEach(item => revealObserver.observe(item));

    } else {

        revealItems.forEach(item => item.classList.add("visible"));

    }


    // EVENT FILTERS: UPCOMING / ONGOING / PAST
    const eventTabs = document.querySelectorAll(".event-tab");
    const eventCards = document.querySelectorAll(".event-card");

    eventTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const selectedCategory = tab.dataset.filter;

            eventTabs.forEach(otherTab => {

                const selected = otherTab === tab;

                otherTab.classList.toggle("active", selected);

                otherTab.setAttribute(
                    "aria-selected",
                    String(selected)
                );

            });

            eventCards.forEach(card => {

                card.hidden = card.dataset.category !== selectedCategory;

            });

        });

    });


    // MEMBERSHIP FORM VALIDATION
    const form = document.getElementById("joinForm");
    const formMessage = document.getElementById("formMessage");

    if (form && formMessage) {

        form.addEventListener("submit", event => {

            event.preventDefault();

            if (!form.checkValidity()) {

                form.reportValidity();
                return;

            }

            const name = document.getElementById("fullName").value.trim();

            formMessage.textContent =
                `Thank you, ${name}! Your details are valid. Connect this form to the club's official submission method to receive enquiries.`;

            form.reset();

        });

    }

});