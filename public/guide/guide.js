window.addEventListener('load', function() {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // 임시 div에 응답 텍스트를 삽입
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = this.responseText;
                    // 원본 요소를 교체
                    el.outerHTML = tempDiv.innerHTML;
                    // 새로 삽입된 스크립트를 찾아서 실행
                    var scripts = tempDiv.getElementsByTagName('script');
                    for (var i = 0; i < scripts.length; i++) {
                        var script = document.createElement('script');
                        script.text = scripts[i].text;
                        document.body.appendChild(script);
                    }
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
    const changeUrl = () => {
        const allAnchors = document.querySelectorAll('a');
        const allLinks = document.querySelectorAll('link');
        const allScriptsWithSrc = document.querySelectorAll('script[src]');
        const allChangeTarget = [...allAnchors, ...allScriptsWithSrc];
        const nowUrl = window.location.href;
        const remoteUrl = nowUrl.indexOf('https://miraeasse.netlify.app/') !== -1;
    
        if (remoteUrl) {
            allLinks.forEach(link => {
                const intervalId = setInterval(() => {
                    let linkValue = link.getAttribute('href'); 
                    if (linkValue) {
                        // 맨 앞의 '../' 제거
                        linkValue = linkValue.replace(/^(\.\.\/)+/, '');
                        
                        if (linkValue.includes('public')) {
                            link.href = `https://miraeasse.netlify.app/${linkValue}`;
                        } else {
                            link.href = `https://miraeasse.netlify.app/public/${linkValue}`;
                        }
                        console.log('Updated link:', link.href);
    
                        // 링크가 업데이트되었으므로 interval을 중지합니다.
                        clearInterval(intervalId);
                    }
                }, 100);
            });
    
            allChangeTarget.forEach(element => {
                let hrefValue = element.getAttribute('href');
                let srcValue = element.getAttribute('src');
    
                if (hrefValue) {
                    hrefValue = hrefValue.replace(/^(\.\.\/)+/, '');
                    if (hrefValue.includes('public')) {
                        element.href = `https://miraeasse.netlify.app/${hrefValue}`;
                    } else {
                        element.href = `https://miraeasse.netlify.app/public/${hrefValue}`;
                    }
                    console.log('Updated anchor href:', element.href);
                }
    
                if (srcValue) {
                    srcValue = srcValue.replace(/^(\.\.\/)+/, '');
                    if (srcValue.includes('public')) {
                        element.src = `https://miraeasse.netlify.app/${srcValue}`;
                    } else {
                        element.src = `https://miraeasse.netlify.app/public/${srcValue}`;
                    }
                    console.log('Updated script src:', element.src);
                }
            });
        }
    };
    setTimeout(() => {
        // 함수 호출
        activateNavItem();        
        activateLnbItem();       
        changeUrl();      
    }, 400); 
    // 활성화할 네비게이션 항목 설정
    const activateNavItem = () => {        
        const location = window.location.href;
        const remoteUrl = location.includes('https://miraeasse.netlify.app/');
        const fileName = location.substring(location.lastIndexOf('/') + 1);
        let intervalId;
        const checkNavList = () => {
            const navList = document.querySelectorAll('.navgation__wrap--top li a');
            if (navList.length > 0) {                
                clearInterval(intervalId);
                navList.forEach(nav => {
                    if (nav.href.includes(fileName)) {
                        nav.parentElement.classList.add('is-active');                        
                    }
                });                    
            }
        };
        intervalId = setInterval(checkNavList, 100);
    };

    // 현재 페이지와 일치하는 LNB 항목 활성화
    const activateLnbItem = () => {
        const lnbList = document.querySelectorAll('.lnb_list li a');
        const nowUrl = window.location.href;
        const fileNameMatch = nowUrl.match(/\/([^\/]+\.html)$/);
        const fileName = fileNameMatch ? fileNameMatch[1] : null;

        if (fileName) {
            lnbList.forEach((el) => {
                const elLink = el.href;
                const urlMatch = elLink.match(/\/([^\/]+\.html)$/);      
                const urlName = urlMatch ? urlMatch[1] : null;
                
                if (fileName === urlName) {
                    el.parentNode.classList.add('is-active');
                }
            });
        }
    };
    // 코드 미리보기
    const convertCodeSamples = () => {
        const codeSamples = document.querySelectorAll('.sample-code');
        codeSamples.forEach(code => {
            let originCode = code.innerHTML;
            originCode = originCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');            
            const previewArea = code.nextElementSibling;
            previewArea.innerHTML = originCode;
        });
    };
    
    const formatCodePreviews = () => {
        const preElements = document.querySelectorAll('.code_view');
        preElements.forEach(pre => {
            const content = pre.innerHTML
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            
            const lines = content.split('\n').map(line => line);
            let formattedCode = '';
        
            lines.forEach((line, index) => {
                formattedCode += `<span class="code_line"><span class="line_number">${index + 1}</span>${line}</span>\n`;
            });
            pre.innerHTML = formattedCode;
        });
    };
    
    convertCodeSamples();
    formatCodePreviews();

    // 반복 노가다 줄이기
    const createTable = (el, row, col) => { 
        const table = document.querySelector('.' + el); 
        const firstRow = table.querySelector('tr'); 

        for (var i = 0; i < row; i++) {
            const tr = document.createElement('tr');
            for (var j = 0; j < col; j++) {
                const td = document.createElement('td');
                const numCell = firstRow.children[j];
                if (numCell.classList.contains('num')) {
                    // 'num' 클래스가 있는 경우 해당 셀의 내용을 1씩 증가시킴
                    const numValue = parseInt(numCell.innerText);
                    td.innerText = numValue + i; // 각 행마다 숫자를 증가시킴
                } else {
                    // 'num' 클래스가 없는 경우 첫 번째 행의 값을 그대로 사용
                    td.innerText = numCell.innerText;
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }   
    }
});

// 공통영역 불러오기
document.addEventListener("DOMContentLoaded", function() {
    const nowUrl = window.location.href;
    const localUrl = '/guide/header.html';
    const remoteUrl = 'https://miraeasse.netlify.app/public/guide/header.html';
    const targetUrl = nowUrl.includes('localhost') ? localUrl : remoteUrl;
    
    function loadHeader(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // 기존 head 태그 제거            
                var existingHead = document.getElementsByTagName('head')[0];
                if (existingHead) {
                    existingHead.parentNode.removeChild(existingHead);
                }
                // 새로운 head 태그 추가
                var headElement = document.createElement('head');
                headElement.innerHTML = xhr.responseText;
                document.documentElement.insertBefore(headElement, document.body);
            }
        };
        xhr.send();
    }
    
    loadHeader(targetUrl);  

    // 검색    
    const inputSearch = document.querySelector('#search-box input[type="text"]');    
    const tailWindCssTable = document.querySelector('#tailwindcss-list tbody');
        
    inputSearch && inputSearch.addEventListener('keyup', function() {    	 
        const filterValue = inputSearch.value.toLowerCase();
        const rows = tailWindCssTable.querySelectorAll('tr');
        
        //tr들 for문으로 순회
        for (var i = 0; i < rows.length; i++) {
            // 현재 순회중인 tr의 textContent를 소문자로 변경하여 rowText에 저장
            var rowText = rows[i].textContent.toLowerCase();
            // rowText가 filterValue를 포함하면, 해당 tr은 보여지게 하고, 그렇지 않으면 숨긴다.
            if (rowText.includes(filterValue)) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    });    


});   