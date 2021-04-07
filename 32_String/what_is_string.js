// String은 표준 빌트인 객체로 원시타입인 문자열을 다룰 때 유용한 프로퍼티와 메서드를 제공한다.
// String은 표준 빌트인 객체로 생성자 함수 객체다.
// new 연산자와 함께 호출하여 String 인스턴스를 생성할 수 있다.
// String 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 [[StringData]] 내부 슬롯에 빈 문자열을 할당한 String 래퍼객체를 생성한다.
const strObj = new String();
console.log(strObj); // String {length: 0, [[PrimitiveValue]]: ""}
// [[PrimitiveValue]]가 여기서는 [[StringData]]를 가리킨다.

const strObj = new String('Lee');
console.log(strObj);
// String {0: "L", 1: "e", 2: "e", length: 3, [[PrimitiveValue]]: "Lee"}
// [[StringData]] 내부 슬롯에 인수로 전달 받은 문자열을 할당한 String 래퍼 객체를 생성한다.
// String 래퍼 객체는 배열과 마찬가지로 length 프로퍼티와 인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티 키로
// 각 문자를 프로퍼티 값으로 갖는 유사 배열 객체이면서 이터러블이다.
console.log(strObj[0]); // L

// 단, 문자열은 원시 값이므로 변경할 수 없다. 이때 에러가 발생하지 않는다.
// 문자열은 원시값이므로 변경할 수 없다. 이때 에러가 발생하지 않는다.
strObj[0] = 'S';
console.log(strObj); // 'Lee'

// String 생성자 함수의 인수로 문자열이 아닌 값을 전달하면 인수를 문자열로 강제 변환한 후,
// [[StringData]]내부 슬롯에 변환된 문자열을 할당한 String 래퍼 객체를 생성한다.
let strObj = new String(123);
console.log(strObj);
// String {0: "1", 1: "2", 2: "3", length: 3, [[PrimitiveValue]]: "123"}

strObj = new String(null);
console.log(strObj);
// String {0: "n", 1: "u", 2: "l", : "l", length: 4, [[PrimitiveValue]]: "null"}

// new 연산자를 사용하지 않고 String 생성자 함수를 호출하면 String 인스턴스가 아닌 문자열을 반환한다.
// 이를 이용하여 명시적으로 타입을 변환하기도 한다.
// 숫자 타입 => 문자열 타입
String(1);        // -> "1"
String(NaN);      // -> "NaN"
String(Infinity); // -> "Infinity"

// 불리언 타입 => 문자열 타입
String(true);  // -> "true"
String(false); // -> "false"

// length 프로퍼티는 문자열의 문자 개수를 반환한다.
'Hello'.length;    // -> 5
'안녕하세요!'.length; // -> 6

// String 래퍼 객체는 배열과 마찬가지로 length 프로퍼티를 갖는다. 그리고 인덱스를 나타내는 숫자를 프로퍼티 키로,
// 각 문자를 프로퍼티 값으로 가지므로 String 래퍼 객체는 유사 배열 객체다.
