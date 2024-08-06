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

// 부모 찾기
export const searchIdx = (el, cls) => {
    if (!el) {
        return;
    }
    if (el.classList.contains(cls)) {
        return el;
    }
    return searchIdx(el.parentElement, cls);
}

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
export const checkInputFocus = (inputAdditionalFn) => {
    const inputs = document.querySelectorAll('.form-element__inner input[type="text"]');
    const handleInputKeyup = (event) => {
        const nextSibling = event.target.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('btn-remove')) {
            nextSibling.classList.add('is-show');
        } 
        if (event.target.value === '') {
            nextSibling.classList.remove('is-show');
        }
        // 추가로 전달된 함수 실행
        if (inputAdditionalFn) {
            inputAdditionalFn(event);
        }
    };
    const handleBtnRemoveClick = (event) => {
        const input = event.target.previousElementSibling;
        input.value = '';
        event.target.classList.remove('is-show');
        // 추가로 전달된 함수 실행
        if (inputAdditionalFn) {
            inputAdditionalFn(event);
        }
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
        document.querySelector(".btm-dimmed").classList.toggle("is-collapsed");
        document.body.classList.toggle("is-collapsed");
    });
    const closeButton = document.querySelector('.btn-close-sheet');
    if (closeButton && closeButton.closest(".type-modal.is-collapsed")) {
        document.querySelector(".btm-dimmed").classList.add("is-collapsed");
        document.body.classList.add("is-collapsed");
    }

    closeButton && closeButton.addEventListener('click', () => {        
        const bottomPos = closeButton.closest('.type-modal').clientHeight;
        closeButton.closest('.type-modal').style.bottom = -bottomPos + 'px';
        setTimeout(() => {
            document.querySelector('.type-modal').classList.remove('is-collapsed');
            document.querySelector(".btm-dimmed").classList.remove("is-collapsed");
            document.body.classList.remove("is-collapsed");
        },300);          
    });
}

// 탭메뉴
export const tabMenus = (tabGroupSelector, tabType) => {
    const tabGroups = document.querySelectorAll(tabGroupSelector);
    if (!tabGroups.length) return;

    tabGroups.forEach((tabGroup) => {
        const tabTigers = tabGroup.querySelectorAll(".tab-button-list li a");
        const tabPanes = tabGroup.querySelectorAll(".tab-pane1s > div");

        tabTigers.forEach((tab, index) => {
            tab.addEventListener("click", (event) => {
                event.preventDefault();

                tabTigers.forEach((btn) => btn.parentElement.classList.remove("is-active"));
                tab.parentElement.classList.add("is-active");

                if (tabType !== 'onlyTab' && tabType !== null) {
                    tabPanes.forEach((pane) => pane.classList.remove("is-active"));
                    tabPanes[index].classList.add("is-active");
                }

                tab.parentElement.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            });
        });
    });
};

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
export const dropdownMenu = (menuSelector) => {   
    const dropdownMenus = document.querySelectorAll(menuSelector); 

    dropdownMenus.forEach(menu => {
        const trigger = menu.querySelector('.btn-dropdown');
        const siblings = getNextSibling(trigger); 

        trigger.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const isActive = trigger.classList.toggle('is-active');                       
            siblings.classList.toggle('is-active', isActive);
        });

        const optionList = menu.querySelectorAll('.dropdown_list li button');
        optionList.forEach(option => {
            option.addEventListener('click', () => {
                const selectedValue = option.getAttribute('data-option');
                trigger.textContent = selectedValue;

                menu.querySelectorAll('.dropdown_list li').forEach(item => {
                    item.classList.remove('is-active');
                });

                option.parentElement.classList.add('is-active');
                trigger.classList.remove('is-active');
                siblings.classList.remove('is-active');
            });
        });
    });

    document.addEventListener("click", function(e) {        
        dropdownMenus.forEach(menu => {
            const trigger = menu.querySelector('.btn-dropdown');
            const siblings = getNextSibling(trigger);

            if (!menu.contains(e.target) && !e.target.closest('.btn-dropdown')) {                
                trigger.classList.remove('is-active');
                siblings.classList.remove('is-active');
            }
        });
    });
};

