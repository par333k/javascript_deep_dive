// 표준 빌트인 객체 Number
// 생성자 함수 객체로 new 연산자와 함께 Number 인스턴스 생성이 가능.
// 인수를 전달하지 않고 new와 함께 호출시 [[NumberData]] 내부 슬롯에 0을 할당안 Number 래퍼객체를 생성한다.
const numObj = new Number();
console.log(numObj); // Number {[[PrimitiveValue]]: 0}, PrivitiveValue는 ES5에서의 NumberData

// 인수로 숫자를 전달하면 해당 숫자를 내부 슬롯에 할당한 Number 래퍼 객체 생성
const numObj = new Number(10);
console.log(numObj); // Number {[[PrimitiveValue]]: 10}

// 인수로 숫자가 아닌 값을 전달하면 인수를 숫자로 강제 변환, 변환이 불가능하다면 NaN을 [[NumberData]] 내부 슬롯에 할당한 Number 래퍼 객체를 생성
let numObj = new Number('10');
console.log(numObj); // Number {[[PrimitiveValue]]: 10}

numObj = new Number('Hello');
console.log(numObj); // Number {[[PrimitiveValue]]: NaN}

// new 연산자를 사용하지 않고 Number 생성자 함수를 호출하면 Number 인스턴스가 아닌 숫자를 반환하는 특성을 통해 명시적 타입 변환 가능
// 문자열 타입 => 숫자 타입
Number('0');     // -> 0
Number('-1');    // -> -1
Number('10.53'); // -> 10.53

// 불리언 타입 => 숫자 타입
Number(true);  // -> 1
Number(false); // -> 0


// Number 프로퍼티
// 1. Number.EPSILON
// ES6에서 도입된 것으로 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이와 같다.
// 다음 예제와 같이 부동소수점 산술 연산은 정확한 결과를 기대하기 어렵다
0.1 + 0.2;         // -> 0.30000000000000004
0.1 + 0.2 === 0.3; // -> false
// 정수는 2진법으로 오차 없이 저장 가능하지만 부동소수점을 표현하기 위해 가장 널리 쓰이는 표준인 IEEE 754는 2진법으로 변환했을 때
// 무한 소수가 되어 미세한 오차가 발생할 수 밖에 없는 구조적 한계가 있다.
// Number.EPSILON은 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용한다.
function isEqual(a, b){
    // a와 b를 뺀 값의 절대값이 Number.EPSILON보다 작으면 같은 수로 인정한다.
    return Math.abs(a - b) < Number.EPSILON;
}

isEqual(0.1 + 0.2, 0.3); // -> true


// 2. Number.MAX_VALUE
// Number.MAX_VALUE는 자바스크립트에서 표현할 수 있는 가장 큰 양수 값이다. Number.MAX_VALUE 보다 큰 숫자는 Infinity다
Number.MAX_VALUE; // -> 1.7976931348623157e+308
Infinity > Number.MAX_VALUE; // -> true


// 3. Number.MIN_VALUE
// 자바스크립트에서 표현할 수 있는 가장 작은 양수 값이다. Number.MIN_VALUE보다 작은 숫자는 0이다.
Number.MIN_VALUE; // -> 5e-324
Number.MIN_VALUE > 0; // -> true


// 4. Number.MAX_SAFE_INTEGER
// 자바스크립트에서 안전하게 표현할 수 있는 가장 큰 정수값이다.
Number.MAX_SAFE_INTEGER; // -> 9007199254740991

// 5. Number.MIN_SAFE_INTEGER
// 자바스크립트에서 가장 안전하게 표현할 수 있는 가장 작은 정수값이다.
Number.MIN_SAFE_INTEGER; // -> -9007199254740991

// 6. Number.POSITIVE_INFINITY
// 양의 무한대를 나타내는 숫자값
Number.POSITIVE_INFINITY; // -> Infinity

// 7. Number.NEGATIVE_INFINITY
// 음의 무한대를 나타내는 숫자값
Number.NEGATIVE_INFINITY; // -> -Infinity

// 8. Number.NaN
// 숫자가 아님(Not-a-Number)를 나타내는 숫자값
Number.NaN; // -> NaN


