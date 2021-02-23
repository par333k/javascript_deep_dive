// 정적 프로퍼티/메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드를 말한다.
// 생성자 함수
function Person(name) {
    this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
};

// 정적 프로퍼티
Person.staticProp = 'static prop';

// 정적 메서드
Person.staticMethod = function () {
    console.log('staticMethod');
};

const me = new Person('Lee');

// 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다.
Person.staticMethod(); // staticMethod

// 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
me.staticMethod(); // TypeError: me.staticMethod is not a function
// Person 생성자 함수는 객체이므로 자신의 프로퍼티/메서드를 소유할 수 있다.
// Person 생성자 함수 객체가 소유한 프로퍼티/메서드를 정적 프로퍼티/메서드라고 한다.
// 생성자 함수가 생성한 인스턴스는 자신의 프로토타입 체인에 속한 객체의 프로퍼티/메서드에 접근할 수 있다.
// 정적 프로퍼티/메서드는 인스턴스의 프로토타입 체인에 속한 객체의 프로퍼티/메서드가 아니므로 인스턴스로 접근이 불가능하다.
// Object.create는 정적 메서드다.
const obj = Object.create({ name: 'Lee' });

// Object.prototype.hasOwnProperty는 프로토타입 메서드다.
// 프로토타입 체인의 정점에 있으르모 모든 객체가 호출가능
obj.hasOwnProperty('name'); // -> false

// 인스턴스/ 프로토타입 메서드 내에서 this를 쓰지 않으면 정적 메서드로 변경이 가능하다
// 인스턴스가 호출한 인스턴스/프로토타입 메서드 내에서 this는 인스턴스를 가리킨다.
// 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 하지만, 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.
function Foo() {}

// 프로토타입 메서드
// this를 참조하지 않는 프로토타입 메소드는 정적 메서드로 변경해도 동일한 효과를 얻을 수 있다.
Foo.prototype.x = function () {
    console.log('x');
};

const foo = new Foo();
// 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 한다.
foo.x(); // x

// 정적 메서드
Foo.x = function () {
    console.log('x');
};

// 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.
Foo.x(); // x
// 프로토타입 프로퍼티/메서드를 표기할 떄 Object#isPrototypeOf 등으로 표기하기도 한다

// 프로퍼티 존재 확인
// in 연산자
/**
 * key: 프로퍼티 키를 나타내는 문자열
 * object: 객체로 평가되는 표현식
 * key in object
 */
const person = {
    name: 'Lee',
    address: 'Seoul'
};

// person 객체에 name 프로퍼티가 존재한다.
console.log('name' in person);    // true
// person 객체에 address 프로퍼티가 존재한다.
console.log('address' in person); // true
// person 객체에 age 프로퍼티가 존재하지 않는다.
console.log('age' in person);     // false
// in 연산자는 상속받은 모든 프로토타입의 프로퍼티 까지 확인하므로 주의가 필요하다
// 가령 person객체에는 toString이라는 프로터피가 없지만 다음 코드의 실행결과는 true다
console.log('toString' in person); // true
// in 연산자 대신 ES6에서 도입된 Reflect.has 메서드를 사용할 수 있다. in 연산자와 동일하게 동작한다.
const person = { name: 'Lee' };

console.log(Reflect.has(person, 'name'));     // true
console.log(Reflect.has(person, 'toString')); // true

// Object.prototype.hasOwnProperty 메서드
// 해당 메서드를 사용해도 객체에 특정 프로퍼티가 존재하는지 확인 가능하다
// 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고
// 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환한다.
console.log(person.hasOwnProperty('name')); // true
console.log(person.hasOwnProperty('age'));  // false
console.log(person.hasOwnProperty('toString')); // false

// 프로퍼티 열거
// for ... in 문
// 객체의 모든 프로퍼티를 순회하며 열거enumeration 하려면 for ... in 문을 사용한다.
// for(변수선언문 in 객체) { ... }
const person = {
    name: 'Lee',
    address: 'Seoul'
};

// for...in 문의 변수 prop에 person 객체의 프로퍼티 키가 할당된다.
for (const key in person) {
    console.log(key + ': ' + person[key]);
}
// name: Lee
// address: Seoul
// for ... in 문은 in 연산자처럼 순회 대상 객체의 프로퍼티 뿐만 아니라 상속받은 프로토타입의 프로퍼티까지 열거한다.
// 위  예제에서는 아닌데? 왜?
const person = {
    name: 'Lee',
    address: 'Seoul'
};

