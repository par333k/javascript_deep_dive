// 함수의 구분
// ES5 까지
var foo = function () {
    return 1;
};

// 일반적인 함수로서 호출
foo(); // -> 1

// 생성자 함수로서 호출
new foo(); // -> foo {}

// 메서드로서 호출
var obj = { foo: foo };
obj.foo(); // -> 1

// ES6 이전의 함수는 사용 목적에 따라 명확히 구분되지 않는다. 즉, ES6 이전의 모든 함수는 일반 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있다.
// 다시 말해, ES6 이전의 모든 함수는 callable 하면서 constructor다.
var foo = function () {};

// ES6 이전의 모든 함수는 callable이면서 constructor다.
foo(); // -> undefined
new foo(); // -> foo {}

// ES5까지는 객체에 메서드로 바인딩 된 함수도 생성자 함수나 일반 함수로서 호출할 수 있었다.
// 프로퍼티 f에 바인딩된 함수는 callable이며 constructor다.
var obj = {
    x: 10,
    f: function () { return this.x; }
};

// 프로퍼티 f에 바인딩된 함수를 메서드로서 호출
console.log(obj.f()); // 10

// 프로퍼티 f에 바인딩된 함수를 일반 함수로서 호출
var bar = obj.f;
console.log(bar()); // undefined

// 프로퍼티 f에 바인딩된 함수를 생성자 함수로서 호출
console.log(new obj.f()); // f {}
// ES5 에서 이런 식으로 호출하게 되면 성능면에 문제가 있다. 객체에 바인딩 된 함수가 prototype 객체도 생성해버리기 때문
// 또, 함수에 전달되는 콜백 함수도 constructor라 불필요한 프로토타입 객체를 생성한다
// 콜백 함수를 사용하는 고차 함수 map. 콜백 함수도 constructor이며 프로토타입을 생성한다.
[1, 2, 3].map(function (item) {
    return item * 2;
}); // -> [ 2, 4, 6 ]
// 즉, ES5까지는 함수는 사용 목적에 따라 구분이 되지 않으며 호출 방식에 제약이 없고 prototype 객체를 생성한다는점에서
// 성능적인 단점과 휴먼에러의 가능성이 높았다.
// 따라서 ES6에서는 함수를 사용 목적에 따라 3가지 종류로 명확히 구분했다.
// 일반함수는 함수 선언문이나 함수 표현식으로 정의한 함수이며 ES5 까지와 차이가 없다
// 그러나 메서드로 쓰이는 함수와 화살표 함수는 non-constructor이다.


