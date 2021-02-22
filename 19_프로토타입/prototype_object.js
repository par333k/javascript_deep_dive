// 프로토타입은 어떤 객체의 상위(부모)역할을 하는 객체이다.
// 모든 객체는 하나의 프로토타입을 갖는다. 그리고 모든 프로토타입은 생성자 함수와 연결되어 있다.
// [[prototype]] 내부 슬롯의 값이 null인 객체는 프로토타입이 없다.

// __proto__ 접근자 프로퍼티
// 모든 객체는 __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근 가능하다.
// __proto__ 접근자 프로퍼티를 통해 간접적으로 [[Prototype]] 내부 슬롯의 값인 프로토타입에 접근 가능하다.
// 접근자 프로퍼티는 자체적으로 값([[value]] 프로퍼티 어트리뷰트)를 갖지 않고 접근자 함수인 [[get]], [[set]] 프로퍼티 어트리뷰트로 구성된다
const obj = {};
const parent = { x: 1 };

// getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
obj.__proto__;
// setter함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); // 1

// __proto__ 접근자 프로퍼티는 상속을 통해 사용된다
// 모든 객체는 상속을 통해 Object.prototype.__proto__ 접근자 프로퍼티 사용이 가능하다
const person = { name: 'Lee' };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty('__proto__')); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true

// Object.prototype
// 모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여있다.
// 프로토타입 체인의 종점인 최상위 객체는 Object.prototype이며, 이 객체의 프로퍼티와 메서드는 모든 객체에 상속된다

// __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
// 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서다.
const parent = {};
const child = {};

// child의 프로토타입을 parent로 설정
child.__proto__ = parent;
// parent의 프로토타입을 child로 설정
parent.__proto__ = child; // TypeError: Cyclic __proto__ value

// child와 parent가 서로의 프로토타입이 되기 때문에 에러가 난다.
// 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다. 즉 프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야 한다.
// 순환참조하는 프로토타입 체인이 생기면 종점이 없어 무한루프에 빠진다!
// 따라서 __proto__ 접근자 프로퍼티를 통해 체크 단계를 거치는 것이다.

// __proto__ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.
// 직접 상속을 통해 Object.prototype을 상속받지 않는 객체를 생성할 수 있기 때문에 __proto__ 접근자 프로퍼티를 사용 못 할 수도 있다.
// obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);

// obj는 Object.__proto__를 상속받을 수 없다.
console.log(obj.__proto__); // undefined

// 따라서 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
console.log(Object.getPrototypeOf(obj)); // null

// __proto__ 대신 프로토타입의 참조를 취득하고 싶을 때 사용하는 메서드
const obj = {};
const parent = { x: 1 };

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;
// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x); // 1
// Object.getPrototypeOf, setPrototypeOf 메서드는 get, set Object.prototype.__proto__ 의 처리 내용과 정확히 일치한다.

// 함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty('prototype'); // -> true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty('prototype'); // -> false

