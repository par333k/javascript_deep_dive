// 상속
// 클래스 상속과 생성자 함수 상속
// 프로토타입 기반 상속은 프로토타입 체인을 통해 다른 객체의 자산을 상속받는 개념
// 상속에 의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의하는 것
// 클래스와 생성자 함수는 둘 다 인스턴스를 생성하는 함수지만 클래스만 기본적인 문법을 통해 상속에 의한 클래스 확장이 가능하다.
// 상속에 의한 클래스 확장은 코드 재사용 관점에서 매우 유용하다.
class Animal {
    constructor(age, weight) {
        this.age = age;
        this.weight = weight;
    }

    eat() { return 'eat'; }

    move() { return 'move'; }
}

// 상속을 통해 Animal 클래스를 확장한 Bird 클래스
class Bird extends Animal {
    fly() { return 'fly'; }
}

const bird = new Bird(1, 5);

console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird instanceof Bird); // true
console.log(bird instanceof Animal); // true

console.log(bird.eat());  // eat
console.log(bird.move()); // move
console.log(bird.fly());  // fly

// 클래스는 extends 키워드가 기본적으로 제공된다. 더 이상 의사 클래스 상속은 필요하지 않다.
// extends 키워드를 사용하여 상속받을 클래스를 정의한다.
// 수퍼(베이스/부모)클래스
class Base {}

// 서브(파생/자식)클래스
class Derived extends Base {}
// 상속을 통해 확장된 클래스를 서브클래스라 부르고, 서브클래스에게 상속된 클래스를 수퍼클래스라 부른다.
// 서브클래스를 파생클래스 또는 자식클래스, 수퍼클래스를 베이스클래스 또는 부모클래스라고 부르기도 한다.
// extends 키워드의 역할은 수퍼클래스와 서브클래스 간의 상속관계를 설정하는 것이다. 클래스도 프로토타입을 통해 상속 관계를 구현한다.
// 수퍼클래스와 서브클래스는 인스턴스의 프로토타입 체인뿐 아니라 클래스간의 프로토탕비 체인도 생성한다.
// 이를 통해 프로토타입 메서드, 정적 메서드 모두 상속이 가능하다.


// 동적 상속
// extends 키워드는 클래스 뿐만 아니라 생성자 함수를 상속받아 클래스를 확장할 수도 있다.
// extends 키워드 앞에는 반드시 클래스가 와야 한다.
// 생성자 함수
function Base(a) {
    this.a = a;
}

// 생성자 함수를 상속받는 서브클래스
class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived {a: 1}

// extends 키워드 다음에는 클래스 뿐만 아니라 [[Construct]] 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있다.
// 이를 통해 동적으로 상속받을 대상을 결정할 수 있다.
function Base1() {}

class Base2 {}

let condition = true;

// 조건에 따라 동적으로 상속 대상을 결정하는 서브클래스
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived); // Derived {}

console.log(derived instanceof Base1); // true
console.log(derived instanceof Base2); // false

// 서브클래스의 constructor
// 클래스에서 constructor를 생략하면 비어있는 constructor 가 암묵적으로 정의된다
// constructor() {}

// 서브클래스에서는 아래처럼 암묵적으로 정의된다. args는 new 연산자와 함께 클래스를 호출할 때 전달한 인수의 리스트다.
// super()는 수퍼클래스의 constructor(super-constructor)를 호출하여 인스턴스를 생성한다.
// constructor(...args) { super(...args); }
// 매개변수에 ... 를 붙이면 Rest 파라미터가 된다. Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.

// 수퍼클래스
class Base {}

// 서브클래스
class Derived extends Base {}

// 위 처럼 생략할 경우 아래처럼 정의된다.
// 수퍼클래스
class Base {
    constructor() {}
}

// 서브클래스
class Derived extends Base {
    constructor() { super(); }
}

const derived = new Derived();
console.log(derived); // Derived {}
// 둘 다 constructor 를 생략하면 빈 객체가 생성된다. 프로퍼티를 소유하는 인스턴스를 생성하려면 constructor 내부에서 프로퍼티를 추가해야한다.


