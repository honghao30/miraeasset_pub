import dayjs from 'dayjs'
class DateRangePicker {
    constructor(startDateId, endDateId) {
        this.startDateInput = document.getElementById(startDateId);
        this.endDateInput = document.getElementById(endDateId);

        // Get today's date as default
        const today = dayjs().format('YYYY-MM-DD');
        this.startDateInput.value = today;
        this.endDateInput.value = today;

        // Bind event listeners
        this.startDateInput.addEventListener('change', this.handleStartDateChange.bind(this));
        this.endDateInput.addEventListener('change', this.handleEndDateChange.bind(this));
    }

    handleStartDateChange() {
        const startDate = dayjs(this.startDateInput.value);
        const endDate = dayjs(this.endDateInput.value);

        // Ensure start date is before or the same as end date
        if (startDate.isAfter(endDate)) {
            this.endDateInput.value = this.startDateInput.value;
        }
    }

    handleEndDateChange() {
        const startDate = dayjs(this.startDateInput.value);
        const endDate = dayjs(this.endDateInput.value);

        // Check if end date is before start date
        if (endDate.isBefore(startDate)) {
            // Show an alert message
            alert('종료일은 시작일보다 이전일 수 없습니다. 시작일로 설정됩니다.');
            // Set end date to start date
            this.endDateInput.value = this.startDateInput.value;
        }
    }
}

const calendar = new DateRangePicker('startDate', 'endDate');

// 월간 달력
const createMonthlyCalendar = (containerId) => {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Element with id '${containerId}' not found.`);
        return;
    }

    // 현재 날짜로 초기화
    let currentDate = dayjs();

    // 초기 달력 표시
    displayCalendar(currentDate);

    // 이전 달력 보기 버튼 클릭 이벤트
    container.querySelector('.calendar__header button:first-child').addEventListener('click', function () {
        currentDate = currentDate.subtract(1, 'month');
        displayCalendar(currentDate);
    });

    // 다음 달력 보기 버튼 클릭 이벤트
    container.querySelector('.calendar__header button:last-child').addEventListener('click', function () {
        currentDate = currentDate.add(1, 'month');
        displayCalendar(currentDate);
    });

    // 달력을 표시하는 함수
    function displayCalendar(date) {
        const displayData = container.querySelector('.display-data');
        const tableBody = container.querySelector('.calendar__content tbody');

        // 연도와 월 표시 업데이트
        displayData.textContent = date.format('YYYY년 M월');

        // 현재 달의 첫째 날의 요일과 마지막 날의 날짜
        const firstDayOfMonth = date.startOf('month').day();
        const daysInMonth = date.daysInMonth();

        // 이전 달의 마지막 날의 날짜
        const lastDayOfPrevMonth = date.subtract(1, 'month').endOf('month').date();

        // 다음 달의 첫째 날의 날짜
        const firstDayOfNextMonth = date.add(1, 'month').startOf('month').date();

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
};
//클릭 이벤트
const handleLinkClick = (date, day) => {
    const selectedDay = dayjs(date).date(day).format('YYYYMMDD');
    document.querySelector('.show-data-layer').classList.add('is-show');
    document.querySelector('.show-data-layer').innerText = `${selectedDay} 날 등록한 모든 데이터`;
    console.log(selectedDay);
};

// 사용자 데이터를 추가하는 함수
const addUserDataToCell = (cell, date) => {
    const userData = document.createElement('div');
    userData.classList.add('heart');
    userData.textContent = `♣5♣`; // 여기서 API로 받은 데이터를 설정합니다
    cell.appendChild(userData);
};


// 페이지 로드 시 createMonthlyCalendar 함수 호출
createMonthlyCalendar('calendarContainer');
// 주간
const createWeeklyCalendar = (containerId) => {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Element with id '${containerId}' not found.`);
        return;
    }

    // Day.js 플러그인 로드
    dayjs.extend(window.dayjs_plugin_isSameOrBefore);

    let currentDate = dayjs();
    displayWeeklyCalendar(currentDate);

    container.querySelector('#prevWeek').addEventListener('click', function () {
        currentDate = currentDate.subtract(1, 'week');
        displayWeeklyCalendar(currentDate);
    });

    container.querySelector('#nextWeek').addEventListener('click', function () {
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

            // 일요일(0)과 토요일(6) 체크하여 'holiday' 클래스 추가
            if (day.day() === 0 || day.day() === 6) {
                dayDiv.classList.add('holiday');
            }

            link.href = '#';
            link.appendChild(dayDiv);
            listItem.appendChild(link);
            weekDatesList.appendChild(listItem);

            // 사용자 데이터 추가
            addUserDataToWeeklyLink(link);

            // 클릭 이벤트 리스너 추가
            (function(currentDay) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    handleWeeklyLinkClick(currentDay);
                });
            })(day);

            day = day.add(1, 'day');
        }
    }
};

const handleWeeklyLinkClick = (day) => {
    const selectedDay = day.format('YYYYMMDD');
    document.querySelector('.detail-section').innerText = `${selectedDay} 일 등록한 모든 데이터`;
};

const addUserDataToWeeklyLink = (link) => {
    const userData = document.createElement('div');
    userData.classList.add('heart');
    userData.textContent = '♣5♣'; // API에서 받은 데이터로 설정
    link.appendChild(userData);
};
createWeeklyCalendar('calendarWeekly');


