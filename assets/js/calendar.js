// 기간선택
export const rangeOptionSelector = (start, end) => {
    const startDateInput = document.getElementById(start);
    const endDateInput = document.getElementById(end);
    const radioButtons = document.querySelectorAll('input[name="type"]');

    const updateDates = (value) => {
        const today = dayjs().format('YYYY-MM-DD');
        let startDate;
        let endDate = today;
        endDateInput.value = endDate;   

        switch (value) {
            case '1week':
                startDate = dayjs(endDate).subtract(1, 'week').format('YYYY-MM-DD');                
                startDateInput.value = startDate;
                break;
            case '1month':
                startDate = dayjs(endDate).subtract(1, 'month').format('YYYY-MM-DD');
                startDateInput.value = startDate;                
                break;
            case '3month':
                startDate = dayjs(endDate).subtract(3, 'month').format('YYYY-MM-DD');   
                startDateInput.value = startDate;        
                break;
            case '6month':
                startDate = dayjs(endDate).subtract(6, 'month').format('YYYY-MM-DD');
                startDateInput.value = startDate;             
                break;
            default:
                startDate = null;
                endDate = null;
        }
    };

    radioButtons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            updateDates(event.target.value);
        });
    });
};

export class DateRangePicker {
    constructor(startDateId, endDateId) {
        this.startDateInput = document.getElementById(startDateId);
        this.endDateInput = document.getElementById(endDateId);

        if (!this.startDateInput || !this.endDateInput) {            
            return;
        }

        const today = dayjs().format('YYYY-MM-DD');
        this.startDateInput.value = today;
        this.endDateInput.value = today;

        this.startDateInput.addEventListener('change', this.handleStartDateChange.bind(this));
        this.endDateInput.addEventListener('change', this.handleEndDateChange.bind(this));
    }

    handleStartDateChange() {
        const startDate = dayjs(this.startDateInput.value);
        const endDate = dayjs(this.endDateInput.value);

        if (startDate.isAfter(endDate)) {
            this.endDateInput.value = this.startDateInput.value;
        }
    }

    handleEndDateChange() {
        const startDate = dayjs(this.startDateInput.value);
        const endDate = dayjs(this.endDateInput.value);

        if (endDate.isBefore(startDate)) {
            alert('종료일은 시작일보다 이전일 수 없습니다. 시작일로 설정됩니다.');
            this.endDateInput.value = this.startDateInput.value;
        }
    }
}