// 메서드
// ES6 사양에서의 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다.
const obj = {
    x: 1,
    // foo는 메서드이다.
    foo() { return this.x; },
    // bar에 바인딩된 함수는 메서드가 아닌 일반 함수이다.
    bar: function() { return this.x; }
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
// ES6 사양에서 정의한 메서드(이하 ES6 메서드)는 인스턴스를 생성할 수 없는 non-constructor다.
new obj.foo(); // -> TypeError: obj.foo is not a constructor
new obj.bar(); // -> bar {}
// ES6 메서드는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.
// obj.foo는 constructor가 아닌 ES6 메서드이므로 prototype 프로퍼티가 없다.
obj.foo.hasOwnProperty('prototype'); // -> false

// obj.bar는 constructor인 일반 함수이므로 prototype 프로퍼티가 있다.
obj.bar.hasOwnProperty('prototype'); // -> true
//표준 빌트인 객체가 제공하는 프로토타입 메서드와 정적 메서드는 모두 non-constructor다.
String.prototype.toUpperCase.prototype; // -> undefined
String.fromCharCode.prototype           // -> undefined

Number.prototype.toFixed.prototype; // -> undefined
Number.isFinite.prototype;          // -> undefined

Array.prototype.map.prototype; // -> undefined
Array.from.prototype;          // -> undefined

// ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 갖는다.
// super 참조는 내부 슬롯 [[HomeObject]] 를 사용하여 수퍼클래스의 메서드를 참조한다.
const base = {
    name: 'Lee',
    sayHi() {
        return `Hi! ${this.name}`;
    }
};

const derived = {
    __proto__: base,
    // sayHi는 ES6 메서드다. ES6 메서드는 [[HomeObject]]를 갖는다.
    // sayHi의 [[HomeObject]]는 derived.prototype을 가리키고
    // super는 sayHi의 [[HomeObject]]의 프로토타입인 base.prototype을 가리킨다.
    sayHi() {
        return `${super.sayHi()}. how are you doing?`;
    }
};

console.log(derived.sayHi()); // Hi! Lee. how are you doing?

// ES6 메서드가 아닌 함수는 super 키워드를 사용할 수 없다. ES6 메서드가 아닌 함수는 내부 슬롯 [[HomeObject]]가 없기 때문이다.
const derived = {
    __proto__: base,
    // sayHi는 ES6 메서드가 아니다.
    // 따라서 sayHi는 [[HomeObject]]를 갖지 않으므로 super 키워드를 사용할 수 없다.
    sayHi: function () {
        // SyntaxError: 'super' keyword unexpected here
        return `${super.sayHi()}. how are you doing?`;
    }
};
// 메서드를 정의할 때 프로퍼티 값으로 익명 함수 표현식을 할당하는 ES5 까지의 방식은 사용하지 않는 것이 좋다.


// 화살표 함수
// 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.

// 1. 함수 정의
// 함수 표현식으로 정의한다.
const multiply = (x, y) => x * y;
multiply(2, 3); // -> 6

// 2. 매개변수 선언
// 여러개인 경우 소괄호 안에 매개변수를 선언한다. 한 개인 경우 소괄호를 생략할 수 있고, 없는 경우는 생략할 수 없다.
const arrow = (x, y) => { };
const arrow = x => { };
const arrow = () => { };

// 3. 함수 몸체 정의
// 함수 몸체가 하나의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 생략이 가능
// 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다.
// concise body
const power = x => x ** 2;
power(2); // -> 4

// 위 표현은 다음과 동일하다.
// block body
const power = x => { return x ** 2; };

// 함수 몸체를 감싸는 중괄호를 생략한 경우, 몸체 내부의 문이 표현식이 아닌 문이라면 에러가 발생한다. 표현식이 아닌 문은 반환할 수 없기 때문.
// const arrow = () => const x = 1; // SyntaxError: Unexpected token 'const'

// 위 표현은 다음과 같이 해석된다.
// const arrow = () => { return const x = 1; };

// 따라서 함수 몸체가 하나의 문으로 구성된다해도 함수 몸체의 문이 표현식이 아닌 문이라면 중괄호 생략이 불가능하다.
const arrow = () => { const x = 1; };

// 객체 리터럴을 반환하는 경우 객체 리터럴을 소괄호로 감싸주어야 한다.
const create = (id, content) => ({ id, content });
create(1, 'JavaScript'); // -> {id: 1, content: "JavaScript"}

// 위 표현은 다음과 동일하다.
const create = (id, content) => { return { id, content }; };

// 객체 리터럴을 소괄호 ()로 감싸지 않으면 객체 리터럴의 중괄호 {}를 함수 몸체를 감싸는 중괄호{}로 잘못 해석한다.
// { id, content }를 함수 몸체 내의 쉼표 연산자문으로 해석한다.
const create = (id, content) => { id, content };
create(1, 'JavaScript'); // -> undefined

// 함수 몸체가 여러개의 문으로 구성되어 있다면 중괄호 생략할 수 없다. 이 때 반환값이 있다면 명시적으로 반환해야한다.
const sum = (a, b) => {
    const result = a + b;
    return result;
};

// 화살표 함수도 즉시 실행함수IIFE로 사용할 수 있다.
const person = (name => ({
    sayHi() { return `Hi? My name is ${name}.`; }
}))('Lee');

console.log(person.sayHi()); // Hi? My name is Lee.

// 화살표 함수도 일급 객체이므로 Array.prototype.map, filter, reduce 같은 고차함수에 인수로 전달 가능하다.
// 이 경우 일반 함수 표현식보다 표현이 간결하고 가독성이 좋다.
// ES5
[1, 2, 3].map(function (v) {
    return v * 2;
});

// ES6
[1, 2, 3].map(v => v * 2); // -> [ 2, 4, 6 ]


// 화살표 함수와 일반 함수의 차이
// 1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor다.
const Foo = () => {};
// 화살표 함수는 생성자 함수로서 호출할 수 없다.
new Foo(); // TypeError: Foo is not a constructor
const Foo = () => {};
// 화살표 함수는 prototype 프로퍼티가 없다.
Foo.hasOwnProperty('prototype'); // -> false

// 2. 중복된 매개변수 이름을 선언할 수 없다.
// 일반 함수는 중복된 매개변수 이름을 선언해도 에러가 발생하지 않는다. 단 strict mode에서는 에러가 발생한다.
function normal(a, a) { return a + a; }
console.log(normal(1, 2)); // 4
//'use strict';

function normal(a, a) { return a + a; }
// SyntaxError: Duplicate parameter name not allowed in this context

const arrow = (a, a) => a + a;
// SyntaxError: Duplicate parameter name not allowed in this context


// 3. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.
// 따라서 화살표 함수 내부에서 this, arguments, super, new.target을 참조하면 스코프 체인을 통해 상위 스코프의 this, arguments, super
// new.target을 참조한다.  만약 화살표 함수와 화살표 함수가 중첩되어 있다면 스코프 체인 상에서 가장 가까운 상위 함수 중에서
// 화살표 함수가 아닌 함수의 this, arguments, super, new.target을 참조한다.


// this에 대해
// 화살표 함수의 this는 일반 함수의 this와 다르게 동작한다
// 일반적으로 콜백 함수 내부의 this는 함수의 호출 방식에 따라 동적으로 결정되는 this 바인딩 특징에 의해
// this에 바인딩할 객체가 동적으로 정해진다. 아래 예제를 보자.
class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        // add 메서드는 인수로 전달된 배열 arr을 순회하며 배열의 모든 요소에 prefix를 추가한다.
        // ①
        return arr.map(function (item) {
            return this.prefix + item; // ②
            // -> TypeError: Cannot read property 'prefix' of undefined
        });
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
// 타입에러가 발생하는 이유는, 1에서 this는 메서드를 호출한 객체인 prefixer를 가리킨다.
// 그런데 map의 인수로 전달한 콜백 함수의 내부(2)에서의 this는 undefined를 가리킨다.
// map 메서드가 콜백 함수를 일반 함수로서 호출하기 때문이다.
// 일반 함수로서 호출되는 모든 함수 내부의 this는 전역 객체를 가리킨다.
// 그런데 클래스 내부의 모든 코드에는 strict mode가 적용된다.
// strict mode에서 일반 함수로서 호출된 모든 함수 내부의 this에는 전역 객체가 아니라 undefined가 바인딩 되므로
// 일반 함수로서 호출되는 map 메서드의 콜백 함수의 내부 this에는 undefined가 바인딩된다
// 이러한 문제가 바로 콜백 함수의 this와 외부 함수의 this가 서로 달라 타입 에러가 벌어지는 상황인 것이다.
// ES5 에서는 아래와 같은 방법을 사용해 해결했다.

// 1. add 메서드를 호출한 prefixer 객체를 가리키는 this를 일단 회피시킨 후에 콜백 함수 내부에서 사용한다.
/*
add(arr) {
    // this를 일단 회피시킨다.
    const that = this;
    return arr.map(function (item) {
        // this 대신 that을 참조한다.
        return that.prefix + ' ' + item;
    });
}
*/

// 2. map의 두 번째 인수로 add 메서드를 호출한 prefixer 객체를 가리키는 this를 전달한다
/*
add(arr) {
  return arr.map(function (item) {
    return this.prefix + ' ' + item;
  }, this); // this에 바인딩된 값이 콜백 함수 내부의 this에 바인딩된다.
}
 */

// 3. Function.prototype.bind 메서드를 사용하여 add 메서드를 호출한 prefixer객체를 가리키는 this를 바인딩한다
/*
...
add(arr) {
  return arr.map(function (item) {
    return this.prefix + ' ' + item;
  }.bind(this)); // this에 바인딩된 값이 콜백 함수 내부의 this에 바인딩된다.
}
...
 */

// ES6 에서는 화살표 함수를 사용하여 "콜백 함수 내부의 this문제" 를 해결할 수 있다.
class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        return arr.map(item => this.prefix + item);
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
// ['-webkit-transition', '-webkit-user-select']
// 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다
// 이를 lexical this라 한다. 이는 마치 렉시컬 스코프와 같이 화살표 함수의 this가 함수가 정의된 위치에 의해 결정된다는 것을 의미한다.

// 화살표 함수는 함수 자체의 this 바인딩이 존재하지 않으므로, 화살표 함수 내부에서 this를 참조하면 일반적인 식별자처럼
// 스코프 체인을 통해 상위 스코프에서 this를 탐색한다.
// 화살표 함수는 상위 스코프의 this를 참조한다.
() => this.x;

// 익명 함수에 상위 스코프의 this를 주입한다. 위 화살표 함수와 동일하게 동작한다.
(function () { return this.x; }).bind(this);
// 화살표 함수와 화살표 함수가 중첩되어 있다면 상위 화살표 함수에도 this 바인딩이 없으므로 체인 상에서 가장 가까운 상위 함수 중에서
// 화살표 함수가 아닌 함수의 this를 참조한다.
// 중첩 함수 foo의 상위 스코프는 즉시 실행 함수다.
// 따라서 화살표 함수 foo의 this는 상위 스코프인 즉시 실행 함수의 this를 가리킨다.
(function () {
    const foo = () => console.log(this);
    foo();
}).call({ a: 1 }); // { a: 1 }

// bar 함수는 화살표 함수를 반환한다.
// bar 함수가 반환한 화살표 함수의 상위 스코프는 화살표 함수 bar다.
// 하지만 화살표 함수는 함수 자체의 this 바인딩을 갖지 않으므로 bar 함수가 반환한
// 화살표 함수 내부에서 참조하는 this는 화살표 함수가 아닌 즉시 실행 함수의 this를 가리킨다.
(function () {
    const bar = () => () => console.log(this);
    bar()();
}).call({ a: 1 }); // { a: 1 }

// 만약 화살표 함수가 전역 함수르면 화살표 함수의 this는 전역 객체를 가리킨다.
// 전역 함수 foo의 상위 스코프는 전역이므로 화살표 함수 foo의 this는 전역 객체를 가리킨다.
const foo = () => console.log(this);
foo(); // window

// 프로퍼티에 할당한 화살표 함수도 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this를 참조한다.
// increase 프로퍼티에 할당한 화살표 함수의 상위 스코프는 전역이다.
// 따라서 increase 프로퍼티에 할당한 화살표 함수의 this는 전역 객체를 가리킨다.
const counter = {
    num: 1,
    increase: () => ++this.num
};

console.log(counter.increase()); // NaN

// 화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에 call, apply, bind 메서드를 사용해도 화살표 내부 함수의 this를 교체할 수 없다.
window.x = 1;

const normal = function () { return this.x; };
const arrow = () => this.x;

console.log(normal.call({ x: 10 })); // 10
console.log(arrow.call({ x: 10 }));  // 1

// 화살표 함수가 call, apply, bind 메서드를 호출 할 수 없다는 의미는 아니다.
// this를 교체할 수 없고 언제나 상위 스코프의 this 바인딩을 참조한다는 것이다.
const add = (a, b) => a + b;

console.log(add.call(null, 1, 2));    // 3
console.log(add.apply(null, [1, 2])); // 3
console.log(add.bind(null, 1, 2)());  // 3

// 메서드를 화살표 함수로 정의하는 것은 피해야 한다.
// ES6 메서드가 아닌 일반적인 메서드를 의미한다.
// Bad
const person = {
    name: 'Lee',
    sayHi: () => console.log(`Hi ${this.name}`)
};

// sayHi 프로퍼티에 할당된 화살표 함수 내부의 this는 상위 스코프인 전역의 this가 가리키는
// 전역 객체를 가리키므로 이 예제를 브라우저에서 실행하면 this.name은 빈 문자열을 갖는
// window.name과 같다. 전역 객체 window에는 빌트인 프로퍼티 name이 존재한다.
person.sayHi(); // Hi
// 메서드를 정의할 때 ES6 메서드 축약표현으로 정의하는 것이 좋다.
// Good
const person = {
    name: 'Lee',
    sayHi() {
        console.log(`Hi ${this.name}`);
    }
};

person.sayHi(); // Hi Lee

// 프로토타입 객체의 프로퍼티에 화살표 함수를 할당하는 경우도 동일한 문제가 발생한다.
// Bad
function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = () => console.log(`Hi ${this.name}`);

const person = new Person('Lee');
// 이 예제를 브라우저에서 실행하면 this.name은 빈 문자열을 갖는 window.name과 같다.
person.sayHi(); // Hi

// 프로퍼티를 동적 추가할때는 ES6 메서드 정의를 사용할 수 없으므로 일반 함수를 할당한다.
// Good
function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = function () { console.log(`Hi ${this.name}`); };

const person = new Person('Lee');
person.sayHi(); // Hi Lee

// 일반 함수가 아닌 ES6 메서드를 동적 추가하고 싶다면 다음과 같이 객체 리터럴을 바인딩하고
// 프로토타입의 constructor 프로퍼티와 생성자 함수 간의 연결을 재설정한다.
function Person(name) {
    this.name = name;
}

Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 간의 연결을 재설정
    constructor: Person,
    sayHi() { console.log(`Hi ${this.name}`); }
};

