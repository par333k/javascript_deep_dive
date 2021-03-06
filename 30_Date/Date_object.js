// Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수다
// 현재 날짜와 시간은 자바스크립트 코드가 실행된 시스템의 시계에 의해 생성된다.
// Date는 생성자 함수로, Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖는다.
// 생성자함수로 생성한 Date 객체는 기본적으로 현재 날짜와 시간을 나타내는 정수값을 가진다.
// 현재 날짜와 시간이 아닌 다른 날짜와 시간을 다루고 싶은 경우 Date 생성자 함수에 명시적으로 인수를 전달해야한다.


// 1. new Date()
// 인수 없이 new 연산자와 함께 호출하면 현재 날짜와 시간을 가지는 Date 객체를 반환한다.
new Date(); // -> Mon Jul 06 2020 01:03:18 GMT+0900 (대한민국 표준시)

// new 연산자 없이 호출하면 Date 객체를 반환하지 않고 날짜와 시간 정보를 나타내는 문자열을 반환한다.
Date(); // -> "Mon Jul 06 2020 01:10:47 GMT+0900 (대한민국 표준시)"

// 숫자 타입의 밀리초를 인수로 전달하면 1970년 1월 1일 00:00:00 (UTC)를 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타낸다
// 한국 표준시 KST는 협정 세계시 UTC에 9시간을 더한 시간이다.
new Date(0); // -> Thu Jan 01 1970 09:00:00 GMT+0900 (대한민국 표준시)

/*
86400000ms는 1day를 의미한다.
1s = 1,000ms
1m = 60s * 1,000ms = 60,000ms
1h = 60m * 60,000ms = 3,600,000ms
1d = 24h * 3,600,000ms = 86,400,000ms
*/
// Date 객체 반환
new Date(86400000); // -> Fri Jan 02 1970 09:00:00 GMT+0900 (대한민국 표준시)

// 날짜와 시간을 나타내는 문자열을 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다
// 이 때 인수로 전달한 문자열은 Date.parse 메서드에 의해 해석 가능한 형식이어야 한다.
new Date('May 26, 2020 10:00:00');
// -> Tue May 26 2020 10:00:00 GMT+0900 (대한민국 표준시)

new Date('2020/03/26/10:00:00');
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)


// new Date(year, month[, day, hour, minute, second, millisecond])
// 연 월은 반드시 지정해야 하며 지정하지 않은 옵션 정보는 0, 또는 1로 초기화 된다.
// 연, 월을 지정하지 않은 경우 1970년 1월 1일 00:00:00 을 나타내는 Date객체를 반환한다.
// 월을 나타내는 2는 3월을 의미한다. 2020/3/1/00:00:00:00
new Date(2020, 2);
// -> Sun Mar 01 2020 00:00:00 GMT+0900 (대한민국 표준시)

// 월을 나타내는 2는 3월을 의미한다. 2020/3/26/10:00:00:00
new Date(2020, 2, 26, 10, 0, 0, 0);
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)

// 다음처럼 표현하면 가독성이 훨씬 좋다.
new Date('2020/3/26/10:00:00:00');
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)


// Date 메서드
// 1. Date.now
// 1970년 1월 1일 00:00:00을 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환한다.
Date.now(); // -> 1593971539112

// 2. Date.parse
// 1970년 1월 1일 00:00:00을 기점으로 인수로 전달된 지정 시간(new Date(dateString)의 인수와 동일한 형식)까지의 밀리초를 숫자로 반환한다.
// UTC
Date.parse('Jan 2, 1970 00:00:00 UTC'); // -> 86400000

// KST
Date.parse('Jan 2, 1970 09:00:00'); // -> 86400000

// KST
Date.parse('1970/01/02/09:00:00');  // -> 86400000

// 3. Date.UTC
// 1970년 1월 1일 00:00:00을 기점으로 인수로 전달된 지정 시간 까지의 밀리초를 숫자로 반환한다.
// Date.UTC 메서드의 인수는 UTC로 인식된다.
// new Date(year, month[, day, hour, minute, second, millisecond]) 와 같은 형식의 인수를 사용해야 한다.
Date.UTC(1970, 0, 2); // -> 86400000
Date.UTC('1970/1/2'); // -> NaN

