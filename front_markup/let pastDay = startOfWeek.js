let pastDay = startOfWeek.subtract(weeksCount, 'week');
            while (pastDay.isSameOrBefore(startOfWeek.subtract(1, 'week'))) {
                const slideItem = document.createElement('div');
                slideItem.classList.add('swiper-slide');
                swipingContainer.appendChild(slideItem);
        
                const pastWeekUl = document.createElement('ul');
                for (let i = 0; i < 7; i++) {
                    const pastDateItem = document.createElement('li');
                    const link = document.createElement('a');
                    const dayDiv = document.createElement('div');
        
                    dayDiv.classList.add('day');
                    dayDiv.textContent = pastDay.format('DD');
                    link.href = '#none';
                    link.appendChild(dayDiv);
                    pastDateItem.appendChild(link);
                    pastWeekUl.appendChild(pastDateItem);
        
                    // 오늘의 요일에 해당하는 날짜에 'today' 클래스 추가
                    if (pastDay.day() === dayjs().day()) {
                        link.classList.add('today');
                    }
                    if (pastDay.day() === 0 || pastDay.day() === 6) {
                        link.classList.add('holiday');                        
                    }
                    pastDay = pastDay.add(1, 'day');

                    // 사용자 데이터 추가
                    if (typeof options.addUserDataToWeeklyLink === 'function') {
                        options.addUserDataToWeeklyLink(link);
                    }

                    // 클릭 이벤트 리스너 추가
                    (function (currentDay) {
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            if (typeof options.handleWeeklyLinkClick === 'function') {
                                options.handleWeeklyLinkClick(currentDay); // 전달된 클릭 함수 사용
                                console.log(currentDay)
                            }
                        });
                    })(pastDay);                  
                }
                slideItem.appendChild(pastWeekUl);
            }
        
            const slideItem = document.createElement('div');
            slideItem.classList.add('swiper-slide');
            swipingContainer.appendChild(slideItem);
        
            const darListUl = document.createElement('ul');
            slideItem.appendChild(darListUl);
        
            while (day.isSameOrBefore(endOfWeek)) {
                // 요일 표시
                const weekLabel = document.createElement('li');
                weekLabel.classList.add('label');
                weekLabel.textContent = day.format('ddd'); // 한글 요일 추가
                weeklyLabels.appendChild(weekLabel);
        
                // 날짜 표시
                const listItem = document.createElement('li');
                const link = document.createElement('a');
        
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                dayDiv.textContent = `${day.date()}`;
        
                // 일요일(0)과 토요일(6) 체크하여 'holiday' 클래스 추가
                if (day.day() === 0 || day.day() === 6) {
                    link.classList.add('holiday');
                    weekLabel.classList.add('holiday');
                }
        
                link.href = '#none';
                link.appendChild(dayDiv); // 날짜 추가
                listItem.appendChild(link);
                darListUl.appendChild(listItem);
        
                // 오늘의 요일에 해당하는 날짜에 'today' 클래스 추가
                if (day.day() === dayjs().day()) {
                    link.classList.add('today');
                    weekLabel.classList.add('today');
                }

                // 오늘 날짜 출력
                const today = dayjs().format('YYYY-MM-DD');
                if (options.deTailView !== false && options.deTailView !== '') {
                    document.querySelector('.detail-section .detail-day').innerText = today;
                }
        
                // 사용자 데이터 추가
                if (typeof options.addUserDataToWeeklyLink === 'function') {
                    options.addUserDataToWeeklyLink(link);
                }                

                // 클릭 이벤트 리스너 추가
                (function (currentDay) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log('클릭');
                        if (typeof options.handleWeeklyLinkClick === 'function') {
                            options.handleWeeklyLinkClick(currentDay); // 전달된 클릭 함수 사용
                        }
                    });
                })(day);
        
                day = day.add(1, 'day');
            }

            while (day.isSameOrBefore(endLimitDay)) {
                const slideItem = document.createElement('div');
                slideItem.classList.add('swiper-slide');
                swipingContainer.appendChild(slideItem);
        
                const futureWeekUl = document.createElement('ul');
                for (let i = 0; i < 7; i++) {
                    const futureDateItem = document.createElement('li');
                    const link = document.createElement('a');
                    const dayDiv = document.createElement('div');
        
                    dayDiv.classList.add('day');
                    dayDiv.textContent = day.format('DD');
                    link.href = '#none';
                    link.appendChild(dayDiv);
                    futureDateItem.appendChild(link);
                    futureWeekUl.appendChild(futureDateItem);
        
                    // 오늘의 요일에 해당하는 날짜에 'today' 클래스 추가
                    if (day.day() === dayjs().day()) {
                        link.classList.add('today');
                    }
                    if (day.day() === 0 || day.day() === 6) {
                        link.classList.add('holiday');                        
                    }
                    day = day.add(1, 'day');

                    // 사용자 데이터 추가
                    if (typeof options.addUserDataToWeeklyLink === 'function') {
                        options.addUserDataToWeeklyLink(link);
                    }

                    // 클릭 이벤트 리스너 추가
                    (function (currentDay) {
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            if (typeof options.handleWeeklyLinkClick === 'function') {
                                options.handleWeeklyLinkClick(currentDay); // 전달된 클릭 함수 사용
                            }
                        });
                    })(day);                  
                }
                slideItem.appendChild(futureWeekUl);
            }