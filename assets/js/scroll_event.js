
// 스크롤 이벤트 처리 함수
import {animateNumbers} from '../js/ui_common.js';

let isAnimated = false;

export const ScrollEnterMain = () => {
    const scrollElements = document.querySelectorAll(".animation-enter");

    if (!scrollElements) return;

    const elementInView = (el, dividend = 1) => el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
    const elementOutofView = (el) => el.getBoundingClientRect().top > (window.innerHeight || document.documentElement.clientHeight);
    const displayScrollElement = (element) => element.classList.add("fade-in");
    const hideScrollElement = (element) => {
        element.classList.remove("fade-in", "left-enter-effect", "right-enter-effect", "shadow-effect", "scroll-up");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
                el.classList.toggle('left-enter-effect', el.hasAttribute('left-enter'));
                el.classList.toggle('right-enter-effect', el.hasAttribute('right-enter'));
                el.classList.toggle('shadow-effect', el.hasAttribute('shadow-effect'));
                el.classList.toggle('scroll-up', el.hasAttribute('scrollUp'));     
                displayAnimation();                           
            } else if (elementOutofView(el)) {
                hideScrollElement(el);                
            }
        });
    };

    window.addEventListener("scroll", handleScrollAnimation);
};

export const displayAnimation = () => {        
    if (!isAnimated) {
        animateNumbers();
        isAnimated = true;
    }
};

// 위 아래 구분을 위한 스크립트
let lastScrollTop = 0;
const scrollEventManage = () => {
const Yoffset = window.pageYOffset || document.documentElement.scrollTop;

if (Yoffset > lastScrollTop) {
    // down scroll code
    // console.log("scroll Down")
    onDownScroll();
} else {
    // console.log("scroll Up")
    onUpScroll();
}
lastScrollTop = Yoffset <= 0 ? 0 : Yoffset;
}
window.addEventListener("scroll", scrollEventManage);
// 위 아래 구분을 위한 스크립트====================

const onDownScroll = () => {
    
}

const onUpScroll = () => {

}