// 4. Date.prototype.getFullYear
// Date 객체의 연도를 나타내는 정수를 반환한다.
new Date('2020/07/24').getFullYear(); // -> 2020

// 5. Date.prototype.setFullYear
// Date 객체에 연도를 나타내는 정수를 설정한다.
// 연도 이외에 옵션으로 월, 일도 설정할 수 있다.
const today = new Date();

// 년도 지정
today.setFullYear(2000);
today.getFullYear(); // -> 2000

// 년도/월/일 지정
today.setFullYear(1900, 0, 1);
today.getFullYear(); // -> 1900

// 6. Date.prototype.getMonth
// Date 객체의 월을 나타내는 0 ~11 의 정수를 반환한다. 1월은 0, 12월은 11이다.
new Date('2020/07/24').getMonth(); // -> 6

// 7. Date.prototype.setMonth
// Date 객체에 월을 나타내는 0 ~ 11의 정수를 설정한다. 월 이외에 옵션으로 일도 설정할 수 있다.
const today = new Date();

// 월 지정
today.setMonth(0); // 1월
today.getMonth(); // -> 0

// 월/일 지정
today.setMonth(11, 1); // 12월 1일
today.getMonth(); // -> 11

// 8. Date.prototype.getDate
// Date 객체의 날짜를 나타내는 정수를 반환한다
new Date('2020/07/24').getDate(); // -> 24

// 9. Date.prototype.setDate
// Date 객체에 날짜를 나타내는 정수를 설정한다.
const today = new Date();

// 날짜 지정
today.setDate(1);
today.getDate(); // -> 1

// 10. Date.prototype.getDay
// Date객체의 요일을 나타내는 정수를 반환한다.
// 금요일
new Date('2020/07/24').getDay(); // -> 5

// 11. Date.prototype.getHours
// Date 객체의 시간을 나타내는 정수를 반환한다.
new Date('2020/07/24/12:00').getHours(); // -> 12

// 12. Date.prototype.setHours
// Date 객체의 시간을 나타내는 정수를 설정한다. 시간 외에 옵션으로 분, 초, 밀리초도 살정할 수 있다.
const today = new Date();

// 시간 지정
today.setHours(7);
today.getHours(); // -> 7

// 시간/분/초/밀리초 지정
today.setHours(0, 0, 0, 0); // 00:00:00:00
today.getHours(); // -> 0

// 13. Date.prototype.getMinutes
// Date 객체의 분을 나타내는 정수를 반환한다.
new Date('2020/07/24/12:30').getMinutes(); // -> 30

// 14. Date.prototype.setMinutes
// Date 객체에 분을 나타내는 정수를 설정한다. 옵션으로 초, 밀리초도 설정이 가능하다.
const today = new Date();

// 분 지정
today.setMinutes(50);
today.getMinutes(); // -> 50

// 분/초/밀리초 지정
today.setMinutes(5, 10, 999); // HH:05:10:999
today.getMinutes(); // -> 5

// 15. Date.prototype.getSeconds
// Date 객체의 초를 나타내는 정수를 반환한다.
new Date('2020/07/24/12:30:10').getSeconds(); // -> 10

// 16. Date.prototype.setSeconds
// Date 객체에 초를 나타내는 정수를 설정한ㄷ, 초 이외에 옵션으로 밀리초도 설정할 수 있다.
const today = new Date();

// 초 지정
today.setSeconds(30);
today.getSeconds(); // -> 30

// 초/밀리초 지정
today.setSeconds(10, 0); // HH:MM:10:000
today.getSeconds(); // -> 10

// 17. Date.prototype.getMilliseconds
// Date 객체의 밀리초를 나타내는 정수를 반환한다.
new Date('2020/07/24/12:30:10:150').getMilliseconds(); // -> 150

// 18. Date.prototype.setMilliseconds
// Date 객체에 밀리초를 나타내는 정수를 설정한다.
const today = new Date();

// 밀리초 지정
today.setMilliseconds(123);
today.getMilliseconds(); // -> 123