// in 연산자는 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인한다.
console.log('toString' in person); // true

// for...in 문도 객체가 상속받은 모든 프로토타입의 프로퍼티를 열거한다.
// 하지만 toString과 같은 Object.prototype의 프로퍼티가 열거되지 않는다.
for (const key in person) {
    console.log(key + ': ' + person[key]);
}

// name: Lee
// address: Seoul
// prototype으로 상속박은 프로퍼티 toString 같은 것이 열거되지 않는 이유는 프로퍼티 어트리뷰트[[Enumerable]]의 값이 false이기 때문이다.
// 프로퍼티 어트리뷰트 [[Enumerable]]은 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖는다.
// Object.getOwnPropertyDescriptor 메서드는 프로퍼티 디스크립터 객체를 반환한다.
// 프로퍼티 디스크립터 객체는 프로퍼티 어트리뷰트 정보를 담고 있는 객체다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString'));
// {value: ƒ, writable: true, enumerable: false, configurable: true}

// 따라서, for ... in 문을 정확히 말하자면
// 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 [[Enumerable]] 의 값이 true인
// 프로퍼티를 순회하며 열거Enumeration 한다
const person = {
    name: 'Lee',
    address: 'Seoul',
    __proto__: { age: 20 }
};

for (const key in person) {
    console.log(key + ': ' + person[key]);
}
// name: Lee
// address: Seoul
// age: 20
// for ... in 문은 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다
const sym = Symbol();
const obj = {
    a: 1,
    [sym]: 10
};

for (const key in obj) {
    console.log(key + ': ' + obj[key]);
}
// a: 1
// 상속받은 프로퍼티는 제외하고 객체 자신의 프로퍼티만 열거하려면 Object.prototype.hasOwnProperty 메서드를 사용하여
// 객체 자신의 프로퍼티인지 확인해야 한다.
const person = {
    name: 'Lee',
    address: 'Seoul',
    __proto__: { age: 20 }
};

for (const key in person) {
    // 객체 자신의 프로퍼티인지 확인한다.
    if (!person.hasOwnProperty(key)) continue;
    console.log(key + ': ' + person[key]);
}
// name: Lee
// address: Seoul
// for ... in 문은 프로퍼티를 열거할 때 순서를 보장하지 않는다
// 그러나 대부분의 모던 브라우저들은 순서를 보장하고 숫자(사실은 문자열)인 프로퍼티 키에 대해서는 정렬을 실시한다.
const obj = {
    2: 2,
    3: 3,
    1: 1,
    b: 'b',
    a: 'a'
};

for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    console.log(key + ': ' + obj[key]);
}

/*
1: 1
2: 2
3: 3
b: b
a: a
*/

// 배열에는 for ... in 문을 사용하지 말고 일반적인 for 문이나 for ... of 문 또는 Array.prototype.forEach 메서드 사용을 권장한다.
// 사실 배열도 객체이므로 프로퍼티와 상속받은 프로퍼티가 포함될 수 있다.
const arr = [1, 2, 3];
arr.x = 10; // 배열도 객체이므로 프로퍼티를 가질 수 있다.

for (const i in arr) {
    // 프로퍼티 x도 출력된다.
    console.log(arr[i]); // 1 2 3 10
};

// arr.length는 3이다.
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // 1 2 3
}

// forEach 메서드는 요소가 아닌 프로퍼티는 제외한다.
arr.forEach(v => console.log(v)); // 1 2 3

// for...of는 변수 선언문에서 선언한 변수에 키가 아닌 값을 할당한다.
for (const value of arr) {
    console.log(value); // 1 2 3
};

// Object.keys/values/entries 메서드
// 객체 자신의 고유 프로퍼티만 열거하기 위해서는 for ... in 문을 사용하는 것보다 Object.keys/values/entries 메서드를 권장한다
// Object.keys 메서드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환한다.
const person = {
    name: 'Lee',
    address: 'Seoul',
    __proto__: { age: 20 }
};

console.log(Object.keys(person)); // ["name", "address"]
// ES8에서 도입된 Object.values 메서드는 객체 자신의 열거 가능한 프로퍼티 값을 배열로 반환한다
console.log(Object.values(person)); // ["Lee", "Seoul"]
// ES8에서 도입된 Object.entries 메서드는 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환한다
console.log(Object.entries(person)); // [["name", "Lee"], ["address", "Seoul"]]

Object.entries(person).forEach(([key, value]) => console.log(key, value));
/*
name Lee
address Seoul
*/