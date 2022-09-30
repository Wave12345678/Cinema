window.addEventListener('DOMContentLoaded', ()=>{
    const tabsParent = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent')
    loader = document.querySelector('.loader')
    slider = document.querySelector('.offer__slider-wrapper')
    slide = document.querySelector('.offer__slide')
    const images = document.querySelectorAll('.offer__slide img')
    let width;
    let count = 1;
    let next = document.querySelector('.offer__slider-next')
    let prev = document.querySelector('.offer__slider-prev')
    let modal_input = document.querySelector('.modal__input');
    let modal_status = document.querySelector('.modal-status');



function setNum(){
    document.getElementById('current').innerHTML = `0${count+1}`;
}


    function init(){
        console.log('resize');
        width = slider.offsetWidth;
        slider.style.width = width*images.length +'px';
        images.forEach(item => {
            item.style.width = width + 'px';
            item.style.heigth = 'auto';

        })
    console.log(width)
        roll();
    }
    window.addEventListener('resize', init);
    init();

    prev.addEventListener('click', ()=>{
        count--;
        setNum();
        if (count <0){
            count = images.length -1;
        }
        roll();
    })
    next.addEventListener('click', function(){
        setNum();
        count++;
        if(count >= images.length){
            count = 0;
        }
        roll()
    });

    function roll(){
        slider.style.transform = 'translate(-'+count*width+'px)';
    }










    setInterval(()=>{
        loader.style.opacity='0'
        setTimeout(() => {
            loader.style.display='none'
        },1000);
    }, 1000)

    function hideTabsContent(){
        tabsContent.forEach((item)=>{
            item.classList.add('hide')
            item.classList.remove('show')
        })
        tabs.forEach((item)=>{
            item.classList.remove('tabheader__item_active')
        })


    }


    function showTabsContent(i=0){
        tabsContent[i].classList.add('show')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')

    }

    showTabsContent()
    hideTabsContent()


    tabsParent.addEventListener('click', (event)=>{
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, index)=>{
                if(target==item){
                    hideTabsContent();
                    showTabsContent(index);
                }
            })
        }
    }
    )



const deadline = "2022-12-08"

function getTimeRemaining(endtime){
    const timer = Date.parse(endtime) - Date.parse(new Date()),
    days = Math.floor(timer / (1000*60 * 60 * 24)),
    hours = Math.floor((timer/(1000*60*60))%24),
    minutes = Math.floor((timer / (1000* 60))%60),
    seconds = Math.floor((timer / (1000))%60)

    return {timer, days, hours, minutes, seconds}
}

function getZero(num){
    if(num>=0 && num<10){
        return `0${num}`
    } else {
        return num;
    }
}

function setClock(selector, endtime){
    const timer = document.querySelector(selector)
    days=timer.querySelector('#days')
    hours=timer.querySelector('#hours')
    minutes=timer.querySelector('#minutes')
    seconds=timer.querySelector('#seconds')
    timeInterval = setInterval(updateClock, 1000)
    updateClock()

    function updateClock(){
        const t = getTimeRemaining(endtime)

        days.innerHTML=getZero(t.days)
        minutes.innerHTML=getZero(t.minutes)
        hours.innerHTML=getZero(t.hours)
        seconds.innerHTML=getZero(t.seconds)


        if(t.timer <=0){
            clearInterval(timeInterval)
        }
    }

}
    setClock('.timer', deadline)






//Modal





const modalTrigger = document.querySelector('[data-modal]'),
modal = document.querySelector('.modal'),
modalClodeBtn = document.querySelector('[data-close]')

function hide_modal(){
    modal.classList.add('hide'),
    modal.classList.remove('show'),
    document.body.style.overflow = ''
}
modalTrigger.addEventListener('click', ()=>{
    modal.classList.add('show'),
    modal.classList.remove('hide'),
    document.body.style.overflow = 'hidden'
})

modalClodeBtn.addEventListener('click', hide_modal())


document.addEventListener('click', (e)=>{
    if(e.target == modal){
    hide_modal();

    }})

    document.addEventListener('keydown', (e)=>{
        if(e.code == 'Escape'){
        hide_modal();

        }})

        window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    modal.classList.add('show'),
                    modal.classList.remove('hide'),
                    document.body.style.overflow = 'hidden'

            }

                modalClodeBtn.addEventListener('click', ()=>{
                    modal.classList.add('hide'),
    modal.classList.remove('show'),
    document.body.style.overflow = 'scroll'
                })


         document.addEventListener('click', (e)=>{
                if(e.target == modal){
                    modal.classList.add('hide'),
                    modal.classList.remove('show'),
                    document.body.style.overflow = 'scroll'
                }})

        document.addEventListener('keydown', (e)=>{
            if(e.code == 'Escape'){
                modal.classList.add('hide'),
                modal.classList.remove('show'),
                document.body.style.overflow = 'scroll'
            }})
        };






modal_input.addEventListener('input', ()=>{
    const request = new XMLHttpRequest();

    request.open('GET', 'json/respond.json');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('readystatechange', ()=>{
        if(request.readyState == 4 && request.status == 200){
            modal_status.innerHTML = "Введите ваши данные корректно";
        }
    })
})



})
