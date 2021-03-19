// Rest 파라미터(나머지 매개변수)는 매개변수 이름 앞에 세개의 점 ... 을 붙여서 정의한 매개변수를 의미한다.
// Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.
function foo(...rest) {
    // 매개변수 rest는 인수들의 목록을 배열로 전달받는 Rest 파라미터다.
    console.log(rest); // [ 1, 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);
// 일반 매개변수와 Rest 파라미터는 함께 사용할 수 있다. 이 때 함수에 전달된 인수들은 매개변수와 Rest 파라미터에 순차적으로 할당된다.
function foo(param, ...rest) {
    console.log(param); // 1
    console.log(rest);  // [ 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);

function bar(param1, param2, ...rest) {
    console.log(param1); // 1
    console.log(param2); // 2
    console.log(rest);   // [ 3, 4, 5 ]
}

bar(1, 2, 3, 4, 5);

// Rest 파라미터는 나머지 인수들로 구성된 배열이 할당되므로, 반드시 마지막 파라미터여야 한다.
// function foo(...rest, param1, param2) { }

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter
//function foo(...rest1, ...rest2) { }

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter

// Rest 파라미터는 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티에 영향을 주지 않는다.
function foo(...rest) {}
console.log(foo.length); // 0

function bar(x, ...rest) {}
console.log(bar.length); // 1

function baz(x, y, ...rest) {}
console.log(baz.length); // 2


// Rest파라미터와 arguments 객체
// ES5에서 함수를 정의할 때 가변 인자 함수는 arguments 객체를 활용하여 인수를 전달받았다.
// arguments 객체는 순회 가능한 유사 배열 객체이며, 함수 내부에서 지역변수처럼 사용할 수 있다.
// 매개변수의 개수를 사전에 알 수 없는 가변 인자 함수
function sum() {
    // 가변 인자 함수는 arguments 객체를 통해 인수를 전달받는다.
    console.log(arguments);
}

sum(1, 2); // {length: 2, '0': 1, '1': 2}

// arguments 객체는 유사 배열 객체라 call이나 apply 메서드를 사용해 arguments 객체를 배열로 변환해야 하는 번거로움이 있었다.
function sum() {
    // 유사 배열 객체인 arguments 객체를 배열로 변환한다.
    var array = Array.prototype.slice.call(arguments);

    return array.reduce(function (pre, cur) {
        return pre + cur;
    }, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// ES6 에서는 rest 파라미터를 사용하여 가변 인자 함수의 인수목록을 배열로 직접 전달 받을 수 있다.
function sum(...args) {
    // Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]가 할당된다.
    return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
// 화살표 함수는 arguments 객체를 갖지 않으므로 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야 한다.


// 매개변수 기본값
// 자바스크립트 엔진은 매개변수의 개수와 인수의 개수를 체크하지 않아서 발생하는 문제가 있다.
function sum(x, y) {
    return x + y;
}

console.log(sum(1)); // NaN
// 이러한 문제를 막기 위해 방어 코드가 필요하다.
function sum(x, y) {
    // 인수가 전달되지 않아 매개변수의 값이 undefined인 경우 기본값을 할당한다.
    x = x || 0;
    y = y || 0;

    return x + y;
}

console.log(sum(1, 2)); // 3
console.log(sum(1));    // 1

// ES6에서 도입된 매개변수 기본값을 사용하면 함수 내에서 수행하던 인수 체크 및 초기화를 간소화할 수 있다.
function sum(x = 0, y = 0) {
    return x + y;
}

console.log(sum(1, 2)); // 3
console.log(sum(1));    // 1

// 매개변수 기본값은 매개변수에 인수를 전달하지 않은 경우와 undefined를 전달한 경우에만 유효하다.
function logName(name = 'Lee') {
    console.log(name);
}

logName();          // Lee
logName(undefined); // Lee
logName(null);      // null

// 앞서 살펴본 Rest 파라미터에는 기본값을 지정할 수 없다.
//function foo(...rest = []) {
//    console.log(rest);
//}
// SyntaxError: Rest parameter may not have a default initializer

// 매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티와 arguments 객체에 아무런 영향을 주지 않는다.
function sum(x, y = 0) {
    console.log(arguments);
}

console.log(sum.length); // 1

sum(1);    // Arguments { '0': 1 }
sum(1, 2); // Arguments { '0': 1, '1': 2 }