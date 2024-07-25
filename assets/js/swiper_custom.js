export const swiperCustom = (selector, perView, additionalOptions = {}) => {
    // 공통 스와이퍼 옵션 정의
    const commonOptions = {
        spaceBetween: 12,
        parallax: true,
        watchOverflow: true, // pagination 1개일 경우 숨김
    };

    // 사용될 스와이퍼 함수
    const initSwiper = (selector, options) => {
        // Swiper가 정의되어 있는지 확인
        if (typeof Swiper === "undefined") {
            return;
        }
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

// 자동 재생하기, 슬라이드 넘겼을 때 기존 슬라이드 멈추기
export const SlideVideo = (swiperInstance) => {
    if (!swiperInstance || !swiperInstance.el) {
        return;
    }

    const videos = swiperInstance.el.querySelectorAll(".swiper-slide video");

    // 모든 영상 멈추기
    videos.forEach((video) => {
        video.pause();
        video.currentTime = 0;
    });

    const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
    const activeVideo = activeSlide.querySelector("video");

    // 현재 활성화된 영상 슬라이드 재생하기
    if (activeVideo) {
        activeVideo.play();
    }
    const playButton = swiperInstance.el.querySelector(".btn-play");
    if (playButton) {
        playButton.classList.remove("on"); // 버튼 클릭 후 스와이퍼 넘겼을 때 버튼 상태는 초기화 되지 않아서 제거함
    }
};

export const SlideVideoPlayBtn = (swiperInstance) => {
    const playButton = swiperInstance.el.querySelector(".btn-play");

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
                    // console.log(`video ${[swiperInstance.activeIndex]} slide playing`);
                } else {
                    activeVideo.pause(); // 멈추기
                    playButton.classList.add("on"); // pause btn 제거
                    // console.log(`video ${[swiperInstance.activeIndex]} slide paused`);
                }
            }
        });
    }
};