// non-constructor인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.
// 화살표 함수는 non-constructor다.
const Person = name => {
    this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(Person.prototype); // undefined

// ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
const obj = {
    foo() {}
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(obj.foo.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(obj.foo.prototype); // undefined

// Object.prototype으로부터 상속받은 __proto__ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다.
// 그러나 사용하는 주체는 다르다.
// __proto__ 접근자 프로퍼티는 모든 객체가 소유하고, 모든 객체가 사용 주체이며 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용한다.
// prototype 프로퍼티는 construtor가 소유하고, 생성자 함수로 사용하며, 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입 할등을 위해 사용한다.
// 생성자 함수
function Person(name) {
    this.name = name;
}

const me = new Person('Lee');

// 결국 Person.prototype과 me.__proto__는 결국 동일한 프로토타입을 가리킨다.
console.log(Person.prototype === me.__proto__);  // true

// 모든 프로토타입은 constructor 프로퍼티를 갖는다. constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다.
// 이 연결은 생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이뤄진다.
// 생성자 함수
function Person(name) {
    this.name = name;
}

const me = new Person('Lee');

// me 객체의 생성자 함수는 Person이다.
// me 객체에는 constructor가 없지만 Person.prototype의 constructor 프로퍼티를 상속받아 사용할 수 있다
console.log(me.constructor === Person);  // true

// 생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결된다.
// constructor 프로퍼티가 가리키는 생성자 함수는 인스턴트를 생성한 생성자 함수이다.
// obj 객체를 생성한 생성자 함수는 Object다.
const obj = new Object();
console.log(obj.constructor === Object); // true

// add 함수 객체를 생성한 생성자 함수는 Function이다.
const add = new Function('a', 'b', 'return a + b');
console.log(add.constructor === Function); // true

// 생성자 함수
function Person(name) {
    this.name = name;
}

// me 객체를 생성한 생성자 함수는 Person이다.
const me = new Person('Lee');
console.log(me.constructor === Person); // true
// 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 방법도 있다.

// 리터럴 표기법에 의해 생성된 객체도 물론 프로토타입이 존재한다.
// 객체 리터럴
const obj = {}; // 생성자 함수 Object , 프로토타입 Object.prototype

// 함수 리터럴
const add = function (a, b) { return a + b; }; // 생성자 함수 Function, 프로토타입 Function.prototype

// 배열 리터럴
const arr = [1, 2, 3]; // 생성자 함수 Array, 프로토타입 Array.prototype

// 정규표현식 리터럴
const regexp = /is/ig; // 생성자 함수 RegExp, 프로토타입 RegExp.prototype
// 리터럴 표기법에 의해 생성된 객체는 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없다.
// obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true

// ECMAScript 사양에 따르면 Object 생성자 함수에 인수를 전달하지 않거나 undefined 또는 null을 인수로 전달하며 호출하면
// 내부적으로는 추상연산을 통해 Object.prototype을 프로토타입으로 갖는 빈 객체를 생성한다.

// Object 생성자 함수에 의한 객체 생성
// Object 생성자 함수는 new 연산자와 함께 호출하지 않아도 new 연산자와 함께 호출한 것과 동일하게 동작한다.
// 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성한다.
let obj = new Object();
console.log(obj); // {}

// new.target이 undefined나 Object가 아닌 경우
// 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성된다.
class Foo extends Object {}
new Foo(); // Foo {}

// 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객체 생성
obj = new Object(123);
console.log(obj); // Number {123}

// String  객체 생성
obj = new Object('123');
console.log(obj); // String {"123"}

// Function 생성자 함수를 호출하여 생성한 함수는 렉시컬 스코프를 만들지 않고 전역 함수인 것처럼 스코프를 생성한다.
// 클로저도 만들지 않는다. 따라서 함수 선언문과 함수 표현식을 평가하여 함수 객체를 생성한 것은 Function 생성자 함수가 아니다.
// 그러나 constructor 프로퍼티를 통해 확인해보면 foo 함수의 생성자 함수는 Function 생성자 함수다.
// foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.
function foo() {}

// 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수다.
console.log(foo.constructor === Function); // true
// 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 갖는다.
// 프로토타입은 생성자 함수와 더불어 생성되며, prototype, constructor 프로퍼티에 의해 연결된다.
// 즉, 프로토타입과 생성자 함수는 단독으로는 존재할 수 없고 언제나 쌍으로 존재한다.

// 큰 틀에서 생각해보면 리터럴 표기법으로 생성한 객체와 생성자 함수로 생성한 객체는 본질적으로 큰 차이는 없다.
// 생성 과정에 미묘한 차이는 있지만 결국 객체로서 동일한 특성을 갖기 때문이다.
// 따라서 프로토타입의 constructor 프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로 생성한 객체를 생성한 생성자 함수로 생각해도 크게 무리는 없다.


// 프로토타입의 생성 시점
// 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.
// 프로토타입과 생성자 함수는 언제든 쌍으로 존재하기 때문.

// 사용자 정의 생성자 함수와 프로토타입 생성 시점
// 일반 함수로 정의하여 [[Construct]]를 갖는 함수 객체는 new 연산자와 함께 생성자 함수로서 호출할 수 있다.
// 생성자 함수로서 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.

// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: ƒ}

// 생성자 함수
function Person(name) {
    this.name = name;
}

// 생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor는 프로토타입이 생성되지 않는다.
// 화살표 함수는 non-constructor다.
const Person = name => {
    this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); // undefined

// 함수 선언문은 런타임 이전에 엔진에 의해 먼저 실행되므로 함수 선언문으로 정의된 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 된다.

//Object, String, Number, Function, Array, RegExp, Date, Promise 등의 빌트인 생성자 함수도 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성.

// 전역 객체는 코드 실행 이전 단계에 엔진에 의해 생성되는 특수한 객체로, 브라우저에선 window, node.js 환경에서는 global 객체를 의미한다.
// 전역 객체는 표준 빌트인 객체들과 환경에 따른 호스트 객체, var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다.

// 생성자 함수, 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 [[Prototype]] 내부 슬롯에 할당된다.

// 객체는 리터럴, Object 생성자 함수, 생성자 함수, Object.create 메서드,ES6의 클래스 등으로 생성된다
// 공통적으로 추상연산인 OrdinaryObjectCreate에 의해 생성된다.
// OrdinaryObjectCreate 는 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 받는다.
// 즉, 프로토타입은 OrdinaryObjectCreate에 전달되는 인수에 의해 결정되며, 이 인수는 객체 생성 시점의 방식에 의해 결정된다.

// 객체 리터럴로 생성 시 OrdinaryObjectCreate에 전달되는 프로토타입은 Object.prototype이다.
// Object 생성자 함수에 빈 인수로 객체를 생성하면 Object.prototype이 생성되어 전달된다.
// 객체 리터럴 방식은 객체 리터럴 내부에 프로퍼티를 추가하지만, Object 생성자 함수 방식은 일단 빈 객체를 생성한 이후 프로퍼티를 추가한다.

//  new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면, OrdinaryObjectCreate에 전달되는 프로토타입은
// 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체다.

// 프로토타입은 객체이므로 프로퍼티 추가/삭제가 가능하며 프로토타입 체인에 즉각 반영된다.
function Person(name) {
    this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
const you = new Person('Kim');

me.sayHello();  // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim
