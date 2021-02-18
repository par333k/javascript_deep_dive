// 객체 리터럴에 의한 객체 생성 방식의 문제

const circle1 = {
    radius: 5,
    getDiameter() {
        return 2 * this.radius;
    }
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
    radius: 10,
    getDiameter() {
        return 2 * this.radius;
    }
};

console.log(circle2.getDiameter()); // 20

// 객체는 프로퍼티를 통해 고유의 상태를 표현한다.
// 메서드를 통해 상태 데이터인 프로퍼티를 참조하고 조작하는 동작을 표현한다.
// 객체 리터럴을 통해 객체를 생성하는 경우 프로퍼티 구조가 동일함에도 불구하고 매번 같은 프로퍼티와 메서드를 기술해야 한다.

// 생성자 함수를 이용한다면?
// 프로퍼티 구조가 동일한 객체 여러개를 생성할 수 있다.
// 생성자 함수
function Circle(radius) {
    // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

// 인스턴스의 생성
const circle1 = new Circle(5);  // 반지름이 5인 Circle 객체를 생성
const circle2 = new Circle(10); // 반지름이 10인 Circle 객체를 생성

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20

// this

// this는 자기 참조 변수다. this가 가리키는 값은 함수 호출 방식에 따라 동적으로 결정된다
// 1. 일반 함수로서 호출 => 전역 객체
// 2. 메서드로서 호출 => 메서드를 호출한 객체(마침표 앞의 객체)
// 3. 생성자 함수로서 호출 => 생성자 함수가 (미래에) 생성할 인스턴스

// 함수는 다양한 방식으로 호출될 수 있다.
function foo() {
    console.log(this);
}

// 일반적인 함수로서 호출
// 전역 객체는 브라우저 환경에서는 window, Node.js 환경에서는 global을 가리킨다.
foo(); // window

// 메서드로서 호출
const obj = { foo }; // ES6 프로퍼티 축약 표현
obj.foo(); // obj

// 생성자 함수로서 호출
const inst = new foo(); // inst

// 자바스크립트는 클래스 기반 객체 지향 언어의 생성자와는 달리 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다.
// new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다.
// 즉, 일반 함수로서 호출된다.
const circle3 = Circle(15);

// 일반 함수로서 호출된 Circle은 반환문이 없으므로 암묵적으로 undefined를 반환한다.
console.log(circle3); // undefined

// 일반 함수로서 호출된 Circle내의 this는 전역 객체를 가리킨다.
console.log(radius); // 15


// 생성자 함수의 인스턴스 생성 과정
// 생성자 함수는 인스턴스를 생성->초기화 한다. 초기화는 옵션이다.
// 생성자 함수
function Circle(radius) {
    // 인스턴스 초기화
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

// 인스턴스 생성
const circle1 = new Circle(5);  // 반지름이 5인 Circle 객체를 생성
// 자바스크립트 엔진은 암묵적인 처리를 통해 new 연산자와 함께 생성자 함수를 호출하면 인스턴스를 생성, 반환한다.


// 1. 인스턴스 생성과 this 바인딩
// 최초에는 빈 객체, 즉 인스턴스가 this에 바인딩 된다. 이 처리는 함수 몸체의 코드가 실행되는 런타임 이전에 실행된다.

// 2. 인스턴스 초기화.
// this에 바인딩 되어있는 인스턴스에 프로퍼티나 메서드를 추가하고, 초기값으로 초기화하거나 고정값을 할당한다.
// 이 부분은 개발자가 직접 명시한다.

// 3. 인스턴스 반환
// 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
function Circle(radius) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };

    // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다
}

// 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환한다.
const circle = new Circle(1);
console.log(circle); // Circle {radius: 1, getDiameter: ƒ}

// 만약 return을 명시적으로 제공하면 return에 명시한 객체가 반환되며
// 원시값을 반환하면 암묵적으로 this가 반환되고 원시값은 무시된다

function Circle(radius) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };

    // 3. 암묵적으로 this를 반환한다.
    // 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
    return {};
    // 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 this가 반환된다.
//    return 100;
}

// 인스턴스 생성. Circle 생성자 함수는 명시적으로 반환한 객체를 반환한다.
const circle = new Circle(1);
console.log(circle); // {}
// 원시값 반환시
// console.log(circle); // Circle {radius: 1, getDiameter: ƒ}

// 생성자 함수 내부에서 명시적으로 this가 아닌 다른 값을 반환하는 것은 기본 동작을 훼손하므로 return은 생략하는 것이 좋다.

// 내부 메서드 [[Call]]과 [[Construct]]
// 함수는 객체이므로 일반 객체와 동일하게 동작할 수 있다. 
// 함수는 객체다.
function foo() {}

// 함수는 객체이므로 프로퍼티를 소유할 수 있다.
foo.prop = 10;

// 함수는 객체이므로 메서드를 소유할 수 있다.
foo.method = function () {
    console.log(this.prop);
};

foo.method(); // 10

// 함수는 일반객체와 달리 호출할 수 있다. 
// 함수가 일반 함수로서 호출되면 함수 객체의 내부 메서드 [[Call]]이 호출되고
// new 연산자와 함께 생성자 함수로서 호출되면 [[Construct]]가 호출된다
function foo() {}

// 일반적인 함수로서 호출: [[Call]]이 호출된다.
foo();

// 생성자 함수로서 호출: [[Construct]]가 호출된다.
new foo();

// 모든 함수로서 기능하는 객체는 [[Call]]을 갖고있다.
// 그러나 [[Construct]]는 가질수도 있고 아닐수도 있다. 모든 함수 객체를 생성자 함수로 호출할 수 있는 것은 아니다.

// 자바스크립트 엔진은 함수 정의 방식에 따라 함수를 constructor와 non-constructor로 구분한다.
// constructor: 함수 선언문, 함수 표현식, 클래스(클래스도 함수다)
// non-constructor: 메서드(ES6 메서드 축약 표현), 애로우 펑션
// ECMAScript 사양에서 메서드로 인정하는 범위는 일반적인 범위보다 좁다는 점을 유의하자.

// 일반 함수 정의: 함수 선언문, 함수 표현식
function foo() {}
const bar = function () {};
// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다. 이는 메서드로 인정하지 않는다.
const baz = {
    x: function () {}
};

// 일반 함수로 정의된 함수만이 constructor이다.
new foo();   // -> foo {}
new bar();   // -> bar {}
new baz.x(); // -> x {}

// 화살표 함수 정의
const arrow = () => {};

new arrow(); // TypeError: arrow is not a constructor

// 메서드 정의: ES6의 메서드 축약 표현만을 메서드로 인정한다.
const obj = {
    x() {}
};

new obj.x(); // TypeError: obj.x is not a constructor

function foo() {}

// 일반 함수로서 호출
// [[Call]]이 호출된다. 모든 함수 객체는 [[Call]]이 구현되어 있다.
foo();

// 생성자 함수로서 호출
// [[Construct]]가 호출된다. 이때 [[Construct]]를 갖지 않는다면 에러가 발생한다.
new foo();

// 주의할 것은 생성자 함수로서 호출될 것을 기대하지 않은 일반함수에 new 연산자를 붙여 호출하면 생성자 함수처럼 동작할 수 있다.
