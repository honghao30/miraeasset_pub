/***************************
 * UI common function * 
 ***************************/
// util
// UUID생성
const generateUniqueId = () => {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// form 제어
export const checkLabel = () => {
    const formElements = document.querySelectorAll('.form-element__wrap');
    
    formElements.forEach(el => {
        const uniqueId = generateUniqueId();
        
        // Label 설정
        const label = el.querySelector('label');
        if (label) {
            label.setAttribute('for', uniqueId);
        }
        
        // Input 설정
        const inputItems = el.querySelectorAll('input');
        if (inputItems.length > 0) {
            const firstInput = inputItems[0];
            firstInput.setAttribute('id', uniqueId);
            const setTitle = label.textContent;
            inputItems.forEach((input, index) => {
                input.setAttribute('title', setTitle + ' ' + (index + 1) + '번째 자리');
            })
        }

        //select box
        const selectItems = el.querySelectorAll('select');
        if (selectItems.length > 0) {
            const firstSelectItems = selectItems[0];
            firstSelectItems.setAttribute('id', uniqueId);
            const setTitle = label.textContent;
            selectItems.forEach((select, index) => {
                select.setAttribute('title', setTitle + ' ' + (index + 1) + '선택하세요');
            })
        }
    });
}

//숫자에 콤마
export const numComma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// text area 글자수 체크
export const checkTextArea = () => {
    const textareas = document.querySelectorAll('.form-element__inner textarea');
    textareas.forEach((textarea) => {
        textarea.addEventListener('input', () => {
            const count = textarea.value.length;
            const counter = textarea.nextElementSibling.querySelector('.count');
            const total = parseInt(textarea.nextElementSibling.querySelector('.total').textContent);

            if (counter) {
                counter.textContent = count;
                if (count > total) {
                    textarea.value = textarea.value.substring(0, total); // 입력값을 total 길이로 자름
                }
            }
        });
    });
}

// input 포커스 
export const checkInputFocus = () => {
    const inputs = document.querySelectorAll('.form-element__inner input[type="text"]');
    
    const handleInputKeyup = (event) => {
        const nextSibling = event.target.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('btn-remove')) {
            nextSibling.classList.add('is-show');
        }
    };

    const handleBtnRemoveClick = (event) => {
        const input = event.target.previousElementSibling;
        input.value = '';
        event.target.classList.remove('is-show');
    };

    inputs.forEach(input => {
        input.addEventListener('keyup', handleInputKeyup);
        const btnRemove = input.nextElementSibling;
        if (btnRemove && btnRemove.classList.contains('btn-remove')) {
            btnRemove.addEventListener('click', handleBtnRemoveClick);
        }
    });
};

// 핀번호 입력시 자동으로 다음칸 이동
export const focusNextInputOnMaxLength = (inputItems) => {
    const inputs = document.querySelectorAll(inputItems);    
    inputs.forEach((input, index, array) => {
        input.addEventListener('input', () => {
            if (input.value.length === parseInt(input.maxLength)) {
                if (index < array.length - 1) {
                    array[index + 1].focus();
                }
            }
        });
    });
};

// bottom sheet
export const bottomSheetHandle = () => {
    const bottomSheetTrigger = document.querySelector('.btn-handle-sheet');    
    bottomSheetTrigger && bottomSheetTrigger.addEventListener('click', () => {
        document.querySelector('.type-handlebar').classList.toggle('is-collapsed');
    });
    const closeButton = document.querySelector('.btn-close-sheet');
    closeButton && closeButton.addEventListener('click', () => {        
        const bottomPos = closeButton.closest('.type-modal').clientHeight;
        closeButton.closest('.type-modal').style.bottom = -bottomPos + 'px';
        setTimeout(() => {
            document.querySelector('.type-modal').classList.remove('is-collapsed');
        },300);          
    });
}

// 탭메뉴
export const tabMenus = (tabGroupSelector) => {
    const tabGroup = document.querySelector(tabGroupSelector);
    if (!tabGroup) return; 

    const tabButtons = tabGroup.querySelectorAll('.tab-button-list li a');
    const tabPanes = tabGroup.querySelectorAll('.tab-pane1');

    if (!tabButtons.length || !tabPanes.length) return; 

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', event => {
            event.preventDefault();
            handleTabClick(index);
        });
    });

    function handleTabClick(index) {
        tabButtons.forEach(btn => btn.parentElement.classList.remove('is-active'));
        tabButtons[index].parentElement.classList.add('is-active');
        tabPanes.forEach(pane => pane.classList.remove('is-active'));
        tabPanes[index].classList.add('is-active');
    }
}