// super 키워드
// super 키워드는 함수처럼 호출도 가능하고 this처럼 식별자처럼 참조도 가능하다
// super를 호출하면 수퍼클래스의 constructor(super-constructor)를 호출한다
// super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

// super의 호출
// 수퍼클래스의 constructor 내부에서 추가한 프로퍼티를 그대로 갖는 인스턴스를 생성한다면 서브클래스의 constructor를 생략할 수 있다.
// 이 때 new 연산자와 함께 서브클래스를 호출하며 전달한 인수는 서브클래스에 암묵적으로 정의된 constructor의 super 호출을 통해
// 수퍼클래스의 constructor에 전달된다.
// 수퍼클래스
class Base {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
}

// 서브클래스
class Derived extends Base {
    // 다음과 같이 암묵적으로 constructor가 정의된다.
    // constructor(...args) { super(...args); }
}

const derived = new Derived(1, 2);
console.log(derived); // Derived {a: 1, b: 2}

// 수퍼클래스, 서브클래스 각각 추가한 프로퍼티를 갖는 인스턴스를 생성한다면 서브클래스의 constructor를 생략할 수 없다.

// 수퍼클래스
class Base {
    constructor(a, b) { // ④
        this.a = a;
        this.b = b;
    }
}

// 서브클래스
class Derived extends Base {
    constructor(a, b, c) { // ②
        super(a, b); // ③ 부분을 통해 수퍼클래스에 전달
        this.c = c;
    }
}

const derived = new Derived(1, 2, 3); // ①
console.log(derived); // Derived {a: 1, b: 2, c: 3}

// super를 호출할 때의 주의사항
// 1. 서브클래스에서 constructor 를 생략하지 않는 경우 서브클래스의 constructor에서는 반드시 super를 호출해야 한다.
class Base {}

class Derived extends Base {
//    constructor() {
        // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
//        console.log('constructor call');
//    }
}

const derived = new Derived();

// 2. 서브클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없다.
class Base {}

class Derived extends Base {
    constructor() {
        // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
//        this.a = 1;
        super();
    }
}

const derived = new Derived(1);

// 3. super는 반드시 서브클래스의 constructor에서만 호출된다. 서브클래스가 아닌 클래스의 constructor나 함수에서 super를 호출하면 에러가 발생한다
class Base {
    constructor() {
//        super(); // SyntaxError: 'super' keyword unexpected here
    }
}

function Foo() {
//    super(); // SyntaxError: 'super' keyword unexpected here
}

// super 참조
// 메서드 내에서 super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

// 1. 서브클래스의 프로토타입 메서드 내에서 super.sayHi는 수퍼클래스의 프로토타입 메서드 sayHi를 가리킨다.
// 수퍼클래스
class Base {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        return `Hi! ${this.name}`;
    }
}

// 서브클래스
class Derived extends Base {
    sayHi() {
        // super.sayHi는 수퍼클래스의 프로토타입 메서드를 가리킨다.
        return `${super.sayHi()}. how are you doing?`;
    }
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee. how are you doing?

// super 참조를 통해 수퍼클래스의 메서드를 참조하려면 수퍼클래스의 prototype 프로퍼티에 바인딩 된 프로토타입을 참조할 수 있어야 한다
// 위 예제와 아래 예제는 동일하게 동작한다.
// 수퍼클래스
class Base {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        return `Hi! ${this.name}`;
    }
}

