    /* ========================================
       MAIN PAGE NAVIGATION
    ======================================== */

    const pageSlider =
    document.querySelector('.a-page-slide');

const pageLinks =
    document.querySelectorAll('.page-link');


function changeMainPage(page) {

    pageSlider.dataset.page = page;

    pageLinks.forEach(link => {

        const active =
            link.dataset.pageTarget === String(page);

        link.classList.toggle(
            'active',
            active
        );

    });

}


pageLinks.forEach(link => {

    link.addEventListener('click', function(event) {

        event.preventDefault();

        const targetPage =
            this.dataset.pageTarget;

        const targetHash =
            this.getAttribute('href');

        changeMainPage(targetPage);

        history.pushState(
            null,
            '',
            targetHash
        );

    });

});


/* Initial active navigation */

function initializeMainPage() {

    const currentHash =
        window.location.hash;

    const activeLink =
        document.querySelector(
            `.page-link[href="${currentHash}"]`
        );

    if (activeLink) {

        changeMainPage(
            activeLink.dataset.pageTarget
        );

    } else {

        changeMainPage('1');

    }

}


/* Browser back / forward */

window.addEventListener(
    'popstate',
    initializeMainPage
);

window.addEventListener(
    'load',
    initializeMainPage
);


    /* ========================================
       PROFILE TAB NAVIGATION
    ======================================== */

    const profileSlider =
    document.querySelector('.profile-page-slide');

const profileTabs =
    document.querySelectorAll('.a-tab');

const profilePill =
    document.querySelector('.a-tabs-pill');

const profileContentEl =
    document.querySelector('.profile-content');


/* Move active pill */

function moveProfilePill(tab) {

    if (!tab || !profilePill) return;

    profilePill.style.width =
        `${tab.offsetWidth}px`;

    profilePill.style.transform =
        `translateX(${tab.offsetLeft}px)`;

}


/* Size .profile-content to whichever tab is CURRENTLY
   active, so the card shrinks for shorter tabs (like Tools)
   and grows for longer ones (like About) instead of always
   reserving space for the tallest tab */

function resizeProfileContent(page) {

    const activePage =
        document.querySelector(
            `.profile-page[data-profile-page-id="${page}"]`
        );

    if (!activePage || !profileContentEl) return;

    /* Measure the INNER wrapper, not .profile-page itself —
       .profile-page is position:absolute; inset:0, so it's
       always stretched to match .profile-content's current
       height. Measuring it directly would just report that
       existing height back (never smaller), which is why the
       card previously failed to shrink for shorter tabs. The
       inner wrapper has no imposed height, so its scrollHeight
       always reflects the tab's true content size. */

    const innerEl =
        activePage.querySelector('.profile-page-inner') ||
        activePage;

    const naturalHeight =
        innerEl.scrollHeight;

    /* Safety cap so a future long tab can't push the
       card taller than the viewport allows; each tab's
       own overflow-y:auto still lets it scroll if capped */

    const maxAllowed =
        window.innerHeight * 0.5;

    profileContentEl.style.height =
        `${Math.min(naturalHeight, maxAllowed)}px`;

}


/* Change profile content */

