"use strict";

// 모달 열기
var openModal = function openModal(event, type) {
  var btn = event.target;
  var modalId = btn.getAttribute('modal-id');
  var target = document.getElementById(modalId);
  var wa = btn.getAttribute('aria-haspopup');
  if (btn) {
    btn.classList.add('modal-open');
  }
  if (target) {
    target.style.display = 'block';
    setTimeout(function () {
      target.classList.add('is-active');
      document.body.classList.add('modal-open');
    }, 300);
  }
  setTimeout(function () {
    if (wa) {
      tabEvent(btn, target);
    }
  }, 300);
};

// 모달 외부 클릭 이벤트 핸들러
document.addEventListener("click", function (e) {
  if (e.target.classList.contains('modal__wrap--bg')) {
    var activeModal = document.querySelector('.modal__wrap--bg.is-active');
    setTimeout(function () {
      activeModal.classList.remove('is-active');
      document.body.classList.remove('modal-open');
    }, 300);
    activeModal.style.display = 'none';
  }
});

//모달창 닫기
var closeModal = function closeModal(event, openButton) {
  var btn = event.currentTarget;
  var activeModal = btn.closest('.modal__wrap--bg');
  if (activeModal) {
    if (openButton) {
      openButton.classList.remove('modal-open');
    }
    activeModal.classList.remove('is-active');
    document.body.classList.remove('modal-open');
    setTimeout(function () {
      activeModal.style.display = 'none';
      // 접근성 탭 이동 이벤트 호출
      if (openButton) {
        tabEvent(openButton, activeModal);
      }
    }, 300);
  }
};

// 접근성 탭 이동
var tabEvent = function tabEvent(btn, el) {
  var isModalOpen = el.classList.contains('is-active');
  var modalWrap = el.querySelector('.modal__wrap');
  if (isModalOpen) {
    if (modalWrap) {
      modalWrap.setAttribute('tabindex', '0');
      modalWrap.focus();
    }
    btn.setAttribute('aria-expanded', 'true');
  } else {
    if (modalWrap) {
      modalWrap.setAttribute('tabindex', '');
    }
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  }
};
var addCloseModalListeners = function addCloseModalListeners(target, openButton) {
  var closeButtons = target.querySelectorAll('.close-modal');
  closeButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      return closeModal(event, openButton);
    });
  });
};

// 탭메뉴
function tabMenus(tabGroupSelector) {
  var tabGroup = document.querySelector(tabGroupSelector);
  if (!tabGroup) return;
  var tabButtons = tabGroup.querySelectorAll('.tab-button-list li a');
  var tabPanes = tabGroup.querySelectorAll('.tab-pane1');
  if (!tabButtons.length || !tabPanes.length) return;
  tabButtons.forEach(function (button, index) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      handleTabClick(index);
    });
  });
  function handleTabClick(index) {
    tabButtons.forEach(function (btn) {
      return btn.parentElement.classList.remove('is-active');
    });
    tabButtons[index].parentElement.classList.add('is-active');
    tabPanes.forEach(function (pane) {
      return pane.classList.remove('is-active');
    });
    tabPanes[index].classList.add('is-active');
  }
}

