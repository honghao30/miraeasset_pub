export const swiperCustom = () => {
    var swiper = new Swiper(".card01", {
        slidesPerView: 1.12,
        spaceBetween: 12,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    console.log("aaa");
};
