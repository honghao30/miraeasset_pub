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
        console.log(navList)
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

    }, 200); 
    const preElements = document.querySelectorAll('.code_view');

    preElements.forEach(pre => {
        const lines = pre.innerText.split('\n');
        let formattedCode = '';

        lines.forEach((line, index) => {
            const escapedLine = line
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                //.trim();
            formattedCode += `<span class="code_line"><span class="line_number">${index + 1}</span>${escapedLine}</span>\n`;
        });

        pre.innerHTML = formattedCode;
    });       
});