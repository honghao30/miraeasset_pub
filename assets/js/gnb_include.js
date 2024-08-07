document.addEventListener("DOMContentLoaded", function () {
    // header 활성화된 네비 경우 : 활성화 네비 작업 및 위치 이동
    const headerNavActive = () => {
        const headerNav = document.getElementById("moveNav");
        if (!headerNav) {
            return;
        }
        const navItems = headerNav.getElementsByTagName("li"); // typeof object
        const navItemsArray = Array.from(headerNav.getElementsByTagName("li")); // 배열로 순회
        const pathName = window.location.pathname;

        let currentPath = pathName.match(/[^/]+$/)[0];
        // 파일 확장자 확인
        const fileExtension = currentPath.split('.').pop().toLowerCase();

        let activeIndex = -1;

        for (let i = 0; i < navItemsArray.length; i++) {
            // 현재 경로에 맞는 navItemsArray의 파일 찾기
            const link = navItemsArray[i].getElementsByTagName("a")[0];
            const href = link.getAttribute("href");            

            // 확장자가 'html'이 아닌 경우에만 변환
            // if (fileExtension !== 'html') {
            //     currentPath = currentPath.toUpperCase();            
            // }
            console.log('경로2', currentPath, href)
            if(currentPath === 'dhc-co-0005-m' || currentPath === 'dhc-ht-0000-m') {
                console.log(currentPath)
                navItemsArray[0].classList.add("is-active");
            }
            // 해당 url의 pathname이 NavTagHref을 포함하고 있다면 is-active 이중클래스 추가
            if (currentPath.includes(href)) {
                activeIndex = i;                
                navItemsArray[i].classList.add("is-active"); // 현재 페이지의 li.is-active 추가
            } else {
                navItemsArray[i].classList.remove("is-active");
            }
        }

        // is-active가 있는 li 요소를 첫 번째로 이동
        if (activeIndex !== -1) {
            const activeItem = navItemsArray.splice(activeIndex, 1)[0]; // 현재 페이지의 li.is-active
            navItemsArray.unshift(activeItem); // 현재 페이지의 li.is-active를 배열 맨앞에 추가하기

            // 기존 요소를 모두 제거하고 업데이트된 순서로 다시 추가
            headerNav.innerHTML = "";
            navItemsArray.forEach((item) => headerNav.appendChild(item));
        }
    };

    // head_gnb 페이지에서만 headerNavActive() 불러오기
    const includeElements = document.querySelectorAll("[data-include-path]");

    includeElements.forEach(async (element) => {
        const includePath = element.getAttribute("data-include-path");

        if (includePath === "./_inc/head_gnb.html") {
            try {
                const response = await fetch(includePath);
                const html = await response.text();
                element.innerHTML = html;

                // 로드가 완료된 후에 호출                
                headerNavActive();
            } catch (error) {
                console.error("Error loading include:", error);
            }
        }
    });
});
