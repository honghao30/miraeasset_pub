// 헬스케어 홈 > 등급 바
const myLevelFun = (el, newWidth) => {
    const myLevel = document.querySelector(el);
    if (myLevel) {
        const myPosition = myLevel.querySelector(".myposition");
        myLevel.style.setProperty("--level-width", newWidth + "%");
        myLevel.style.width = newWidth + "%"; // 즉시 반영
        setTimeout(() => {
            myPosition.style.display = "block";
            myPosition.style.opacity = "1";
        }, 1600); // 애니메이션이 끝나는 시간 1800ms
    }
};

// 헬스케어 홈 > 체중 차트 커스텀 (vw)
const setBarHeights = (el, dataValues) => {
    const weightChart = document.querySelector(el);
    if (weightChart) {
        const bars = weightChart.querySelectorAll('[class*="weight-bar"]');
        const maxDataValue = 100; // Assuming the maximum data-value

        bars.forEach((bar, index) => {
            const value = dataValues[index];
            const heightPercentage = (value / maxDataValue) * 100;
            const heightInVW = (heightPercentage / 100) * 20; // 20vw를 최대로 잡음
            const heightInVWUnit = heightInVW.toFixed(4) + "vw";

            if (heightInVW >= 20) {
                bar.style.height = 20 + "vw";
                bar.style.setProperty("--weight-height", 20 + "vw");
            } else {
                bar.style.height = heightInVW + "vw";
                bar.style.setProperty("--weight-height", heightInVWUnit);
            }
        });
    }
};

// 헬스케어 홈 > 체중 차트 커스텀 (px)
const setBarHeights2 = (el, dataValues) => {
    const weightChart = document.querySelector(el);
    if (weightChart) {
        const bars = weightChart.querySelectorAll('[class*="weight-bar"]');

        bars.forEach((bar, index) => {
            const value = dataValues[index];
            const heightInPXUnit = value + "px";

            if (value >= 75) {
                bar.style.height = 75 + "px";
                bar.style.setProperty("--weight-height", 75 + "px");
            } else {
                bar.style.height = value + "px";
                bar.style.setProperty("--weight-height", heightInPXUnit);
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", function () {
    myLevelFun(".myLevel-js01", 70);
    setBarHeights(".weight-Chjs01", [90, 60, 50, 90, 58]);
    setBarHeights2(".weight-Chjs02", [90, 60, 50, 90, 58]);
});