// 월간 달력
export const newMonthlyCalendar = (containerId, options) => {
    const mergedOptions = {
        button: false,
        displayData: 'default',
        dayClickCallback: null,
        ...options
    };

    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    let currentDate = dayjs();

    // 화면 로드 시 오늘 날짜 데이터를 불러오고 표시
    if (mergedOptions.dayClickCallback) {
        mergedOptions.dayClickCallback(currentDate.format('YYYYMMDD'));
    }

    displayCalendar(currentDate);

    container.querySelector('.calendar__header .btn-show-today') && container.querySelector('.calendar__header .btn-show-today').addEventListener('click', function () {
        currentDate = dayjs();
        displayCalendar(currentDate);
        if (mergedOptions.dayClickCallback) {
            mergedOptions.dayClickCallback(currentDate.format('YYYYMMDD'));
        }
    });

    if (mergedOptions.button) {
        container.querySelector('.calendar__header .btn-prev-month') && container.querySelector('.calendar__header .btn-prev-month').addEventListener('click', function () {
            currentDate = currentDate.subtract(1, 'month');
            displayCalendar(currentDate);
        });

        container.querySelector('.calendar__header .btn-next-month') && container.querySelector('.calendar__header .btn-next-month').addEventListener('click', function () {
            currentDate = currentDate.add(1, 'month');
            displayCalendar(currentDate);
        });
    } else {
        const buttons = container.querySelectorAll('.calendar__header button');
        buttons.forEach(button => button.style.display = 'none');
    }

    const handleTouchStart = (event) => {
        start_xPos = event.touches[0].pageX;
        start_yPos = event.touches[0].pageY;
        start_time = new Date();
    };

    const handleTouchEnd = (event) => {
        const end_xPos = event.changedTouches[0].pageX;
        const end_yPos = event.changedTouches[0].pageY;
        const end_time = new Date();
        let move_x = end_xPos - start_xPos;
        let move_y = end_yPos - start_yPos;
        let elapsed_time = end_time - start_time;
        if (Math.abs(move_x) > min_horizontal_move && Math.abs(move_y) < max_vertical_move && elapsed_time < within_ms) {
            if (move_x < 0) {
                currentDate = currentDate.add(1, 'month');
                displayCalendar(currentDate);
            } else {
                currentDate = currentDate.subtract(1, 'month');
                displayCalendar(currentDate);
            }
        }
    };

    const min_horizontal_move = 30;
    const max_vertical_move = 30;
    const within_ms = 1000;

    let start_xPos;
    let start_yPos;
    let start_time;

    container && container.addEventListener('touchstart', handleTouchStart);
    container && container.addEventListener('touchend', handleTouchEnd);

    const buildDropdownOptions = (currentDate) => {
        const select = document.createElement('select');
        for (let i = 0; i < 15; i++) {
            const optionDate = currentDate.subtract(i, 'month');
            const optionValue = optionDate.format('YYYY-MM');
            const optionText = optionDate.format('YYYY년 M월');
            const option = document.createElement('option');
            option.value = optionValue;
            option.textContent = optionText;
            select.appendChild(option);
        }
        return select;
    };

    if (mergedOptions.displayData === 'dropdown') {
        const displayData = container.querySelector('.display-data');
        const select = buildDropdownOptions(currentDate);
        displayData.innerHTML = '';
        displayData.appendChild(select);

        select.addEventListener('change', function(event) {
            const selectedValue = event.target.value;
            currentDate = dayjs(selectedValue);
            displayCalendar(currentDate);
        });
    }

    function displayCalendar(date) {
        const displayData = container.querySelector('.display-data');
        const tableBody = container.querySelector('.calendar__content tbody');

        if (mergedOptions.displayData === 'dropdown') {
            const select = displayData.querySelector('select');
            if (select) {
                select.value = date.format('YYYY-MM');
            }
        } else {
            displayData.textContent = date.format('YYYY년 M월');
        }

        const firstDayOfMonth = date.startOf('month').day();
        const daysInMonth = date.daysInMonth();
        const lastDayOfPrevMonth = date.subtract(1, 'month').endOf('month').date();
        date.add(1, 'month');
        const firstDayOfNextMonth = date.startOf('month').date();

        tableBody.innerHTML = '';
        let dayIndex = 0;
        let row = tableBody.insertRow();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const cell = row.insertCell();
            const prevMonthDay = lastDayOfPrevMonth - (firstDayOfMonth - i - 1);
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = prevMonthDay;
            cell.appendChild(link);
            cell.classList.add('gray');
            dayIndex++;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const cell = row.insertCell();
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = day;
            cell.appendChild(link);

            addUserDataToCell(cell, date.date(day));

            link.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedDay = handleDayClick(date, day);
                if (mergedOptions.dayClickCallback) {
                    mergedOptions.dayClickCallback(selectedDay);
                }
            });

            if (date.date(day).isSame(dayjs(), 'day')) {
                cell.classList.add('today');
            }

            const weekday = (firstDayOfMonth + day - 1) % 7;
            if (weekday === 0 || weekday === 6) {
                cell.classList.add('holiday');
            }

            if (++dayIndex % 7 === 0 && day < daysInMonth) {
                row = tableBody.insertRow();
            }
        }

        let nextMonthDay = 1;
        while (dayIndex % 7 !== 0) {
            const cell = row.insertCell();
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = nextMonthDay;
            cell.appendChild(link);
            cell.classList.add('gray');
            dayIndex++;
            nextMonthDay++;
        }

        const remainingCells = 7 - (dayIndex % 7);
        if (remainingCells !== 7) {
            for (let i = 0; i < remainingCells; i++) {
                const cell = row.insertCell();
                cell.classList.add('gray');
            }
        }
    }

    const handleDayClick = (date, day) => {
        const selectedDay = dayjs(date).date(day).format('YYYYMMDD');
        return selectedDay;
    };
};

// 사용자 데이터를 추가하는 함수
const addCalendarData = (cell, userData) => {
    const healthDataEl = document.createElement('div');
    healthDataEl.classList.add('health-data-wrap');
    healthDataEl.innerHTML = userData;
    cell.appendChild(healthDataEl);    
}

