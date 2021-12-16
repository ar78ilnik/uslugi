(() => {
    let header = document.querySelector('.header');
    menuButton = header.querySelector('.menu__button'),
        menuClose = header.querySelector('.menu__close'),
        popup = header.querySelector('.container_popup'),
        bodyBack = document.querySelector('.body__back');

    menuButton.addEventListener('click', () => {
        let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
        menuButton.setAttribute('aria-expanded', !expanded);
        popup.classList.toggle('container_popup-open');
        bodyBack.classList.toggle('body__back_opened');
        console.log('ok');
    })

    menuClose.addEventListener('click', () => {
        let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
        menuClose.setAttribute('aria-expanded', !expanded);
        popup.classList.toggle('container_popup-open');
        bodyBack.classList.toggle('body__back_opened');
    })
})();