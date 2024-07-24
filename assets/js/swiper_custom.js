export const swiperCustom = () => {
    // 공통 스와이퍼 옵션 정의
    const commonOptions = {
        spaceBetween: 12,
        parallax: true,
        watchOverflow: true, //pagination 1개 일 경우, 숨김
    };

    // 사용될 스와이퍼 함수
    const initSwiper = (selector, options) => {
        return new Swiper(selector, {
            ...commonOptions, // 공통 스와이퍼
            ...options, // 커스텀할 스와이퍼
        });
    };

    const swiperCard01 = initSwiper(".cardjs-01", {
        slidesPerView: 1.12,
        pagination: {
            el: ".swiper-pagination-black",
            clickable: true,
        },
    });

    const swiperCard02 = initSwiper(".cardjs-02", {
        slidesPerView: 1.5,
        pagination: false,
    });

    const swiperCard03 = initSwiper(".cardjs-03", {
        slidesPerView: 2,
        pagination: false,
    });

    const swiperCardVideo01 = initSwiper(".cardjs-video01", {
        slidesPerView: 1,
        initialSlide: 0,
        pagination: {
            el: ".swiper-pagination-black",
            clickable: true,
        },
        navigation: {
            nextEl: ".cardjs-video01 .swiper-button-next",
            prevEl: ".cardjs-video01 .swiper-button-prev",
        },
        on: {
            slideChange: function () {
                handleSlideChange(swiperCardVideo01);
            },
        },
    });

    const swiperCardVideo02 = initSwiper(".cardjs-video02", {
        slidesPerView: 1,
        initialSlide: 0,
        pagination: {
            el: ".swiper-pagination-black",
            clickable: true,
        },
        on: {
            slideChange: function () {
                handleSlideChange(swiperCardVideo02);
            },
        },
    });

    handlePlayButtonClick(swiperCardVideo01);
    handlePlayButtonClick(swiperCardVideo02);
};

const handleSlideChange = (swiperInstance) => {
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
