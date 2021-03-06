// 이터레이션 프로토콜
// 순회 가능한 데이터 컬렉션(자료구조)을 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙
// ES6 이후 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일하여
// for ... or 문, 스프레드 문법, 배열 디스트럭처링 할당의 대상으로 사용할 수 있도록 일원화했다.
// 이터레이션 프로토콜에는 이터러블 프로토콜과 이터레이터 프로토콜이 있다.

// iterable protocol
// Well-known Symbol 인 Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해
// 상속받은 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이러한 규약을 이터러블 프로토콜이라 하며,
// 이터러블 프로토콜을 준수한 객체를 이터러블이라 한다. 이터러블은 for ... of 문으로 순회할 수 있으며 스프레드 문법과
// 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.

// iterator protocol
// 이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이터레이터는 next 메서드를 소유하며
// next 메서드를 호출하면 이터러블을 순회하며 value와 done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다. 이러한 규약을 이터레이터
// 프로토콜이라 하며, 이터레이터 프로토콜을 준수한 객체를 이터레이터라 한다. 이터레이터는 이터러블 요소를 탐색하기 위한 포인터 역할을 한다.

// 이터러블 프로토크를 준수한 객체를 이터러블이라 한다.
// 즉, 이터러블은 Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나
// 프로토타입 체인을 통해 상속받은 객체를 말한다.
// 이터러블 확인을 위한 함수는 아래와 같다.
const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';

// 배열, 문자열, Map, Set 등은 이터러블이다.
isIterable([]);        // -> true
isIterable('');        // -> true
isIterable(new Map()); // -> true
isIterable(new Set()); // -> true
isIterable({});        // -> false


// 배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
// 이터러블은 for ... of 문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
const array = [1, 2, 3];

// 배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in array); // true

// 이터러블인 배열은 for...of 문으로 순회 가능하다.
for (const item of array) {
    console.log(item);
}

// 이터러블인 배열은 스프레드 문법의 대상으로 사용할 수 있다.
console.log([...array]); // [1, 2, 3]

// 이터러블인 배열은 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
const [a, ...rest] = array;
console.log(a, rest); // 1, [2, 3]


// Symbol.iterator 메서드를 직접 구현하지 않거나 상속받지 않은 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다.
// 따라서 일반 객체는 for ... of 문으로 순회할 수 없으며 스프레드 문법과 배열디스트럭처링 할당의 대상으로 사용할 수 없다.
const obj = { a: 1, b: 2 };

// 일반 객체는 Symbol.iterator 메서드를 구현하거나 상속받지 않는다.
// 따라서 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다.
console.log(Symbol.iterator in obj); // false

// 이터러블이 아닌 일반 객체는 for...of 문으로 순회할 수 없다.
for (const item of obj) { // -> TypeError: obj is not iterable
    console.log(item);
}

// 이터러블이 아닌 일반 객체는 배열 디스트럭처링 할당의 대상으로 사용할 수 없다.
const [a, b] = obj; // -> TypeError: obj is not iterable

// 스프레드 프로퍼티 제안은 일반 객체에 스프레드 문법의 사용을 허용한다.
const obj = { a: 1, b: 2 };

// 스프레드 프로퍼티 제안(Stage 4)은 객체 리터럴 내부에서 스프레드 문법의 사용을 허용한다.
console.log({ ...obj }); // { a: 1, b: 2 }

// 일반 객체도 이터러블 프로토콜을 준수하도록 구현하면 이터러블이 된다.


// 이터레이터
// Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.
// 이터러블의 Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다.
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메서드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();

// Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다.
console.log('next' in iterator); // true

// 이터레이터의 next 메서드는 이터러블의 각 요소를 순회하기 위한 포인터의 역할을 한다.
// 즉, next 메서드를 호출하면 이터러블을 순차적으로 한 단계씩 순회하며 순회 결과를 나타내는
// 이터레이터 리절트 객체를 반환한다.

// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메서드는 이터레이터를 반환한다. 이터레이터는 next 메서드를 갖는다.
const iterator = array[Symbol.iterator]();

// next 메서드를 호출하면 이터러블을 순회하며 순회 결과를 나타내는 이터레이터 리절트 객체를
// 반환한다. 이터레이터 리절트 객체는 value와 done 프로퍼티를 갖는 객체다.
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// 이터레이터의 next 메서드가 반환하는 이터레이터 리절트 객체의 value 프로퍼티는 현재 순회중인 이터러블 값을 나타내며
// done 프로퍼티는 이터러블의 순회 완료 여부를 나타낸다.


// 빌트인 이터러블
// 빌트인 이터러블인 표준객체들
// Array - Array.prototype[Symbol.iterator]
// String - String.prototype[Symbol.iterator]
// Map - Map.prototype[Symbol.iterator]
// Set - Set.prototype[Symbol.iterator]
// TypedArray - TypedArray.prototype[Symbol.iterator]
// arguments - arguments[Symbol.iterator]
// DOM 컬렉션 - NodeList.prototype[Symbol.iterator]
//           - HTMLCollection.prototype[Symbol.iterator]


// for ... of 문
// for ... of 문은 이터러블을 순회하면서 이터러블의 요소를 변수에 할당한다.
// for ... in 문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 [[Enumerable]]
// 의 값이 true인 프로퍼티를 순회하며 열거한다. 이 때 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다.
// for ... of 문은 내부적으로 이터레이터의 next 메서드를 호출하여 이터러블을 순회하며 next메서드가 반환한
// 이터레이터 리절트 객체의 value 프로퍼티 값을 for ... of 문의 변수에 할당한다.
// 그리고 이터레이터 리절트 객체의 done 프로퍼티 값이 false 면 이터러블의 순회를 계속하고 true면 이터러블의 순회를 중단한다.
for (const item of [1, 2, 3]) {
    // item 변수에 순차적으로 1, 2, 3이 할당된다.
    console.log(item); // 1 2 3
}

// for of를 for 문으로 변경하면 아래와 같다
// 이터러블
const iterable = [1, 2, 3];

// 이터러블의 Symbol.iterator 메서드를 호출하여 이터레이터를 생성한다.
const iterator = iterable[Symbol.iterator]();

for (;;) {
    // 이터레이터의 next 메서드를 호출하여 이터러블을 순회한다. 이때 next 메서드는 이터레이터 리절트 객체를 반환한다.
    const res = iterator.next();

    // next 메서드가 반환한 이터레이터 리절트 객체의 done 프로퍼티 값이 true이면 이터러블의 순회를 중단한다.
    if (res.done) break;

    // 이터레이터 리절트 객체의 value 프로퍼티 값을 item 변수에 할당한다.
    const item = res.value;
    console.log(item); // 1 2 3
}
