import { bottomSheetHandle, checkLabel, checkTextArea, numComma, focusNextInputOnMaxLength, checkInputFocus, tabMenus, handleDropdownMenu  } from '../js/ui_common.js';
import { ScrollEnterMain } from '../js/scroll_event.js';

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

    // dom 로딩시간 체크 필요한 경우
    setTimeout(() => {
        bottomSheetHandle();
    }, executionTimer);
});