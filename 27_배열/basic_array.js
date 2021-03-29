// 배열 생성
// 1. 배열 리터럴
// 0개 이상의 요소를 쉼표로 구분하여 대괄호로 묶는다. 객체 리터럴과 달리 프로퍼티 키가 없고 값만 존재한다.
const arr = [1, 2, 3];
console.log(arr.length); // 3

// 배열 리터럴에 요소를 하나도 추가하지 않으면 배열의 길이, 즉 length 프로퍼티 값이 0인 빈 배열이 된다.
const arr = [];
console.log(arr.length); // 0

// 배열 리터럴에 요소를 생략하면 희소 배열이 생성된다.
const arr = [1, , 3]; // 희소 배열

// 희소 배열의 length는 배열의 실제 요소 개수보다 언제나 크다.
console.log(arr.length); // 3
console.log(arr);        // [1, empty, 3]
console.log(arr[1]);     // undefined -> 객체인 arr에 프로퍼티 키가 '1'인 프로퍼티가 존재하지 않기 때문

// 위 예제의 arr은 인덱스가 1인 요소를 갖지 않는 희소 배열이다.

// 2. Array 생성자 함수
// Array 생성자 함수를 통해 배열을 생성할 경우 전달된 인수의 개수에 따라 다르게 동작하므로 주의가 필요하다.

// 전달된 인수가 1개이고 숫자인경우 length 프로퍼티 값이 인수인 배열을 생성한다.
const arr = new Array(10);

console.log(arr); // [empty × 10]
console.log(arr.length); // 10
// 이때 생성된 배열은 희소 배열.

console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
  length: {value: 10, writable: true, enumerable: false, configurable: false}
}
*/

// 배열에 전달된 인수가 범위를 벗어나면 RangeError가 발생한다.
// 배열은 요소를 최대 4,294,967,295개 가질 수 있다.
new Array(4294967295);

// 전달된 인수가 0 ~ 4,294,967,295를 벗어나면 RangeError가 발생한다.
new Array(4294967296); // RangeError: Invalid array length

// 전달된 인수가 음수이면 에러가 발생한다.
new Array(-1); // RangeError: Invalid array length

// 전달된 인수가 없는 경우 빈 배열을 생성한다. 즉, 배열 리터럴 []과 같다.
new Array(); // -> []

// 전달된 인수가 2개 이상이거나 숫자가 아닌 경우 인수를 요소로 갖는 배열을 생성한다.
// 전달된 인수가 2개 이상이면 인수를 요소로 갖는 배열을 생성한다.
new Array(1, 2, 3); // -> [1, 2, 3]

// 전달된 인수가 1개지만 숫자가 아니면 인수를 요소로 갖는 배열을 생성한다.
new Array({}); // -> [{}]

// Array 생성자 함수는 new 연산자와 함께 호출하지 않더라도 배열을 생성하는 생성자 함수로 동작한다
// 이는 Array 생성자 함수 내부에서 new.target을 확인하기 때문.
Array(1, 2, 3); // -> [1, 2, 3]


// 3. Array.of
// ES6에서 도입. Array 생성자함수와 다르게 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.
// 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.
Array.of(1); // -> [1]

Array.of(1, 2, 3); // -> [1, 2, 3]

Array.of('string'); // -> ['string']


// 4. Array.from
// ES6에서 도입된 Array.from 메서드는 유사 배열 객체(array-like object) 또는 이터러블 객체iterable object를 인수로 받아 배열로 변환하여 반환한다.
// 유사 배열 객체를 변환하여 배열을 생성한다.
Array.from({ length: 2, 0: 'a', 1: 'b' }); // -> ['a', 'b']

// 이터러블을 변환하여 배열을 생성한다. 문자열은 이터러블이다.
Array.from('Hello'); // -> ['H', 'e', 'l', 'l', 'o']
// Array.from을 사용하면 두 번째 인수로 전달한 콜백 함수를 통해 값을 만들면서 요소를 채울 수 있다.
// Array.from 메서드는 두 번째 인수로 전달한 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달하면서 호출하고,
// 콜백 함수의 반환값으로 구성된 배열을 반환한다.

// Array.from에 length만 존재하는 유사 배열 객체를 전달하면 undefined를 요소로 채운다.
Array.from({ length: 3 }); // -> [undefined, undefined, undefined]

// Array.from은 두 번째 인수로 전달한 콜백 함수의 반환값으로 구성된 배열을 반환한다.
Array.from({ length: 3 }, (_, i) => i); // -> [0, 1, 2]


// 유사 배열 객체와 이터러블 객체
// 유사 배열 객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말한다.
// 유사 배열 객체는 마치 배열처럼 for문으로 순회도 가능하다.
// 유사 배열 객체
const arrayLike = {
    '0': 'apple',
    '1': 'banana',
    '2': 'orange',
    length: 3
};

// 유사 배열 객체는 마치 배열처럼 for 문으로 순회할 수도 있다.
for (let i = 0; i < arrayLike.length; i++) {
    console.log(arrayLike[i]); // apple banana orange
}

// 이터러블 객체는 Symbol.iterator 메서드를 구현하여 for ... of 문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링 할당의
// 대상으로 사용할 수 있는 객체를 말한다. ES6 에서 제공하는 빌트인 이터러블은 Array, String, Map, Set, DOM 컬렉션, arguments 등이 있다.


