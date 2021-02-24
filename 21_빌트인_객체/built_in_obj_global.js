// 전역 객체 global object
// 브라우저 - window, node.js - global
// ES11 에서는 globalThis
// 브라우저 환경
globalThis === this   // true
globalThis === window // true
globalThis === self   // true
globalThis === frames // true

// Node.js 환경(12.0.0 이상)
globalThis === this   // true
globalThis === global // true

// 전역 객체는 표준 빌트인 객체와 환경에 따른 호스트 객체, var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다.
// 즉, 전역 객체는 계층적 구조상 어떤 객체에도 속하지 않은 모든 빌트인 객체의 최상위 객체다.
// 전역 객체 자신은 어떤 객체의 프로퍼티도 아니며 계층 구조상 표준 빌트인 객체와 호스트 객체를 프로퍼티로 소유한다.
// 전역 객체는 개발자가 의도적으로 생성할 수 없다. 즉 전역 객체를 생성할 수 있는 생성자 함수가 제공되지 않는다
// 전역 객체의 프로퍼티를 참조할 때 windos 또는 global을 생략할 수 있다.

// 문자열 'F'를 16진수로 해석하여 10진수로 변환하여 반환한다.
window.parseInt('F', 16); // -> 15
// window.parseInt는 parseInt로 호출할 수 있다.
parseInt('F', 16); // -> 15

window.parseInt === parseInt; // -> true

// var 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역, 그리고 전역함수는 전역 객체의 프로퍼티가 된다.
// var 키워드로 선언한 전역 변수
var foo = 1;
console.log(window.foo); // 1

// 선언하지 않은 변수에 값을 암묵적 전역. bar는 전역 변수가 아니라 전역 객체의 프로퍼티다.
bar = 2; // window.bar = 2
console.log(window.bar); // 2

// 전역 함수
function baz() { return 3; }
console.log(window.baz()); // 3

// let이나 const 키워드로 선언한 전역변수는 전역 객체의 프로퍼티가 아니다.  let이나 const로 선언하면 보이지 않는 개념적인 블록 내에 존재하게된다.
let foo = 123;
console.log(window.foo); // undefined

// 브라우저 환경의 모든 자바스크립트 코드는 하나의 전역객체인 window를 공유한다. script 태그로 분리하더라도 그렇다.

// 빌트인 전역 프로퍼티
// 전역 객체의 프로퍼티를 의미하며 어플리케이션 전역에서 사용하는 값을 제공한다
// 1. Infinity : 무한대를 나타내는 숫자값
// 전역 프로퍼티는 window를 생략하고 참조할 수 있다.
console.log(window.Infinity === Infinity); // true

// 양의 무한대
console.log(3/0);  // Infinity
// 음의 무한대
console.log(-3/0); // -Infinity
// Infinity는 숫자값이다.
console.log(typeof Infinity); // number

// 2. NaN : Not-a-Number 숫자가 아님
console.log(window.NaN); // NaN

console.log(Number('xyz')); // NaN
console.log(1 * 'string');  // NaN
console.log(typeof NaN);    // number

// 3. undefined : 원시 타입 undefined를 값으로 가짐
console.log(window.undefined); // undefined

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined

// 빌트인 전역 함수
// 전역 객체의 메서드로 어플리케이션 전역에서 호출 가능
// 1. eval : 자바스크립트 코드를 나타내는 문자열을 인수로 전달받는다. 표현식이면 문자열 코드를 런타임에 평가해 값을 생성한다
// 문이라면 문자열 코드를 런타임에 실행한다. 문자열 코드가 여러개의 문으로 이뤄져 있다면 모든 문을 실행한다
/**
 * 주어진 문자열 코드를 런타임에 평가 또는 실행한다.
 * @param {string} code - 코드를 나타내는 문자열
 * @returns {*} 문자열 코드를 평가/실행한 결과값
 * eval(code);
 */
// 표현식인 문
eval('1 + 2;'); // -> 3
// 표현식이 아닌 문
eval('var x = 5;'); // -> undefined

// eval 함수에 의해 런타임에 변수 선언문이 실행되어 x 변수가 선언되었다.
console.log(x); // 5

// 객체 리터럴은 반드시 괄호로 둘러싼다.
const o = eval('({ a: 1 })');
console.log(o); // {a: 1}

// 함수 리터럴은 반드시 괄호로 둘러싼다.
const f = eval('(function() { return 1; })');
console.log(f()); // 1

// 여러개의 문
console.log(eval('1 + 2; 3 + 4;')); // 7

// eval 함수는 자신이 호출된 위치에 해당하는 기존의 스코프를 런타임에 동적으로 수정한다
const x = 1;

