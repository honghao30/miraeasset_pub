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
        // const checkUrl = window.location.href;
        // const links = document.querySelectorAll('.navgation__wrap--top li a')
        // console.log(links)
        // if(!checkUrl.includes('miraeasset')) {
        //     links.forEach(link => {
        //         const url = link.getAttribute('href');
        //         console.log(url);
        //         const newUrl = url.replace('/miraeasset','');
        //         link.setAttribute('href',newUrl);
        //     })
        // }        

    }, 200); 
    // 코드 미리보기
    const preElements = document.querySelectorAll('.code_view');
    preElements.forEach(pre => {
        // <와 >를 먼저 엔티티로 변환하여 HTML 태그를 텍스트로 변경
        const content = pre.innerHTML
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    
        // 줄 단위로 쪼개서 앞뒤 공백 제거
        const lines = content.split('\n').map(line => line);
        let formattedCode = '';
    
        // 변환된 내용을 한 줄씩 처리
        lines.forEach((line, index) => {
            formattedCode += `<span class="code_line"><span class="line_number">${index + 1}</span>${line}</span>\n`;
        });
        pre.innerHTML = formattedCode;
    });
    // 반복 노가다 줄이기
    const createrTable = (el, row, col) => { 
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