// 클래스의 ES11 사양에 따르면 인스턴스 프로퍼티는 반드시 constructor 내부에서 정의해야 한다.
// 하지만 2020년 7월, 클래스 몸체에 메서드 뿐만이 아니라 프로퍼티를 직접 정의할 수 있는 새로운 표준 사양이 제안되어 있다.
// 크롬과 같은 모던 브라우저에서는 클래스 몸체에서 메서드 뿐만 아니라 프로퍼티도 정의하여 사용이 가능하다.
// 원칙적으로 이전까지는 클래스 몸체에는 0개 이상의 메서드만 선언이 가능했다.

// constructor 는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드로, 이름 변경이 불가능하다.
class Person {
    // 생성자
    constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name;
    }
}

// 클래스는 함수다.
console.log(typeof Person); // function
console.dir(Person);
// 모든 함수 객체가 가지고 있는 prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor 프로퍼티는 클래스 자신을 가리키고 있다.
// 이는 클래스가 인스턴스를 생성하는 생성자 함수라는 것을 의미한다. 즉, new 연산자와 함께 호출하면 인스턴스를 생성한다.

// 인스턴스 생성
const me = new Person('Lee');
console.log(me);
// Person 클래스의 constructor 내부에서 this에 추가한 name 프로퍼티 클래스가 생성한 인스턴스의 프로퍼티로 추가된 것을 확인할 수 있다.
// 생성자 함수와 마찬가지로, constructor 내부에서 this에 추가한 프로퍼티는 인스턴스 프로퍼티가 된다.
// constructor 내부의 this는 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스를 가리킨다.

// 클래스
class Person {
    // 생성자
    constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name;
    }
}

// 생성자 함수
function Person(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
}

// 클래스 몸체에 정의한 constructor는 단순한 메서드가 아니다. 클래스 정의가 평가되면 constructor의 기술된 동작을 하는 함수 객체가 생성된다
// 클래스의 constructor 메서드와 프로토타입의 constructor 프로퍼티는 직접적인 관련이 없다.
// constructor는 생성자 함수와 유사하지만 몇 가지 차이가 있다. 클래스 내에 최대 한 개만 존재할 수 있고 생략할 수도 있다.
// 생략할 경우 암묵적으로 정의되며 빈 객체를 생성한다.
class Person {
    constructor() {}
    constructor() {}
}
// SyntaxError: A class may only have one constructor

// 생략가능
class Person {}

class Person {
    // constructor를 생략하면 다음과 같이 빈 constructor가 암묵적으로 정의된다.
    constructor() {}
}

// 빈 객체가 생성된다.
const me = new Person();
console.log(me); // Person {}

// 프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 this에 인스턴스 프로퍼티를 추가한다.
class Person {
    constructor() {
        // 고정값으로 인스턴스 초기화
        this.name = 'Lee';
        this.address = 'Seoul';
    }
}

// 인스턴스 프로퍼티가 추가된다.
const me = new Person();
console.log(me); // Person {name: "Lee", address: "Seoul"}

// 인스턴스 생성 시, 클래스 외부에서 인스턴스 프로퍼티의 초기값을 전달하려면 constructor에 매개변수를 선언하고
// 인스턴스 생성 시 초기값을 전달한다. 초기값은 constructor의 매개변수에게 전달된다.
class Person {
    constructor(name, address) {
        // 인수로 인스턴스 초기화
        this.name = name;
        this.address = address;
    }
}

// 인수로 초기값을 전달한다. 초기값은 constructor에 전달된다.
const me = new Person('Lee', 'Seoul');
console.log(me); // Person {name: "Lee", address: "Seoul"}

// consttuctor 내에서는 인스턴스의 생성과 동시에 인스턴스 프로퍼티 추가를 통해 인스턴스 초기화를 실행한다
// 따라서 인스턴스 초기화를 하려면 constructor를 생략해서는 안된다.
// constructor는 별도의 반환문을 갖지 않아야 하는데, 이는 new 연산자와 함께 클래스가 호출되면 암묵적으로 this, 즉 인스턴스를 반환하기 때문이다.
// 만약 명시적으로 다른 객체를 반환하면 this, 즉 인스턴스가 반환되지 못하고 명시된 객체가 반환된다.
class Person {
    constructor(name) {
        this.name = name;

        // 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
        return {};
    }
}