export const addUserDataToCell = async (cell, date) => {    
    try {
        // const response = await fetch('');
        // const userData = await response.json();

        // 예시 데이터 추가 (API 응답 형식에 맞게 변경하세요)
        const healthDataHTML = `
            <div class="dot type-meal"></div>
            <div class="dot type-work-out"></div>
            <div class="dot type-nutrition"></div>
        `;

        // API로부터 받은 데이터를 사용하여 사용자 데이터 추가
        addCalendarData(cell, healthDataHTML);

    } catch (error) {
        console.error('사용자 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
} 

// 주간달력
/************************
 * day.js 필수, swiping 기능 사용지 swiper 
 * startDate: '2024.01',  시작 년도 설정가능(예: 회원가입 일 이후) 
 * button: false, 이전 다음 버튼 사용여부
 * displayDay: 'none', 타이틀에 날짜 표시 onlyToday, WeeklyRange, onlyMonthly, none
 * userSwiping: true  스와이핑 기능 사용
 ************************/
import { swiperCustom, SlideVideo, SlideVideoPlayBtn } from "/assets/js/swiper_custom.js";
export const createWeeklyCalendar = (containerId, options = {}) => {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    const calendarHeader = container.querySelector('.calendar__header');

    // Day.js 한국어 로케일 설정
    dayjs.locale('ko');
    dayjs.extend(window.dayjs_plugin_isSameOrBefore);

    let currentDate = dayjs();
    const weeksCount = displayWeeklyCalendar(currentDate); // 최초 호출시 weeksCount 반환

    if (options.swiperOptions) {
        const swiper = swiperCustom('.calendar-swiper', 1, options.swiperOptions);
        swiper.slideTo(weeksCount);
    }

    displayWeeklyCalendar(currentDate);

    // 캘린더 헤더에 이전달, 다음달 버튼 설정
    if (options.button) {
        const prevButton = document.createElement('button');
        prevButton.id = 'prevWeek';
        prevButton.textContent = '이전 주';
        calendarHeader.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.id = 'nextWeek';
        nextButton.textContent = '다음 주';
        calendarHeader.appendChild(nextButton);

        prevButton.addEventListener('click', function () {
            currentDate = currentDate.subtract(1, 'week');
            displayWeeklyCalendar(currentDate);
        });

        nextButton.addEventListener('click', function () {
            currentDate = currentDate.add(1, 'week');
            displayWeeklyCalendar(currentDate);
        });
    }

    if (!options.userSwiping) {
        const handleTouchStart = (event) => {
            start_xPos = event.touches[0].pageX;
            start_yPos = event.touches[0].pageY;
            start_time = new Date();
        };

        const handleTouchEnd = (event) => {
            const end_xPos = event.changedTouches[0].pageX;
            const end_yPos = event.changedTouches[0].pageY;
            const end_time = new Date();
            let move_x = end_xPos - start_xPos;
            let move_y = end_yPos - start_yPos;
            let elapsed_time = end_time - start_time;
            if (Math.abs(move_x) > min_horizontal_move && Math.abs(move_y) < max_vertical_move && elapsed_time < within_ms) {
                if (move_x < 0) {
                    currentDate = currentDate.add(1, 'week');
                    displayWeeklyCalendar(currentDate);
                } else {
                    currentDate = currentDate.subtract(1, 'week');
                    displayWeeklyCalendar(currentDate);
                }
            }
        };

        const min_horizontal_move = 30;
        const max_vertical_move = 30;
        const within_ms = 1000;

        let start_xPos;
        let start_yPos;
        let start_time;

        container && container.addEventListener('touchstart', handleTouchStart);
        container && container.addEventListener('touchend', handleTouchEnd);
    }

    function displayWeeklyCalendar(date) {
        const displayData = container.querySelector('.display-data');
        const weekDatesList = container.querySelector('#weekDates');
        const weeklyLabels = container.querySelector('#weeklyLabels');
        const swipingContainer = container.querySelector('.swiper-wrapper');

        // 요소가 존재하는지 확인
        if (!displayData || !weekDatesList || !weeklyLabels || (options.userSwiping && !swipingContainer)) {
            return;
        }

        const startOfWeek = date.startOf('week');
        const endOfWeek = date.endOf('week');
        const todayDayIndex = dayjs().day(); // 오늘의 요일 인덱스
        const futureLimit = options.futureLimit; 
        const endLimitDay = startOfWeek.add(futureLimit, 'weeks');

        // 제목 사용시 오늘 날짜를 보여줄지 한주의 시작일과 종료일을 보여줄지 선택
        if (options.displayDay === 'WeeklyRange') {
            displayData.textContent = `${startOfWeek.format('YYYY년 M월 D일')} - ${endOfWeek.format('M월 D일')}`;
        } else if (options.displayDay === 'onlyToday') {
            displayData.textContent = dayjs().format('YYYY-MM-DD');
        } else if (options.displayDay === 'onlyMonthly') {
            displayData.textContent = dayjs().format('YYYY-MM');
        } else if (options.displayDay === 'none') {
            displayData.textContent = '';
        }

        // 요소를 비우기 전에 존재하는지 확인
        if (weekDatesList && weeklyLabels) {
            weekDatesList.innerHTML = '';
            weeklyLabels.innerHTML = '';
        }

        let day = startOfWeek;      
        let weeksCount;
        if (options.startDate) {
            const calcWeeksCount = () => {
                let startDate = dayjs(options.startDate); // startDate를 dayjs 객체로 변환
                const calculateWeeksBetween = (startDate, endDate) => endDate.diff(startDate, 'weeks');
                return calculateWeeksBetween(startDate, startOfWeek);
            };
            weeksCount = calcWeeksCount(); // weeksCount 값을 계산하여 할당            
        }

        // 일주일 날짜를 담을 div 생성 및 슬라이드 추가
        if (options.userSwiping) {                 
            let pastDay = startOfWeek.subtract(weeksCount, 'week');
            while (pastDay.isSameOrBefore(startOfWeek.subtract(1, 'week'))) {
                const slideItem = document.createElement('div');
                slideItem.classList.add('swiper-slide');
                swipingContainer.appendChild(slideItem);
        
                const pastWeekUl = document.createElement('ul');
                for (let i = 0; i < 7; i++) {
                    const pastDateItem = document.createElement('li');
                    const link = document.createElement('a');
                    const dayDiv = document.createElement('div');
        
                    dayDiv.classList.add('day');
                    dayDiv.textContent = pastDay.format('DD');
                    link.href = '#none';
                    link.appendChild(dayDiv);
                    pastDateItem.appendChild(link);
                    pastWeekUl.appendChild(pastDateItem);
        
                    // 오늘의 요일에 해당하는 날짜에 'today' 클래스 추가
                    if (pastDay.day() === dayjs().day()) {
                        link.classList.add('today');
                    }
                    if (pastDay.day() === 0 || pastDay.day() === 6) {
                        link.classList.add('holiday');                        
                    }
                    pastDay = pastDay.add(1, 'day');

                    // 사용자 데이터 추가
                    if (typeof options.addUserDataToWeeklyLink === 'function') {
                        options.addUserDataToWeeklyLink(link);
                    }

                    // 클릭 이벤트 리스너 추가
                    (function (currentDay) {
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            if (typeof options.handleWeeklyLinkClick === 'function') {
                                options.handleWeeklyLinkClick(currentDay); // 전달된 클릭 함수 사용
                                console.log(currentDay)
                            }
                        });
                    })(pastDay);                  
                }
                slideItem.appendChild(pastWeekUl);
            }
        
            const slideItem = document.createElement('div');
            slideItem.classList.add('swiper-slide');
            swipingContainer.appendChild(slideItem);
        
            const darListUl = document.createElement('ul');
            slideItem.appendChild(darListUl);
        
            while (day.isSameOrBefore(endOfWeek)) {
                // 요일 표시
                const weekLabel = document.createElement('li');
                weekLabel.classList.add('label');
                weekLabel.textContent = day.format('ddd'); // 한글 요일 추가
                weeklyLabels.appendChild(weekLabel);
        
                // 날짜 표시
                const listItem = document.createElement('li');
                const link = document.createElement('a');
        
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                dayDiv.textContent = `${day.date()}`;
        
                // 일요일(0)과 토요일(6) 체크하여 'holiday' 클래스 추가
                if (day.day() === 0 || day.day() === 6) {
                    link.classList.add('holiday');
                    weekLabel.classList.add('holiday');
                }
        
                link.href = '#none';
                link.appendChild(dayDiv); // 날짜 추가
                listItem.appendChild(link);
                darListUl.appendChild(listItem);
        
                // 오늘의 요일에 해당하는 날짜에 'today' 클래스 추가
                if (day.day() === dayjs().day()) {
                    link.classList.add('today');
                    weekLabel.classList.add('today');
                }

                // 오늘 날짜 출력
                const today = dayjs().format('YYYY-MM-DD');
                if (options.deTailView !== false && options.deTailView !== '') {
                    document.querySelector('.detail-section .detail-day').innerText = today;
                }
        
                // 사용자 데이터 추가
                if (typeof options.addUserDataToWeeklyLink === 'function') {
                    options.addUserDataToWeeklyLink(link);
                }                

                // 클릭 이벤트 리스너 추가
                (function (currentDay) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();                        
                        if (typeof options.handleWeeklyLinkClick === 'function') {
                            options.handleWeeklyLinkClick(currentDay); // 전달된 클릭 함수 사용
                        }
                    });
                })(day);
        
                day = day.add(1, 'day');
            }

            while (day.isSameOrBefore(endLimitDay)) {
                const slideItem = document.createElement('div');
                slideItem.classList.add('swiper-slide');
                swipingContainer.appendChild(slideItem);
        
                const futureWeekUl = document.createElement('ul');
                for (let i = 0; i < 7; i++) {
                    const futureDateItem = document.createElement('li');
                    const link = document.createElement('a');
                    const dayDiv = document.createElement('div');
        
                    dayDiv.classList.add('day');
                    dayDiv.textContent = day.format('DD');
                    link.href = '#none';
                    link.appendChild(dayDiv);
                    futureDateItem.appendChild(link);
                    futureWeekUl.appendChild(futureDateItem);
        
                    // 오늘의 요일에 해당하는 날짜에 'today' 클래스 추가
                    if (day.day() === dayjs().day()) {
                        link.classList.add('today');
                    }
                    if (day.day() === 0 || day.day() === 6) {
                        link.classList.add('holiday');                        
                    }
                    day = day.add(1, 'day');

                    // 사용자 데이터 추가
                    if (typeof options.addUserDataToWeeklyLink === 'function') {
                        options.addUserDataToWeeklyLink(link);
                    }

                    // 클릭 이벤트 리스너 추가
                    (function (currentDay) {
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            if (typeof options.handleWeeklyLinkClick === 'function') {
                                options.handleWeeklyLinkClick(currentDay); // 전달된 클릭 함수 사용
                            }
                        });
                    })(day);                  
                }
                slideItem.appendChild(futureWeekUl);
            }
        } else {
            while (day.isSameOrBefore(endOfWeek)) {
                // 요일 표시
                const weekLabel = document.createElement('li');
                weekLabel.classList.add('label');
                weekLabel.textContent = day.format('ddd'); // 한글 요일 추가
                weeklyLabels.appendChild(weekLabel);
        
                // 날짜 표시
                const listItem = document.createElement('li');
                const link = document.createElement('a');
        
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                dayDiv.textContent = `${day.date()}`;
        
                // 일요일(0)과 토요일(6) 체크하여 'holiday' 클래스 추가
                if (day.day() === 0 || day.day() === 6) {
                    link.classList.add('holiday');
                    weekLabel.classList.add('holiday');
                }
        
                link.href = '#none';
                link.appendChild(dayDiv); // 날짜 추가
                listItem.appendChild(link);
                weekDatesList.appendChild(listItem);
        
                // 오늘의 요일에 해당하는 날짜에 'today' 클래스 추가
                if (day.day() === dayjs().day()) {
                    link.classList.add('today');
                    weekLabel.classList.add('today');
                }

                // 사용자 데이터 추가
                if (typeof options.addUserDataToWeeklyLink === 'function') {
                    options.addUserDataToWeeklyLink(link);
                }                

                // 클릭 이벤트 리스너 추가
                (function (currentDay) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (typeof options.handleWeeklyLinkClick === 'function') {
                            options.handleWeeklyLinkClick(currentDay); // 전달된 클릭 함수 사용
                        }
                    });
                })(day);
        
                day = day.add(1, 'day');
            }
        } 
        return weeksCount;                       
    }

    return displayWeeklyCalendar(currentDate);
};