// UUID생성
var generateUniqueId = function generateUniqueId() {
  return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

// form 제어
var checkLabel = function checkLabel() {
  var formElements = document.querySelectorAll('.form-element__wrap');
  formElements.forEach(function (el) {
    var uniqueId = generateUniqueId();

    // Label 설정
    var label = el.querySelector('label');
    if (label) {
      label.setAttribute('for', uniqueId);
    }

    // Input 설정
    var inputItems = el.querySelectorAll('input');
    if (inputItems.length > 0) {
      var firstInput = inputItems[0];
      firstInput.setAttribute('id', uniqueId);
      var setTitle = label.textContent;
      inputItems.forEach(function (input, index) {
        input.setAttribute('title', setTitle + ' ' + (index + 1) + '번째 자리');
      });
    }

    //select box
    var selectItems = el.querySelectorAll('select');
    if (selectItems.length > 0) {
      var firstSelectItems = selectItems[0];
      firstSelectItems.setAttribute('id', uniqueId);
      var _setTitle = label.textContent;
      selectItems.forEach(function (select, index) {
        select.setAttribute('title', _setTitle + ' ' + (index + 1) + '선택하세요');
      });
    }
  });
};
checkLabel();

//숫자에 콤마
var numComma = function numComma(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 숫자 애니메이션
var animateNumbers = function animateNumbers() {
  var ANIMATION_SPEED = 100;
  var numberCounts = document.querySelectorAll('.text-ani');
  numberCounts.forEach(function (number) {
    var num = parseInt(number.getAttribute('data-num'));
    var count = 0;
    var increment = Math.ceil(num / 100);
    animateNumber(number, count, increment, num);
  });
};
var animateNumber = function animateNumber(element, count, increment, target) {
  var updateNumber = function updateNumber() {
    count += increment;
    if (count <= target) {
      element.textContent = count.toLocaleString();
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = target.toLocaleString();
    }
  };
  requestAnimationFrame(updateNumber);
};

// dot pin
var checkDotPin = function checkDotPin(pw) {
  var pwStr = pw.toString(); // 비밀번호를 문자열로 변환
  var dotPinsFrame = document.querySelectorAll('.pin-dot');
  var passWord = []; // 입력된 키 값을 저장할 배열

  dotPinsFrame.forEach(function (frame) {
    var dotPins = frame.querySelectorAll('.dot');
    var currentIndex = 0; // 현재 입력된 키의 인덱스

    document.addEventListener('keydown', function (event) {
      var keyValue = event.key;
      if (currentIndex < dotPins.length) {
        dotPins[currentIndex].classList.add('is-active');
        passWord.push(keyValue); // 현재 키를 비밀번호 배열에 추가
        currentIndex++;

        // 4번째 키 입력이 끝나면 자동으로 검증
        if (currentIndex === 4) {
          var inputPassword = passWord.join(''); // 입력된 비밀번호 문자열 생성
          var compare = pwStr === inputPassword;
          if (compare) {
            console.log('비밀번호 일치');
          } else {
            console.log('비밀번호 불일치');
          }
        }
      }
      if (passWord.length > 4) {
        console.log('You have entered 4 keys already.');
        return;
      }
    });
  });
};

//dropdown menu  
var dropdownMenus = document.querySelectorAll('.dropdown-menu__wrap');
function handleDropdownMenu(menu) {
  var selectedOptionButton = menu.querySelector('.btn-dropdown');
  var optionList = menu.querySelectorAll('.dropdown_list li button');
  function toggleMenu() {
    dropdownMenus.forEach(function (m) {
      if (m !== menu) {
        m.classList.remove('is-active');
        m.querySelector('.btn-dropdown').classList.remove('is-active');
        m.querySelector('.dropdown_list').classList.remove('is-active');
      }
    });
    menu.classList.toggle('is-active');
    selectedOptionButton.classList.toggle('is-active');
    selectedOptionButton.nextElementSibling.classList.toggle('is-active');
  }
  selectedOptionButton.addEventListener('click', toggleMenu);
  optionList.forEach(function (option) {
    option.addEventListener('click', function () {
      var selectedValue = option.getAttribute('data-option');
      selectedOptionButton.textContent = selectedValue;
      menu.querySelectorAll('.dropdown_list li').forEach(function (item) {
        item.classList.remove('is-active');
      });
      option.parentElement.classList.add('is-active');
      toggleMenu();
    });
  });
  document.addEventListener("click", function (e) {
    if (menu.classList.contains('is-active') && !e.target.closest('.dropdown-menu__wrap')) {
      menu.classList.remove('is-active');
      selectedOptionButton.classList.remove('is-active');
      selectedOptionButton.nextElementSibling.classList.remove('is-active');
    }
  });
}
dropdownMenus.forEach(handleDropdownMenu);

//스크롤 이벤트
var ScrollEnterMain = function ScrollEnterMain() {
  var scrollElements = document.querySelectorAll(".animation-enter");
  if (!scrollElements) return;
  var elementInView = function elementInView(el) {
    var dividend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
  };
  var elementOutofView = function elementOutofView(el) {
    return el.getBoundingClientRect().top > (window.innerHeight || document.documentElement.clientHeight);
  };
  var displayScrollElement = function displayScrollElement(element) {
    return element.classList.add("fade-in");
  };
  var hideScrollElement = function hideScrollElement(element) {
    element.classList.remove("fade-in", "left-enter-effect", "right-enter-effect", "shadow-effect", "scroll-up");
  };
  var handleScrollAnimation = function handleScrollAnimation() {
    scrollElements.forEach(function (el) {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
        el.classList.toggle('left-enter-effect', el.hasAttribute('left-enter'));
        el.classList.toggle('right-enter-effect', el.hasAttribute('right-enter'));
        el.classList.toggle('shadow-effect', el.hasAttribute('shadow-effect'));
        el.classList.toggle('scroll-up', el.hasAttribute('scrollUp'));
        displayAnimation();
      } else if (elementOutofView(el)) {
        hideScrollElement(el);
      }
    });
  };
  window.addEventListener("scroll", handleScrollAnimation);
};
ScrollEnterMain();
var isAnimated = false;
var displayAnimation = function displayAnimation() {
  if (!isAnimated) {
    animateNumbers();
    isAnimated = true;
  }
};
// 위 아래 구분을 위한 스크립트
// let lastScrollTop = 0;
// const scrollEventManage = () => {
// const Yoffset = window.pageYOffset || document.documentElement.scrollTop;

// if (Yoffset > lastScrollTop) {
//     // downscroll code
//     console.log("scroll Down")
//     onDownScroll();
// } else {
//     console.log("scroll Up")
//     onUpScroll();
// }
// lastScrollTop = Yoffset <= 0 ? 0 : Yoffset;
// }
// window.addEventListener("scroll", scrollEventManage);
// 위 아래 구분을 위한 스크립트====================

// const onDownScroll = () => {
// Additional downscroll logic
// This function will be called when scrolling down
// Add your additional downscroll actions here
// }

// const onUpScroll = () => {
// Additional upscroll logic
// This function will be called when scrolling up
// Add your additional upscroll actions here
// }