class Derived extends Base {
    sayHi() {
        // __super는 Base.prototype을 가리킨다.
        const __super = Object.getPrototypeOf(Derived.prototype);
        return `${__super.sayHi.call(this)} how are you doing?`;
    }
}
// super는 자신을 참조하고 있는 메서드가 바인딩되어 있는 객체의 프로토타입을 가리킨다.
// call을 사용하지 않으면 this는 Base.prototype을 가리킨다. 그러나 내부의 this는 인스턴스를 가리켜야한다. name 프로퍼티는 인스턴스에 존재하기 때문이다.
/*
[[HomeObject]]는 메서드 자신을 바인딩하고 있는 객체를 가리킨다.
[[HomeObject]]를 통해 메서드 자신을 바인딩하고 있는 객체의 프로토타입을 찾을 수 있다.
예를 들어, Derived 클래스의 sayHi 메서드는 Derived.prototype에 바인딩되어 있다.
따라서 Derived 클래스의 sayHi 메서드의 [[HomeObject]]는 Derived.prototype이고
이를 통해 Derived 클래스의 sayHi 메서드 내부의 super 참조가 Base.prototype으로 결정된다.
따라서 super.sayHi는 Base.prototype.sayHi를 가리키게 된다.
*/
// super = Object.getPrototypeOf([[HomeObject]])

// 주의할 것은 ES6의 메서드 축약 표현으로 정의된 함수만이 [[HomeObject]]를 갖는다는 것이다.
const obj = {
    // foo는 ES6의 메서드 축약 표현으로 정의한 메서드다. 따라서 [[HomeObject]]를 갖는다.
    foo() {},
    // bar는 ES6의 메서드 축약 표현으로 정의한 메서드가 아니라 일반 함수다.
    // 따라서 [[HomeObject]]를 갖지 않는다.
    bar: function () {}
};
// [[HomeObject]] 를 가지는 함수만이 super 참조를 할 수 있다.
// 단, super 참조는 수퍼클래스의 메서드를 참조하기 위해 사용하므로 서브클래스의 메서드에서 사용해야 한다.
// 클래스 뿐만 아니라 객체 리터럴에서도 super 참조를 사용할 수 있다. 단, ES6의 메서드 축약표현으로 정의된 함수만 가능하다.
const base = {
    name: 'Lee',
    sayHi() {
        return `Hi! ${this.name}`;
    }
};

const derived = {
    __proto__: base,
    // ES6 메서드 축약 표현으로 정의한 메서드다. 따라서 [[HomeObject]]를 갖는다.
    sayHi() {
        return `${super.sayHi()}. how are you doing?`;
    }
};

console.log(derived.sayHi()); // Hi! Lee. how are you doing?


// 2. 서브클래스의 정적 메서드 내에서 super.sayHi는 수퍼클래스의 정적 메서드 sayHi를 가리킨다.
// 수퍼클래스
class Base {
    static sayHi() {
        return 'Hi!';
    }
}

// 서브클래스
class Derived extends Base {
    static sayHi() {
        // super.sayHi는 수퍼클래스의 정적 메서드를 가리킨다.
        return `${super.sayHi()} how are you doing?`;
    }
}

console.log(Derived.sayHi()); // Hi! how are you doing?


// 상속 클래스의 인스턴스 생성 과정
// 상속관계에 있는 두 클래스 생성 예제
// 수퍼클래스
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }

    toString() {
        return `width = ${this.width}, height = ${this.height}`;
    }
}

// 서브클래스
class ColorRectangle extends Rectangle {
    constructor(width, height, color) {
        super(width, height);
        this.color = color;
    }

    // 메서드 오버라이딩
    toString() {
        return super.toString() + `, color = ${this.color}`;
    }
}

const colorRectangle = new ColorRectangle(2, 4, 'red');
console.log(colorRectangle); // ColorRectangle {width: 2, height: 4, color: "red"}

// 상속을 통해 getArea 메서드를 호출
console.log(colorRectangle.getArea()); // 8
// 오버라이딩된 toString 메서드를 호출
console.log(colorRectangle.toString()); // width = 2, height = 4, color = red

