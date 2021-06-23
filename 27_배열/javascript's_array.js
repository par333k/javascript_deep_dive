// array
// 배열은 여러개의 값을 '순차적으로'나열한 자료구조다.
// 아래는 배열 리터럴을 통해 생성한 배열이다.
const arr = ['apple', 'banana', 'orange'];

// 배열이 가지고 있는 값은 요소element, 자바스크립트의 모든 값은 배열의 요소가 될 수 있다.
// 배열의 요소는 자신의 위치를 나타내는 0 이상의 정수인 인덱스index를 갖는다. 인덱스는 배열의 요소에 접근할 떄 사용한다.
// 요소에 접근할 때는 대괄호 표기법을 사용한다.
arr[0] // -> 'apple'
arr[1] // -> 'banana'
arr[2] // -> 'orange'

// 배열은 요소의 개수, 즉 배열의 길이를 나타내는 length 프로퍼티를 갖는다.
arr.length // -> 3
// 배열은 순회 가능하다
// 배열의 순회
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // 'apple' 'banana' 'orange'
}

// 자바스크립트에는 배열이라는 타입은 존재하지 않는다. 배열은 객체 타입이다.
typeof arr // -> object

// 배열은 배열 리터럴, Array 생성자 함수, Array.of, Array.from 메서드로 생성할 수 있다.
// 배열의 생성자 함수는 Array이며, 배열의 프로토타입 객체는 Array.prototype이다.
// Array.prototype은 배열을 위한 빌트인 메서드를 제공한다
const arr = [1, 2, 3];

arr.constructor === Array // -> true
Object.getPrototypeOf(arr) === Array.prototype // -> true

// 일반 객체와 배열을 구분하는 가장 명확한 차이는 '순서'와 'length'프로퍼티다.
const arr = [1, 2, 3];

// 반복문으로 자료 구조를 순서대로 순회하기 위해서는 자료 구조의 요소에 순서대로
// 접근할 수 있어야 하며 자료 구조의 길이를 알 수 있어야 한다.
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // 1 2 3
}

// 배열의 장점은 처음부터 순차적으로 요소에 접근할 수도 있고, 마지막부터 역순으로 요소에 접근할 수도 있으며, 특정 위치부터 순차적으로 접근도 가능하다.


// 자바스크립트 배열은 배열이 아니다.
// 일반적으로 자료구조에서 말하는 배열은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조를 말한다.
// 즉 배열의 요소는 하나의 데이터 타입으로 통일되어 있으며 서로 연속적으로 인접해있다. 이러한 배열을 밀집 배열dense array라 한다.
// 이처럼 일반적인 의미의 배열은 인덱스를 통해 단 하번의 연선으로 임의의 요소에 접근할 수 있다. 이는 매우 효과적이며 고속으로 동작한다.
// 하지만 정렬되지 않은 배열에서 특정한 요소를 검색하는 경우에는 처음부터 특정 요소를 발견할 때 까지 차례대로 검색한다.
// 선형 검색을 통해 배열(array)에 특정 요소(target)가 존재하는지 확인한다.
// 배열에 특정 요소가 존재하면 특정 요소의 인덱스를 반환하고, 존재하지 않으면 -1을 반환한다.
function linearSearch(array, target) {
    const length = array.length;

    for (let i = 0; i < length; i++) {
        if (array[i] === target) return i;
    }

    return -1;
}

