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