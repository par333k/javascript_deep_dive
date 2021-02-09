// 즉시 실행 함수
// IIFE, Immediately Invoked Function Expression
// 단 한번만 호출되며 다시 호출할 수 없다.
// 익명 즉시 실행 함수
(function () {
    let a = 3;
    let b = 5;
    return a * b;
}());

// 기명 즉시 실행 함수
(function foo() {
    var a = 3;
    var b = 5;
    return a * b;
}());

foo(); // ReferenceError: foo is not defined

// 즉시 실행 함수는 반드시 그룹 연산자 ( ... ) 로 감싸야한다.
//function () { // SyntaxError: Function statements require a function name
              // ...
//}();
// 암묵적으로 수행하는 세미콜론 자동 삽입 기능에 의해 함수 선언문이 끝나는 위치, 함수 코드 블록의 닫는 중괄호 뒤에 ";"이 암묵적으로 추가된다.
//function foo() {
    // ...
//}(); // SyntaxError: Unexpected token ')'

// 그룹연산자의 피연산자는 값으로 평가되므로 기명 또는 무명 함수를 그룹 연산자로 감싸면 함수 리터럴로 평가되어 함수 객체가 된다.
console.log(typeof (function f(){})); // function
console.log(typeof (function (){}));  // function
// 즉, 그룹 연산자로 함수를 묶은 이유는 먼저 함수 리터럴을 평가해서 함수 객체를 생성하기 위해서다.
// 즉시 실행 함수도 일반 함수처럼 값을 반환할 수 있다.
let res = (function () {
    let a = 3;
    let b = 5;
    return a * b;
}());

console.log(res); // 15

// 즉시 실행 함수에도 일반 함수처럼 인수를 전달할 수 있다.
res = (function (a, b) {
    return a * b;
}(3, 5));

console.log(res); // 15

// 재귀 함수 - 함수가 자기 자신을 호출하는 것, 반복적인 처리를 위해 사용한다.
function countdown(n) {
    for (let i = n; i >= 0; i--) console.log(i);
}

countdown(10);
// 위와 같은 재귀함수
function countdown(n) {
    if (n < 0) return;
    console.log(n);
    countdown(n - 1); // 재귀 호출
}

countdown(10);

// 재귀를 활용한 팩토리얼
// 팩토리얼(계승)은 1부터 자신까지의 모든 양의 정수의 곱이다.
// n! = 1 * 2 * ... * (n-1) * n
function factorial(n) {
    // 탈출 조건: n이 1 이하일 때 재귀 호출을 멈춘다.
    if (n <= 1) return 1;
    // 재귀 호출
    return n * factorial(n - 1);

}

console.log(factorial(0)); // 0! = 1
console.log(factorial(1)); // 1! = 1
console.log(factorial(2)); // 2! = 2 * 1 = 2
console.log(factorial(3)); // 3! = 3 * 2 * 1 = 6
console.log(factorial(4)); // 4! = 4 * 3 * 1 * 1 = 24
console.log(factorial(5)); // 5! = 5 * 4 * 3 * 2 * 1 = 120

// 함수 표현식
const factorial = function foo(n) {
    // 탈출 조건: n이 1 이하일 때 재귀 호출을 멈춘다.
    if (n <= 1) return 1;
    // 함수를 가리키는 식별자로 자기 자신을 재귀 호출
    return n * factorial(n - 1);

    // 함수 이름으로 자기 자신을 재귀 호출할 수도 있다.
    // console.log(factorial === foo); // true
    // return n * foo(n - 1);
};

console.log(factorial(5)); // 5! = 5 * 4 * 3 * 2 * 1 = 120

// 재귀함수는 자신을 무한 호출하므로 반드시 탈출 조건이 있어야 한다.
// 대부분의 재귀함수는 for문이나 while문으로 구현 가능하다

function factorial(n) {
    if (n <= 1) return 1;

    let res = n;
    while (--n) res *= n;
    return res;
}

console.log(factorial(0)); // 0! = 1
console.log(factorial(1)); // 1! = 1
console.log(factorial(2)); // 2! = 2 * 1 = 2
console.log(factorial(3)); // 3! = 3 * 2 * 1 = 6
console.log(factorial(4)); // 4! = 4 * 3 * 1 * 1 = 24
console.log(factorial(5)); // 5! = 5 * 4 * 3 * 2 * 1 = 120
// 재귀함수는 무한 반복 위험이 있으므로 반복문을 사용하는 것 보다 직관적으로 이해하기 쉬울때만 한정적으로 사용하는 것이 좋다.

// 중첩 함수 - 함수 내부에 정의된 함수를 중첩함수nested function 또는 내부 함수inner function라 한다.
// 중첩 함수를 포함하는 함수는 외부 함수outer function라 부른다. 중첩 함수는 외부 함수 내부에서만 호출할 수 있다.
// 일반적으로 중첩 함수는 자신을 포함하는 외부 함수를 돕는 헬퍼 함수helper function의 역할을 한다.
// 중첩함수는 스코프, 클로저와 깊은 관련이 있다.
function outer() {
    let x = 1;

    // 중첩 함수
    function inner() {
        let y = 2;
        // 외부 함수의 변수를 참조할 수 있다.
        console.log(x + y); // 3
    }
    inner();
}
outer();

// 콜백 함수
// n만큼 어떤 일을 반복한다
function repeat(n) {
    // i를 출력한다.
    for (let i = 0; i < n; i++) console.log(i);
}

repeat(5); // 0 1 2 3 4

