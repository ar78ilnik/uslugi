(() => {
    let header = document.querySelector('.header'),
        menuButton = header.querySelector('.menu__button'),
        menuClose = document.querySelector('.menu__close'),
        popup = document.querySelector('.container_popup'),
        bodyBack = document.querySelector('.body__back'),
        footerDet = document.querySelectorAll('.footer__det');

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

    bodyBack.addEventListener('click', (event) => {
        if (event.target === bodyBack) {
            console.log('1');
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
