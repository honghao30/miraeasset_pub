"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DateRangePicker = /*#__PURE__*/function () {
  function DateRangePicker(startDateId, endDateId) {
    _classCallCheck(this, DateRangePicker);
    this.startDateInput = document.getElementById(startDateId);
    this.endDateInput = document.getElementById(endDateId);

    // Get today's date as default
    var today = dayjs().format('YYYY-MM-DD');
    this.startDateInput.value = today;
    this.endDateInput.value = today;

    // Bind event listeners
    this.startDateInput.addEventListener('change', this.handleStartDateChange.bind(this));
    this.endDateInput.addEventListener('change', this.handleEndDateChange.bind(this));
  }
  return _createClass(DateRangePicker, [{
    key: "handleStartDateChange",
    value: function handleStartDateChange() {
      var startDate = dayjs(this.startDateInput.value);
      var endDate = dayjs(this.endDateInput.value);

      // Ensure start date is before or the same as end date
      if (startDate.isAfter(endDate)) {
        this.endDateInput.value = this.startDateInput.value;
      }
    }
  }, {
    key: "handleEndDateChange",
    value: function handleEndDateChange() {
      var startDate = dayjs(this.startDateInput.value);
      var endDate = dayjs(this.endDateInput.value);

      // Check if end date is before start date
      if (endDate.isBefore(startDate)) {
        // Show an alert message
        alert('종료일은 시작일보다 이전일 수 없습니다. 시작일로 설정됩니다.');
        // Set end date to start date
        this.endDateInput.value = this.startDateInput.value;
      }
    }
  }]);
}();
var calendar = new DateRangePicker('startDate', 'endDate');

// 월간 달력
var createMonthlyCalendar = function createMonthlyCalendar(containerId) {
  var container = document.getElementById(containerId);
  if (!container) {
    console.error("Element with id '".concat(containerId, "' not found."));
    return;
  }

  // 현재 날짜로 초기화
  var currentDate = dayjs();

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
    var displayData = container.querySelector('.display-data');
    var tableBody = container.querySelector('.calendar__content tbody');

    // 연도와 월 표시 업데이트
    displayData.textContent = date.format('YYYY년 M월');

    // 현재 달의 첫째 날의 요일과 마지막 날의 날짜
    var firstDayOfMonth = date.startOf('month').day();
    var daysInMonth = date.daysInMonth();

    // 이전 달의 마지막 날의 날짜
    var lastDayOfPrevMonth = date.subtract(1, 'month').endOf('month').date();

    // 다음 달의 첫째 날의 날짜
    var firstDayOfNextMonth = date.add(1, 'month').startOf('month').date();

    // 테이블 초기화
    tableBody.innerHTML = '';

    // 첫째 날의 요일에 따라 테이블 시작 위치 설정
    var dayIndex = 0;
    var row = tableBody.insertRow();

    // 첫째 날 이전의 빈 칸에 이전 달의 날짜 채우기
    for (var i = 0; i < firstDayOfMonth; i++) {
      var cell = row.insertCell();
      var prevMonthDay = lastDayOfPrevMonth - (firstDayOfMonth - i - 1);
      var link = document.createElement('a');
      link.href = '#';
      link.textContent = prevMonthDay;
      cell.appendChild(link);
      cell.classList.add('gray');
      dayIndex++;
    }

    // 날짜 채우기
    var _loop = function _loop(day) {
      var cell = row.insertCell();
      var link = document.createElement('a');
      link.href = '#';
      link.textContent = day;
      cell.appendChild(link);

      // 사용자 데이터 추가 함수 호출
      addUserDataToCell(cell, date.date(day));

      // 클릭 이벤트 리스너 등록
      link.addEventListener('click', function (event) {
        event.preventDefault();
        handleLinkClick(date, day); // 외부 함수 호출
      });

      // 일요일, 토요일일 경우 클래스 추가
      var weekday = (firstDayOfMonth + day - 1) % 7;
      if (weekday === 0 || weekday === 6) {
        cell.classList.add('holiday');
      }

      // 일주일이 다 차면 새로운 행 생성
      if (++dayIndex % 7 === 0 && day < daysInMonth) {
        row = tableBody.insertRow();
      }
    };
    for (var day = 1; day <= daysInMonth; day++) {
      _loop(day);
    }

    // 다음 달의 첫째 날짜로 채우기
    var nextMonthDay = 1;
    while (dayIndex % 7 !== 0) {
      var _cell = row.insertCell();
      var _link = document.createElement('a');
      _link.href = '#';
      _link.textContent = nextMonthDay;
      _cell.appendChild(_link);
      _cell.classList.add('gray');
      dayIndex++;
      nextMonthDay++;
    }

    // 마지막 날 이후에 빈 칸 추가
    var remainingCells = 7 - dayIndex % 7;
    if (remainingCells !== 7) {
      for (var _i = 0; _i < remainingCells; _i++) {
        var _cell2 = row.insertCell();
        _cell2.classList.add('gray');
      }
    }
  }
};
//클릭 이벤트
var handleLinkClick = function handleLinkClick(date, day) {
  var selectedDay = dayjs(date).date(day).format('YYYYMMDD');
  document.querySelector('.show-data-layer').classList.add('is-show');
  document.querySelector('.show-data-layer').innerText = "".concat(selectedDay, " \uB0A0 \uB4F1\uB85D\uD55C \uBAA8\uB4E0 \uB370\uC774\uD130");
  console.log(selectedDay);
};