// 19. Date.prototype.getTime
// 1970년 1월 1일 00:00:00 기점으로 Date 객체의 시간까지 경과된 밀리초를 반환한다.
new Date('2020/07/24/12:30').getTime(); // -> 1595561400000

// 20. Date.prototype.setTime
// Date 객체에 1970년 1월 1일 00:00:00 을 기점으로 경과된 밀리초를 설정한다.
const today = new Date();

// 1970년 1월 1일 00:00:00(UTC)를 기점으로 경과된 밀리초 설정
today.setTime(86400000); // 86400000는 1day를 나타낸다.
console.log(today); // -> Fri Jan 02 1970 09:00:00 GMT+0900 (대한민국 표준시)

// 21. Date.prototype.getTimezoneOffset
// UTC와 Date 객체에 지정된 locale 시간과의 차이를 분 단위로 반환한다.
// KST는 UTC에 9시간을 더한 시간이다.
const today = new Date(); // today의 지정 로캘은 KST다.

//UTC와 today의 지정 로캘 KST와의 차이는 -9시간이다.
today.getTimezoneOffset() / 60; // -9

// 22. Date.prototype.toDateString
// 사람이 읽을 수 있는 형식의 문자열로 Date 객체의 날짜를 반환한다.
const today = new Date('2020/7/24/12:30');

today.toString();     // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toDateString(); // -> Fri Jul 24 2020

// 23. Date.prototype.toTimeString
// 사람이 읽을 수 있는 형식으로 Date 객체의 시간을 표현한 문자열을 반환한다.
const today = new Date('2020/7/24/12:30');

today.toString();     // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toTimeString(); // -> 12:30:00 GMT+0900 (대한민국 표준시)

// 24. Date.prototype.toISOString
// ISO 8601 형식으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.
const today = new Date('2020/7/24/12:30');

today.toString();    // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toISOString(); // -> 2020-07-24T03:30:00.000Z

today.toISOString().slice(0, 10); // -> 2020-07-24
today.toISOString().slice(0, 10).replace(/-/g, ''); // -> 20200724

// 25. Date.prototype.toLocaleString
// 인수로 전달한 locale을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.
// 인수를 생략한 경우 브라우저가 동작 중인 시스템의 locale을 적용한다.
const today = new Date('2020/7/24/12:30');

today.toString(); // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toLocaleString(); // -> 2020. 7. 24. 오후 12:30:00
today.toLocaleString('ko-KR'); // -> 2020. 7. 24. 오후 12:30:00
today.toLocaleString('en-US'); // -> 7/24/2020, 12:30:00 PM
today.toLocaleString('ja-JP'); // -> 2020/7/24 12:30:00

// 26. Date.prototype.toLocaleTimeString
// 인수로 전달한 locale을 기준으로 Date 객체의 시간을 표현한 문자열을 반환한다.
// 인수를 생략한 경우 브라우저가 동작 중인 시스템의 locale을 적용한다.
const today = new Date('2020/7/24/12:30');

today.toString(); // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toLocaleTimeString(); // -> 오후 12:30:00
today.toLocaleTimeString('ko-KR'); // -> 오후 12:30:00
today.toLocaleTimeString('en-US'); // -> 12:30:00 PM
today.toLocaleTimeString('ja-JP'); // -> 12:30:00


// Date를 활용한 시계 예제 코드
(function printNow() {
    const today = new Date();

    const dayNames = [
        '(일요일)',
        '(월요일)',
        '(화요일)',
        '(수요일)',
        '(목요일)',
        '(금요일)',
        '(토요일)'
    ];
    // getDay 메서드는 해당 요일(0 ~ 6)을 나타내는 정수를 반환한다.
    const day = dayNames[today.getDay()];

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    // 12시간제로 변경
    hour %= 12;
    hour = hour || 12; // hour가 0이면 12를 재할당

    // 10미만인 분과 초를 2자리로 변경
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    const now = `${year}년 ${month}월 ${date}일 ${day} ${hour}:${minute}:${second} ${ampm}`;

    console.log(now);

    // 1초마다 printNow 함수를 재귀 호출한다. 41.2.1절 "setTimeout / clearTimeout" 참고
    setTimeout(printNow, 1000);
}());
