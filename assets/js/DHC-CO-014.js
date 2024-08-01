// DHC-CO-014.js
let totalLoadedItems = 0; // 총 로드된 아이템 수를 추적
const maxItems = 50; // 로드할 최대 아이템 수

export const fetchMoreContent = async (count) => {
    const contentList = document.querySelector('.infinity-list');
    let hasMoreContent = true;

    // 임시로 예제 콘텐츠를 생성
    for (let i = 0; i < count; i++) {
        if (totalLoadedItems >= maxItems) {
            hasMoreContent = false;
            break;
        }
        
        const newContent = document.createElement('li');
        const newContentLink = document.createElement('a');
        newContentLink.setAttribute('href', '#');
        newContentLink.innerHTML = `
            <i class="ico-health"></i>
            <div class="title-area">
                <div class="title"><span>[헬스케어]</span> 온라인 보험 사이트 이용 제한 안내 </div>
                <div class="date">2024.03.27 </div>
            </div>
        `;
        newContent.appendChild(newContentLink);
        contentList.appendChild(newContent);
        totalLoadedItems++;
    }

    // 더 이상 로드할 아이템이 없으면 hasMoreContent를 false로 설정
    return hasMoreContent;
};
