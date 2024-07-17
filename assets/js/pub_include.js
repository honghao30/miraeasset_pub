document.addEventListener("DOMContentLoaded", function() {
    loadHeadMeta('../../front_markup/_inc/head_meta.html');
    loadIncludedHTML();
});


// 헤더 메타 불로오기
const loadHeadMeta = url => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 기존 head 태그에 내용 추가
            var existingHead = document.getElementsByTagName('head')[0];
            if (existingHead) {
                existingHead.innerHTML += xhr.responseText;
            } else {
                // 만약 head 태그가 없다면 새로 생성하여 추가
                var headElement = document.createElement('head');
                headElement.innerHTML = xhr.responseText;
                document.documentElement.insertBefore(headElement, document.body);
            }
        }
    };
    xhr.send();
}

const loadIncludedHTML = () =>{
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
}