// n만큼 어떤 일을 반복한다
function repeat2(n) {
    for (let i = 0; i < n; i++) {
        // i가 홀수일 때만 출력한다.
        if (i % 2) console.log(i);
    }
}

repeat2(5); // 1 3

// 외부에서 전달받은 f를 n만큼 반복 호출한다
function repeat(n, f) {
    for (var i = 0; i < n; i++) {
        f(i); // i를 전달하면서 f를 호출
    }
}

const logAll = function (i) {
    console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logAll); // 0 1 2 3 4

const logOdds = function (i) {
    if (i % 2) console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logOdds); // 1 3

// 함수의 변하지 않는 공통 로직은 미리 정의해 두고, 경우에 따라 변경되는 로직은 추상화해서 함수 외부에서 내부로 전달.
// 외부에서 전달받은 f를 n만큼 반복 호출한다
function repeat(n, f) {
    for (var i = 0; i < n; i++) {
        f(i); // i를 전달하면서 f를 호출
    }
}

const logAll = function (i) {
    console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logAll); // 0 1 2 3 4

const logOdds = function (i) {
    if (i % 2) console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logOdds); // 1 3

// 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 콜백 함수callback function 라고 하며,
// 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수를 고차 함수Higher-Order Function, HOF 라고 한다.
// 콜백 함수는 함수 외부에서 고차 함수 내부로 주입하기 때문에 자유롭게 교체할 수 있다는 장점이 있다.
// 즉, 고차함수는 콜백 함수를 자신의 일부분으로 합성한다.
// 고차 함수는 매개변수를 통해 전달받은 콜백 함수의 호출시점을 결정해서 호출한다.
// 다시말해, 콜백 함수는 고차 함수에 의해 호출되며(모두 그런것은 아니다) 이 때 고차함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다.

// 익명 함수 리터럴을 콜백 함수로 고차 함수에 전달한다.
// 익명 함수 리터럴은 repeat 함수를 호출할 때마다 평가되어 함수 객체를 생성한다.
repeat(5, function (i) {
    if (i % 2) console.log(i);
}); // 1 3

// 콜백 함수로서 전달된 함수 리터럴은 고차 함수가 호출될 때마다 평가되어 함수 객체를 생성한다
// 콜백 함수를 다른 곳에서도 호출할 필요가 있거나, 콜백 함수를 전달받는 함수가 자주 호출된다면
// 함수 외부에서 콜백 함수를 정의한 후 함수 참조를 고차 함수에 전달하는 편이 효율적이다.

// logOdds 함수는 단 한 번만 생성된다.
const logOdds = function (i) {
    if (i % 2) console.log(i);
};

// 고차 함수에 함수 참조를 전달한다.
repeat(5, logOdds); // 1 3

// 위 예제의 logOdds 함수는 단 한 번만 생성된다. 하지만 콜백 함수를 익명 함수 리터럴로 정의하면서 곧바로 고차 함수에 전달하면 고차 함수가 호출될 때마다 콜백 함수가 생성된다.
// 콜백 함수를 사용한 이벤트 처리
// myButton 버튼을 클릭하면 콜백 함수를 실행한다.
document.getElementById('myButton').addEventListener('click', function () {
    console.log('button clicked!');
});

// 콜백 함수를 사용한 비동기 처리
// 1초 후에 메시지를 출력한다.
setTimeout(function () {
    console.log('1초 경과');
}, 1000);

// 콜백 함수는 비동기 처리뿐 아니라 배열 고차 함수에서도 사용된다.
// 콜백 함수를 사용하는 고차 함수 map
let res = [1, 2, 3].map(function (item) {
    return item * 2;
});

console.log(res); // [2, 4, 6]

// 콜백 함수를 사용하는 고차 함수 filter
res = [1, 2, 3].filter(function (item) {
    return item % 2;
});

console.log(res); // [1, 3]

// 콜백 함수를 사용하는 고차 함수 reduce
res = [1, 2, 3].reduce(function (acc, cur) {
    return acc + cur;
}, 0);

console.log(res); // 6

// 순수 함수와 비순수 함수
// 부수 효과가 없는 함수 - 순수 함수pure function
// 부수 효과가 있는 함수 - 비순수 함수impure function
// 순수 함수는 어떤 외부 상태에도 의존하지 않으며 외부 상태를 변경하지도 않는 함수다.
let count = 0; // 현재 카운트를 나타내는 상태

// 순수 함수 increase는 동일한 인수가 전달되면 언제나 동일한 값을 반환한다.
function increase(n) {
    return ++n;
}

// 순수 함수가 반환한 결과값을 변수에 재할당해서 상태를 변경
count = increase(count);
console.log(count); // 1

count = increase(count);
console.log(count); // 2

// 비순수 함수는 외부 상태를 변경하는 부수효과가 있다.
// 즉, 외부 상태에 의존하거나 외부 상태를 변경하는 함수다.
let count = 0; // 현재 카운트를 나타내는 상태: increase 함수에 의해 변화한다.

// 비순수 함수
function increase() {
    return ++count; // 외부 상태에 의존하며 외부 상태를 변경한다.
}

// 비순수 함수는 외부 상태(count)를 변경하므로 상태 변화를 추적하기 어려워진다.
increase();
console.log(count); // 1

increase();
console.log(count); // 2

// 함수형 프로그래밍은 부수 효과를 최대한 억제하는 것.
// 순수 함수와 보조 함수를 통해 외부 상태를 변경하는 부수효과를 최소화 하는 것이 좋다.
