(() => {
    // 탭 메뉴
    tabMenus('.tab-content');

    let lastScrollTop = 0;
    const scrollEventManage = () => {
        const Yoffset = window.pageYOffset || document.documentElement.scrollTop;

        if (Yoffset > lastScrollTop) {
            // downscroll code
            console.log("scroll Down")
            document.querySelector('header').classList.remove('sticky');        
            document.querySelector('.fnb-wrap').classList.add('hide');
        } else {
            console.log("scroll Up")
            document.querySelector('header').classList.add('sticky');        
            document.querySelector('.fnb-wrap').classList.remove('hide');
        }
        lastScrollTop = Yoffset <= 0 ? 0 : Yoffset;
    }
    window.addEventListener("scroll", scrollEventManage);

})();

