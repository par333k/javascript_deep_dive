// this 바인딩(this에 바인딩될 값)은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.
// 렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.
// 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다.
// 하지만 this 바인딩은 함수 호출 시점에 결정된다.

// 함수를 호출하는 방식
// 1. 일반 함수 호출
// 2. 메서드 호출
// 3. 생성자 함수 호출
// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
// this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.
const foo = function () {
    console.dir(this);
};

// 동일한 함수도 다양한 방식으로 호출할 수 있다.

// 1. 일반 함수 호출
// foo 함수를 일반적인 방식으로 호출
// foo 함수 내부의 this는 전역 객체 window를 가리킨다.
foo(); // window

// 2. 메서드 호출
// foo 함수를 프로퍼티 값으로 할당하여 호출
// foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킨다.
const obj = { foo };
obj.foo(); // obj

// 3. 생성자 함수 호출
// foo 함수를 new 연산자와 함께 생성자 함수로 호출
// foo 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가리킨다.
new foo(); // foo {}

// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
// foo 함수 내부의 this는 인수에 의해 결정된다.
const bar = { name: 'bar' };

foo.call(bar);   // bar
foo.apply(bar);  // bar
foo.bind(bar)(); // bar

// 일반함수로 호출하면 기본적으로 중첩함수와 콜백함수를 포함하여 모든 함수 내부의 this에는 전역 객체가 바인딩 된다
function foo() {
    console.log("foo's this: ", this);  // window, strict 모드에선 undefined
    function bar() {
        console.log("bar's this: ", this); // window, strict 모드에선 undefined
    }
    bar();
}
foo();

// 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
// var 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티다.
var value = 1;
// const 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티가 아니다.
// const value = 1;

const obj = {
    value: 100,
    foo() {
        console.log("foo's this: ", this);  // {value: 100, foo: ƒ}
        console.log("foo's this.value: ", this.value); // 100

        // 메서드 내에서 정의한 중첩 함수
        function bar() {
            console.log("bar's this: ", this); // window
            console.log("bar's this.value: ", this.value); // 1
        }

        // 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
        bar();
    }
};

obj.foo();

// 콜백 함수가 일반 함수로 호출된다면 콜백 함수 내부의 this에도 전역 객체가 바인딩된다.
var value = 1;

const obj = {
    value: 100,
    foo() {
        console.log("foo's this: ", this); // {value: 100, foo: ƒ}
        // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
        setTimeout(function () {
            console.log("callback's this: ", this); // window
            console.log("callback's this.value: ", this.value); // 1
        }, 100);
    }
};

// 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법
var value = 1;

const obj = {
    value: 100,
    foo() {
        // this 바인딩(obj)을 변수 that에 할당한다.
        const that = this;

        // 콜백 함수 내부에서 this 대신 that을 참조한다.
        setTimeout(function () {
            console.log(that.value); // 100
        }, 100);
    }
};

obj.foo();

// 명시적으로 this를 바인딩하는 호출 apply, call, bind 메서드 활용
var value = 1;

const obj = {
    value: 100,
    foo() {
        // 콜백 함수에 명시적으로 this를 바인딩한다.
        setTimeout(function () {
            console.log(this.value); // 100
        }.bind(this), 100);
    }
};

obj.foo();

// 화살표 함수를 사용하여 this 바인딩 일치
var value = 1;

const obj = {
    value: 100,
    foo() {
        // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
        setTimeout(() => console.log(this.value), 100); // 100
    }
};

obj.foo();

// 메서드 내부의 this에는 메서드를 호출한 객체가 바인딩 된다. 소유한 객체가 아니라 메서드를 호출한 객체라는 점을 유의해야 한다.
const person = {
    name: 'Lee',
    getName() {
        // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
        return this.name;
    }
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // Lee

const anotherPerson = {
    name: 'Kim'
};
// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
console.log(getName()); // ''
// 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
// 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
// Node.js 환경에서 this.name은 undefined다.
// 즉, this에 바인딩 될 객체는 호출 시점에 결정된다.

function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
};

const me = new Person('Lee');

// getName 메서드를 호출한 객체는 me다.
console.log(me.getName()); // ① Lee

Person.prototype.name = 'Kim';

// getName 메서드를 호출한 객체는 Person.prototype이다.
console.log(Person.prototype.getName()); // ② Kim