// 사용자 데이터를 추가하는 함수
var addUserDataToCell = function addUserDataToCell(cell, date) {
  var userData = document.createElement('div');
  userData.classList.add('heart');
  userData.textContent = "\u26635\u2663"; // 여기서 API로 받은 데이터를 설정합니다
  cell.appendChild(userData);
};

// 페이지 로드 시 createMonthlyCalendar 함수 호출
createMonthlyCalendar('calendarContainer');
// 주간
var createWeeklyCalendar = function createWeeklyCalendar(containerId) {
  var container = document.getElementById(containerId);
  if (!container) {
    console.error("Element with id '".concat(containerId, "' not found."));
    return;
  }

  // Day.js 플러그인 로드
  dayjs.extend(window.dayjs_plugin_isSameOrBefore);
  var currentDate = dayjs();
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
    var displayData = container.querySelector('.display-data');
    var weekDatesList = container.querySelector('#weekDates');
    var startOfWeek = date.startOf('week');
    var endOfWeek = date.endOf('week');
    displayData.textContent = "".concat(startOfWeek.format('YYYY년 M월 D일'), " - ").concat(endOfWeek.format('M월 D일'));
    weekDatesList.innerHTML = '';
    var day = startOfWeek;
    var _loop2 = function _loop2() {
      var listItem = document.createElement('li');
      var link = document.createElement('a');
      var dayDiv = document.createElement('div');
      dayDiv.classList.add('day');
      dayDiv.textContent = " ".concat(day.date());

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
      (function (currentDay) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          handleWeeklyLinkClick(currentDay);
        });
      })(day);
      day = day.add(1, 'day');
    };
    while (day.isSameOrBefore(endOfWeek)) {
      _loop2();
    }
  }
};
var handleWeeklyLinkClick = function handleWeeklyLinkClick(day) {
  var selectedDay = day.format('YYYYMMDD');
  document.querySelector('.detail-section').innerText = "".concat(selectedDay, " \uC77C \uB4F1\uB85D\uD55C \uBAA8\uB4E0 \uB370\uC774\uD130");
};
var addUserDataToWeeklyLink = function addUserDataToWeeklyLink(link) {
  var userData = document.createElement('div');
  userData.classList.add('heart');
  userData.textContent = '♣5♣'; // API에서 받은 데이터로 설정
  link.appendChild(userData);
};
createWeeklyCalendar('calendarWeekly');