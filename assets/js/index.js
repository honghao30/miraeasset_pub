import { bottomSheetHandle, checkLabel, checkTextArea, numComma, focusNextInputOnMaxLength, checkInputFocus, tabMenus, handleDropdownMenu } from '../js/ui_common.js';
import { ScrollEnterMain } from '../js/scroll_event.js';
import { rangeOptionSelector, DateRangePicker, newMonthlyCalendar, createWeeklyCalendar } from '../js/calendar.js';

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

    const dropdownMenus = document.querySelectorAll('.dropdown-menu__wrap');
    dropdownMenus.forEach(menu => {
        handleDropdownMenu(menu);
    });
    checkLabel();
    checkTextArea();
    checkInputFocus();
    focusNextInputOnMaxLength('.pin-code input');
    tabMenus('.tab-content');
    ScrollEnterMain();    

    // 달력
    rangeOptionSelector('startDate2', 'endDate2');
    const calendar = new DateRangePicker('startDate', 'endDate');
    const calendar2 = new DateRangePicker('startDate2', 'endDate2');

    newMonthlyCalendar('calendarContainer', { button: false, displayData: 'dropdown' });
    createWeeklyCalendar('calendarWeekly', { button: true, displayDay: 'onlyToday' });
    
    // dom 로딩시간 체크 필요한 경우
    setTimeout(() => {
        bottomSheetHandle();
    }, executionTimer);
});