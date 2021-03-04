// 캡슐화는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것이다
// 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉이라 한다.
// 정보 은닉을 통해 정보를 보호하고 객체 간의 결합도를 낮출 수 있다.
// 자바스크립트는 접근 제한자를 제공하지 않아서 기본적으로 모든 객체의 프로퍼티와 메서드는 public하다
function Person(name, age) {
    this.name = name; // public
    let _age = age;   // private

    // 인스턴스 메서드
    this.sayHi = function () {
        console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
    };
}

const me = new Person('Lee', 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined

const you = new Person('Kim', 30);
you.sayHi(); // Hi! My name is Kim. I am 30.
console.log(you.name); // Kim
console.log(you._age); // undefined
// 생성자 함수의 지역변수인 _age는 외부에서 참조하거나 변경할 수 없어 private 접근제한과 같은 효과를 얻는다

// 위 예제의 sayHi 메서드는 인스턴스 메서드이므로 Person 객체가 생성될 때마다 중복 생성된다.
// 해당 메서드의 중복 생성 방지를 위해 프로토타입 메서드로 변경한다.
function Person(name, age) {
    this.name = name; // public
    let _age = age;   // private
}

// 프로토타입 메서드
Person.prototype.sayHi = function () {
    // Person 생성자 함수의 지역 변수 _age를 참조할 수 없다
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
};

// 지역변수인 _age 참조를 위해 즉시 실행함수를 활용하여 하나의 함수에 모아본다
const Person = (function () {
    let _age = 0; // private

    // 생성자 함수
    function Person(name, age) {
        this.name = name; // public
        _age = age;
    }

    // 프로토타입 메서드
    Person.prototype.sayHi = function () {
        console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
    };

    // 생성자 함수를 반환
    return Person;
}());

const me = new Person('Lee', 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined

const you = new Person('Kim', 30);
you.sayHi(); // Hi! My name is Kim. I am 30.
console.log(you.name); // Kim
console.log(you._age); // undefined
// Person.prototype.sayHi 메서드는 즉시 실행 함수가 종료된 이후 호출된다.
// Person 생성자 함수와 sayHi 메서드는 이미 종료되어 소멸한 즉시 실행함수의 지역변수 _age를 참조할 수 있는 클로저다.
// 위 코드의 경우 Person 생성자 함수가 여러개의 인스턴스를 생성할 경우 다음과 같이 _age변수의 상태가 유지되지 않는다.

const me = new Person('Lee', 20);
me.sayHi(); // Hi! My name is Lee. I am 20.

const you = new Person('Kim', 30);
you.sayHi(); // Hi! My name is Kim. I am 30.

// _age 변수 값이 변경된다!
me.sayHi(); // Hi! My name is Lee. I am 30.
// 이는 Person.prototype.sayHi 메서드가 단 한번 실행되는 클로저이기 때문에 발생하는 현상이다.
// 따라서 프로토타입 메서드를 쓸 경우 정보 은닉을 완전하게 지원할 수 없고,
// 생성자 함수를 통해 객체를 중복 생성하는 낭비를 감당해야 한다.
// Node.js 12버전이나 Chrome 74 이상에서 활용할 수 있는 private 필드 정의 제안이 따로 있다.


// 클로저 사용에서의 잦은 실수
var funcs = [];

for (var i = 0; i < 3; i++) {
    funcs[i] = function () { return i; }; // ①
}

for (var j = 0; j < funcs.length; j++) {
    console.log(funcs[j]()); // ②
}
// 함수가 배열의 요소로 1번에서 추가된다.  2번에서 순차적으로 함수를 호출한다.
// 위 상황에서 for 문의 변수 선언문 var i 변수는 블록 레벨 스코프가 아닌 함수 레벨 스코프를 갖는다
// 전역 변수 i에는 0,1,2가 순차적으로 할당된다. 따라서 funcs 배열의 요소로 추가한 함수를 호출하면
// 기대하는 0,1,2가 아닌 3이 출력된다.
// 클로저를 사용해 아래처럼 개선할 수 있다.
var funcs = [];

for (var i = 0; i < 3; i++){
    funcs[i] = (function (id) { // ①
        return function () {
            return id;
        };
    }(i));
}

for (var j = 0; j < funcs.length; j++) {
    console.log(funcs[j]()); // 0,1,2
}

// 위 처럼 클로저를 통해 복잡하게 해결한 문제도 let을 쓰면 깔끔하게 해결된다.
const funcs = [];

for (let i = 0; i < 3; i++) {
    funcs[i] = function () { return i; };
}

for (let i = 0; i < funcs.length; i++) {
    console.log(funcs[i]()); // 0 1 2
}
// let을 쓰게되면 블록스코프이기 때문에 블록이 반복 실행될 떄마다 새로운 렉시컬 환경이 생성된다.
// 이 때 함수의 상위 스코프는 for문의 코드 블록이 반복 실행될때마다 식별자의 값을 유지해야한다
// 이를 위해 for문이 반복될 때마다 독립적인 렉시컬환경을 생성하여 식별자의 값을 유지한다.
// ES6의 let과 const를 사용한 반복문은 코드 블록을 반복 실행될 떄마다 당시의 상태를 스냅샷 찍듯이 저장하는것
// 단 이는 반복문의 코드 블록 내부에서 함수를 정의할 때 의미가 있다.
// 코드 블록 내부에 함수 정의가 없는 반복문이 생성하는 새로운 렉시컬 환경은 반복 직후 아무도 참조하지 않아 GC의 대상이 된다.
// 다른 기법으로는 함수형 프로그래밍 기법인 고차 함수를 사용할 수 있다.

// 요소가 3개인 배열을 생성하고 배열의 인덱스를 반환하는 함수를 요소로 추가한다.
// 배열의 요소로 추가된 함수들은 모두 클로저다.
const funcs = Array.from(new Array(3), (_, i) => () => i); // (3) [ƒ, ƒ, ƒ]

// 배열의 요소로 추가된 함수 들을 순차적으로 호출한다.
funcs.forEach(f => console.log(f())); // 0 1 2