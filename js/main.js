//меню бургер
const initBurgerMenu = () => {
    const burgerIcon = document.querySelector('.burger__menu');
    const menu = document.querySelector('.header__links');    
    const unLockedBody = () => document.body.classList.remove('_lock');
    
    
    burgerIcon.addEventListener('click', () => {
    document.body.classList.toggle('_lock')
    menu.classList.toggle('_active');
    burgerIcon.classList.toggle('_active')
    });




    

    document.addEventListener('click', (event) => {
        const target = event.target;
        // проверяем, был ли клик выполнен в пределах меню или его дочерних элементов
        if (!menu.contains(target) && !burgerIcon.contains(target)) {
            // Закрываем меню
            menu.classList.remove('_active');
            burgerIcon.classList.remove('_active')
            unLockedBody();
        }
    });

    menu.addEventListener('click', () => {
        menu.classList.remove('_active');
        burgerIcon.classList.remove('_active')
        unLockedBody();
    })



}

//плавное перемещение по пунктам меню
const initScrollMenu = () => {
    const links = document.querySelectorAll('.header__link[data-goto]');
    
    // console.log(links);
    links.forEach((link) => {
        link.removeAttribute('href')
        link.addEventListener('click', () => {
            // console.log(link);
            const goToblockSelectorr = link.dataset.goto;
            // console.log(link.dataset.goto)
            const goToBlock = document.querySelector(goToblockSelectorr);
            const header = document.querySelector('.header');
            const goToSection = goToBlock.getBoundingClientRect().top+window.scrollY - header.clientHeight;
            // console.log(goToSection);
            window.scrollTo({
                top: goToSection,
                behavior: 'smooth'
            })
        })
    })

}

//подсветка выбранного раздела в разделе выполненные работы
const initWorksSectionsLinks = () => {
    const links = document.querySelectorAll('.work__link');
    // console.log(links);

    const link1 = document.querySelector('.work_models__container');
    const link2 = document.querySelector('.work__drawings__container');
    const link3 = document.querySelector('.work__digitization__container');
    // console.log(link1, link2, link3)
    
    links.forEach((link) => {
        link.addEventListener('click', () => {
            link.removeAttribute('href');
            
            // удаление класса _active у всех ссылок
            links.forEach((link) => {
                link.classList.remove('_active');
                if (link.id === 'link__1') link1.classList.remove('_active');
                if (link.id === 'link__2') link2.classList.remove('_active');
                if (link.id === 'link__3') link3.classList.remove('_active');
                

            });
            
            // добавление класса _active только текущей ссылке
            link.classList.add('_active');
            if (link.id === 'link__1') link1.classList.add('_active');
            if (link.id === 'link__2') link2.classList.add('_active');
            if (link.id === 'link__3') link3.classList.add('_active');
            initSlider(link)//передаем ссылку которую получили, чтоб автоматом добавлять слайдер к выбранному разделу
        });
    });
}

//слайдер выполненные работы
const initSlider = (link) => {
        let cardList = document.querySelector('.work_models__container'); // задаем чтоб сразу слайдер работал при открытии страницы
        if (link && link.id === 'link__1') cardList = document.querySelector('.work_models__container');
        if (link && link.id === 'link__2') cardList = document.querySelector('.work__drawings__container');
        if (link && link.id === 'link__3') cardList = document.querySelector('.work__digitization__container');
        //console.log(cardList) 


        const sliderButtons = document.querySelectorAll('.cursor__works') //тут получаем лист со стрелками
            
        //для крайнего положения
        sliderButtons[0].style.color = '#2b2b2b';
        const maxScrollLeft = cardList.scrollWidth - cardList.clientWidth;


        sliderButtons.forEach((button) => {
                    button.addEventListener('click', () => {
                        const direction = button.id === 'left__scroll' ? -1 : 1;
                        const scrollAmount = cardList.clientWidth * direction;
                        // console.log(cardList.clientWidth)
                        //console.log(scrollAmount);
                        cardList.scrollBy({ left: scrollAmount, behavior: 'smooth' }); 
                        // console.log(cardList.)
                        // cardList.style.pointerEvents = 'none'; //дает возможность только кликать на слайдер

                            //проверяет крайнее положение
                            const handelSlideButtons = () => {
                            sliderButtons[0].style.color = cardList.scrollLeft <= 0 ? '#2b2b2b' : '';
                            sliderButtons[1].style.color = cardList.scrollLeft >= maxScrollLeft ? '#2b2b2b' : '';
                            }
                            
                            cardList.addEventListener('scroll', () => {
                                    handelSlideButtons();
                                });
                    })
                })


 }