// dot pin
export const checkDotPin = (pw) => {
    const pwStr = pw.toString(); // 비밀번호를 문자열로 변환
    const dotPinsFrame = document.querySelectorAll('.pin-dot');  
    let passWord = []; // 입력된 키 값을 저장할 배열

    dotPinsFrame.forEach(frame => {
        const dotPins = frame.querySelectorAll('.dot');
        let currentIndex = 0; // 현재 입력된 키의 인덱스

        document.addEventListener('keydown', (event) => {
            let keyValue = event.key;

            if (currentIndex < dotPins.length) {
                dotPins[currentIndex].classList.add('is-active');
                passWord.push(keyValue); // 현재 키를 비밀번호 배열에 추가
                currentIndex++;

                // 4번째 키 입력이 끝나면 자동으로 검증
                if (currentIndex === 4) {
                    let inputPassword = passWord.join(''); // 입력된 비밀번호 문자열 생성
                    let compare = pwStr === inputPassword;

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
}

// 숫자 애니메이션
export const animateNumbers = () => {
    const ANIMATION_SPEED = 100;
    const numberCounts = document.querySelectorAll('.text-ani');
    numberCounts.forEach(number => {
        const num = parseInt(number.getAttribute('data-num'));
        let count = 0;
        const increment = Math.ceil(num / 100);

        animateNumber(number, count, increment, num);
    });
};

const animateNumber = (element, count, increment, target) => {
    const updateNumber = () => {
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

//dropdown menu  
export const handleDropdownMenu = (menu) => {
    const selectedOptionButton = menu.querySelector('.btn-dropdown');
    const optionList = menu.querySelectorAll('.dropdown_list li button');

    function toggleMenu() {        
        dropdownMenus.forEach(m => {
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
    optionList.forEach(option => {
        option.addEventListener('click', () => {
            const selectedValue = option.getAttribute('data-option');
            selectedOptionButton.textContent = selectedValue;

            menu.querySelectorAll('.dropdown_list li').forEach(item => {
                item.classList.remove('is-active');
            });

            option.parentElement.classList.add('is-active');
            toggleMenu();
        });
    });
    document.addEventListener("click", function(e) {
        if (menu.classList.contains('is-active') && !e.target.closest('.dropdown-menu__wrap')) {
            menu.classList.remove('is-active');
            selectedOptionButton.classList.remove('is-active');
            selectedOptionButton.nextElementSibling.classList.remove('is-active');
        }
    });
}

// 모달 열기
const openModal = (event, type) => {
    const btn = event.target;
    const modalId = btn.getAttribute('modal-id');
    const target = document.getElementById(modalId);
    const wa = btn.getAttribute('aria-haspopup');

    if (btn) {
        btn.classList.add('modal-open');
    }

    if (target) {        
        target.style.display = 'block';

        setTimeout(() => {
            target.classList.add('is-active');                
            document.body.classList.add('modal-open');
        }, 300);
    }
    setTimeout(() => {
        if (wa) {
            tabEvent(btn, target);
        }        
    }, 300); 
};

// 모달 외부 클릭 이벤트 핸들러
document.addEventListener("click", function(e) {    
    if (e.target.classList.contains('modal__wrap--bg')) {
        const activeModal = document.querySelector('.modal__wrap--bg.is-active');
        setTimeout(() => {
            activeModal.classList.remove('is-active');
            document.body.classList.remove('modal-open');     
        }, 300);         
        activeModal.style.display = 'none';
    }
});

//모달창 닫기
const closeModal = (event, openButton) => {
    const btn = event.currentTarget;
    const activeModal = btn.closest('.modal__wrap--bg');
    if (activeModal) {
        if (openButton) {
            openButton.classList.remove('modal-open');
        }

        activeModal.classList.remove('is-active')        
        document.body.classList.remove('modal-open');
        
        
        setTimeout(() => {
            activeModal.style.display = 'none';
            // 접근성 탭 이동 이벤트 호출
            if (openButton) {
                tabEvent(openButton, activeModal);
            }
        }, 300);
    }
};

// 접근성 탭 이동
const tabEvent = (btn, el) => {
    const isModalOpen = el.classList.contains('is-active');
    const modalWrap = el.querySelector('.modal__wrap');
    
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

const addCloseModalListeners = (target, openButton) => {
    const closeButtons = target.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => closeModal(event, openButton));
    });
};
