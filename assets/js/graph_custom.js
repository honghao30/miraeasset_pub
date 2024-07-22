export const circleGraphType1 = (el, dataValue) => {
    // 01. 기본 원형 그래프
    const svgType1 = document.querySelector(el);
    if (svgType1) {
        const progressCircleType1 = svgType1.querySelector(".circle-progress");
        // const dataValueType1 = svgType1.getAttribute("data-value");
        const radiusType1 = 60;
        const circumferenceType1 = 2 * Math.PI * radiusType1;
        const offsetType1 = circumferenceType1 * (1 - dataValue / 100);

        progressCircleType1.style.setProperty("--barNum", offsetType1);
        progressCircleType1.style.strokeDashoffset = offsetType1;

        const textElement = svgType1.parentElement.querySelector(".circlebar_txt");
        if (textElement) {
            textElement.textContent = `${dataValue}%`;
        }
    }
};

const circleGraphType2 = () => {
    // 02. 100% 넘는 경우의 그래프
    const svgType2 = document.querySelector(".circlebar-js2");
    if (svgType2) {
        const progressCircleType2 = svgType2.querySelector(".circle-progress");
        const overflowCircleType2 = svgType2.querySelector(".circle-overflow");
        const dataValueType2 = svgType2.getAttribute("data-value");
        const radiusType2 = 60;
        const circumferenceType2 = 2 * Math.PI * radiusType2;
        const offsetType2 = circumferenceType2 * (1 - Math.min(dataValueType2, 100) / 100);
        const overflowOffsetType2 = circumferenceType2 * (1 - Math.max(dataValueType2 - 100, 0) / 100);

        progressCircleType2.style.setProperty("--barNum", offsetType2);
        progressCircleType2.style.strokeDashoffset = offsetType2;

        if (dataValueType2 > 100) {
            overflowCircleType2.style.setProperty("--overflowBarNum", overflowOffsetType2);
            overflowCircleType2.style.strokeDashoffset = overflowOffsetType2;
            overflowCircleType2.style.opacity = 1;
        } else {
            overflowCircleType2.style.opacity = 0;
        }

        const textElement = svgType2.parentElement.querySelector(".circlebar_txt");
        if (textElement) {
            textElement.textContent = `${dataValueType2}%`;
        }
    }
};

const circleGraphType3 = () => {
    // 03. 하나의 원이나 나눠진 그래프
    const svgType3Data = document.querySelectorAll(".circlebar-js3.data-circle");
    const svgType3Empty = document.querySelectorAll(".circlebar-js3.empty-circle");

    if (svgType3Data && svgType3Empty) {
        const radius = 100;
        const circumference = 2 * Math.PI * radius; // 원의 둘레 (원의 전체 길이)

        // 나의 활동량 (svgType3Data의 data-value)
        svgType3Data.forEach((svg) => {
            const progressCircle = svg.querySelector(".circle-progress");
            const progressCircle2 = svg.querySelector(".circle-progress2");
            let dataValue = parseFloat(svg.getAttribute("data-value"));
            const textElement = svg.parentElement.querySelector(".circlebar_txt");
            if (textElement) {
                textElement.textContent = `${dataValue}%`;
            }
            // 92 이상일 경우 data-value를 91로 설정
            if (dataValue >= 92) {
                dataValue = 91;
            }

            // 나의 데이터를 원의 둘레 (원형 그래프에서 데이터 값에 따라 원의 둘레를 채우는 양을 계산하기 위함)
            const offset = circumference * (1 - dataValue / 100);

            // 그라데이션 원
            progressCircle.style.strokeDasharray = circumference; // strokeDasharray : 원의 전체 길이를 나타냄
            progressCircle.style.strokeDashoffset = circumference; // strokeDashoffset : 값에따라 원형의 시작점부터 일정길이만큼 원형을 그려줌
            progressCircle.style.setProperty("--initialDashOffset", circumference); // 애니메이션 0% 값
            progressCircle.style.setProperty("--barNum", offset); // 애니메이션 100% 값

            // 그라데이션 밑에 깔리는 배경 원
            progressCircle2.style.strokeDasharray = circumference;
            progressCircle2.style.strokeDashoffset = circumference;
            progressCircle2.style.strokeDashoffset = offset;
        });

        // 100% - 나의 활동량 = svgType3Empty의 data-value
        svgType3Empty.forEach((svg) => {
            const progressCircle = svg.querySelector(".circle-border");
            let dataValue = parseFloat(svg.getAttribute("data-value")) - 8; // 디자인 상 살짝 떨어져있음

            let offset = circumference * (1 - dataValue / 100);
            let rotationAngle = 360 * (1 - dataValue / 100) - 285;

            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = circumference;
            progressCircle.style.strokeDashoffset = offset;
            progressCircle.style.transform = `rotate(${rotationAngle}deg)`;

            // 8 이하일 경우 data-value를 9로 설정
            if (dataValue <= 8) {
                dataValue = 1;
                let offset = circumference * (1 - dataValue / 100);
                let rotationAngle = 360 * (1 - dataValue / 100) - 285;
                progressCircle.style.strokeDasharray = circumference;
                progressCircle.style.strokeDashoffset = circumference;
                progressCircle.style.strokeDashoffset = offset;
                progressCircle.style.transform = `rotate(${rotationAngle}deg)`;
            }
        });
    }
};

// 업데이트 된 데이터 값으로 텍스트 변경

circleGraphType1();
circleGraphType2();
circleGraphType3();