//слейдер в отзывах
 const initSliderReviews = () => {
    let cardList = document.querySelector('.reviews__card__container');
    const gap = parseFloat(getComputedStyle(cardList).columnGap); 
    // console.log(gap)
    //parseFloat - функция, которая преобразует строку в число с плавающей запятой
    //getComputedStyle(cardList) - собирает все стили css у переменной включая стили от родителей
    //columnGap - забираем расстояние
    //

    const sliderButtons = document.querySelectorAll('.rev__scroll') //тут получаем лист со стрелками
        // console.log(sliderButtons)
    //для крайнего положения
    sliderButtons[0].style.color = '#2b2b2b';
    const maxScrollLeft = cardList.scrollWidth - cardList.clientWidth;


    sliderButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    // console.log(button);
                    const direction = button.id === 'rev__btn__left' ? -1 : 1;
                    const scrollAmount = (cardList.clientWidth + gap) * direction;
                    // console.log(cardList.clientWidth)
                    //console.log(scrollAmount);
                    cardList.scrollBy({ left: scrollAmount, behavior: 'smooth' }); 
                    // console.log(cardList.)
                    // cardList.style.pointerEvents = 'none'; //дает возможность только кликать на слайдер

                        //проверяет крайнее положение
                        const handelSlideButtons = () => {
                        sliderButtons[0].style.color = cardList.scrollLeft <= 0 ? '#2b2b2b' : '';
                        sliderButtons[1].style.color = cardList.scrollLeft >= maxScrollLeft ? '#2b2b2b' : '';
                        }
                        
                        cardList.addEventListener('scroll', () => {
                                handelSlideButtons();
                            });
                })
            })
}

//разворачивание подпунктов в разделе частые вопросы
 const initFaqAnswer = () => {
    const faqLinks = document.querySelectorAll('.faq__text__card');

    let flag = null; // устанавливаем флаг в null в начале, потом будем класть туда открытую ссылку

    faqLinks.forEach((link) => {
        const faqAnswer = link.querySelector('.faq__answer');
        const icon =  link.querySelector('.faq__text__icon');

        link.addEventListener('click', () => { // вешаем на конкретный вопрос слушатель
            if (flag !== link) { // если флаг не равен ссылке (активной)
                if (flag) {
                    const activeLink = flag;
                    const activeAnswer = activeLink.querySelector('.faq__answer');
                    const activeIcon = activeLink.querySelector('.faq__text__icon')
                    activeLink.classList.remove('_active'); // удаляем _active у ссылки
                    activeAnswer.classList.remove('_active'); // удаляем _active у ответа
                    activeIcon.classList.remove('_active'); // удаляем _active у ответа
                }

                link.classList.add('_active'); // добавляем _active к текущей ссылке
                faqAnswer.classList.add('_active'); // добавляем _active к текущему ответу
                icon.classList.add('_active'); // добавляем _active к текущей иконке
                 
                flag = link; // обновляем флаг
               
            } else {
                link.classList.remove('_active'); // удаляем _active у текущей ссылки
                faqAnswer.classList.remove('_active'); // удаляем _active у текущего ответа
                icon.classList.remove('_active'); // добавляем _active к текущей иконке
                
                flag = null; // сбрасываем флаг
            
            }
        });
    });
}

//модальное окно
const initModal = () => {
    const buttons = document.querySelectorAll('button[data-target]');
    const closedButton = document.querySelector('.closed__modal');
    const politicLink = document.querySelector('.modal__politic__link');

    
    

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const unLockedBody = () => document.body.classList.remove('__lock');
            // console.log('click')
            document.body.classList.add('__lock');

            //получаем по клику нужную кнопку
            const itsModal = button.dataset.target;
            const modalActive = document.querySelector(itsModal);
            

            //доступ к боди
            // const bodyLock = document.querySelector('body')

            
            // если хотим чтобы блок приезжал к нам откуда либо
            // //замеряем высоту от верха
            // const topOfScreen = window.scrollY; 
            // console.log(topOfScreen)
            // //добавляем высоту к месту клика
            // modalActive.style.top = `${topOfScreen}px`;

            //получаем доступ к контейнеру, который по центру при открытой модалке
            const modalCard = document.querySelector('.modal__content__container');
            
                modalActive.classList.add('_active');
                modalCard.classList.add('_active');



            //запращаем клик по области контейнера с контентом чтоб по клику вне области закрыть окно
            modalActive.addEventListener('click', (block) => {
                if (!modalCard.contains(block.target)) {
                    modalActive.classList.remove('_active'); 
                    unLockedBody();
               
                }
                
            })

            politicLink.addEventListener('click', () => {
                // console.log('click')
                // console.log(modalActive);
        
                modalActive.classList.remove('_active')
            });
             
            //закрываем окно в случае клика по кресту
            closedButton.addEventListener('click', () => {
                modalActive.classList.remove('_active'); 
                unLockedBody();
            })
        })
       
    })
}

