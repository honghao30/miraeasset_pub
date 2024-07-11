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
    setTimeout(() => {
        const location = window.location.href;
        const navList = document.querySelectorAll('.navgation__wrap--top li');        
        if (location.includes('pub_list')) {
            navList[4].classList.add('is-active');
        } else if(location.includes('compornent')) {
            navList[3].classList.add('is-active');
        } else if(location.includes('style_guide')) {
            navList[1].classList.add('is-active');
        } else if(location.includes('rules')) {
            navList[0].classList.add('is-active');
        } else if(location.includes('js_guide')) {
            navList[2].classList.add('is-active');
        } else {
            return false;
        }

        // 메인 url
        const checkUrl = window.location.href;
        const links = document.querySelectorAll('.navgation__wrap--top li a')
        console.log(links)
        if(!checkUrl.includes('miraeasset')) {
            links.forEach(link => {
                const url = link.getAttribute('href');
                console.log(url);
                const newUrl = url.replace('/miraeasset','');
                link.setAttribute('href',newUrl);
            })
        } 

        const lnbList = document.querySelectorAll('.lnb_list li a');
        const nowUrl = window.location.href;
        const fileName = nowUrl.match(/\/([^\/]+\.html)$/)[1];
        lnbList.forEach((el) => {
            let elLink = el.href;
            let urlMatch = elLink.match(/\/([^\/]+\.html)$/);      
            let urlName = urlMatch ? urlMatch[1] : null;
            console.log('비교 파일명', fileName, '주소', urlName);  
            if (fileName === urlName) {
                el.parentNode.classList.add('is-active');
            }
        });        
    }, 200); 
    
    // 코드 미리보기
    const convertCodeSamples = () => {
        const codeSamples = document.querySelectorAll('.sample-code');
        codeSamples.forEach(code => {
            let originCode = code.innerHTML;
            originCode = originCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            console.log('기존', originCode);
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
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/guide/header.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 기존 head 태그 제거
            console.log("ㅇㅇㅇ")
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
});   