console.log(linearSearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(linearSearch([1, 2, 3, 4, 5, 6], 0)); // -1

// 또한 배열에 요소를 삽입,삭제하는 경우 배열의 요소를 연속적으로 유지하기 위해 요소를 이동시켜야 하는 단점도 있다.
// 자바스크립트의 배열은 일반적인 밀집배열과 다르게, 메모리 공간이 동일한 크기가 아니어도 되며 연속적으로 이어져 있지 않을 수도 있다
// 배열의 요소가 연속적으로 이어져 있지 않는 배열을 희소 배열sparse array이라 한다.
// 이처럼 자바스크립트의 배열은 엄밀히 말해 일반적 배열이 아니다.
// 자바스크립트의 배열은 일반적인 배열의 동작을 흉내 낸 특수한 객체다.
// "16.2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체" 참고
console.log(Object.getOwnPropertyDescriptors([1, 2, 3]));
/*
{
  '0': {value: 1, writable: true, enumerable: true, configurable: true}
  '1': {value: 2, writable: true, enumerable: true, configurable: true}
  '2': {value: 3, writable: true, enumerable: true, configurable: true}
  length: {value: 3, writable: true, enumerable: false, configurable: false}
}
*/
// 위 예제에서 보듯 자바스크립트 배열의 요소는 프로퍼티 값이다. 자바스크립트에서 사용할 수 있는 모든 값은 객체의 프로퍼티 값이 될 수 있으므로
// 어떤 타입의 값이라도 배열의 요소가 될 수 있다.
const arr = [
    'string',
    10,
    true,
    null,
    undefined,
    NaN,
    Infinity,
    [ ],
    { },
    function () {}
];

// 일반적인 배열과 자바스크립트 배열의 장단점을 정리하자면 다음과 같다.
// 일반적인 배열은 인덱스로 요소에 빠르게 접근할 수 있다. 하지만 특정 요소를 검색하거나 요소를 삽입 또는 삭제하는 경우에는 효율적이지 않다.
// 자바스크립트 배열은 해시테이블로 구현된 객체이므로 인덱스로 요소에 접근하는 경우 일반적인 배열보다 성능적인 면에서 느릴 수 밖에 없다
// 하지만 특정 요소를 검색하거나 요소를 삽입 또는 삭제하는 경우에는 일반적인 배열보다 빠른 성능을 기대할 수 있다.
// 대부분의 모던 자바스크립트 엔진은 배열을 일반 객체와 구별하여 좀 더 배열처럼 동작하도록 최적화하였다.
// 보통 배열 객체가 일반 객체보다 순회성능이 2배정도 빠르다.
const arr = [];

console.time('Array Performance Test');

for (let i = 0; i < 10000000; i++) {
    arr[i] = i;
}
console.timeEnd('Array Performance Test');
// 약 156mx

const obj = {};

console.time('Object Performance Test');

for (let i = 0; i < 10000000; i++) {
    obj[i] = i;
}

console.timeEnd('Object Performance Test');
// 약 309ms

// 그러나 자바스크립트의 배열 내에 같은 타입의 자료가 아닌 별도의 자료형이 들어갈 경우
// 인접배열에 가깝게 자동으로 처리되던 방식이 작동되지 않으면서 성능이 떨어진다.
// 즉, 데이터 타입이 일정하지 않은 배열을 선언하고 순회하는 경우에는 ArrayBuffer를 사용해야한다.
// 또한 blob 데이터나 image, audio 같은 binary 데이터를 다룰때에도 이걸 사용해야 한다.
// ArrayBuffer는 ES6부터 등장했으며 Typed Array의 dataview를 통해 사용하는 것을 권장한다(new Uint16Array(), new Int32Array() 등)
// https://evan-moon.github.io/2019/06/15/diving-into-js-array/?utm_source=gaerae.com&utm_campaign=%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%8A%A4%EB%9F%BD%EB%8B%A4&utm_medium=social
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
// https://javascript.info/arraybuffer-binary-arrays
// 이 경우 실제 밀집된 메모리에 배열을 선언하게 되면서 밀집배열과 비슷한 성능을 갖게 됨
const LIMIT = 10000000;
const buffer = new ArrayBuffer(LIMIT * 4);
const arr = new Int32Array(buffer);
console.time("ArrayBuffer insertion time");
for (let i = 0; i < LIMIT; i++) {
    arr[i] = i;
}
console.time("ArrayBuffer read time");
for (let i = 0; i < LIMIT; i++) {
    let p = arr[i];
}
console.timeEnd("ArrayBuffer read time");


// length 프로퍼티와 희소 배열
// length프로퍼티는 빈 배열일 경우 0, 아닐경우 인덱스+1이다.
[].length        // -> 0
[1, 2, 3].length // -> 3

// length 프로퍼티의 최대값은 4,294,967,295 이다 (2의 32승 - 1)
// length 프로퍼티의 값은 배열에 요소를 추가하거나 삭제하면 자동 갱신된다.
const arr = [1, 2, 3];
console.log(arr.length); // 3

// 요소 추가
arr.push(4);
// 요소를 추가하면 length 프로퍼티의 값이 자동 갱신된다.
console.log(arr.length); // 4

// 요소 삭제
arr.pop();
// 요소를 삭제하면 length 프로퍼티의 값이 자동 갱신된다.
console.log(arr.length); // 3

// length 프로퍼티 값은 명시적으로 할당할 수 있다
// 현재 length 프로퍼티 값보다 작은 숫자 값을 할당하면 배열의 길이가 줄어든다.
const arr = [1, 2, 3, 4, 5];

// 현재 length 프로퍼티 값인 5보다 작은 숫자 값 3을 length 프로퍼티에 할당
arr.length = 3;

// 배열의 길이가 5에서 3으로 줄어든다.
console.log(arr); // [1, 2, 3]

// 현재 length 프로퍼티 값보다 큰 숫자 값을 할당할 경우, length 프로퍼티 값은 변경되지만 실제 배열의 길이가 늘어나진 않는다.
const arr = [1];

// 현재 length 프로퍼티 값인 1보다 큰 숫자 값 3을 length 프로퍼티에 할당
arr.length = 3;

// length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다.
console.log(arr.length); // 3
console.log(arr); // [1, empty × 2]
// 값 없이 비어있는 요소를 위해 메모리공간을 확보하지 않으며 빈 요소를 생성하지도 않는다.
console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
  '0': {value: 1, writable: true, enumerable: true, configurable: true},
  length: {value: 3, writable: true, enumerable: false, configurable: false}
}
*/
// 이처럼 배열의 요소가 연속적으로 위치하지 않고 일부가 비어 있는 배열을 희소 배열이라 한다.
// 자바스크립트는 희소 배열을 문법적으로 허용한다. 중간이나 앞부분이 비어있는 경우도 있다.
// 희소 배열
const sparse = [, 2, , 4];

// 희소 배열의 length 프로퍼티 값은 요소의 개수와 일치하지 않는다.
console.log(sparse.length); // 4
console.log(sparse); // [empty, 2, empty, 4]

// 배열 sparse에는 인덱스가 0, 2인 요소가 존재하지 않는다.
console.log(Object.getOwnPropertyDescriptors(sparse));
/*
{
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  '3': { value: 4, writable: true, enumerable: true, configurable: true },
  length: { value: 4, writable: true, enumerable: false, configurable: false }
}
*/

// 일반적인 배열의 length는 배열 요소의 개수, 즉 배열의 길이와 언제나 일치한다.
// 하지만 희소 배열은 length와 배열 요소의 개수가 일치하지 않는다. 희소 배열의 length는 희소 배열의 실제 요소 개수보다 언제나 크다
// 자바스크립트는 문법적으로 희소배열을 허용하지만 희소 배열은 사용하지 않는것이 좋다.
// 희소 배열은 연속적인 값의 집합이라는 배열의 기본적인 개념과 맞지않으며 성능에도 좋지 않다.
// 배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선이다.
