// 개발자가 의도적으 값의 타입을 반환하는 것을 명시적 타입 변환(explicit coercion) 또는 타입 캐스팅이라 한다
let x = 10;

// 명시적 타입 변환
// 숫자를 문자열로 타입 캐스팅한다.
let str = x.toString();
console.log(typeof str, str); // string 10

// x 변수의 값이 변경된 것은 아니다.
console.log(typeof x, x); // number 10

// 문자열 타입으로 명시적 변환 방법들
// 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
// 숫자 타입 => 문자열 타입
String(1);        // -> "1"
String(NaN);      // -> "NaN"
String(Infinity); // -> "Infinity"
// 불리언 타입 => 문자열 타입
String(true);     // -> "true"
String(false);    // -> "false"

// 2. Object.prototype.toString 메서드를 사용하는 방법
// 숫자 타입 => 문자열 타입
(1).toString();        // -> "1"
(NaN).toString();      // -> "NaN"
(Infinity).toString(); // -> "Infinity"
// 불리언 타입 => 문자열 타입
(true).toString();     // -> "true"
(false).toString();    // -> "false"

// 3. 문자열 연결 연산자를 이용하는 방법
// 숫자 타입 => 문자열 타입
1 + '';        // -> "1"
NaN + '';      // -> "NaN"
Infinity + ''; // -> "Infinity"
// 불리언 타입 => 문자열 타입
true + '';     // -> "true"
false + '';    // -> "false"

// 숫자 타입이 아닌 값을 숫자 타입으로 변환
// 1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 숫자 타입
Number('0');     // -> 0
Number('-1');    // -> -1
Number('10.53'); // -> 10.53
// 불리언 타입 => 숫자 타입
Number(true);    // -> 1
Number(false);   // -> 0

// 2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 변환 가능)
// 문자열 타입 => 숫자 타입
parseInt('0');       // -> 0
parseInt('-1');      // -> -1
parseFloat('10.53'); // -> 10.53

// 3. + 단항 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
+'0';     // -> 0
+'-1';    // -> -1
+'10.53'; // -> 10.53
// 불리언 타입 => 숫자 타입
+true;    // -> 1
+false;   // -> 0

// 4. * 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
'0' * 1;     // -> 0
'-1' * 1;    // -> -1
'10.53' * 1; // -> 10.53
// 불리언 타입 => 숫자 타입
true * 1;    // -> 1
false * 1;   // -> 0

// boolean 타입 값을 boolean 타입으로 변환
// 1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 불리언 타입
Boolean('x');       // -> true
Boolean('');        // -> false
Boolean('false');   // -> true
// 숫자 타입 => 불리언 타입
Boolean(0);         // -> false
Boolean(1);         // -> true
Boolean(NaN);       // -> false
Boolean(Infinity);  // -> true
// null 타입 => 불리언 타입
Boolean(null);      // -> false
// undefined 타입 => 불리언 타입
Boolean(undefined); // -> false
// 객체 타입 => 불리언 타입
Boolean({});        // -> true
Boolean([]);        // -> true

// 2. ! 부정 논리 연산자를 두번 사용하는 방법
// 문자열 타입 => 불리언 타입
!!'x';       // -> true
!!'';        // -> false
!!'false';   // -> true
// 숫자 타입 => 불리언 타입
!!0;         // -> false
!!1;         // -> true
!!NaN;       // -> false
!!Infinity;  // -> true
// null 타입 => 불리언 타입
!!null;      // -> false
// undefined 타입 => 불리언 타입
!!undefined; // -> false
// 객체 타입 => 불리언 타입
!!{};        // -> true
!![];        // -> true