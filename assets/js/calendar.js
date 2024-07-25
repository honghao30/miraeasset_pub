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
    // 기본 옵션 설정
    const mergedOptions = {
        button: false,
        displayData: 'default',
        ...options
    };

    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    // 현재 날짜로 초기화
    let currentDate = dayjs();

    // 초기 달력 표시
    displayCalendar(currentDate);

    // 이전 달력 보기 버튼 클릭 이벤트
    if (mergedOptions.button) {
        container.querySelector('.calendar__header button:first-child').addEventListener('click', function () {
            currentDate = currentDate.subtract(1, 'month');
            displayCalendar(currentDate);
        });

        // 다음 달력 보기 버튼 클릭 이벤트
        container.querySelector('.calendar__header button:last-child').addEventListener('click', function () {
            currentDate = currentDate.add(1, 'month');
            displayCalendar(currentDate);
        });
    } else {
        // 버튼을 숨기는 처리
        const buttons = container.querySelectorAll('.calendar__header button');
        buttons.forEach(button => button.style.display = 'none');
    }

        // 터치 이벤트를 위한 처리
        var min_horizontal_move = 30;
        var max_vertical_move = 30;
        var within_ms = 1000;
    
        var start_xPos;
        var start_yPos;
        var start_time;
        function touch_start(event) {
            start_xPos = event.touches[0].pageX;
            start_yPos = event.touches[0].pageY;
            start_time = new Date();
        }
    
    
        function touch_end(event) {
            var end_xPos = event.changedTouches[0].pageX;
            var end_yPos = event.changedTouches[0].pageY;
            var end_time = new Date();
            let move_x = end_xPos - start_xPos;
            let move_y = end_yPos - start_yPos;
            let elapsed_time = end_time - start_time;
            if (Math.abs(move_x) > min_horizontal_move && Math.abs(move_y) < max_vertical_move && elapsed_time < within_ms) {
                if (move_x < 0) {
                    alert("타임머신 후진~~~~~~~~~~~~~~~~");
                    currentDate = currentDate.subtract(1, 'month');
                    displayCalendar(currentDate);                    
                } else {
                    alert("타임머신 앞으로~~~~~~~~~~~~~~~~");
                    currentDate = currentDate.add(1, 'month');
                    displayCalendar(currentDate);
                }
            }
        }
    
        // const content = document.getElementById('page-cal');
        container & container.addEventListener('touchstart', touch_start);
        container & container.addEventListener('touchend', touch_end);

    // 터치 이벤트를 위한 처리

    // 날짜 정보 표시 방식에 따라 처리
    if (mergedOptions.displayData === 'dropdown') {
        // 드롭다운으로 표시하는 경우 처리 (예: select 태그 등)
        const displayData = container.querySelector('.display-data');
        const select = buildDropdownOptions(currentDate);
        displayData.innerHTML = ''; // 기존 내용 초기화
        displayData.appendChild(select); // select 요소 추가

        // 선택된 값 변경 시 달력 업데이트
        select.addEventListener('change', function(event) {
            const selectedValue = event.target.value;
            currentDate = dayjs(selectedValue);
            displayCalendar(currentDate); // 달력 업데이트 함수 호출
        });
    }

    // 달력을 표시하는 함수
    function displayCalendar(date) {
        const displayData = container.querySelector('.display-data');
        const tableBody = container.querySelector('.calendar__content tbody');

        // 연도와 월 표시 업데이트
        if (mergedOptions.displayData === 'dropdown') {
            // 드롭다운 값 업데이트
            const select = displayData.querySelector('select');
            if (select) {
                select.value = date.format('YYYY-MM');
            }
        } else {
            displayData.textContent = date.format('YYYY년 M월');
        }

        // 현재 달의 첫째 날의 요일과 마지막 날의 날짜
        const firstDayOfMonth = date.startOf('month').day();
        const daysInMonth = date.daysInMonth();

        // 이전 달의 마지막 날의 날짜
        const lastDayOfPrevMonth = date.subtract(1, 'month').endOf('month').date();

        // 다음 달의 첫째 날의 날짜
        date.add(1, 'month'); // 다음 달로 다시 설정
        const firstDayOfNextMonth = date.startOf('month').date();

        // 테이블 초기화
        tableBody.innerHTML = '';

        // 첫째 날의 요일에 따라 테이블 시작 위치 설정
        let dayIndex = 0;
        let row = tableBody.insertRow();

        // 첫째 날 이전의 빈 칸에 이전 달의 날짜 채우기
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

        // 날짜 채우기
        for (let day = 1; day <= daysInMonth; day++) {
            const cell = row.insertCell();
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = day;
            cell.appendChild(link);

            // 사용자 데이터 추가 함수 호출
            addUserDataToCell(cell, date.date(day));

            // 클릭 이벤트 리스너 등록
            link.addEventListener('click', (event) => {
                event.preventDefault();
                handleLinkClick(date, day); // 외부 함수 호출
            });

            // 오늘 날짜에 today 클래스 추가
            if (date.date(day).isSame(dayjs(), 'day')) {
                cell.classList.add('today');
            }

            // 일요일, 토요일일 경우 클래스 추가
            const weekday = (firstDayOfMonth + day - 1) % 7;
            if (weekday === 0 || weekday === 6) {
                cell.classList.add('holiday');
            }

            // 일주일이 다 차면 새로운 행 생성
            if (++dayIndex % 7 === 0 && day < daysInMonth) {
                row = tableBody.insertRow();
            }
        }

        // 다음 달의 첫째 날짜로 채우기
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

        // 마지막 날 이후에 빈 칸 추가
        const remainingCells = 7 - (dayIndex % 7);
        if (remainingCells !== 7) {
            for (let i = 0; i < remainingCells; i++) {
                const cell = row.insertCell();
                cell.classList.add('gray');
            }
        }
    }

    // 드롭다운 옵션 생성 함수
    function buildDropdownOptions(currentDate) {
        const select = document.createElement('select');

        // 현재 날짜 기준으로 과거 15개월을 생성
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
    }
};
// 클릭 이벤트 처리 함수
const handleLinkClick = (date, day) => {
    const selectedDay = dayjs(date).date(day).format('YYYYMMDD');
    const displayLayer = document.querySelector('.show-data-layer')
    if (!displayLayer) {        
        return;
    }
    displayLayer.classList.add('is-show');
    displayLayer.innerText = `${selectedDay} 날 등록한 모든 데이터`;
    console.log(selectedDay);
}

