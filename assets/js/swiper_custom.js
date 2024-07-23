export const swiperCustom = () => {
    var swiperCard01 = new Swiper(".cardjs-01", {
        slidesPerView: 1.12,
        spaceBetween: 12,
        parallax: true,
        watchOverflow: true, //pagination 1개 일 경우, 숨김
        pagination: {
            el: ".swiper-pagination-black",
            clickable: true,
        },
    });
    var swiperCard02 = new Swiper(".cardjs-02", {
        slidesPerView: 1.5,
        spaceBetween: 12,
        parallax: true,
        pagination: false,
        watchOverflow: true,
    });
    var swiperCard03 = new Swiper(".cardjs-03", {
        slidesPerView: 2,
        spaceBetween: 12,
        parallax: true,
        pagination: false,
        watchOverflow: true,
    });
    var swiperCardVideo01 = new Swiper(".cardjs-video01", {
        slidesPerView: 1,
        spaceBetween: 12,
        parallax: true,
        initialSlide: 0,
        watchOverflow: true,
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
                const videos = document.querySelectorAll(".cardjs-video01 .swiper-slide video");

                // 모든 영상 멈추기
                videos.forEach((video) => video.pause());

                const activeSlide = swiperCardVideo01.slides[swiperCardVideo01.activeIndex];
                const activeVideo = activeSlide.querySelector("video");

                // 현재 활성화된 슬라이드 영상 재생
                if (activeVideo) {
                    activeVideo.play();
                }

                // 재생 버튼
                const playButton = document.querySelector(".btn-play");
                playButton.classList.remove("on"); // 다음페이지 넘어갔을 때 이중클래스 on이 살아있어서

                logVideoStates(videos);
            },
        },
    });
    var swiperCardVideo02 = new Swiper(".cardjs-video02", {
        slidesPerView: 1,
        spaceBetween: 12,
        parallax: true,
        initialSlide: 0,
        watchOverflow: true,
        pagination: {
            el: ".swiper-pagination-black",
            clickable: true,
        },
        on: {
            slideChange: function () {
                const videos = document.querySelectorAll(".cardjs-video02 .swiper-slide video");

                // 모든 영상 멈추기
                videos.forEach((video) => video.pause());

                const activeSlide = swiperCardVideo02.slides[swiperCardVideo02.activeIndex];
                const activeVideo = activeSlide.querySelector("video");
                // 현재 활성화된 슬라이드 영상 재생
                if (activeVideo) {
                    activeVideo.play();
                }
            },
        },
    });
    // start : 재생버튼 관련 내용
    const playButton = document.querySelector(".btn-play");
    // 재생 버튼 클릭 시
    playButton.addEventListener("click", function () {
        const activeSlide = swiperCardVideo01.slides[swiperCardVideo01.activeIndex];
        const activeVideo = activeSlide.querySelector("video");
        // 현재 활성화된 슬라이드 영상이라면
        if (activeVideo) {
            // 현재 활성화된 슬라이드가 멈춰져있다면
            if (activeVideo.paused) {
                // 현재 활성화된 슬라이드 재생시키기
                activeVideo.play();
                // pasue icon 제거
                playButton.classList.remove("on");
                console.log(`video ${[swiperCardVideo01.activeIndex]} 슬라이드 재생`);
            } else {
                // 현재 활성화된 슬라이드 멈추기
                activeVideo.pause();
                // play icon 제거
                playButton.classList.add("on");
                console.log(`video ${[swiperCardVideo01.activeIndex]} 슬라이드 멈춤`);
            }
        }
    });
    // end : 재생버튼 관련 내용
};
