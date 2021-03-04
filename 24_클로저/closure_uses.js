// 클로저의 활용
// 클로저는 상태state 를 안전하게 변경하고 유지하기 위해 사용한다.
// 다시 말해, 상태를 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하기 위해 사용한다.

// 아래 예제의 호출된 횟수(num 변수)를 안전하게 변경/유지해보자
// 카운트 상태 변수
let num = 0;

// 카운트 상태 변경 함수
const increase = function () {
    // 카운트 상태를 1만큼 증가 시킨다.
    return ++num;
};

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
// 위험한 코드다. 두 가지 조건을 지키지 않으면 변경 가능성이 있다
// 1. 카운트 상태는 increase 함수가 호출되기 전까지 변경되지 않고 유지되어야 한다.
// 2. 이를 위해 카운트 상태는 increase 함수만이 변경할 수 있어야 한다.
// num 변수에 대한 접근 제한이 필요하다
// increase 함수의 지역변수로 바꾸어보자
// 카운트 상태 변경 함수
const increase = function () {
    // 카운트 상태 변수
    let num = 0;

    // 카운트 상태를 1만큼 증가 시킨다.
    return ++num;
};

// 이전 상태를 유지하지 못한다.
console.log(increase()); // 1
console.log(increase()); // 1
console.log(increase()); // 1
// 호출할 때마다 변수가 초기화 되므로 상태 유지가 되지 않는다
// 상태 유지를 위해 클로저를 사용해보자

// 카운트 상태 변경 함수
const increase = (function () {
    // 카운트 상태 변수
    let num = 0;

    // 클로저
    return function () {
        // 카운트 상태를 1만큼 증가 시킨다.
        return ++num;
    };
}());

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
// 즉시 실행함수의 호출을 통해 반환한 함수가 increase 변수에 할당된다.
// 즉시 실행 함수는 호출된 이후 소멸되지만 반환한 클로저는 increase 변수에 할당되어 호출된다
// 따라서 즉시 실행 함수가 반환한 클로저는 카운트 상태를 유지하기위한 자유 변수 num을 언제 어디서 호출하든지 참조/변경이 가능하다
// 즉시 실행 함수는 한 번만 실행되므로 increase 가 호출될 때마다 num 변수가 재차 초기화 될 일은 없다.
// 또한 num 변수는 외부에서 직접 접근할 수 없는 은닉된 private 변수이므로 의도되지 않는 변경을 걱정할 필요가 없다
// 이처럼 클로저는 상태가 의도치 않게 변경되지 않도록 안전하게 은닉하고, 특정 함수에게만 상태 변경을 허용하여 상태를 안정하게 변경하고 유지시킨다

// 카운트 상태 감소까지 적용
const counter = (function () {
    // 카운트 상태 변수
    let num = 0;

    // 클로저인 메서드를 갖는 객체를 반환한다.
    // 객체 리터럴은 스코프를 만들지 않는다. 객체 리터럴의 중괄호는 코드 블럭이 아니다.
    // 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
    return {
        // num: 0, // 프로퍼티는 public하므로 은닉되지 않는다.
        increase() {
            return ++num;
        },
        decrease() {
            return num > 0 ? --num : 0;
        }
    };
}());

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
// 증가, 감소 메서드의 상위 스코프는 두 메서드가 평가되는 시점에 실행중인 컨텍스트인 즉시실행함수 실행 컨텍스트의 렉시컬 환경이다
// 따라서 언제 어디서 호출되든지 즉시 실행 함수의 스코프의 식별자 참조가 가능하다
// 위 예제를 생성자 함수로 표현하면 다음과 같다.
const Counter = (function () {
    // ① 카운트 상태 변수
    let num = 0;

    function Counter() {
        // this.num = 0; // ② 프로퍼티는 public하므로 은닉되지 않는다.
    }

    Counter.prototype.increase = function () {
        return ++num;
    };

    Counter.prototype.decrease = function () {
        return num > 0 ? --num : 0;
    };

    return Counter;
}());

const counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
// 카운트 상태 변수인 num 은 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티가 아니라 즉시 실행 함수 내에서 선언된 변수다
// num이 생성자 함수가 생성할 인스턴스의 프로퍼티라면 public 접근이 된다.
// 그러나 즉시실행함수 내에서 선언된 num 변수는 인스턴스를 통해 접근할 수 없으며, 즉시실행함수 외부에서도 접근할 수 없는 은닉된 변수다.
// increase, decrease 메서드는 평가될 때 즉시 실행함수 실행 컨텍스트의 렉시컬 환경을 기억한다.
// 따라서 프로토타입을 통해 상속되는 메서드라 할 지라도 즉시실행함수의 자유변수 num을 참조할 수 있다. 즉, num은 increase와 decrease만 변경 가능하다.

// 불변성을 지향하는 함수형 프로그래밍에서는 부수효과 억제를 위해 아래처럼 클로저를 활용한다.

// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
function makeCounter(predicate) {
    // 카운트 상태를 유지하기 위한 자유 변수
    let counter = 0;

    // 클로저를 반환
    return function () {
        // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
        counter = predicate(counter);
        return counter;
    };
}

// 보조 함수
function increase(n) {
    return ++n;
}

// 보조 함수
function decrease(n) {
    return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다
const increaser = makeCounter(increase); // ①
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decrease); // ②
console.log(decreaser()); // -1
console.log(decreaser()); // -2

// makeCounter 함수를 호출해 함수를 반환할 때, 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다.
// 이는 함수를 호출하면 그때마다 새로운 makeCounter 함수 실행 컨텍스트의 렉시컬 환경이 생성되기 때문이다.
// 전역 변수 increaser와 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에
// 카운트를 유지하기 위한 자유 변수 counter를 공유하지 않아 카운터의 증감이 연동되지 않는다.
// 렉시컬 환경을 공유하는 클로저를 만들어야 카운터의 증감을 연동할 수 있다. 이를 위해서는 makeCounter 함수를 두 번 호출하면 안된다.
// 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
const counter = (function () {
    // 카운트 상태를 유지하기 위한 자유 변수
    let counter = 0;

    // 함수를 인수로 전달받는 클로저를 반환
    return function (predicate) {
        // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
        counter = predicate(counter);
        return counter;
    };
}());

// 보조 함수
function increase(n) {
    return ++n;
}

// 보조 함수
function decrease(n) {
    return --n;
}

// 보조 함수를 전달하여 호출
console.log(counter(increase)); // 1
console.log(counter(increase)); // 2

// 자유 변수를 공유한다.
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0
// 즉시 실행함수는 한 번만 런타임에서 실행되고 사라진다는 특성을 이용한다. 렉시컬 환경과 식별자를 각각 저장해 놓기 때문에 접근과 변경이 가능하다.