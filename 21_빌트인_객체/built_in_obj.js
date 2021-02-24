// 자바스크립트 객체 분류 3가지
// 1. 표준 빌트인 객체 : ECMAScript 사양에 정의된 객체를 말하며, 전역 공통 기능을 제공. 실행환경에 상관없이 사용가능
// 전역 객체의 프로퍼티로서 제공되며 별도의 선언 없이 언제나 참조가 가능하다.
// 2. 호스트 객체 : ECMAScript 사양에 정의되어 있지 않지만 자바스크립트 실행환경에서 추가로 제공되는 객체
// 브라우저의 DOM, Web Storage, fetch, Web Component, Web Worker 등이나 Node.js의 고유 API 등
// 3. 사용자 정의 객체 : 사용자가 직접 정의한 객체

// 표준 빌트인 객체
// Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 인스턴스를 생성할 수 있는 생성자 함수 객체다.
// 생성자 함수 객체인 표준 빌트인 객체는 프로토타입 메서드와 정적 메서드를 제공하고
// 생성자 함수 객체가 아닌 표준 빌트인 객체는 정적 메서드만 제공한다
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee'); // String {"Lee"}
console.log(typeof strObj);       // object

// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(123); // Number {123}
console.log(typeof numObj);     // object

// Boolean 생성자 함수에 의한 Boolean 객체 생성
const boolObj= new Boolean(true); // Boolean {true}
console.log(typeof boolObj);      // object

// Function 생성자 함수에 의한 Function 객체(함수) 생성
const func = new Function('x', 'return x * x'); // ƒ anonymous(x )
console.log(typeof func);                       // function

// Array 생성자 함수에 의한 Array 객체(배열) 생성
const arr = new Array(1, 2, 3); // (3) [1, 2, 3]
console.log(typeof arr);        // object

// RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
const regExp = new RegExp(/ab+c/i); // /ab+c/i
console.log(typeof regExp);         // object

// Date 생성자 함수에 의한 Date 객체 생성
const date = new Date();  // Fri May 08 2020 10:43:25 GMT+0900 (대한민국 표준시)
console.log(typeof date); // object

// 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체다
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee'); // String {"Lee"}

// String 생성자 함수를 통해 생성한 strObj 객체의 프로토타입은 String.prototype이다.
console.log(Object.getPrototypeOf(strObj) === String.prototype); // true

// 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체는 다양한 기능의 프로토타입 메서드를 제공한다
// 표준 빌트인 객체는 인스턴스 없이도 호출 가능한 빌트인 정적 메서드도 제공한다
// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(1.5); // Number {1.5}

// toFixed는 Number.prototype의 프로토타입 메서드다.
// Number.prototype.toFixed는 소수점 자리를 반올림하여 문자열로 반환한다.
console.log(numObj.toFixed()); // 2

// isInteger는 Number의 정적 메서드다.
// Number.isInteger는 인수가 정수(integer)인지 검사하여 그 결과를 Boolean으로 반환한다.
console.log(Number.isInteger(0.5)); // false

// 원시값과 래퍼 객체
// 원시값은 객체가 아니므로 프로퍼티나 메서드를 가질 수 없다
// 그러나 원시값인 문자열이 마치 객체처럼 동작한다
const str = 'hello';

// 원시 타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작한다.
console.log(str.length); // 5
console.log(str.toUpperCase()); // HELLO
// 원시값인 문자열 숫자 boolean 값에 대해 마침표 표기법 또는 대괄호 표기법으로 접근 시
// 자바스크립트 엔진은 일시적으로 원시값을 연관된 '객체'로 변환해 준다
// 이처럼 문자열, 숫자, boolean 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 래퍼 객체(wrapper object)라 한다.
const str = 'hi';

// 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환된다.
console.log(str.length); // 2
console.log(str.toUpperCase()); // HI

// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시값으로 되돌린다.
console.log(typeof str); // string
// 이 때 문자열 래퍼 객체인 String 생성자 함수의 인스턴스는 String.prototype의 메서드를 상속받아 사용할 수 있다

// ① 식별자 str은 문자열을 값으로 가지고 있다.
const str = 'hello';

// ② 식별자 str은 암묵적으로 생성된 래퍼 객체를 가리킨다.
// 식별자 str의 값 'hello'는 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다.
// 래퍼 객체에 name 프로퍼티가 동적 추가된다.
str.name = 'Lee';

// ③ 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
// 이때 ②에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.

// ④ 식별자 str은 새롭게 암묵적으로 생성된(②에서 생성된 래퍼 객체와는 다른) 래퍼 객체를 가리킨다.
// 새롭게 생성된 래퍼 객체에는 name 프로퍼티가 존재하지 않는다.
console.log(str.name); // undefined

// ⑤ 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
// 이때 ④에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.
console.log(typeof str, str);
// 숫자도 마찬가지다.
const num = 1.5;

// 원시 타입인 숫자가 래퍼 객체인 Number 객체로 변환된다.
console.log(num.toFixed()); // 2

// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시값으로 되돌린다.
console.log(typeof num, num); // number 1.5

// boolean도 마찬가지지만 값이나 메서드를 호출하는 경우는 별로 없다
// ES6 에서 도입된 Symbol도 래퍼 객체를 생성한다.
// 이처럼 원시값은 암묵적으로 생성된 래퍼 객체를 통해 객체처럼 사용할 수 있으므로 new 연산자를 통해 인스턴스 생성을 권장하지 않는다.
// null과 undefined는 래퍼 객체를 생성하지 않는다
