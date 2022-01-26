(() => {
    let header = document.querySelector('.header'),
        menuButton = header.querySelector('.menu__button'),
        menuClose = document.querySelector('.menu__close'),
        popup = document.querySelector('.container_popup'),
        bodyBack = document.querySelector('.body__back'),
        footerDet = document.querySelectorAll('.footer__det'),
        linkBlueAbout = document.querySelector('.link_blue-about'),
        bidBlock = document.querySelector('.bid'),
        bidClose = document.querySelector('.bid__close'),
        iconCountry = document.querySelector('.icon_country-check'),
        listCountry = document.querySelector('.list_country');

    menuButton.addEventListener('click', () => {
        let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
        menuButton.setAttribute('aria-expanded', !expanded);
        popup.classList.toggle('container_popup-open');
        bodyBack.classList.toggle('body__back_opened');
        document.body.style.overflow = 'hidden';
    })

    menuClose.addEventListener('click', () => {
        let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
        menuButton.setAttribute('aria-expanded', !expanded);
        popup.classList.toggle('container_popup-open');
        bodyBack.classList.toggle('body__back_opened');
        document.body.style.overflow = '';
    })

    iconCountry.addEventListener('click', () => {
        listCountry.classList.toggle('list_country-open');
        iconCountry.classList.toggle('icon_country-check-open');
    })

    linkBlueAbout.addEventListener('click', (event) => {
        event.preventDefault();
        bidBlock.classList.toggle('bid_open');
    })

    bidClose.addEventListener('click', () => {
        bidBlock.classList.toggle('bid_open');
    })

    bodyBack.addEventListener('click', (event) => {
        if (event.target === bodyBack) {
            let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !expanded);
            popup.classList.toggle('container_popup-open');
            bodyBack.classList.toggle('body__back_opened');
            document.body.style.overflow = '';
        }
    })

    if (window.innerWidth < 1220) {
        for (let i = 0; i < footerDet.length; i++) {
            footerDet[i].removeAttribute('open', false);
        }
    } else if (window.innerWidth > 1220) {
        for (let i = 0; i < footerDet.length; i++) {
            footerDet[i].setAttribute('open', true);
        }
    }
})();
