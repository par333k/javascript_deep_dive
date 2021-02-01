// 조건식의 평가 결과에 따라 반환할 값을 결정한다. 부수 효과는 없다.
// 조건식? 조건식이 true일 때 반환값 : 조건식이 false일 때 반환값
let x = 2;

// 2 % 2는 0이고 0은 false로 암묵적 타입 변환된다.
let result = x % 2 ? '홀수' : '짝수';

console.log(result); // 짝수

// 삼항 조건 연산자 표현식은 조건문이다. if ... else 문으로 비슷하게 처리가 가능하다.
let x = 2, result;

// 2 % 2는 0이고 0은 false로 암묵적 타입 변환된다.
if (x % 2) result = '홀수';
else       result = '짝수';

console.log(result); // 짝수

// 삼항 조건 연산자 표현식은 값처럼 사용할 수 있지만 if ... else 문은 값처럼 사용할 수 없다. 표현식이 아닌 문이기 때문이다.
let x = 10;

// if...else 문은 표현식이 아닌 문이다. 따라서 값처럼 사용할 수 없다.
// let result = if (x % 2) { result = '홀수'; } else { result = '짝수'; };
// SyntaxError: Unexpected token if

let x = 10;

// 삼항 조건 연산자 표현식은 표현식인 문이다. 따라서 값처럼 사용할 수 있다.
let result = x % 2 ? '홀수' : '짝수';
console.log(result); // 짝수
