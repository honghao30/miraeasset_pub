import { bottomSheetHandle, checkLabel, checkTextArea, numComma, focusNextInputOnMaxLength, checkInputFocus, tabMenus, dropdownMenu, removeButton, toastPop, accordion } from "../js/ui_common.js";
import { ScrollEnterMain } from "../js/scroll_event.js";
import { circleGraphType1 } from "../js/graph_custom.js";
import { rangeOptionSelector, DateRangePicker, newMonthlyCalendar, createWeeklyCalendar } from "../js/calendar.js";
import { swiperCustom, SlideVideo, SlideVideoPlayBtn } from "../js/swiper_custom.js";

// 퍼블 환경일 경우 settimeout을 지정.
const checkPublishingFile = () => {
    const nowLocation = window.location.href;    
    if (nowLocation.includes('.html') || nowLocation.includes('https://miraeasse.netlify.app/')) {
        return true;
    } else {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    const isPublishingEnvironment = checkPublishingFile();
    const executionTimer = isPublishingEnvironment ? 200 : 0;

    dropdownMenu('.dropdown-menu__wrap')
    checkLabel();
    checkTextArea();

    // 추가로 처리할 함수 예시
    const inputAdditionalFn = (event) => {
        document.querySelector('.tag__wrap').classList.remove('is-hide')
        console.log(event.target.value)
        if(event.target.classList.contains('btn-remove')) {
            document.querySelector('.tag__wrap').classList.add('is-hide') 
            document.querySelector('.search-result-nodata').classList.add('is-hide');
        }
    };

    // checkInputFocus 함수 호출 시 추가로 처리할 함수 전달
    checkInputFocus(inputAdditionalFn);

    focusNextInputOnMaxLength('.pin-code input');
    tabMenus('.tab-content');
    tabMenus('.tab-content-group', 'onlyTab');
    tabMenus('.faq-content-tabs');
    ScrollEnterMain();    
    
    const swiper1 = swiperCustom(".cardjs-01", 1.12, {
        pagination: {
            el: ".swiper-pagination-black",
            clickable: true,
        },
        slidesOffsetAfter: 16,
    });

    const swiper2 = swiperCustom(".cardjs-video01", 1, {
        pagination: {
            el: ".swiper-pagination-black",
            clickable: true,
        },
        navigation: {
            nextEl: ".cardjs-video01 .swiper-button-next",
            prevEl: ".cardjs-video01 .swiper-button-prev",
        },
        on: {
            slideChange: function () {
                SlideVideo(swiper2);
            },
        },
    });

    const swiper3 = swiperCustom(".cardjs-video02", 1, {
        pagination: false,
        on: {
            slideChange: function () {
                // SlideVideo(swiper2);
            },
        },
    });

    // 달력
    rangeOptionSelector('startDate2', 'endDate2');
    const calendar = new DateRangePicker('startDate', 'endDate');
    const calendar2 = new DateRangePicker('startDate2', 'endDate2');

    newMonthlyCalendar('calendarContainer', { button: false, displayData: 'dropdown' });
    createWeeklyCalendar('calendarWeekly', { button: true, displayDay: 'onlyToday' });
    
    // 커스텀 챠트
    circleGraphType1('.circlebar-js1', 75);
    
    removeButton('.btn-tag-remove', '.tag', (event) => {
        console.log('버튼 삭제 추가 이벤트 있을까', event);
    })


    accordion('.faq-list');

    // dom 로딩시간 체크 필요한 경우
    setTimeout(() => {
        bottomSheetHandle();
        toastPop();
    }, executionTimer);
});