// Number 메서드
// 1. Number.isFinite
// ES6에서 도입된 정적 메서드는 인수로 전다로딘 숫자값이 정상적인 유한수인지 검사하여 boolean으로 반환한다.
// 인수가 정상적인 유한수이면 true를 반환한다.
Number.isFinite(0);                // -> true
Number.isFinite(Number.MAX_VALUE); // -> true
Number.isFinite(Number.MIN_VALUE); // -> true

// 인수가 무한수이면 false를 반환한다.
Number.isFinite(Infinity);  // -> false
Number.isFinite(-Infinity); // -> false

// 만약 인수가 NaN이면 언제나 false를 반환한다.
Number.isFinite(NaN); // -> false

// Number.isFinite는 빌트인 전역 함수 isFinite와 차이가 있다.
// 빌트인 전역 함수인 isFinite는 인수를 숫자로 암묵적 타입변환을 통해 검사하지만 정적 메서드인 Number.isFinite는 암묵적 타입변환을 하지 않는다
// 따라서 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 false다.
// Number.isFinite는 인수를 숫자로 암묵적 타입 변환하지 않는다.
Number.isFinite(null); // -> false

// isFinite는 인수를 숫자로 암묵적 타입 변환한다. null은 0으로 암묵적 타입 변환된다.
isFinite(null); // -> true


// 2. Number.isInteger
// ES6에서 도입된 정적 메서드로 인수로 전달된 숫자값이 정수인지 검사하여 boolean값으로 반환한다. 암묵적 타입변환이 이뤄지지 않는다
// 인수가 정수이면 true를 반환한다.
Number.isInteger(0)     // -> true
Number.isInteger(123)   // -> true
Number.isInteger(-123)  // -> true

// 0.5는 정수가 아니다.
Number.isInteger(0.5)   // -> false
// '123'을 숫자로 암묵적 타입 변환하지 않는다.
Number.isInteger('123') // -> false
// false를 숫자로 암묵적 타입 변환하지 않는다.
Number.isInteger(false) // -> false
// Infinity/-Infinity는 정수가 아니다.
Number.isInteger(Infinity)  // -> false
Number.isInteger(-Infinity) // -> false


// 3. Number.isNaN
// ES6에서 도입된 정적 메서드로 NaN인지 검사하여 boolean 값으로 반환한다.
// 인수가 NaN이면 true를 반환한다.
Number.isNaN(NaN); // -> true

// 빌트인 전역함수인 isNaN은 전달받은 인수를 숫자로 암묵적인 타입 변환을 통해 검사를 수행하지만 Number.isNaN메서드는 타입변환하지 않는다.
// Number.isNaN은 인수를 숫자로 암묵적 타입 변환하지 않는다.
Number.isNaN(undefined); // -> false

// isFinite는 인수를 숫자로 암묵적 타입 변환한다. undefined는 NaN으로 암묵적 타입 변환된다.
isNaN(undefined); // -> true

// 4. Number.isSafeInteger
// ES6에서 도입된 정적 메서드로, 인수로 전달된 숫자값이 안전한 정수인지 검사하여 그 결과를 boolean 값으로 반환한다. 암묵적 타입변환하지 않는다.
// 0은 안전한 정수이다.
Number.isSafeInteger(0); // -> true
// 1000000000000000은 안전한 정수이다.
Number.isSafeInteger(1000000000000000); // -> true

// 10000000000000001은 안전하지 않다.
Number.isSafeInteger(10000000000000001); // -> false
// 0.5은 정수가 아니다.
Number.isSafeInteger(0.5); // -> false
// '123'을 숫자로 암묵적 타입 변환하지 않는다.
Number.isSafeInteger('123'); // -> false
// false를 숫자로 암묵적 타입 변환하지 않는다.
Number.isSafeInteger(false); // -> false
// Infinity/-Infinity는 정수가 아니다.
Number.isSafeInteger(Infinity); // -> false