// 1. 서브클래스의 super 호출
// 자바스크립트 엔진은 수퍼클래스와 서브클래스 구분을 위해 내부 슬롯 [[ConstructorKind]]를 갖는다
// 다른 클래스를 상속받지 않는 클래스(그리고 생성자 함수)는 [[ConstructorKind]]의 값이 "base"로
// 다른 클래스를 상속받는 서브클래스는 내부 슬롯 [[ConstructorKind]]의 값이 "derived"로 설정
// 서브클래스는 자신이 직접 인스턴스를 생성하지 않고 수퍼클래스에게 인스턴스 생성을 위임한다
// 이것이 바로 서브클래스의 constructor에서 반드시 super를 호출해야 하는 이유다.
// 실제로 인스턴스를 생성하는 주체는 수퍼클래스이므로 수퍼클래스의 constructor를 호출하는 super가 호출되지 않으면 인스턴스를 생성할 수 없기 때문이다.


// 2. 수퍼클래스의 인스턴스 생성과 this 바인딩
// 수퍼클래스의 constructor 내부 코드가 실행되기 이전에 암묵적으로 빈 객체를 생성, 이 빈 객체가 바로 클래스가 생성한 인스턴스
// 암묵적으로 생성된 빈 객체, 즉 인스턴스는  this에 바인딩
// 수퍼틀래스의 constructor 내부의 this는 생성된 인스턴스를 가리킴
// 수퍼클래스
class Rectangle {
    constructor(width, height) {
        // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
        console.log(this); // ColorRectangle {}
        // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
        console.log(new.target); // ColorRectangle
        //...
    }
}
// 이 때 인스턴스는 수퍼클래스가 생성
// 하지만 new 연산자와 함께 호출된 클래스가 서브클래스라는 것이 중요.
// 즉, new 연산자와 함께 호출된 함수를 가리키는 new.target은 서브클래스를 가리킨다
// 따라서 인스턴스는 new.target이 가리키는 서브클래스가 생성한 것으로 처리된다.
// 따라서 생성된 인선스의 프로토타입은 서브클래스의 prototype 프로퍼티가 가리키는 객체(ColorRectangle.prototype)다.
class Rectangle {
    constructor(width, height) {
        // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
        console.log(this); // ColorRectangle {}
        // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
        console.log(new.target); // ColorRectangle

        // 생성된 인스턴스의 프로토타입으로 ColorRectangle.prototype이 설정된다.
        console.log(Object.getPrototypeOf(this) === ColorRectangle.prototype); // true
        console.log(this instanceof ColorRectangle); // true
        console.log(this instanceof Rectangle); // true
        // ...
    }
}

// 3. 수퍼클래스의 인스턴스 초기화
// 수퍼클래스의 constructor가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다.
// 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.
// 수퍼클래스
class Rectangle {
    constructor(width, height) {
        // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
        console.log(this); // ColorRectangle {}
        // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
        console.log(new.target); // ColorRectangle

        // 생성된 인스턴스의 프로토타입으로 ColorRectangle.prototype이 설정된다.
        console.log(Object.getPrototypeOf(this) === ColorRectangle.prototype); // true
        console.log(this instanceof ColorRectangle); // true
        console.log(this instanceof Rectangle); // true

        // 인스턴스 초기화
        this.width = width;
        this.height = height;

        console.log(this); // ColorRectangle {width: 2, height: 4}
        // ...
    }
}


// 4. 서브클래스 constructor로의 복귀와 this 바인딩
// super의 호출이 종료되고 제어 흐름이 서브클래스 constructor로 돌아온다.
// 이때 super가 반환한 인스턴스가 this에 바인딩된다.
// 서브클래스는 별도의 인스턴스를 생성하지 않고 super가 변환한 인스턴스를 this에 바인딩하여 그대로 사용한다.
// 서브클래스
class ColorRectangle extends Rectangle {
    constructor(width, height, color) {
        super(width, height);

        // super가 반환한 인스턴스가 this에 바인딩된다.
        console.log(this); // ColorRectangle {width: 2, height: 4}
//    ...
    }
}
// super가 호출되지 않으면 인스턴스가 생성되지 않으며, this 바인딩도 할 수 없다. 서브클래스의 constructor에서 super를 호출하기 전에는
// this를 참조할 수 없는 이유가 바로 이 때문이다.
// 따라서 서브클래스 constructor 내부의 인스턴스 초기화는 반드시 super 호출 이후에 처리되어야 한다.

