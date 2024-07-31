export const circleGraphType1 = (el, dataValue) => {
    // 01. 기본 원형 그래프
    const svgType1 = document.querySelector(el);
    if (svgType1) {
        const progressCircleType1 = svgType1.querySelector(".circle-progress");
        // const dataValueType1 = svgType1.getAttribute("data-value");
        const radiusType1 = progressCircleType1.r.baseVal.value;
        const circumferenceType1 = (2 * Math.PI * radiusType1).toFixed(3);
        const offsetType1 = (circumferenceType1 * (1 - dataValue / 100)).toFixed(3);

        progressCircleType1.style.setProperty("--barNum", offsetType1);
        progressCircleType1.style.setProperty("--barWidth", circumferenceType1);
        progressCircleType1.style.strokeDashoffset = offsetType1;

        const textElement = svgType1.parentElement.querySelector(".circlebar_txt");
        if (textElement) {
            textElement.textContent = `${dataValue}`;
        }
    }
};

export const circleGraphType2 = (el, dataValueType2) => {
    // 02. 100% 넘는 경우의 그래프
    const svgType2 = document.querySelector(el);
    if (svgType2) {
        const progressCircleType2 = svgType2.querySelector(".circle-progress");
        const overflowCircleType2 = svgType2.querySelector(".circle-overflow");
        // const dataValueType2 = svgType2.getAttribute("data-value");
        const radiusType2 = progressCircleType2.r.baseVal.value;
        const circumferenceType2 = (2 * Math.PI * radiusType2).toFixed(3);
        const offsetType2 = (circumferenceType2 * (1 - Math.min(dataValueType2, 100) / 100)).toFixed(3);
        const overflowOffsetType2 = (circumferenceType2 * (1 - Math.max(dataValueType2 - 100, 0) / 100)).toFixed(3);
        
        progressCircleType2.style.setProperty("--barNum", offsetType2);
        progressCircleType2.style.strokeDashoffset = offsetType2;
        progressCircleType2.style.setProperty("--barOverWidth", circumferenceType2);
        
        if (dataValueType2 > 100) {
            overflowCircleType2.style.setProperty("--overflowBarNum", overflowOffsetType2);
            overflowCircleType2.style.setProperty("--barOverWidth", circumferenceType2);
            overflowCircleType2.style.opacity = 1;
        } else {
            overflowCircleType2.style.opacity = 0;
        }

        const textElement = svgType2.parentElement.querySelector(".circlebar_txt");
        if (textElement) {
            textElement.textContent = `${dataValueType2}`;
        }
    }
};

export const circleGraphType3 = (el, dataValue, dataValueEmpty) => {
    const svgType3Data = document.querySelectorAll(`${el}.data-circle`);
    const svgType3Empty = document.querySelectorAll(`${el}.empty-circle`);

    if (svgType3Data.length && svgType3Empty.length) {
        const radius = svgType3Data[0].querySelector(".circle-progress").r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        svgType3Data.forEach((svg) => {
            const progressCircle = svg.querySelector(".circle-progress");
            const progressCircle2 = svg.querySelector(".circle-progress2");
            const textElement = svg.parentElement.querySelector(".circlebar_txt");

            if (textElement) {
                textElement.textContent = `${dataValue}`;
            }
            if (dataValue >= 92) {
                dataValue = 91;
            }
            const offset = circumference * (1 - dataValue / 100);
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = circumference;
            progressCircle.style.setProperty("--initialDashOffset", circumference);
            progressCircle.style.setProperty("--barNum", offset);
            progressCircle2.style.strokeDasharray = circumference;
            progressCircle2.style.strokeDashoffset = offset;
        });

        svgType3Empty.forEach((svg) => {
            const progressCircle = svg.querySelector(".circle-border");
            dataValueEmpty = dataValueEmpty - 8;
            if (dataValueEmpty <= 8) {
                dataValueEmpty = 1;
            }
            const offset = circumference * (1 - dataValueEmpty / 100);
            const rotationAngle = 360 * (1 - dataValueEmpty / 100) - 285;
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = offset;
            progressCircle.style.transform = `rotate(${rotationAngle}deg)`;
        });
    }
};


// 업데이트 된 데이터 값으로 텍스트 변경