// 생성자 함수 내부의 this에는 생성자 함수가 미래에 생성할 인스턴스가 바인딩된다.
// 생성자 함수
function Circle(radius) {
    // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20

// 생성자 함수는 이름 그대로 객체(인스턴스)를 생성하는 함수로, new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다
// new 연산자와 함께 호출하지 않으면 생성자 함수가 아니라 일반 함수로 동작한다.
// new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다. 즉, 일반적인 함수의 호출이다.
const circle3 = Circle(15);

// 일반 함수로 호출된 Circle에는 반환문이 없으므로 암묵적으로 undefined를 반환한다.
console.log(circle3); // undefined

// 일반 함수로 호출된 Circle 내부의 this는 전역 객체를 가리킨다.
console.log(radius); // 15

// apply, call, bind 메서드는 Function.prototype의 메서드다. 이들 메서드는 모든 함수가 상속받아 사용 가능하다.
// apply, call 사용법
/**
 * 주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
 * @param thisArg - this로 사용할 객체
 * @param argsArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
 * @returns 호출된 함수의 반환값
 * Function.prototype.apply(this.Arg[, argsArray])
 */

/**
 * 주어진 this 반인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출한다.
 * @param thisArg - this로 사용할 객체
 * @param arg1, arg2 ... 함수에게 전달할 인수 리스트
 * @returns 호출된 함수의 반환값
 * Function.prototype.call (thisArg[, arg1[, arg2[, ...]]])
 */


function getThisBinding() {
    return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); // window

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
console.log(getThisBinding.apply(thisArg)); // {a: 1}
console.log(getThisBinding.call(thisArg)); // {a: 1}

// apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다.
// apply와 call 메서드는 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩한다.

function getThisBinding() {
    console.log(arguments);
    return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.

// apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.
console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}

// call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.
console.log(getThisBinding.call(thisArg, 1, 2, 3));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}
// apply와 call 메서드의 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우다.
function convertArgsToArray() {
    console.log(arguments);

    // arguments 객체를 배열로 변환
    // Array.prototype.slice를 인수없이 호출하면 배열의 복사본을 생성한다.
    const arr = Array.prototype.slice.call(arguments);
    // const arr = Array.prototype.slice.apply(arguments);
    console.log(arr);

    return arr;
}

convertArgsToArray(1, 2, 3); // [1, 2, 3]

// Function.prototype.bind 메서드는 apply와 call 메서드와 달리 함수를 호출하지 않고 this로 사용할 객체만 전달한다.
function getThisBinding() {
    return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메서드는 함수에 this로 사용할 객체를 전달한다.
// bind 메서드는 함수를 호출하지는 않는다.
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}

// bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.
const person = {
    name: 'Lee',
    foo(callback) {
        // ① person.foo의 콜백 함수가 호출되기 이전 시점에서의 this는 foo 메서드를 호출한 객체인 person을 가리킴
        setTimeout(callback, 100);
    }
};

person.foo(function () {
    console.log(`Hi! my name is ${this.name}.`); // ② Hi! my name is . 전역객체 window를 가리키는 시점
    // 일반 함수로 호출된 콜백 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
    // 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
    // Node.js 환경에서 this.name은 undefined다.
});

// 위 예제에서 person.foo의 콜백함수는 외부 함수 person.foo를 돕는 헬퍼 함수(보조함수)역할을 하기 때문에
// 외부 함수 person.foo 내부의 this와 콜백 함수 내부의 this가 상이하면 문맥상 문제가 발생한다.
// 따라서 콜백 함수 내부의 this를 외부 함수 내부의 this와 일치시켜야 한다. 이 때 bind를 사용한다.
const person = {
    name: 'Lee',
    foo(callback) {
        // bind 메서드로 callback 함수 내부의 this 바인딩을 전달
        setTimeout(callback.bind(this), 100);
    }
};

person.foo(function () {
    console.log(`Hi! my name is ${this.name}.`); // Hi! my name is Lee.
});

/**
 *  this 바인딩의 동적 결정 정리
 *  호출 방식  : this 바인딩
 *  일반함수호출 : 전역객체
 *  메서드 호출 : 메서드를 호출한 객체
 *  생성자 함수 호출 : 생성자 함수가 (미래에) 생성할 인스턴스
 *  Function.prototype.apply/call/bind 메서드에 의한 간접 호출 : 해당 메서드에 첫 번째 인수로 전달한 객체
 *
 */