// 5. 서브클래스 인스턴스 초기화
// super 호출 이후, 서브클래스의 constructor에 기술되어 있는 인스턴스 초기화가 실행된다.

// 6. 인스턴스 반환
// 클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
// 서브클래스
class ColorRectangle extends Rectangle {
    constructor(width, height, color) {
        super(width, height);

        // super가 반환한 인스턴스가 this에 바인딩된다.
        console.log(this); // ColorRectangle {width: 2, height: 4}

        // 인스턴스 초기화
        this.color = color;

        // 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
        console.log(this); // ColorRectangle {width: 2, height: 4, color: "red"}
    }

// ...
}


// 표준 빌트인 생성자 함수 확장
// String, Number, Array 같은 표준 빌트인 객체도 [[Construct]] 내부 메서드를 갖는 생성자 함수이므로 extends 키워드를 사용하여 확장 할 수 있다.
// Array 생성자 함수를 상속받아 확장한 MyArray
class MyArray extends Array {
    // 중복된 배열 요소를 제거하고 반환한다: [1, 1, 2, 3] => [1, 2, 3]
    uniq() {
        return this.filter((v, i, self) => self.indexOf(v) === i);
    }

    // 모든 배열 요소의 평균을 구한다: [1, 2, 3] => 2
    average() {
        return this.reduce((pre, cur) => pre + cur, 0) / this.length;
    }
}

const myArray = new MyArray(1, 1, 2, 3);
console.log(myArray); // MyArray(4) [1, 1, 2, 3]

// MyArray.prototype.uniq 호출
console.log(myArray.uniq()); // MyArray(3) [1, 2, 3]
// MyArray.prototype.average 호출
console.log(myArray.average()); // 1.75

// Array 생성자 함수를 상속받아 확장한 클래스가 생성한 인스턴스는 Array.prototype과 MyArray.prototype의 모든 메서드가 사용가능하다.
// 주의할것은 Array.prototype의 메서드 중에서 map, filter와 같이 새로운 배열을 반환하는 메서드가 MyArray 클래스의 인스턴스를 반환한다.
console.log(myArray.filter(v => v % 2) instanceof MyArray); // true

// 새로운 배열을 반환하는 메서드가 MyArray 클래스의 인스턴스를 반환하지 않고 Array의 인스턴스를 반환하면 MyArray 클래스의 메서드와 메서드체이닝이 불가능하다
// 메서드 체이닝
// [1, 1, 2, 3] => [ 1, 1, 3 ] => [ 1, 3 ] => 2
console.log(myArray.filter(v => v % 2).uniq().average()); // 2

// 만약 MyArray 클래스의 uniq 메서드가 Array가 생성한 인스턴스를 반환하게 하려면 Symbol.species를 사용하여 정적 접근자 프로퍼티를 추가한다.
// Array 생성자 함수를 상속받아 확장한 MyArray
class MyArray extends Array {
    // 모든 메서드가 Array 타입의 인스턴스를 반환하도록 한다.
    static get [Symbol.species]() { return Array; }

    // 중복된 배열 요소를 제거하고 반환한다: [1, 1, 2, 3] => [1, 2, 3]
    uniq() {
        return this.filter((v, i, self) => self.indexOf(v) === i);
    }

    // 모든 배열 요소의 평균을 구한다: [1, 2, 3] => 2
    average() {
        return this.reduce((pre, cur) => pre + cur, 0) / this.length;
    }
}

const myArray = new MyArray(1, 1, 2, 3);

console.log(myArray.uniq() instanceof MyArray); // false
console.log(myArray.uniq() instanceof Array); // true

// 메서드 체이닝
// uniq 메서드는 Array 인스턴스를 반환하므로 average 메서드를 호출할 수 없다.
console.log(myArray.uniq().average());
// TypeError: myArray.uniq(...).average is not a function
