    /* ========================================
       MAIN PAGE NAVIGATION
    ======================================== */

    const pageSlider =
    document.querySelector('.t-page-slide');

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
    document.querySelectorAll('.t-tab');

const profilePill =
    document.querySelector('.t-tabs-pill');


/* Move active pill */

function moveProfilePill(tab) {

    if (!tab || !profilePill) return;

    profilePill.style.width =
        `${tab.offsetWidth}px`;

    profilePill.style.transform =
        `translateX(${tab.offsetLeft}px)`;

}


/* Change profile content */

function changeProfilePage(page) {

    profileSlider.dataset.profilePage =
        page;

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


    /* Initial pill position */

    function initializeProfilePill() {

        const activeTab =
            document.querySelector(
                '.t-tab[aria-selected="true"]'
            );

        moveProfilePill(activeTab);

    }


    window.addEventListener(
        'load',
        initializeProfilePill
    );


    /* Keep pill aligned on resize */

    window.addEventListener(
        'resize',
        initializeProfilePill
    );
