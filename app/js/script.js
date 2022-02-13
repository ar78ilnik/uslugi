(() => {
    let footerDet = document.querySelectorAll('.footer__det');

    if (window.innerWidth < 1220) {
        footerDet.forEach(item => {
            item.removeAttribute('open', false);
        })
    } else if (window.innerWidth > 1220) {
        footerDet.forEach(item => {
            item.setAttribute('open', true);
        })
    }

    function openList(targetSelector, listSelector, iconSelector) {
        const target = document.querySelectorAll(targetSelector),
                list = document.querySelectorAll(listSelector),
                icon = document.querySelectorAll(iconSelector);
                target.forEach((item, i) => {
                    item.addEventListener('click', ()=> {
                        list[i].classList.toggle('list_country-open');
                        icon[i].classList.toggle('icon_country-check-open');
                    });
                });
    }

    function setCountry(elemSelector, countrySelector, iconSelector) {
        const elem = document.querySelectorAll(elemSelector),
                country = document.querySelector(countrySelector),
                icon = document.querySelector(iconSelector);

        let attr = [];
        elem.forEach((item,i) => {
            attr[i] = item.getAttribute('data-dial-code');
            item.addEventListener('click', ()=> {
                country.textContent = '+' + attr[i];
                icon.style.backgroundImage = "url('../img/" + attr[i] + ".png')";
            });
        });
    }

    //setCountry('.list__item_country', '.form__country-bid', '.icon-country_bid');
    //setCountry('.list__item_country', '.form__country-consult', '.icon-country_consult');

    function setDay(detSelector, sumSelector, dotSelector) {
        let elem = document.querySelector(detSelector),
            elemSum = document.querySelector(sumSelector),
            dot = document.querySelector(dotSelector),
            bidToday = document.querySelector('.bid__today'),
            now = new Date(),
            hour = now.getHours(),
            day = now.getDay();

        if (day == 6 || day == 0 || hour > 18 || hour < 9) {
            elem.setAttribute('open', true);
            elemSum.style.display = 'none';
        } else {
            dot.style.backgroundColor = 'green';
        }
    }

    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
                modal = document.querySelector(modalSelector),
                close = document.querySelector(closeSelector);

        trigger.forEach(item => {
            item.addEventListener('click', (evt) => {
                if(evt.target) {
                    evt.preventDefault();
                }
                let expanded = item.getAttribute('aria-expanded') === 'true' || false;
                item.setAttribute('aria-expanded', !expanded);
                modal.classList.toggle('container_popup-open');
                document.querySelector('.body__back').classList.toggle('body__back_opened');
                document.body.style.overflow = 'hidden';
            });
        });

        close.addEventListener('click', () => {
            trigger.forEach(item => {
                let expanded = item.getAttribute('aria-expanded') === 'true' || false;
                item.setAttribute('aria-expanded', !expanded);
            });
            modal.classList.toggle('container_popup-open');
            document.querySelector('.body__back').classList.toggle('body__back_opened');
            document.body.style.overflow = '';
        });
    }

    function forms() {
        const form = document.querySelectorAll('form'),
            inputs = document.querySelectorAll('input'),
            textAreas = document.querySelectorAll('textarea');

        const message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с Вами свяжемся',
            failure: 'Что-то пошло не так...'
        };

        const postData = async (url, data) => {
            document.querySelector('.status').textContent = message.loading;
            let res = await fetch(url, {
                method: "POST",
                body: data
            });

            return await res.text();
        };

        const clearInputs = () => {
            inputs.forEach(item => {
                item.value = '';
            })
        };

        const clearTextAreas = () => {
            textAreas.forEach(item => {
                item.value = '';
            })
        };

        form.forEach(item => {
            item.addEventListener('submit', (evt) => {
                evt.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.appendChild(statusMessage);

                const formData = new FormData(item);

                postData('server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    clearTextAreas();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 3000);
                })
            });
        })
    }

    function consultPopup (triggerConsult, modalConsult, closeConsult) {
        const trigger = document.querySelector(triggerConsult),
                modal = document.querySelector(modalConsult),
                close = document.querySelector(closeConsult),
                modalClass = modal.getAttribute('class');
                
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            modal.classList.toggle(modalClass + '_open');
        })

        close.addEventListener('click', () => {
            modal.classList.toggle(modalClass + '_open');
        })
    }

    bindModal('.menu__button', '.container_popup', '.menu__close');
    setCountry('.list__item_country', '.form__country-bid', '.icon-country_bid');
    setCountry('.list__item_country', '.form__country-consult', '.icon-country_consult');
    forms();
    setDay('.bid__det', '.bid__sum', '.bid__dot');
    consultPopup('.link_blue-about', '.bid', '.bid__close');
    consultPopup('.link_blue-order', '.consult', '.consult__close');
    openList('.form__tel-pais', '.list_country', '.icon_country-check');
})();