// 사용자 데이터를 추가하는 함수
const addUserDataToCell = (cell, data) => {
    const userData = document.createElement('div');
    userData.classList.add('health-data-wrap');
    userData.innerHTML = `
        <div class="dot type-meal"></div>
        <div class="dot type-work-out"></div>
        <div class="dot type-nutrition"></div>
    `;
    cell.appendChild(userData);
}

 

// 주간달력 스크립트    
export const createWeeklyCalendar = (containerId, options = {}) => {
    const container = document.getElementById(containerId);
    if (!container) {
        // console.error(`Element with id '${containerId}' not found.`);
        return;
    }

    const calendarHeader = container.querySelector('.calendar__header');

    // Day.js 한국어 로케일 설정
    dayjs.locale('ko');

    // Day.js 플러그인 로드
    dayjs.extend(window.dayjs_plugin_isSameOrBefore);

    let currentDate = dayjs();
    displayWeeklyCalendar(currentDate);

    // Check if 'button' option is enabled
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

    function displayWeeklyCalendar(date) {
        const displayData = container.querySelector('.display-data');
        const weekDatesList = container.querySelector('#weekDates');

        const startOfWeek = date.startOf('week');
        const endOfWeek = date.endOf('week');

        // Display the date range based on 'displayDay' option
        if (options.displayDay === 'WeeklyRange') {
            displayData.textContent = `${startOfWeek.format('YYYY년 M월 D일')} - ${endOfWeek.format('M월 D일')}`;
        } else if (options.displayDay === 'onlyToday') {
            displayData.textContent = dayjs().format('YYYY-MM-DD');
        }

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
    const selectedDay = day.format('YYYY-MM-DD');
    const today = dayjs().format('YYYY-MM-DD');

    if (selectedDay === today) {
        document.querySelector('.detail-section').innerText = '오늘';
    } else {
        document.querySelector('.detail-section').innerText = selectedDay;
    }
};

const addUserDataToWeeklyLink = (link) => {    
    const userData = document.createElement('div');
    userData.classList.add('health-data-wrap');
    userData.innerHTML = `
        <div class="dot type-meal"></div>
        <div class="dot type-work-out"></div>
        <div class="dot type-nutrition"></div>
    `; 
    link.parentElement.appendChild(userData);
};