// constructor에서 명시적으로 반환한 빈 객체가 반환된다.
const me = new Person('Lee');
console.log(me); // {}

// 명시적으로 원시값을 반환하면 무시되고 this가 반환된다.
class Person {
    constructor(name) {
        this.name = name;

        // 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 this가 반환된다.
        return 100;
    }
}

const me = new Person('Lee');
console.log(me); // Person { name: "Lee" }
// constructor 내부에서 return 문을 반드시 생략해야한다. 명시적인 객체를 반환하는 것은 클래스의 기본 동작을 훼손한다.


// 프로토타입 메서드
// 생성자 함수를 사용해 인스턴스를 생성할 경우, 프로토타입 메서드를 생성하기 위해서는 명시적으로 프로토타입에 메서드를 추가해야한다.
// 생성자 함수
function Person(name) {
    this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee

// 클래스 몸체에서 정의한 메서드는 생성자 함수에 의한 생성방식과는 다르게 prototype 프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 된다.
class Person {
    // 생성자
    constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name;
    }

    // 프로토타입 메서드
    sayHi() {
        console.log(`Hi! My name is ${this.name}`);
    }
}

const me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee

// 생성자 함수 와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 된다.
// me 객체의 프로토타입은 Person.prototype이다.
Object.getPrototypeOf(me) === Person.prototype; // -> true
me instanceof Person; // -> true

// Person.prototype의 프로토타입은 Object.prototype이다.
Object.getPrototypeOf(Person.prototype) === Object.prototype; // -> true
me instanceof Object; // -> true

// me 객체의 constructor는 Person 클래스다.
me.constructor === Person; // -> true

// 클래스 몸체에서 정의한 메서드는 인스턴스의 프로토타입에 존재하는 프로토타입 메서드가 된다. 인스턴스는 프로토타입 메서드를 상속받아 사용할 수 있다.
// 프로토타입 체인은 기존의 모든 객체 생성 방식(객체 리터럴, 생성자 함수, Object.create 메서드 등)뿐만 아니라
// 클래스에 의해 생성된 인스턴스에도 동일하게 적용된다. 생성자 함수의 역할을 클래스가 할 뿐이다.


// 정적 메서드
// 정적static 메서드는 인스턴스를 생성하지 않아도 호출할 수 있는 메서드를 말한다.
// 생성자 함수의 경우 정적 메서드 생성을 위해서는 다음과 같이 명시적으로 생성자 함수에 메서드를 추가해야한다.
function Person(name) {
    this.name = name;
}

// 정적 메서드
Person.sayHi = function () {
    console.log('Hi!');
};

// 정적 메서드 호출
Person.sayHi(); // Hi!

// 클래스에서는 메서드에 static 키워드를 붙이면 정적 메서드(클래스 메서드)가 된다
class Person {
    // 생성자
    constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name;
    }

    // 정적 메서드
    static sayHi() {
        console.log('Hi!');
    }
}
// 정적 메서드는 클래스에 바인딩된 메서드가 된다. 클래스는 함수 객체로 평가되므로 자신의 프로퍼티/메서드 소유가 가능하다.
// 클래스는 정의 시점에 평가되어 함수 객체가 되므로 인스턴스와 달리 별다른 생성과정이 필요없다.
// 정적 메서드는 클래스로 호출한다.
// 정적 메서드는 인스턴스 없이도 호출할 수 있다.
Person.sayHi(); // Hi!

// 정적 메서드는 인스턴스로 호출할 수 없다. 인스턴스의 프로토타입 체인상에 존재하지 않기 때문이다. 따라서 클래스의 메서드를 인스턴스로 상속받을수도 없다.
// 인스턴스 생성
const me = new Person('Lee');
me.sayHi(); // TypeError: me.sayHi is not a function