const person = new Person('Lee');
person.sayHi(); // Hi Lee

// 클래스 필드 정의 제안을 사용하여 클래스 필드에 화살표 함수를 할당할 수도 있다.
// Bad
class Person {
    // 클래스 필드 정의 제안
    name = 'Lee';
    sayHi = () => console.log(`Hi ${this.name}`);
}

const person = new Person();
person.sayHi(); // Hi Lee
// sayHi 클래스 필드에 할당한 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this 바인딩을 참조한다.
// 그렇다면 sayHi 클래스 필드에 할당한 화살표 함수의 상위 스코프는 무엇일까? sayHi 클래스 필드는 인스턴스 프로퍼티이므로 아래와 같다.
class Person {
    constructor() {
        this.name = 'Lee';
        // 클래스가 생성한 인스턴스(this)의 sayHi 프로퍼티에 화살표 함수를 할당한다.
        // sayHi 프로퍼티는 인스턴스 프로퍼티이다.
        this.sayHi = () => console.log(`Hi ${this.name}`);
    }
}
// sayHi 클래스 필드에 할당한 화살표 함수의 상위 스코프는 constructor이다.
// 즉, constructor내부의 this 바인딩과 같다.
// constructor 내부의 this 바인딩은 클래스가 생성한 인스턴스를 가리키므로
// sayHi 클래스 필드에 할당한 화살표 함수 내부의 this 또한 클래스가 생성한 인스턴스를 가리킨다.
// 하지만 클래스 필드에 할당한 화살표 함수는 프로토타입 메서드가 아니라 인스턴스 메서드가 된다.
// 따라서 메서드를 정의할 때는 ES6 메서드 축약표현으로 정의한 ES6 메서드를 사용하는 것이 좋다.
// Good
class Person {
    // 클래스 필드 정의
    name = 'Lee';

