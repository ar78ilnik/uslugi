(() => {
    let header = document.querySelector('.header'),
        menuButton = header.querySelector('.menu__button'),
        menuClose = document.querySelector('.menu__close'),
        popup = document.querySelector('.container_popup'),
        bodyBack = document.querySelector('.body__back'),
        listInstall = document.querySelector('.list_install'),
        linkFooterSub = document.querySelectorAll('.link_footer-sub'),
        listSubFooter = document.querySelectorAll('.list__submenu_footer');

    menuButton.addEventListener('click', () => {
        let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
        menuButton.setAttribute('aria-expanded', !expanded);
        popup.classList.toggle('container_popup-open');
        bodyBack.classList.toggle('body__back_opened');
    })

    menuClose.addEventListener('click', () => {
        let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
        menuClose.setAttribute('aria-expanded', !expanded);
        popup.classList.toggle('container_popup-open');
        bodyBack.classList.toggle('body__back_opened');
    })

    function hideContent() {
        for (let i = 0; i < listSubFooter.length; i++) {
            listSubFooter[i].style.display = 'none';
        }
    }

    function showContent(a) {
        if (listSubFooter[a].style.display == 'none') {
            listSubFooter[a].style.display = 'block';
        }
    }
    
    listInstall.addEventListener('click', function(event) {
        event.preventDefault();
        let target = event.target;
        if (target && target.classList.contains('link_footer-sub')) {
            for (let i = 0; i < linkFooterSub.length; i++) {
                if (target == linkFooterSub[i]) {
                    hideContent();
                    showContent(i);
                    break;
                }
            }
        }
    });
})();