function foo() {
    // eval 함수는 런타임에 foo 함수의 스코프를 동적으로 수정한다.
    eval('var x = 2;');
    console.log(x); // 2
}

foo();
console.log(x); // 1
// eval 함수는 foo 함수의 스코프가 이미 존재함에도 기존의 스코프를 런타임에 동적으로 수정한다
// 이 경우 전달받은 코드는 이미 그 위치에 존재하던 코드처럼 동작한다
// strict mode의 경우에는 스코프를 수정하지 않고 자체적인 스코프르 생성한다.

const x = 1;

function foo() {
    'use strict';

    // strict mode에서 eval 함수는 기존의 스코프를 수정하지 않고 eval 함수 자신의 자체적인 스코프를 생성한다.
    eval('var x = 2; console.log(x);'); // 2
    console.log(x); // 1
}

foo();
console.log(x); // 1

// 인수로 전달받은 문자열 코드가 let const 키워드를 사용한 변수 선언문이면 암묵적으로 strict mode로 작동한다.
const x = 1;

function foo() {
    eval('var x = 2; console.log(x);'); // 2
    // let, const 키워드를 사용한 변수 선언문은 strict mode가 적용된다.
    eval('const x = 3; console.log(x);'); // 3
    console.log(x); // 2
}

foo();
console.log(x); // 1

// eval 함수를 통해 사용자로부터 입력받은 콘텐츠 데이더를 실행하는 것은 보안에 매우 취약하다
// 엔진에 의해 최적화도 수행되지 않으므로 eval 함수는 사용하지 않는것이 좋다

// 2. isFinite : 전달받은 상수가 정상적인 유한수인지 검사하여 boolean 값을 반환한다
// 숫자가 아닐경우 숫자로 타입을 변환하며, NaN 일 경우 false를 반환한다
/**
 * 전달받은 인수가 유한수인지 확인하고 그 결과를 반환한다.
 * @param {number} testValue - 검사 대상 값
 * @return {boolean} 유한수 여부 확인 결과
 * isFinite(testValue)
 */
// 인수가 유한수이면 true를 반환한다.
isFinite(0);    // -> true
isFinite(2e64); // -> true
isFinite('10'); // -> true: '10' → 10
isFinite(null); // -> true: null → 0

// 인수가 무한수 또는 NaN으로 평가되는 값이라면 false를 반환한다.
isFinite(Infinity);  // -> false
isFinite(-Infinity); // -> false

// 인수가 NaN으로 평가되는 값이라면 false를 반환한다.
isFinite(NaN);     // -> false
isFinite('Hello'); // -> false
isFinite('2005/12/12'); // -> false
// isFinite(null)은 true를 반환한다. null을 숫자로 변환하면 0이 되기 때문이다.
console.log(+null); // 0

// 3. isNaN : 전달받은 인수가 NaN 인지 검사하여 boolean 값 리턴, 숫자가 아닌경우 타입 변환
/**
 * 주어진 숫자가 NaN 인지 확인하고 그 결과를 반환한다
 * @param {number} testValue - 검사 대상 값
 * @returns {boolean} - NaN 여부 확인 결과
 * isNaN(testValue)
 */
// 숫자
isNaN(NaN); // -> true
isNaN(10);  // -> false

// 문자열
isNaN('blabla'); // -> true: 'blabla' => NaN
isNaN('10');     // -> false: '10' => 10
isNaN('10.12');  // -> false: '10.12' => 10.12
isNaN('');       // -> false: '' => 0
isNaN(' ');      // -> false: ' ' => 0

// 불리언
isNaN(true); // -> false: true → 1
isNaN(null); // -> false: null → 0

// undefined
isNaN(undefined); // -> true: undefined => NaN

// 객체
isNaN({}); // -> true: {} => NaN

// date
isNaN(new Date());            // -> false: new Date() => Number
isNaN(new Date().toString()); // -> true:  String => NaN

// 4. parseFloat : 전달받은 문자열 인수를 부동 소수점 숫자floating point number, 즉 실수로 해석하여 반환한다
/**
 * 전달받은 문자열 인수를 실수로 해석하여 반환한다
 * @param {string} string -변환 대상 값
 * @returns {numbet}- 변환 결과
 * parseFloat(string)
 */
// 문자열을 실수로 해석하여 반환한다.
parseFloat('3.14');  // -> 3.14
parseFloat('10.00'); // -> 10

// 공백으로 구분된 문자열은 첫 번째 문자열만 변환한다.
parseFloat('34 45 66'); // -> 34
parseFloat('40 years'); // -> 40

// 첫 번째 문자열을 숫자로 변환할 수 없다면 NaN을 반환한다.
parseFloat('He was 40'); // -> NaN

// 앞뒤 공백은 무시된다.
parseFloat(' 60 '); // -> 60