//политика конфиденциальности
const initPolitic = () => {
    const politicLink = document.querySelector('.footer__politics');
    const politicModal = document.querySelector('.politic__modal__content');
    const politicLinkRedirect = document.querySelector('.modal__politic__link');
    // console.log(politicLinkRedirect)
    const unLockedBody = () => document.body.classList.remove('__lock');
    const closedButton = document.querySelector('.politic__modal__closed');
    const politicContainer = document.querySelector('.politic__content__contaner');
    
    
    
    politicLink.addEventListener('click', () => politicModalFoo());
    politicLinkRedirect.addEventListener('click', () => politicModalFoo());


        const politicModalFoo = () => {
        document.body.classList.add('__lock');
        politicLink.removeAttribute('href')
        politicModal.classList.add('_active');
        politicContainer.classList.add('_active');
      
         //  запращаем клик по области контейнера с контентом чтоб по клику вне области закрыть окно
         politicModal.addEventListener('click', (block) => {
            if (!politicContainer.contains(block.target)) {
                politicModal.classList.remove('_active'); 
                politicContainer.classList.remove('_active');
                unLockedBody();
            }})


        closedButton.addEventListener('click', () => {
            document.body.classList.add('__lock');
            politicModal.classList.remove('_active');
            politicContainer.classList.remove('_active');
            unLockedBody();
        })
    }        


}

//маска телефона
const initPhoneInputs = () => { 
    const phoneInputs = document.querySelectorAll('input[data-tel-input]');
    // console.log(phoneInputs);
    
    
    const getInputNumbersValue = (input) => {
       return input.value.replace(/\D/g, '');
    }
    
    const onPhoneInput = (e) => {
        const input = e.target,
            selectionStart = input.selectionStart;
        let inputNumbersValue = getInputNumbersValue(input),
            formatedInputValue = '';
            // console.log('inputValue', inputNumbersValue);
            
    
            if(!inputNumbersValue) {
                return input.value = '';
            }
    
            if(input.value.length != selectionStart) {
                // console.log('середина', e);
                if (e.data && /\D/g.test(e.data)){
                    input.value = inputNumbersValue;
                }
                return
            }
    
            const country = ['7', '8', '9'].includes(inputNumbersValue[0]) ? 1 : -1;
            // console.log(country);
            if (country > 0) {
            if (inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue;// + inputNumbersValue если убрать + inputNumbersValue - то 9 подставляться не будет
            
                let firstSymbols = (inputNumbersValue[0] === '8') ? '+7' : '+7'; //можно разрешить 8
                // console.log(firstSymbols);
                formatedInputValue = firstSymbols + ' ';
                // console.log(inputNumbersValue.length);
                if (country > 0 && inputNumbersValue.length > 1){
                    // console.log('больше 1')
                    formatedInputValue += ' (' + inputNumbersValue.substring(1, 4);
                
    
                if (inputNumbersValue.length >= 5) {
                    formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
                }
    
                if (inputNumbersValue.length >= 8) {
                    formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
                }
    
                if (inputNumbersValue.length >= 10) {
                    formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
                }
            }}
    
                else 
                formatedInputValue = '+' + inputNumbersValue;
                
    
        input.value = formatedInputValue;
           
        
    }
        const onPhoneKeyDown = (e) => {
            // console.log(e.keyCode, e.target.value)
            let input = e.target;
            if(e.keyCode === 8 && getInputNumbersValue(input).length === 1) {
                input.value = '';
            }
        }
    
        const onPhonePaste = (e) => {
            const pasted = e.clipboardData || window.clipboardData,
                input = e.target,
                inputNumbersValue = getInputNumbersValue(input);
    
            if(pasted){
                let pastedText = pasted.getData('Text');
                if (/\D/g.test(pastedText)) {
                    input.value = inputNumbersValue;
                }
            }
    
        }
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', onPhoneInput);
        input.addEventListener('keydown', onPhoneKeyDown)
        input.addEventListener('paste', onPhonePaste)
    
    })
    }








window.addEventListener('load', () => {
    // console.log('Window loaded!')
    initWorksSectionsLinks();
    initSlider();
    initSliderReviews();
})

document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM loaded!')
    initBurgerMenu();
    initScrollMenu();
    initModal();
    initFaqAnswer();
    initPolitic();
    initPhoneInputs();
})



