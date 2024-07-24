export const swiperCustom = (selector, perView, additionalOptions = {}) => {
    // 공통 스와이퍼 옵션 정의
    const commonOptions = {
        spaceBetween: 12,
        parallax: true,
        watchOverflow: true, // pagination 1개일 경우 숨김
    };

    // 사용될 스와이퍼 함수
    const initSwiper = (selector, options) => {
        return new Swiper(selector, {
            ...commonOptions, // 공통 스와이퍼 옵션
            ...options, // 커스텀할 스와이퍼 옵션
        });
    };

    // Swiper 초기화
    const swiperInstance = initSwiper(selector, {
        slidesPerView: perView,
        ...additionalOptions, // 추가 옵션
    });

    // Swiper 인스턴스 반환
    return swiperInstance;
};

const handleSlideChange = (swiperInstance) => {
    if (!swiperInstance || !swiperInstance.el) {
        return;
    }
    const videos = swiperInstance.el.querySelectorAll(".swiper-slide video");

    // 모든 영상 멈추기
    videos.forEach((video) => video.pause());

    const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
    const activeVideo = activeSlide.querySelector("video");

    // 현재 활성화된 영상 슬라이드 재생하기
    if (activeVideo) {
        activeVideo.play();
    }

    // 스와이퍼 넘겼을 때, 재생 버튼 리셋을 위해
    // 재생버튼 없는 경우도 있기 때문에 조건문 사용
    const playButton = swiperInstance.el.querySelector(".btn-play");
    if (playButton) {
        playButton.classList.remove("on");
    }
};

const handlePlayButtonClick = (swiperInstance) => {
    if (!swiperInstance || !swiperInstance.el) {
        return;
    }
    const playButton = swiperInstance.el.querySelector(".btn-play");

    // 재생버튼 없는 경우도 있기 때문에 조건문 사용
    if (playButton) {
        // 재생버튼 클릭했을 때
        playButton.addEventListener("click", function () {
            const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
            const activeVideo = activeSlide.querySelector("video");
            // 현재 활성화된 영상 슬라이드  있다면
            if (activeVideo) {
                // 현재 활성화된 영상 슬라이드가 멈춰있다면
                if (activeVideo.paused) {
                    activeVideo.play(); // 재생
                    playButton.classList.remove("on"); // play btn 제거
                    console.log(`video ${[swiperInstance.activeIndex]} slide playing`);
                } else {
                    activeVideo.pause(); // 멈추기
                    playButton.classList.add("on"); // pause btn 제거
                    console.log(`video ${[swiperInstance.activeIndex]} slide paused`);
                }
            }
        });
    }
};
