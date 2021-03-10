// js는 es5에서 클래스 없이 생성자 함수와 프로토타입을 이용해 객체지향 언어의 상속을 구현했다.
// ES5 생성자 함수
var Person = (function () {
    // 생성자 함수
    function Person(name) {
        this.name = name;
    }

    // 프로토타입 메서드
    Person.prototype.sayHi = function () {
        console.log('Hi! My name is ' + this.name);
    };

    // 생성자 함수 반환
    return Person;
}());

// 인스턴스 생성
var me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee

// ES6에서 도입된 클래스는 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있는 함수이자 문법적 설탕이다.
// 따라서 C#이나 자바의 클래스와 완벽하게 같은 것은 아니다. 기본적으로 클래스는 프로토타입 기반으로 생성자 함수와 '유사'하게 동작한다.

// 클래스와 생성자 함수의 차이는 다음과 같다.
// 1. 클래스를 new 연산자 없이 호출하면 에러가 발생한다. 하지만 생성자 함수를 new 연산자 없이 호출하면 일반 함수로서 호출된다.
// 2. 클래스는 상속을 지원하는 extends와 super 키워드를 제공한다. 하지만 생성자 함수는 extends와 super 키워드를 지원하지 않는다.
// 3. 클래스는 호이스팅이 발생하지 않는 것처럼 동작한다. 하지만 함수 선언문으로 정의된 생성자 함수는 함수 호이스팅이, 함수 표현식으로
// 정의한 생성자 함수는 변수 호이스팅이 발생한다.
// 4. 클래스 내의 모든 코드에는 암묵적으로 strict mode가 지정되어 실행되며 strict mode를 해제할 수 없다. 하지만 생성자 함수는
// 암묵적으로 strict mode가 지정되지 않는다.
// 5. 클래스의 constructor, 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false다. 다시 말해,
// 열거되지 않는다.

// 위와 같은 차이나 클래스의 extends, super와 같은 키워드 때문에 상속의 구현에 훨씬 유용하며, 새로운 객체 생성 매커니즘으로 활용하기 좋다.


// 클래스는 class 키워드를 사용하여 정의한다
// 클래스 선언문
class Person {}

// 일반적이지는 않지만 표현식으로도 정의가 가능하고, 익명도 가능하다.
// 익명 클래스 표현식
const Person = class {};

// 기명 클래스 표현식
const Person = class MyClass {};

// 클래스를 표현식으로 정의할 수 있다는 것은 값으로 사용이 가능한 일급 객체임을 의미한다.
// 즉, 일급 객체로서의 다음과 같은 특징을 갖는다.
// 1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
// 2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
// 3. 함수의 매개변수에게 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.

// 클래스 몸체에는 0개 이상의 메서드만 정의할 수 있다. 클래스 몸체에서 정의할 수 있는 메서드는 constructor(생성자), 프로토타입 메서드, 정적 메서드 세 가지다.
// 클래스 선언문
class Person {
    // 생성자
    constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name; // name 프로퍼티는 public하다.
    }

    // 프로토타입 메서드
    sayHi() {
        console.log(`Hi! My name is ${this.name}`);
    }

    // 정적 메서드
    static sayHello() {
        console.log('Hello!');
    }
}

// 인스턴스 생성
const me = new Person('Lee');

// 인스턴스의 프로퍼티 참조
console.log(me.name); // Lee
// 프로토타입 메서드 호출
me.sayHi(); // Hi! My name is Lee
// 정적 메서드 호출
Person.sayHello(); // Hello!

// 클래스 호이스팅 - 클래스는 함수로 평가된다
console.log(typeof Person); // function
// 클래스 선언문으로 정의한 클래스는 함수 선언문과 같이 소스코드 평가 과정, 즉 런타임 이전에 먼저 평가되어 함수 객체를 생성한다.
// 이 때 클래스가 평가되어 생성된 함수 객체는 행성자 함수로서 호출할 수 있는 함수, 즉 constructor다.
// 이 때 프로토타입도 더불어 생성된다. 프로토타입과 생성자 함수는 단독으로 존재할 수 없기 때문이다.
// 단! 클래스는 클래스 정의 이전에 참조할 수 없다.

console.log(Person);
// ReferenceError: Cannot access 'Person' before initialization

// 클래스 선언문
class Person {}

// 호이스팅이 발생하지 않는 것처럼 보이지만 실제론 발생한다.
const Person = '';

{
    // 호이스팅이 발생하지 않는다면 ''이 출력되어야 한다.
    console.log(Person);
    // ReferenceError: Cannot access 'Person' before initialization

    // 클래스 선언문
    class Person {}
}
// 클래스의 호이스팅은 let, const 키워드로 선언한 변수처럼 호이스팅된다. 즉, TDZ에 빠진다.

// 클래스는 생성자 함수이며, new 연산자와 함께 호출되어 인스턴스를 생성한다.
class Person {}

// 인스턴스 생성
const me = new Person();
console.log(me); // Person {}
// 클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 new 연산자와 함께 호출해야 한다.

class Person {}

// 클래스를 new 연산자 없이 호출하면 타입 에러가 발생한다.
const me = Person();
// TypeError: Class constructor Foo cannot be invoked without 'new'

// 표현식으로 정의된 클래스의 경우 클래스를 가리키는 식별자를 사용해 인스턴스를 생성하지 않고, 기명 클래스 표현식의 클래스 이름을 사용해
// 인스턴스를 생성하면 에러가 발생한다. 기명 함수 표현식과 마찬가지로 클래스 표현식에서 사용한 클래스 이름은 외부 코드에서 접근이 불가하기 때문이다.
const Person = class MyClass {};

// 함수 표현식과 마찬가지로 클래스를 가리키는 식별자로 인스턴스를 생성해야 한다.
const me = new Person();

// 클래스 이름 MyClass는 함수와 동일하게 클래스 몸체 내부에서만 유효한 식별자다.
console.log(MyClass); // ReferenceError: MyClass is not defined

const you = new MyClass(); // ReferenceError: MyClass is not defined