    sayHi() { console.log(`Hi ${this.name}`); }
}
const person = new Person();
person.sayHi(); // Hi Lee


// super
// 화살표 함수는 함수 자체의 super 바인딩을 갖지 않는다.
// 따라서 화살표 함수 내부에서 super를 참조하면 this와 마찬가지로 상위 스코프의 super를 참조한다.
class Base {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        return `Hi! ${this.name}`;
    }
}

class Derived extends Base {
    // 화살표 함수의 super는 상위 스코프인 constructor의 super를 가리킨다.
    sayHi = () => `${super.sayHi()} how are you doing?`;
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee how are you doing?
// super는 내부 슬롯 [[HomeObject]]를 갖는 ES6 메서드 내에서만 사용할 수 있는 키워드다.
// sayHi 클래스 필드에 할당한 화살표 함수는 ES6 메서드는 아니지만 함수 자체의 super 바인딩을 갖지 않으므로
// super를 참조해도 에러가 발생하지 않고 this와 마찬가지로 클래스 필드에 할당한 화살표 함수 내부에서 super를 참조하면
// constructor 내부의 super 바인딩을 참조한다.
// 위 예제의 경우 Derived 클래스의 constructor는 생략되었지만 암묵적으로 constructor가 생성된다. (25.8.4절 "서브클래의 constructor" 참고)


// arguments
// 화살표 함수는 함수 자체의 arguments 바인딩을 갖지 않는다.
// 따라서 화살표 함수 내부에서 arguments를 참조하면 this와 마찬가지로 상위 스코프의 arguments를 참조한다.
(function () {
    // 화살표 함수 foo의 arguments는 상위 스코프인 즉시 실행 함수의 arguments를 가리킨다.
    const foo = () => console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
    foo(3, 4);
}(1, 2));

// 화살표 함수 foo의 arguments는 상위 스코프인 전역의 arguments를 가리킨다.
// 하지만 전역에는 arguments 객체가 존재하지 않는다. arguments 객체는 함수 내부에서만 유효하다.
const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError: arguments is not defined
// arguments 객체는 함수를 정의할 때 매개변수의 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다
// 하지만 화살표 함수에서는 arguments 객체를 사용할 수 없다.
// 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야 한다.