// 배열 요소의 참조
// 배열의 요소를 참조할 때는 대괄호를 사용하며 대괄호 안에는 인덱스가 와야한다.
// 정수로 평가되는 표현식이라면 인덱스 대신 사용 가능하며 의미적으로 객체의 프로퍼티 키와 같은 역할을 한다.
const arr = [1, 2];

// 인덱스가 0인 요소를 참조
console.log(arr[0]); // 1
// 인덱스가 1인 요소를 참조
console.log(arr[1]); // 2

// 존재하지 않는 요소에 접근 시 undefined 가 반환된다.
const arr = [1, 2];

// 인덱스가 2인 요소를 참조. 배열 arr에는 인덱스가 2인 요소가 존재하지 않는다.
console.log(arr[2]); // undefined
// 배열은 인덱스를 나타내는 문자열을 프로퍼티 키로 갖는 객체.
// 따라서 존재하지 않는 프로퍼티 키로 객체의 프로퍼티에 접근했을 때 undefined를 반환하는 것처럼
// 배열도 존재하지 않는 요소를 참조하면 undefined를 반환한다.
// 같은 이유로 희소배열의 존재하지 않는 요소를 참조하는 것 역시 undefined가 반환된다.
// 희소 배열
const arr = [1, , 3];

// 배열 arr에는 인덱스가 1인 요소가 존재하지 않는다.
console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
  '0': {value: 1, writable: true, enumerable: true, configurable: true},
  '2': {value: 3, writable: true, enumerable: true, configurable: true},
  length: {value: 3, writable: true, enumerable: false, configurable: false}
*/

// 존재하지 않는 요소를 참조하면 undefined가 반환된다.
console.log(arr[1]); // undefined
console.log(arr[3]); // undefined


// 배열 요소의 추가와 갱신
// 객체에 프로퍼티를 동적으로 추가할 수 있듯, 배열에도 요소를 동적으로 추가할 수 있다.
// 존재하지 않는 인덱스를 사용해 값을 할당하면 새로운 요소가 추가되고, length 프로퍼티의 값이 자동 갱신된다.
const arr = [0];

// 배열 요소의 추가
arr[1] = 1;

console.log(arr); // [0, 1]
console.log(arr.length); // 2

// 만약 현재 배열의 length 프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열이 된다.
arr[100] = 100;

console.log(arr); // [0, 1, empty × 98, 100]
console.log(arr.length); // 101

// 이 때 인덱스로 요소에 접근하여 명시적으로 값을 할당하지 않은 요소는 생성되지 않는다는 것에 주의하자.
// 명시적으로 값을 할당하지 않은 요소는 생성되지 않는다.
console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
  '0': {value: 0, writable: true, enumerable: true, configurable: true},
  '1': {value: 1, writable: true, enumerable: true, configurable: true},
  '100': {value: 100, writable: true, enumerable: true, configurable: true},
  length: {value: 101, writable: true, enumerable: false, configurable: false}
*/

// 이미 요소가 존재하는 요소에 값을 재할당하면 요소값이 갱신된다.
// 요소값의 갱신
arr[1] = 10;

console.log(arr); // [0, 10, empty × 98, 100]

// 인덱스는 요소의 위치를 나타내므로 반드시 0 이상의 정수나 정수 형태의 문자열을 사용해야 한다.
// 정수 이외의 값을 인덱스처럼 사용하면 프로퍼티가 생성되며, 이것은 length 프로퍼티에 영향을 끼치지 않는다.
const arr = [];

// 배열 요소의 추가
arr[0] = 1;
arr['1'] = 2;

// 프로퍼티 추가
arr['foo'] = 3;
arr.bar = 4;
arr[1.1] = 5;
arr[-1] = 6;

console.log(arr); // [1, 2, foo: 3, bar: 4, '1.1': 5, '-1': 6]

// 프로퍼티는 length에 영향을 주지 않는다.
console.log(arr.length); // 2


// 배열 요소의 삭제
// 배열은 사실 객체이기 때문에 배열의 특정 요소를 삭제하기 위해 delete 연산자를 사용할 수 있다.
const arr = [1, 2, 3];

// 배열 요소의 삭제
delete arr[1];
console.log(arr); // [1, empty, 3]

// length 프로퍼티에 영향을 주지 않는다. 즉, 희소 배열이 된다.
console.log(arr.length); // 3

// delete 연산자는 객체의 프로퍼티를 삭제한다. 따라서 위 예제의 delete arr[1]은 arr에서 프로퍼티 키가 '1'인 프로퍼티를 삭제한다.
// 이 때 배열은 희소배열이 되며 length 프로퍼티에 영향을 주지 않는다. 따라서 썩 바람직한 방법이 아니다.
// 희소배열을 만들지 않으며 배열의 특정 요소를 완전히 삭제하려면 Array.prototype.slice 메서드를 사용한다.
const arr = [1, 2, 3];

// Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소 수)
// arr[1]부터 1개의 요소를 제거
arr.splice(1, 1);
console.log(arr); // [1, 3]

// length 프로퍼티가 자동 갱신된다.
console.log(arr.length); // 2