// 5. parseInt : 전달받은 문자열 인수를 정수integer로 해석해서 반환한다.
/**
 * 전달받은 문자열 인수를 정수로 해석하여 반환한다
 * @param {string} string - 변환 대상 값
 * @param {number} [radix] - 진법을 나타내는 기수(2~36, 기본값 10)
 * @returns {number} 변환 결과
 * parseInt(string, radix)
 */
// 문자열을 정수로 해석하여 반환한다.
parseInt('10');     // -> 10
parseInt('10.123'); // -> 10
// 전달받은 인수가 문자열이 아니면 문자열로 변환한 당므 정수로 해석하여 반환
parseInt(10);     // -> 10
parseInt(10.123); // -> 10
// 기수를 지정하여 10진수 정수로 반환받는다
// 10'을 10진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt('10'); // -> 10
// '10'을 2진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt('10', 2); // -> 2
// '10'을 8진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt('10', 8); // -> 8
// '10'을 16진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt('10', 16); // -> 16
// 기수를 지정하여 10진수 숫자를 해당 기수의 문자열로 변환하여 반환하고 싶을 때는
// Number.prototype.toString 메서드를 사용한다.
const x = 15;

// 10진수 15를 2진수로 변환하여 그 결과를 문자열로 반환한다.
x.toString(2); // -> '1111'
// 문자열 '1111'을 2진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt(x.toString(2), 2); // -> 15

// 10진수 15를 8진수로 변환하여 그 결과를 문자열로 반환한다.
x.toString(8); // -> '17'
// 문자열 '17'을 8진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt(x.toString(8), 8); // -> 15

// 10진수 15를 16진수로 변환하여 그 결과를 문자열로 반환한다.
x.toString(16); // -> 'f'
// 문자열 'f'를 16진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt(x.toString(8), 8); // -> 15

// 숫자값을 문자열로 변환한다.
x.toString(); // -> '15'
// 문자열 '15'를 10진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt(x.toString()); // -> 15

// 첫 번쨰 인수로 전달된 문자열이 "0x" 또는 "0X"로 시작하는 16진수 리터럴이면
// 16진수 리터럴 '0xf'를 16진수로 해석하고 10진수 정수로 그 결과를 반환한다.
parseInt('0xf'); // -> 15
// 위 코드와 같다.
parseInt('f', 16); // -> 15

// 2진수, 8진수 리터럴은 제대로 안된다
// 2진수 리터럴(0b로 시작)은 제대로 해석하지 못한다. 0 이후가 무시된다.
parseInt('0b10'); // -> 0
// 8진수 리터럴(ES6에서 도입. 0o로 시작)은 제대로 해석하지 못한다. 0 이후가 무시된다.
parseInt('0o10'); // -> 0

// ES6부터는 2, 8진수를 해석하려면 지수를 반드시 지정해야한다
// 문자열 '10'을 2진수로 해석한다.
parseInt('10', 2); // -> 2
// 문자열 '10'을 8진수로 해석한다.
parseInt('10', 8); // -> 8

// 'A'는 10진수로 해석할 수 없다.
parseInt('A0'); // -> NaN
// '2'는 2진수로 해석할 수 없다.
parseInt('20', 2); // -> NaN

// 10진수로 해석할 수 없는 'A' 이후의 문자는 모두 무시된다.
parseInt('1A0'); // -> 1
// 2진수로 해석할 수 없는 '2' 이후의 문자는 모두 무시된다.
parseInt('102', 2); // -> 2
// 8진수로 해석할 수 없는 '8' 이후의 문자는 모두 무시된다.
parseInt('58', 8); // -> 5
// 16진수로 해석할 수 없는 'G' 이후의 문자는 모두 무시된다.
parseInt('FG', 16); // -> 15

// 공백으로 구분된 문자열은 첫 번째 문자열만 변환한다.
parseInt('34 45 66'); // -> 34
parseInt('40 years'); // -> 40
// 첫 번째 문자열을 숫자로 변환할 수 없다면 NaN을 반환한다.
parseInt('He was 40'); // -> NaN
// 앞뒤 공백은 무시된다.
parseInt(' 60 '); // -> 60

// 6. encodeURI / decodeURI : 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩/디코딩한다
// URI는 인터넷에 있는 자원을 나타내는 유일한 주소를 말한다
/**
 * 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다.
 * @param {string} uri - 완전한 URI
 * @returns {string} 인코딩된 URI
 * encodeURI(uri)
 */
// 이스케이프 처리 : 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하는 것.
// 완전한 URI
const uri = 'http://example.com?name=이웅모&job=programmer&teacher';

// encodeURI 함수는 완전한 URI를 전달받아 이스케이프 처리를 위해 인코딩한다.
const enc = encodeURI(uri);
console.log(enc);
// http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher

// decodeURI 함수는 인코딩된 URI를 이스케이프 이전으로 디코딩
/**
 * 인코딩된 URI를 전달받아 이스케이프 처리 이전으로 디코딩한다.
 * @param {string} encodedURI - 인코딩된 URI
 * @returns {string} 디코딩된 URI
 * decodeURI(encodedURI)
 */
const uri = 'http://example.com?name=이웅모&job=programmer&teacher';

// encodeURI 함수는 완전한 URI를 전달받아 이스케이프 처리를 위해 인코딩한다.
const enc = encodeURI(uri);
console.log(enc);
// http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher

// decodeURI 함수는 인코딩된 완전한 URI를 전달받아 이스케이프 처리 이전으로 디코딩한다.
const dec = decodeURI(enc);
console.log(dec);
// http://example.com?name=이웅모&job=programmer&teacher

// 7. encodeURIComponent / decodeURIComponent : URI 구성요소를 인수로 전달받아 인코딩/디코딩한다.
/**
 * URI의 구성요소를 전달받아 이스케이프 처리를 위해 인코딩한다.
 * @param {string} uriComponent - URI의 구성요소
 * @returns {string} 인코딩된 URI의 구성요소
 * encodeURIComponent(uriComponent)
 */

/**
 * 인코딩된 URI의 구성요소를 전달받아 이스케이프 처리 이전으로 디코딩한다.
 * @param {string} encodedURIComponent - 인코딩된 URI의 구성요소
 * @returns {string} 디코딩된 URI의 구성요소
 * decodeURIComponent(encodedURIComponent)
 */

// encodeURIComponent 함수는 인수로 전달된 문자열을 URI 구성요소인 쿼리 스트링의 일부로 간주하여 =, ?, & 까지 인코딩한다
// 반면 encodeURI 함수는 매개변수로 전달된 문자열을 완전한 URI 전체라고 간주하여 =, ?, &는 인코딩하지 않는다.
// URI의 쿼리 스트링
const uriComp = 'name=이웅모&job=programmer&teacher';

// encodeURIComponent 함수는 인수로 전달받은 문자열을 URI의 구성요소인 쿼리 스트링의 일부로 간주한다.
// 따라서 쿼리 스트링 구분자로 사용되는 =, ?, &까지 인코딩한다.
let enc = encodeURIComponent(uriComp);
console.log(enc);
// name%3D%EC%9D%B4%EC%9B%85%EB%AA%A8%26job%3Dprogrammer%26teacher

let dec = decodeURIComponent(enc);
console.log(dec);
// 이웅모&job=programmer&teacher

// encodeURI 함수는 인수로 전달받은 문자열을 완전한 URI로 간주한다.
// 따라서 쿼리 스트링 구분자로 사용되는 =, ?, &를 인코딩하지 않는다.
enc = encodeURI(uriComp);
console.log(enc);
// name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher

dec = decodeURI(enc);
console.log(dec);
// name=이웅모&job=programmer&teacher


// 암묵적 전역
var x = 10; // 전역 변수

function foo () {
    // 선언하지 않은 식별자에 값을 할당
    y = 20; // window.y = 20;
}
foo();

// 선언하지 않은 식별자 y를 전역에서 참조할 수 있다.
console.log(x + y); // 30
// 에러가 안나는 이유는 선언하지 않은 식별자에 값을 할당하면 전역 객체의 프로퍼티가 되기 떄문.
// 이런 현상이 암묵적 전역
// 전역 객체의 프로퍼티로 추가되었을 뿐 변수가 아니므로 호이스팅은 발생하지 않는다.

// 전역 변수 x는 호이스팅이 발생한다.
console.log(x); // undefined
// 전역 변수가 아니라 단지 전역 객체의 프로퍼티인 y는 호이스팅이 발생하지 않는다.
console.log(y); // ReferenceError: y is not defined

var x = 10; // 전역 변수

function foo () {
    // 선언하지 않은 식별자에 값을 할당
    y = 20; // window.y = 20;
}
foo();

// 선언하지 않은 식별자 y를 전역에서 참조할 수 있다.
console.log(x + y); // 30

// 또한 변수가 아니라 단지 프로퍼티인 y는 delete 연산자로 삭제할 수 있다.
// 전역 변수는 프로퍼티이지만 delete 연산자로 삭제할 수 없다.
var x = 10; // 전역 변수

function foo () {
    // 선언하지 않은 식별자에 값을 할당
    y = 20; // window.y = 20;
    console.log(x + y);
}

foo(); // 30

console.log(window.x); // 10
console.log(window.y); // 20

delete x; // 전역 변수는 삭제되지 않는다.
delete y; // 프로퍼티는 삭제된다.

console.log(window.x); // 10
console.log(window.y); // undefined