// 5. Number.prototype.toExponential
// toExponential 메서드는 숫자를 지수 표기법으로 변환하여 문자열로 반환한다
// 지수 표기법은 매우 크거나 작은 수를 표기할 때 주로 사용하며 e(Exponent)앞에 있는 숫자에 10의 n승을 곱하는 형식으로 수를 나타낸다.
// 인수로 소수점 이하로 표현할 자릿수를 전달할 수 있다.
(77.1234).toExponential();  // -> "7.71234e+1"
(77.1234).toExponential(4); // -> "7.7123e+1"
(77.1234).toExponential(2); // -> "7.71e+1"

// 참고로 다음과 같이 숫자 리터럴과 함께 Number 프로토타입 메서드를 사용할 경우 에러가 발생한다.
//77.toExponential(); // -> SyntaxError: Invalid or unexpected token

// 숫자 뒤의 . 은 부동 소수점 숫자의 숫자기호일수도 있고 객체 프로퍼티의 접근 연산자일수도 있다
// 자바스크립트 엔진은 숫자 뒤의 .을 부동소수점 숫자의 소수 구분기호로 해석한다
// 그러나 위 예제에서의 77은 Number 래퍼 객체로, 이를 부동소수점 숫자의 소수 구분기호로 해석하면
// 뒤의 메서드를 프로퍼티로 해석할 수 없어 문법에러가 난다.

77.1234.toExponential(); // -> "7.71234e+1"
// 위 예제의 경우 77 의 점 뒤에 숫자가 이어지므로 중간의 .은 명백하게 소수 구분기호다. 숫자에 소수점은 하나만 존재하므로
// 두 번째 점은 프로퍼티 접근 연산자로 해석되어 에러가 나지 않는다.
// 그룹 연산자를 사용하면 혼란을 막을 수 있다.
(77).toExponential(); // -> "7.7e+1"
// 공백을 통해서도 가능하지만 바람직하진 않다.
77 .toExponential(); // -> "7.7e+1"

// 6. Number.prototype.toFixed
// toFixed 메서드는 숫자를 반올림하여 문자열로 반환한다.
// 반올림하는 소수점 이하 자릿수를 나타내는 0~20 사이의 정수값을 인수로 전달할 수 있고, 생략하면 기본값 0이 지정된다.
// 소수점 이하 반올림. 인수를 생략하면 기본값 0이 지정된다.
(12345.6789).toFixed(); // -> "12346"
// 소수점 이하 1자리수 유효, 나머지 반올림
(12345.6789).toFixed(1); // -> "12345.7"
// 소수점 이하 2자리수 유효, 나머지 반올림
(12345.6789).toFixed(2); // -> "12345.68"
// 소수점 이하 3자리수 유효, 나머지 반올림
(12345.6789).toFixed(3); // -> "12345.679"

// 7. Number.prototype.toPrecision
// toPrecision 메서드는 인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환한다
// 인수로 전달받은 전체 자릿수로 표현할 수 없는 경우 지수 표기법으로 결과를 반환한다.
// 전체 자릿수를 나타내는 0~21 사이의 정수값을 인수로 전달할 수 있다. 생략시 기본값 0이 지정된다.
// 전체 자리수 유효. 인수를 전달하지 않으면 기본값 0이 전달된다.
(12345.6789).toPrecision(); // -> "12345.6789"
// 전체 1자리수 유효, 나머지 반올림
(12345.6789).toPrecision(1); // -> "1e+4"
// 전체 2자리수 유효, 나머지 반올림
(12345.6789).toPrecision(2); // -> "1.2e+4"
// 전체 6자리수 유효, 나머지 반올림
(12345.6789).toPrecision(6); // -> "12345.7"

// 8. Number.prototype.toString
// toString 메서드는 숫자를 문자열로 변환하여 반환한다. 진법을 나타내는 2~36사이의 정수값을 인수로 전달할 수 있다.
// 인수를 생략하면 기본값 10진법이 지정된다.
// 인수를 생략하면 10진수 문자열을 반환한다.
(10).toString(); // -> "10"
// 2진수 문자열을 반환한다.
(16).toString(2); // -> "10000"
// 8진수 문자열을 반환한다.
(16).toString(8); // -> "20"
// 16진수 문자열을 반환한다.
(16).toString(16); // -> "10"
