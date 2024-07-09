(() => {
    // 탭 메뉴
    tabMenus('.tab-content');

    let lastScrollTop = 0;
    let debounceTimeout;
    
    // 디바운스 함수
    const debounce = (func, wait) => {
        return function(...args) {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => func.apply(this, args), wait);
        };
    };
    
    // 스크롤 이벤트 관리 함수
    const scrollEventManage = () => {
        const Yoffset = window.pageYOffset || document.documentElement.scrollTop;
    
        if (Yoffset > lastScrollTop) {
            // 스크롤 다운
            document.querySelector('header') && document.querySelector('header').classList.add('fix');   
        } else {
            // 스크롤 업
            document.querySelector('header') && document.querySelector('header').classList.remove('fix');                     
        }
    
        lastScrollTop = Yoffset <= 0 ? 0 : Yoffset; // 페이지가 최상단에 있을 경우 lastScrollTop을 0으로 설정
    };
    
    // 스크롤 이벤트에 디바운스 적용
    window.addEventListener("scroll", debounce(scrollEventManage, 100));
    
    


    // 달력 스크립트    
    const createWeeklyCalendar = (containerId) => {
        const container = document.getElementById(containerId);
    
        if (!container) {
            console.error(`Element with id '${containerId}' not found.`);
            return;
        }
    
        // Day.js 한국어 로케일 설정
        dayjs.locale('ko');
    
        // Day.js 플러그인 로드
        dayjs.extend(window.dayjs_plugin_isSameOrBefore);
    
        let currentDate = dayjs();
        displayWeeklyCalendar(currentDate);
    
        container.querySelector('#prevWeek') && container.querySelector('#prevWeek').addEventListener('click', function () {
            currentDate = currentDate.subtract(1, 'week');
            displayWeeklyCalendar(currentDate);
        });
    
        container.querySelector('#nextWeek') && container.querySelector('#nextWeek').addEventListener('click', function () {
            currentDate = currentDate.add(1, 'week');
            displayWeeklyCalendar(currentDate);
        });
    
        function displayWeeklyCalendar(date) {
            const displayData = container.querySelector('.display-data');
            const weekDatesList = container.querySelector('#weekDates');
    
            const startOfWeek = date.startOf('week');
            const endOfWeek = date.endOf('week');
    
            displayData.textContent = `${startOfWeek.format('YYYY년 M월 D일')} - ${endOfWeek.format('M월 D일')}`;
    
            weekDatesList.innerHTML = '';
            let day = startOfWeek;
            while (day.isSameOrBefore(endOfWeek)) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
    
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                dayDiv.textContent = ` ${day.date()}`;
    
                const weekLabel = document.createElement('div');
                weekLabel.classList.add('label');
                weekLabel.textContent = day.format('ddd'); // 한글 요일 추가
    
                // 일요일(0)과 토요일(6) 체크하여 'holiday' 클래스 추가
                if (day.day() === 0 || day.day() === 6) {
                    link.classList.add('holiday');
                }
    
                link.href = '#none';
                link.appendChild(weekLabel); // 요일 먼저 추가
                link.appendChild(dayDiv); // 날짜 추가
                listItem.appendChild(link);
                weekDatesList.appendChild(listItem);
    
                // 오늘 날짜 출력
                const today = dayjs().format('YYYY-MM-DD');
                document.querySelector('.detail-section .detail-day').innerText = today;    

                // 사용자 데이터 추가
                addUserDataToWeeklyLink(link);
    
                // 클릭 이벤트 리스너 추가
                (function(currentDay) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        handleWeeklyLinkClick(currentDay);
                    });
                })(day);
    
                // 오늘 날짜 체크하여 'today' 클래스 추가
                if (day.isSame(dayjs(), 'day')) {
                    link.classList.add('today');
                }
    
                day = day.add(1, 'day');
            }
        }
    };
    
    const handleWeeklyLinkClick = (day) => {
        const selectedDay = day.format('YYYYMMDD');
        if (selectedDay === today) {
            document.querySelector('.detail-section').innerText = '오늘';
        } else {
            document.querySelector('.detail-section').innerText = selectedDay;
        }
    };
    
    const addUserDataToWeeklyLink = (link) => {
        const resultData = [1, 0, 2, 1, 1, 0, 0]
        const userData = document.createElement('div');
        userData.classList.add('dot');
        userData.textContent = ''; // API에서 받은 데이터로 설정
        link.parentElement.appendChild(userData);
    };
    
    if(document.querySelector('.calendarWeekly')) {
        createWeeklyCalendar('calendarWeekly');
    }
})();

