// ES6에서 등장
// 1. 변수 중복 선언 금지 - 중복 선언 시 SyntaxError 발생
var foo = 123;
// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var foo = 456;

let bar = 123;
// let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared

// 2. 블록 레벨 스코프 - 모든 코드 블록을 지역 스코프로 인정
let foo = 1; // 전역 변수

{
    let foo = 2; // 지역 변수
    let bar = 3; // 지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined

// 3. 변수 호이스팅 - 호이스팅이 동작하지 않는 것처럼 동작한다.
console.log(foo); // ReferenceError: foo is not defined
let foo;
// var 키워드는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 '선언 단계'와 '초기화 단계'가 한번에 진행
// 선언단계에서 스코프(실행 컨텍스트의 렉시컬 환경)에 변수 식별자를 등록해 자바스크립트 엔진에 변수의 존재를 알림
// 즉시 초기화 단계에서 undefined로 변수를 초기화 한다.
// var 키워드로 선언한 변수는 런타임 이전에 선언 단계와 초기화 단계가 실행된다.
// 따라서 변수 선언문 이전에 변수를 참조할 수 있다.
console.log(foo); // undefined

var foo;
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1

// let 키워드로 선언한 변수는 '선언 단계'와 '초기화 단계'가 분리되어 진행된다. 즉, 런타임 이전에 암묵적으로 선언단계는 실행되지만
// 초기화 단계는 변수 선언문에 도달했을 때 실행된다. 초기화 단계 실행 전 접근할경우 참조에러가 발생한다.
// 스코프의 시작 지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간을 일시적 사각지대Temporal Dead Zone;TDZ 라 부른다.

// 런타임 이전에 선언 단계가 실행된다. 아직 변수가 초기화되지 않았다.
// 초기화 이전의 일시적 사각 지대에서는 변수를 참조할 수 없다.
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1

// 변수 호이스팅이 발생하지 않는 것은 아니다.

let foo = 1; // 전역 변수

{
    console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
    let foo = 2; // 지역 변수
}
// 에러가 나는 이유는 호이스팅이 발생하기 때문
// ES6에서 도입된 let, const, class를 사용한 선언문은 호이스팅이 동작하지 않는 것처럼 동작한다.

// 4. 전역 객체와 let - let 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 즉 window.foo 같이 접근할 수 없다.
// let 전역 변수는 보이지 않는 개념적인 블록내에 존재하게 된다.

// 이 예제는 브라우저 환경에서 실행해야 한다.

// 전역 변수
var x = 1;
// 암묵적 전역
y = 2;
// 전역 함수
function foo() {}

// var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티다.
console.log(window.x); // 1
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(x); // 1

// 암묵적 전역은 전역 객체 window의 프로퍼티다.
console.log(window.y); // 2
console.log(y); // 2

// 함수 선언문으로 정의한 전역 함수는 전역 객체 window의 프로퍼티다.
console.log(window.foo); // ƒ foo() {}
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(foo); // ƒ foo() {}

let x = 1;

// let, const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다.
console.log(window.x); // undefined
console.log(x); // 1

