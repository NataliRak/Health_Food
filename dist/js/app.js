window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item')
    const parentTabs = document.querySelector('.tabheader__items')
    const tabsContent = document.querySelectorAll('.tabcontent')

    function hideContent () {
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })
         
        tabs.forEach(item  => {
            item.classList.remove('tabheader__item_active')
        })
    }
    
    function showContent(i) {
      tabsContent[i].classList.add('show', 'fade')
      tabsContent[i].classList.remove('hide')
      tabs[i].classList.add('tabheader__item_active')
    }
    hideContent ()
    showContent(0)

    parentTabs.addEventListener('click', (event) => {
        const target = event.target

        // metod 1
        const isOverButton = target.className.includes('tabheader__item')
        if (isOverButton) {
            tabs.forEach((item, i) => {
                if(item == target) {
                    hideContent ()
                    showContent(i)
                }
            })
        }
        
    })

    //Modal

    const modalButtons = document.querySelectorAll('[data-modal]')
    const closeButton = document.querySelector('[data-close]')
    const modal = document.querySelector('.modal')

    function openModal () {
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow ='hidden'
        clearInterval(modalTimer)
    }

    modalButtons.forEach(button => {
        button.addEventListener('click', openModal)
    })

  
    function closeModal () {
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow =''
    }
    
    closeButton.addEventListener('click', closeModal)

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal()
        }
    })

    //const modalTimer = setTimeout(openModal, 5000)

    //Open Modal when scroll all page

    // window.addEventListener('scroll', () => {
    //     if (window.pageYOffset + document.documentElement.clientHeight >=document.documentElement.scrollHeight ) {
    //         openModal()
    //     }
    // })




    // Timer

    const deadline = '2022-12-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // make class for tabs
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.parent = document.querySelector(parentSelector)
            this.transfer = 27
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div')
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element)
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render()

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render()

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render()

})





    
    