// 정적 메서드와 프로토타입 메서드의 차이
// 1. 정적 메서드와 프로토타입 메서드는 속해있는 프로토타입 체인이 다르다.
// 2. 정적 메서드는 클래스로 호출하고, 프로토타입 메서드는 인스턴스로 호출한다.
// 3. 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.
class Square {
    // 정적 메서드
    static area(width, height) {
        return width * height;
    }
}

console.log(Square.area(10, 10)); // 100
// 인스턴스 프로퍼티를 참조해야한다면 정적 메서드 대신 프로토타입 메서드를 사용
class Square {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    // 프로토타입 메서드
    area() {
        return this.width * this.height;
    }
}

const square = new Square(10, 10);
console.log(square.area()); // 100

// 프로토타입 메서드와 정적 메서드 내부의 this 바인딩은 가리키는 것이 다르다
// 따라서 메서드 내부에서 인스턴스 프로퍼티를 참조할 필요가 있다면 this를 사용해야 하며, 이러한 경우 프로토타입 메서드로 정의해야 한다.
// 하지만 메서드 내부에서 인스턴스 프로퍼티를 참조해야 할 필요가 없다면 this를 사용하지 않게 된다.
// 메서드 내부에서 this를 사용하지 않더라도 프로토타입 메서드로 정의할 수 있다. 그러나 반드시 인스턴스를 생성해야 하므로
// this를 사용하지 않는 메서드는 정적 메서드로 정의하는 것이 좋다

// 표준 빌트인 객체인 Math, Number, JSON, Object, Reflect 등은 다양한 정적 메서드를 갖고 있고, 전역에서 사용할 수 있는 유틸리티 함수다.
// 표준 빌트인 객체의 정적 메서드
Math.max(1, 2, 3);          // -> 3
Number.isNaN(NaN);          // -> true
JSON.stringify({ a: 1 });   // -> "{"a":1}"
Object.is({}, {});          // -> false
Reflect.has({ a: 1 }, 'a'); // -> true
// 이처럼 클래스 또는 생성자 함수를 하나의 네임스페이스로 사용하여 정적 메서드를 모아 놓으면 이름 충돌 가능성을 줄여주고
// 관련 함수들을 구조화할 수 있는 효과가 있다. 이 같은 이유로 정적 메서드는 어플리케이션 전역에서 사용할 유틸리티 함수를
// 전역 함수로 정의하지 않고 메서드로 구조화할 때 유용하다.


// 클래스에서 정의한 메서드의 특징
// 1. function 키워드를 생략한 메서드 축약 표현을 사용한다.
// 2. 객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마가 필요 없다.
// 3. 암묵적으로 strict mode로 실행된다.
// 4. for...in 문이나 Object.keys 메서드 등으로 열거할 수 없다. 즉, 프로퍼티의 열거 가능 여부를 나타내며, boolean값을 갖는
// 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false다.
// 5. 내부 매서드 [[Construct]]를 갖지 않느 non-constructor다. 따라서 new 연산자와 함께 호출할 수 없다.


// 클래스의 인스턴스 생성 과정
// new 연산자와 함께 클래스를 호출하면 생성자 함수와 마찬가지로 클래스의 내부 메서드 [[Construct]]가 호출된다.
// 클래스는 new 연사자 없이 호출할 수 없다. 다음과 같은 과정을 거쳐 인스턴스가 생성된다.
// 1. 인스턴스 생성과 this 바인딩
// new 연산자와 함께 클래스를 호출하면 constructor의 내부 코드가 실행되기 전에 암묵적으로 빈 객체가 생성된다.
// 이 빈 객체가 완성되지 않은 클래스가 생성한 인스턴스다.
// 이때 클래스가 생성한 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정된다.
// 그리고 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩된다.
// 따라서 constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킨다.

// 2. 인스턴스 초기화
// constructor의 내부 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다. 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를
// 추가하고, constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티 값을 초기화한다. constructor가 생략되었다면 이 과정은 생략된다.

// 3. 인스턴스 반환
// 클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
class Person {
    // 생성자
    constructor(name) {
        // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
        console.log(this); // Person {}
        console.log(Object.getPrototypeOf(this) === Person.prototype); // true

        // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
        this.name = name;

        // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
    }
}