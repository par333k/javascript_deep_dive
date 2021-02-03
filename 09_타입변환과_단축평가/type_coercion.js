// 자바스크립트 엔진에 의해 타입이 자동 변환되는 것을 암묵적 타입 변환(implicit coercion) 또는 타입 강제 변환 이라고 함
let x = 10;

// 암묵적 타입 변환
// 문자열 연결 연산자는 숫자 타입 x의 값을 바탕으로 새로운 문자열을 생성한다.
let str = x + '';
console.log(typeof str, str); // string 10

// x 변수의 값이 변경된 것은 아니다. 원시 값은 변경 불가능한 값 이므로 변경할 수 없다. 타입 변환이란 기존 원시 값을 사용해 다른 타입의 새로운 원시 값을 생성하는 것.
// 따라서 암묵적으로 타입 변환이 된 x의 값은 표현식 평가가 끝나면 가비지 컬렉터에 의해 메모리에서 해제된다

console.log(typeof x, x); // number 10

// 개발자의 의도와 상관없이 코드의 문맥을 고려해 암묵적 변환이 이뤄지는 경우
// 피연산자가 모두 문자열 타입이어야 하는 문맥
'10' + 2 // -> '102'

// 피연산자가 모두 숫자 타입이어야 하는 문맥
5 * '10' // -> 50

// 피연산자 또는 표현식이 불리언 타입이어야 하는 문맥
!0 // -> true
if (1) { };

// 1 + '2' // -> "12"

`1 + 1 = ${1 + 1}`; // -> "1 + 1 = 2"

//문자열 타입 아닌 값을 문자열 타입으로 암묵적 타입 변환을 수행할 때
// 숫자 타입
0 + '';         // -> "0"
-0 + '';       // -> "0"
1 + '';         // -> "1"
-1 + '';        // -> "-1"
NaN + '';       // -> "NaN"
Infinity + '';  // -> "Infinity"
-Infinity + ''; // -> "-Infinity"

// 불리언 타입
true + '';  // -> "true"
false + ''; // -> "false"

// null 타입
null + ''; // -> "null"

// undefined 타입
undefined + ''; // -> "undefined"

// 심벌 타입
(Symbol()) + ''; // -> TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + '';           // -> "[object Object]"
Math + '';           // -> "[object Math]"
[] + '';             // -> ""
[10, 20] + '';       // -> "10,20"
(function(){}) + ''; // -> "function(){}"
Array + '';          // -> "function Array() { [native code] }"

// 산술 연산자에 의한 맥락에 따라 숫자 타입으로 변환시킬때
1 - '1';   // -> 0
1 * '10';  // -> 10
1 / 'one'; // -> NaN, 피연산자를 숫자타입으로 변환 불가능할 때

// 비교 연산자는 피연산자의 크기를 비교하므로 문맥상 모두 숫자타입이어야 함.
'1' > 0;  // -> true

// + 단항 연산자는 피연산자가 숫자 타입의 값이 아니면 숫자 타입의 값으로 암묵적 타입 변환을 수행
// 문자열 타입
+''       // -> 0
+'0'     // -> 0
+'1'      // -> 1
+'string' // -> NaN

// 불리언 타입
+true     // -> 1
+false    // -> 0

// null 타입
+null     // -> 0

// undefined 타입
+undefined // -> NaN

// 심벌 타입
+Symbol() // -> ypeError: Cannot convert a Symbol value to a number

// 객체 타입
+{}             // -> NaN
+[]             // -> 0
+[10, 20]       // -> NaN
+(function(){}) // -> NaN

// 조건식의 평가 결과는 boolean 타입으로 암묵적 타입 변환 된다
if ('')    console.log('1');
if (true)  console.log('2');
if (0)     console.log('3');
if ('str') console.log('4');
if (null)  console.log('5');

// 2 4
// truthy 값, falsy 값으로 구분
// false, undefined, null, 0, -0, NaN, ''(빈 문자열) 은 모두 falsy
// 아래의 조건문은 모두 코드 블록을 실행한다.
if (!false)     console.log(false + ' is falsy value');
if (!undefined) console.log(undefined + ' is falsy value');
if (!null)      console.log(null + ' is falsy value');
if (!0)         console.log(0 + ' is falsy value');
if (!NaN)       console.log(NaN + ' is falsy value');
if (!'')        console.log('' + ' is falsy value');

// truthy, falsy 값 판별 함수
// 전달받은 인수가 Falsy 값이면 true, Truthy 값이면 false를 반환한다.
function isFalsy(v) {
    return !v;
}

// 전달받은 인수가 Truthy 값이면 true, Falsy 값이면 false를 반환한다.
function isTruthy(v) {
    return !!v;
}

// 모두 true를 반환한다.
isFalsy(false);
isFalsy(undefined);
isFalsy(null);
isFalsy(0);
isFalsy(NaN);
isFalsy('');

// 모두 true를 반환한다.
isTruthy(true);
isTruthy('0'); // 빈 문자열이 아닌 문자열은 Truthy 값이다.
isTruthy({});
isTruthy([]);