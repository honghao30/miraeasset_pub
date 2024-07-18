import bottomSheetHandle from '../js/ui_common.js';

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
    setTimeout(() => {
        bottomSheetHandle();
    }, executionTimer);
});