function changeProfilePage(page) {

    profileSlider.dataset.profilePage =
        page;

    resizeProfileContent(page);

    profileTabs.forEach(tab => {

        const active =
            tab.dataset.profilePage === String(page);

        tab.setAttribute(
            'aria-selected',
            active
        );

        tab.classList.toggle(
            'active',
            active
        );

        if (active) {
            moveProfilePill(tab);
        }

    });

}

    /* Tab click */

    profileTabs.forEach(tab => {

        tab.addEventListener('click', () => {

            changeProfilePage(
                tab.dataset.profilePage
            );

        });

    });


    /* Initial layout: pill position + content height,
       both driven by whichever tab is actually active
       right now (not assumed to be the first one) */

    function initializeProfileLayout() {

        const activeTab =
            document.querySelector(
                '.a-tab[aria-selected="true"]'
            );

        moveProfilePill(activeTab);

        const currentPage =
            (activeTab && activeTab.dataset.profilePage) || '1';

        resizeProfileContent(currentPage);

    }


    window.addEventListener(
        'load',
        initializeProfileLayout
    );


    /* Keep pill and content height aligned on resize */

    window.addEventListener(
        'resize',
        initializeProfileLayout
    );


    /* ========================================
       TOOL MASTERY MODAL
    ======================================== */

    /* Mastery data for each tool/tech icon in the Tools tab.
       Key must match the icon's `title` attribute exactly. */

    const toolMastery = {

        'GitHub': {
            level: 'Expert',
            percent: 95,
            blurb: 'Comfortable managing repos, branches, and pull request workflows.'
        },
        'Git': {
            level: 'Expert',
            percent: 95,
            blurb: 'Daily use for version control across every project.'
        },
        'Monday': {
            level: 'Advanced',
            percent: 90,
            blurb: 'Used for tracking sprints and client project boards.'
        },
        'Slack': {
            level: 'Advanced',
            percent: 90,
            blurb: 'Primary tool for day-to-day team and client communication.'
        },
        'Figma': {
            level: 'Advanced',
            percent: 90,
            blurb: 'Comfortable inspecting designs and pulling specs for development.'
        },
        'Canva': {
            level: 'Advanced',
            percent: 90,
            blurb: 'Used for quick graphics and marketing assets.'
        },
        'VS Code': {
            level: 'Expert',
            percent: 95,
            blurb: 'My daily code editor for all front-end and Shopify development.'
        },
        'Discord': {
            level: 'Expert',
            percent: 95,
            blurb: 'Used for community and async team communication.'
        },
        'Microsoft Teams': {
            level: 'Advanced',
            percent: 90,
            blurb: 'Used for client meetings and corporate collaboration.'
        },
        'Gmail': {
            level: 'Advanced',
            percent: 90,
            blurb: 'Primary channel for client and project communication.'
        },
        'HTML': {
            level: 'Expert',
            percent: 95,
            blurb: 'Semantic, accessible markup for every project I build.'
        },
        'CSS': {
            level: 'Expert',
            percent: 90,
            blurb: 'Responsive layouts, animations, and design systems.'
        },
        'React': {
            level: 'Advanced',
            percent: 90,
            blurb: 'Building and customizing components for web apps.'
        },
        'JavaScript': {
            level: 'Advanced',
            percent: 90,
            blurb: 'Interactivity, DOM manipulation, and custom Shopify theme features.'
        },
        'Jquery': {
            level: 'Intermediate',
            percent: 70,
            blurb: 'Used in legacy Shopify themes for DOM manipulation and animation.'
        },
        'Graphql': {
            level: 'Intermediate',
            percent: 70,
            blurb: "Used with Shopify's Storefront and Admin APIs for data queries."
        },
        'Shopify': {
            level: 'Expert',
            percent: 95,
            blurb: 'Core specialty — theme development, Liquid, and storefront customization.'
        },
        'Bootstrap': {
            level: 'Intermediate',
            percent: 70,
            blurb: 'Used for rapid responsive layout prototyping.'
        },
        'Liquid': {
            level: 'Expert',
            percent: 95,
            blurb: "Shopify's templating language — my primary tool for theme customization."
        }

    };

    const toolIcons =
        document.querySelectorAll('.tool-icon');

    const modalOverlay =
        document.querySelector('.a-modal-overlay');

    const modalCard =
        document.querySelector('.a-modal');

    const modalIcon =
        document.getElementById('modalIcon');

    const modalTitle =
        document.getElementById('modalTitle');

    const modalLevelLabel =
        document.getElementById('modalLevelLabel');

    const modalLevelFill =
        document.getElementById('modalLevelFill');

    const modalBlurb =
        document.getElementById('modalBlurb');

    const modalCloseBtn =
        document.querySelector('.a-modal-close');

    let modalCloseTimeout = null;


    /* Open modal for a given tool */

    function openToolModal(name, src) {

        const data =
            toolMastery[name] || {
                level: 'Familiar',
                percent: 40,
                blurb: `Working knowledge of ${name}.`
            };

        modalIcon.src = src;
        modalIcon.alt = name;
        modalTitle.textContent = name;
        modalLevelLabel.textContent = data.level;
        modalBlurb.textContent = data.blurb;

        clearTimeout(modalCloseTimeout);

        modalOverlay.classList.remove('is-closing');
        modalOverlay.classList.add('is-open');
        modalOverlay.setAttribute('aria-hidden', 'false');

        modalCard.classList.remove('is-closing');
        modalCard.classList.add('is-open');

        /* Reset then animate the fill bar in */

        modalLevelFill.style.width = '0%';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                modalLevelFill.style.width = `${data.percent}%`;
            });
        });

    }


    /* Close modal */

    function closeToolModal() {

        if (!modalOverlay.classList.contains('is-open')) return;

        modalOverlay.classList.remove('is-open');
        modalOverlay.classList.add('is-closing');
        modalOverlay.setAttribute('aria-hidden', 'true');

        modalCard.classList.remove('is-open');
        modalCard.classList.add('is-closing');

        clearTimeout(modalCloseTimeout);

        modalCloseTimeout = setTimeout(() => {
            modalOverlay.classList.remove('is-closing');
            modalCard.classList.remove('is-closing');
        }, 150);

    }


    /* Wire up every tool icon (including the marquee's
       aria-hidden duplicate row, so clicks work no matter
       which pass of the loop is on screen) */

    toolIcons.forEach(icon => {

        const img = icon.querySelector('img');
        const name = icon.getAttribute('title');

        icon.addEventListener('click', () => {
            openToolModal(name, img.getAttribute('src'));
        });

        icon.addEventListener('keydown', (event) => {

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openToolModal(name, img.getAttribute('src'));
            }

        });

    });


    /* Close on the X button */

    modalCloseBtn.addEventListener(
        'click',
        closeToolModal
    );


    /* Close on backdrop click (but not clicks inside the card) */

    modalOverlay.addEventListener('click', (event) => {

        if (event.target === modalOverlay) {
            closeToolModal();
        }

    });


    /* Close on Escape */

    document.addEventListener('keydown', (event) => {

        if (event.key === 'Escape') {
            closeToolModal();
        }

    });
