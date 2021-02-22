function Person(name) {
    this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty('name')); // true

// me 객체는 Person.prototype 뿐만 아니라 Object.prototype도 상속받았다는 것을 의미한다.
// me 객체의 프로토타입은 Person.prototype이고 Person.prototype의 프로토타입은 Object.prototype이다.
Object.getPrototypeOf(me) === Person.prototype; // -> true
Object.getPrototypeOf(Person.prototype) === Object.prototype; // -> true

// 자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면
// [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.
// 이를 프로토타입 체인이라 한다. 프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 매커니즘이다.

// hasOwnProperty는 Object.prototype의 메서드다.
// me 객체는 프로토타입 체인을 따라 hasOwnProperty 메서드를 검색하여 사용한다.
me.hasOwnProperty('name'); // -> true

// 모든 객체는 Object.prototype을 상속받으며, Object.prototype을 프로토타입 체인의 종점이라 한다.
// Object.prototype의 프로토타입인 [[Prototype]] 내부 슬롯의 값은 null이다
// 프로토타입 체인의 종점인 Object.prototype 에서도 프로퍼티 검색이 안될 경우 undefined를 반환한다. 에러가 발생하지 않는다.

// 프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘이다.
// 프로퍼티가 아닌 식별자는 스코프 체인에서 검색한다.
// 따라서, 스코프 체인은 식별자 검색을 위한 메커니즘이다.

me.hasOwnProperty('name');
// 위 예제의 경우 먼저 스코프 체인에서 me 식별자를 검색한다.
// me 식별자는 전역에서 선언되었으므로 전역 스코프에서 검색된다.
// 이후 me 객체의 프로토타입 체인에서 hasOwnProperty 메서드를 검색한다.

// 이처럼 스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아니라
// 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용된다.

const Person = (function () {
    // 생성자 함수
    function Person(name) {
        this.name = name;
    }

    // 프로토타입 메서드
    Person.prototype.sayHello = function () {
        console.log(`Hi! My name is ${this.name}`);
    };

    // 생성자 함수를 반환
    return Person;
}());

const me = new Person('Lee');

// 인스턴스 메서드
me.sayHello = function () {
    console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
// 이와 같은 상속 관계에 의해 프로퍼티가 가려지는 현상을 프로퍼티 섀도잉property shadowing 이라 한다
me.sayHello(); // Hey! My name is Lee, 오버라이딩 되었다
// 오버라이딩 : 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재 정의하여 사용하는 방식
// 오버로딩 : 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식.
// 자바스크립트는 오버로딩을 공식적으로 지원하진 않지만 arguments 객체를 사용해 구현은 가능하다.

// 삭제의 경우 하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능하다.
// 즉, 하위 객체를 통해 프로토타입에 get 엑세스는 허용되나 set 엑세스는 허용되지 않는다.
// 프로토타입 프로퍼티를 변경 또는 삭제하려면 프로토타입에 직접 접근해야 한다.
// 프로토타입 메서드 변경
Person.prototype.sayHello = function () {
    console.log(`Hey! My name is ${this.name}`);
};
me.sayHello(); // Hey! My name is Lee

// 프로토타입 메서드 삭제
delete Person.prototype.sayHello;
me.sayHello(); // TypeError: me.sayHello is not a function


// 프로토타입은 임의의 다른 객체로 변경할 수 있다. 이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다.
// 이러한 특징을 활용하여 객체 간의 상속관계를 동적으로 변경할 수 있다.

// 생성자 함수에 의한 프로토타입의 교체
const Person = (function () {
    function Person(name) {
        this.name = name;
    }

    // ① 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
    Person.prototype = {
        sayHello() {
            console.log(`Hi! My name is ${this.name}`);
        }
    };

    return Person;
}());

const me = new Person('Lee');
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true

// 프로퍼티와 생성자 함수 간의 연결을 되살리기 위해서는 constructor 프로퍼티를 추가한다.
const Person = (function () {
    function Person(name) {
        this.name = name;
    }

    // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
    Person.prototype = {
        // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
        constructor: Person,
        sayHello() {
            console.log(`Hi! My name is ${this.name}`);
        }
    };

    return Person;
}());

const me = new Person('Lee');

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false


// 인스턴스에 의한 프로토타입의 교체
// 프로토타입은 __proto__ 접근자 프로퍼티(또는 Object.setPrototypeOf 메서드)를 통해 프로토 타입 교체가 가능하다.
// 생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩 하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체한다
// __proto__ 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것이다.
function Person(name) {
    this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
    sayHello() {
        console.log(`Hi! My name is ${this.name}`);
    }
};

// ① me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true


// 생성자 함수에 의한 프로토타입의 교체화 인스턴스에 의한 프로토타입 교체는 비슷해 보이지만 미묘한 차이가 있다.
// 생성자 함수에 의한 교체는 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다
// 인스턴스에 의한 프로토타입 교체는 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리키지 않는다.
function Person(name) {
    this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
    // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
    constructor: Person,
    sayHello() {
        console.log(`Hi! My name is ${this.name}`);
    }
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
console.log(Person.prototype === Object.getPrototypeOf(me)); // true
// 이와 같이 프로토타입 교체를 통해 객체 간의 상속 관계를 동적으로 변경하는 것은 꽤나 번거롭다.
// 따라서 프로토타입은 직접 교체하지 않는 것이 좋다. 상속관계를 인위적으로 설정하려면 '직접 상속'이 더 편리하고 안전하다.
// 또는 ES6에서 도입된 클래스를 활용하자.
