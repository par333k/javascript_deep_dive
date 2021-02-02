// 조건문은 조건식의 평가 결과에 따라 블록문의 실행을 결정, 조건식은 boolean으로 평가될 수 있는 표현식

if (조건식1) {
    // 조건식1이 참이면 이 코드 블록이 실행된다.
} else if (조건식2) {
    // 조건식2가 참이면 이 코드 블록이 실행된다.
} else {
    // 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행된다.
}


let num = 2;
let kind;

// if 문
if (num > 0) {
    kind = '양수'; // 음수를 구별할 수 없다
}
console.log(kind); // 양수

// if...else 문
if (num > 0) {
    kind = '양수';
} else {
    kind = '음수'; // 0은 음수가 아니다.
}
console.log(kind); // 양수

// if...else if 문
if (num > 0) {
    kind = '양수';
} else if (num < 0) {
    kind = '음수';
} else {
    kind = '영';
}
console.log(kind); // 양수

// 코드 블록 내의 문의 하나뿐이라면 중괄호 생략 가능
let num = 2;
let kind;

if (num > 0)      kind = '양수';
else if (num < 0) kind = '음수';
else              kind = '영';

console.log(kind); // 양수

// 대부분의 if else 문은 삼항 조건 연산자로 바꿔쓸 수 있다
// x가 짝수이면 result 변수에 문자열 '짝수'를 할당하고, 홀수이면 문자열 '홀수'를 할당한다.
let x = 2;
let result;

if (x % 2) { // 2 % 2는 0이다. 이때 0은 false로 암묵적 강제 변환된다.
    result = '홀수';
} else {
    result = '짝수';
}
console.log(result); // 짝수

// 삼항연산자로 변환
// 0은 false로 취급된다.
let result = x % 2 ? '홀수' : '짝수';
console.log(result); // 짝수

// 만약 경우의 수가 세가지라면 이렇게 가능(양/음/0), 0은 false (암묵)
let kind = num ? (num > 0 ? '양수' : '음수') : '영';

console.log(kind); // 양수

// 삼항 조건 연산자는 값으로 평가되는 표현식이기에 변수 할당 가능

// switch 문 - boolean 보다는 다양한 case 에 대해 실행할 블록을 결정할 때 사용

// 월을 영어로 변환한다. (11 → 'November')
let month = 11;
let monthName;

switch (month) {
    case 1: monthName = 'January';
    case 2: monthName = 'February';
    case 3: monthName = 'March';
    case 4: monthName = 'April';
    case 5: monthName = 'May';
    case 6: monthName = 'June';
    case 7: monthName = 'July';
    case 8: monthName = 'August';
    case 9: monthName = 'September';
    case 10: monthName = 'October';
    case 11: monthName = 'November';
    case 12: monthName = 'December';
    default: monthName = 'Invalid month';
}

console.log(monthName); // Invalid month
// break를 사용하지 않아서 fall through가 발생하여 default 값이 리턴.
// 아래와 같이 바꿔야 한다
switch (month) {
    case 1: monthName = 'January';
        break;
    case 2: monthName = 'February';
        break;
    case 3: monthName = 'March';
        break;
    case 4: monthName = 'April';
        break;
    case 5: monthName = 'May';
        break;
    case 6: monthName = 'June';
        break;
    case 7: monthName = 'July';
        break;
    case 8: monthName = 'August';
        break;
    case 9: monthName = 'September';
        break;
    case 10: monthName = 'October';
        break;
    case 11: monthName = 'November';
        break;
    case 12: monthName = 'December';
        break;
    default: monthName = 'Invalid month';
}

console.log(monthName); // November
// default 문은 switch문의 맨 마지막에 위치하므로 default 문의 실행이 종료되면 switch 문을 빠져나간다. break 필요없음.
// break를 쓰지 않고 fall through를 이용해서 여러개의 case문을 하나의 조건으로 사용가능
let year = 2000; // 2000년은 윤년으로 2월이 29일이다.
let month = 2;
let days = 0;

switch (month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        days = 31;
        break;
    case 4: case 6: case 9: case 11:
        days = 30;
        break;
    case 2:
        // 윤년 계산 알고리즘
        // 1. 연도가 4로 나누어떨어지는 해(2000, 2004, 2008, 2012, 2016, 2020...)는 윤년이다.
        // 2. 연도가 4로 나누어떨어지더라도 연도가 100으로 나누어떨어지는 해(2000, 2100, 2200...)는 평년이다.
        // 3. 연도가 400으로 나누어떨어지는 해(2000, 2400, 2800...)는 윤년이다.
        days = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 29 : 28;
        break;
    default:
        console.log('Invalid month');
}

console.log(days); // 29

