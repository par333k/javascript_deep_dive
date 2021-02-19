// 일급 객체의 조건(first-class object 또는 first-class citizens)
// 1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
// 2. 변수나 자료구조(객체, 배열)등에 저장할 수 있다.
// 3. 함수의 매개변수에 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.

// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
    return ++num;
};

const decrease = function (num) {
    return --num;
};

// 2. 함수는 객체에 저장할 수 있다.
const predicates = { increase, decrease };

// 3. 함수의 매개변수에게 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(predicate) {
    let num = 0;

    return function () {
        num = predicate(num);
        return num;
    };
}

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(predicates.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2

// 함수가 일급 객체라는 것은 함수를 객체와 동일하게 사용할 수 있다는 것
// 객체는 값이므로 함수는 값과 동일하게 취급 가능하다.
// 따라서 함수는 값을 사용할 수 있는 곳(변수 할당문, 객체의 프로퍼티 값, 배열의 요소, 함수 호출의 인수, 함수 반환문) 이라면
// 어디서든지 리터럴로 정의할 수 있으며 런타임runtime에 함수 객체로 평가된다.
// 함수와 일반 객체의 차이는 호출 여부에 있다. 함수 객체는 호출이 가능하다. 함수 객체는 일반 객체에 없는 고유의 프로퍼티가 있다.

function square(number) {
    return number * number;
}

console.log(Object.getOwnPropertyDescriptors(square));
/*
 함수 객체의 데이터 프로퍼티
{
  length: {value: 1, writable: false, enumerable: false, configurable: true},
  name: {value: "square", writable: false, enumerable: false, configurable: true},
  arguments: {value: null, writable: false, enumerable: false, configurable: false},
  caller: {value: null, writable: false, enumerable: false, configurable: false},
  prototype: {value: {...}, writable: true, enumerable: false, configurable: false}
}
*/

// __proto__는 square 함수의 프로퍼티가 아니다. 접근자 프로퍼티이다. Object.prototype 객체의 프로퍼티를 상속 받았다.
console.log(Object.getOwnPropertyDescriptor(square, '__proto__')); // undefined

// __proto__는 Object.prototype 객체의 접근자 프로퍼티다.
// square 함수는 Object.prototype 객체로부터 __proto__ 접근자 프로퍼티를 상속받는다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// arguments 프로퍼티
// arguments 객체는 함수 호출 시 전달된 인수들의 정보를 담고있는 순회 가능한(iterable) 유사 배열 객체이며 함수 내부에서 지역 변수처럼 활용된다
// Function.arguments와 같은 사용법은 권장되지 않는다. ES3 표준부터 폐지되었다.
// 지역 변수처럼 사용할 수 있는 arguments 객체를 참조하도록 한다.
// 자바스크립트는 함수의 매개변수와 인수의 개수 일치 여부를 확인하지 않는다
function multiply(x, y) {
    console.log(arguments);
    return x * y;
}

console.log(multiply());        // NaN
console.log(multiply(1));       // NaN
console.log(multiply(1, 2));    // 2
console.log(multiply(1, 2, 3)); // 2

// 함수가 호출되면 함수 몸체 내에서 암묵적으로 매개변수가 선언되고 undefined 로 초기화된 이후 인수가 할당된다.
// 인수가 전달되지 않은 매개변수는 undefined로 초기화된 상태를 유지한다
// 초과된 인수는 암묵적으로 arguments 객체의 프로퍼티로 보관된다
// 프로퍼티 키는 인수의 순서를 나타낸다.

// arguments 객체의 Symbol(Symbol.iterator) 프로퍼티는 arguments 객체를 순회 가능한 자료구조인
// iterable로 만들기 위한 프로퍼티다.
// Symbol.iterator를 프로퍼티 키로 사용한 메서드를 구현하는 것에 의해 이터러블이 된다.
function multiply(x, y) {
    // 이터레이터
    const iterator = arguments[Symbol.iterator]();

    // 이터레이터의 next 메서드를 호출하여 이터러블 객체 arguments를 순회
    console.log(iterator.next()); // {value: 1, done: false}
    console.log(iterator.next()); // {value: 2, done: false}
    console.log(iterator.next()); // {value: 3, done: false}
    console.log(iterator.next()); // {value: undefined, done: true}

    return x * y;
}

multiply(1, 2, 3);


// arguments 객체는 매개변수 개수를 확정할 수 없는 '가변 인자 함수'를 구현할 때 유용하다.
function sum() {
    let res = 0;

    // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문으로 순회할 수 있다.
    for (let i = 0; i < arguments.length; i++) {
        res += arguments[i];
    }

    return res;
}

console.log(sum());        // 0
console.log(sum(1, 2));    // 3
console.log(sum(1, 2, 3)); // 6

// arguments 객체는 유사 배열 객체array-like object다.
// 이터러블이 도입된 ES6부터 arguments 객체는 유사 배열 객체이면서 동시에 이터러블이다.
// 유사 배열 객체는 배열이 아니므로 배열 메서드를 사용할 경우 에러가 발생한다.

function sum() {
    // arguments 객체를 배열로 변환
    const array = Array.prototype.slice.call(arguments);
    return array.reduce(function (pre, cur) {
        return pre + cur;
    }, 0);
}

console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4, 5)); // 15

// ES6 Rest parameter
function sum(...args) {
    return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4, 5)); // 15

// caller 프로퍼티
// ECMAScript 사양에 포함되지 않은 비표준 프로퍼티다.
function foo(func) {
    return func();
}

function bar() {
    return 'caller : ' + bar.caller;
}

// 브라우저에서의 실행한 결과 - node.js 환경과는 다르다
console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar());    // caller : null

// length 프로퍼티
// 함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.
// arguments 객체의 length 프로퍼티와 함수 객체의 length 프로퍼티의 값은 다를 수 있다.
// 인자argument의 갯수와 매개변수parameter의 갯수라는 차이가 있다
function foo() {}
console.log(foo.length); // 0

function bar(x) {
    return x;
}
console.log(bar.length); // 1

function baz(x, y) {
    return x * y;
}
console.log(baz.length); // 2

// name 프로퍼티
// ES5에서 name 프로퍼티는 빈 문자열을 값으로 갖는다. ES6에서는 함수 객체를 가리키는 식별자를 값으로 갖는다.
// 함수를 호출할 떄는 함수 이름이 아닌 함수 객체를 가리키는 식별자로 호출한다.
// 기명 함수 표현식
var namedFunc = function foo() {};
console.log(namedFunc.name); // foo

// 익명 함수 표현식
var anonymousFunc = function() {};
// ES5: name 프로퍼티는 빈 문자열을 값으로 갖는다.
// ES6: name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
console.log(anonymousFunc.name); // anonymousFunc

// 함수 선언문(Function declaration)
function bar() {}
console.log(bar.name); // bar

// __proto__ 접근자 프로퍼티
// __proto__ 프로퍼티는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티
// 내부 슬롯에는 직접 접근할 수 없고 간접적인 접근 방법을 제공하는 경우에 한하여 접근할 수 있다.

const obj = { a: 1 };

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
// hasOwnProperty 메서드는 Object.prototype의 메서드다.
console.log(obj.hasOwnProperty('a'));         // true
console.log(obj.hasOwnProperty('__proto__')); // false

// prototype 프로퍼티
// constructor만이 소유하는 프로퍼티이다.
// prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.

// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty('prototype'); // -> true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty('prototype'); // -> false