// 모달 열기
export const openModal = (event, type) => {
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
window.openModal = openModal;
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
export const closeModal = (event, openButton) => {
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
window.closeModal = closeModal;
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


// 클래스 추가/삭제
export const setCls = (el, cls, type) => {
    type !== 'remove' ? el.classList.add(cls) : el.classList.remove(cls);
};

// 형제 찾기
export const getNextSibling = (el) => {
    if (!el || !el.parentElement) return null; // 요소가 없거나 부모가 없는 경우 null 반환
    return el.nextElementSibling;
};

// 토글
export const openToggleBox = (el) => {
    const _toggles = el.dataset.toggle;
    const _trueText = el.dataset.truetext;
    const _falseText = el.dataset.falsetext;
    const _target = el.parentNode;

    if (_target.classList.contains('toggle__wrap')) {
        if (_target.classList.contains(_toggles)) {
            _target.classList.remove(_toggles);
            if(_trueText) el.innerText = _trueText;
        } else {
            _target.classList.add(_toggles);
            if(_falseText) el.innerText = _falseText;
        }
    }
};

//삭제 버튼 
export const removeButton = (el, target, callback) => {
    const buttons = document.querySelectorAll(el);
    buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const targetEl = document.querySelector(target);
            if (targetEl) {
                targetEl.remove();
            }
            if (typeof callback === 'function') {
                callback(event);
            }
        });
    });
};

//infinite scroll
export const infiniteScroll = (loadMoreContent, totalLoadedItems, maxItems, ms) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    loadMoreContent().then(hasMoreContent => {
                        if (!hasMoreContent) {
                            observer.unobserve(entry.target); // 더 이상 로드할 콘텐츠가 없으면 관찰 중지
                            entry.target.style.display = 'none'; // .scroll-target 요소 숨기기
                        }
                    });
                }, ms); //지연 추가
            }
        });
    }, { threshold: 0.9 });

    const targetElement = document.querySelector('.scroll-target');
    if (targetElement) {
        observer.observe(targetElement);
    } else {
        console.error("Target element not found for intersection observer.");
    }
};


//아코디언
export const accordion = (container, openIndex) => {
    const accordionContainers = document.querySelectorAll(container);

    if (accordionContainers.length > 0) {
        accordionContainers.forEach((acc, index) => {
            const items = acc.querySelectorAll('.accordion-item');

            // openIndex가 주어진 경우 해당 항목을 활성화 상태로 설정
            if (typeof openIndex === 'number' && items[openIndex]) {
                items[openIndex].classList.add('is-active');
                const content = items[openIndex].querySelector('.accordion-content');
                content.style.height = `${content.scrollHeight} + 29 + px`;
            }
            
            acc.addEventListener('click', event => {
                if (event.target.tagName === 'BUTTON') {
                    const _this = event.target;
                    const parentItem = _this.parentElement.parentElement;
                    const content = parentItem.querySelector('.accordion-content');
                    
                    // 모든 활성화된 항목을 비활성화
                    document.querySelectorAll('.accordion-item.is-active').forEach(item => {
                        if (item !== parentItem) {
                            const activeContent = item.querySelector('.accordion-content');
                            activeContent.style.height = '0';
                            item.classList.remove('fade-in');
                            setTimeout(() => {
                                item.classList.remove('is-active');
                            }, 500);
                        }
                    });                    
                    
                    // 현재 클릭된 항목을 토글
                    if (parentItem.classList.contains('is-active')) {
                        content.style.height = '0';
                        setTimeout(() => {
                            parentItem.classList.remove('is-active');
                        }, 0);
                        setTimeout(() => {
                            parentItem.classList.remove('fade-in');
                        }, 300);
                    } else {
                        parentItem.classList.add('is-active');
                        setTimeout(() => {
                            content.style.height = `${content.scrollHeight + 29}px`;
                            parentItem.classList.add('fade-in');
                        }, 10);
                    }

                }
            });
        });
    }
}

//토스트팝업
export function openToast(id) {
    const toast = document.getElementById(id);
    toast.style.visibility = "visible";
    toast.classList.add("show");
    setTimeout(() => {
        closeToast(id);
    }, 3000); // 3초 동안 토스트 표시
}
export function closeToast(id) {
    const toast = document.getElementById(id);
    toast.classList.remove("show");
    toast.addEventListener("transitionend", function handleTransitionEnd(event) {
        if (event.propertyName === "opacity" && !toast.classList.contains("show")) {
        toast.style.visibility = "hidden";
        adjustToast();
        toast.removeEventListener("transitionend", handleTransitionEnd);
        }
    });
}
export function adjustToast() {
    const toasts = document.querySelectorAll(".toast--wrap__msg");
    let bottom = 56;
    toasts.forEach((toast) => {
        if (toast.style.visibility === "visible") {
        toast.style.transform = `translateY(${bottom}px)`;
        bottom += toast.offsetHeight + 10;
        }
    });
}