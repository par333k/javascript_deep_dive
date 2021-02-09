// 함수 선언문
function add(x, y) {
    return x + y;
}

// 함수 호출
// 인수 1과 2는 매개변수 x와 y에 순서대로 할당되고 함수 몸체의 문들이 실행된다.
const result = add(1, 2);

function add(x, y) {
    console.log(x, y); // 2 5
    return x + y;
}

add(2, 5);

// add 함수의 매개변수 x, y는 함수 몸체 내부에서만 참조할 수 있다.
console.log(x, y); // ReferenceError: x is not defined

// 함수는 매개변수의 개수와 인수의 개수가 일치하는지 체크하지 않고, 에러도 발생하지 않는다. 인수가 부족해서 인수가 할당되지 않은 매개변수의 값은 undefined다.
console.log(add(2)); // NaN
// 인수가 매개변수보다 많을 경우 초과된 인수는 무시된다
console.log(add(2, 5, 10)); // 7
// 초과된 인수는 값으로 연산되진 않지만 arguments 객체에 저장된다.
function add(x, y) {
    console.log(arguments);
    // Arguments(3) [2, 5, 10, callee: ƒ, Symbol(Symbol.iterator): ƒ]

    return x + y;
}

add(2, 5, 10);

// 자바스크립트는 동적 타입이므로 인수에 대한 벨리데이션 체크가 필요하다
function add(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        // 매개변수를 통해 전달된 인수의 타입이 부적절한 경우 에러를 발생시킨다.
        throw new TypeError('인수는 모두 숫자 값이어야 합니다.');
    }

    return x + y;
}

console.log(add(2));        // TypeError: 인수는 모두 숫자 값이어야 합니다.
console.log(add('a', 'b')); // TypeError: 인수는 모두 숫자 값이어야 합니다.

// 부적절한 호출을 사전에 방지할 수 없고, 에러는 런타임에 발생하기 때문에 타입스크립트와 같은 슈퍼셋 도입을 통해 컴파일 단계에서 에러를 방지하는 방법도 좋다.

// arguments 객체를 통해 인수 개수를 확인하거나, 단축 평가를 사용해 매개변수에 기본값을 할당하는 방법도 있다.
function add(a, b, c) {
    a = a || 0;
    b = b || 0;
    c = c || 0;
    return a + b + c;
}

console.log(add(1, 2, 3)); // 6
console.log(add(1, 2)); // 3
console.log(add(1)); // 1
console.log(add()); // 0


function add(a = 0, b = 0, c = 0) {
    return a + b + c;
}

console.log(add(1, 2, 3)); // 6
console.log(add(1, 2)); // 3
console.log(add(1)); // 1
console.log(add()); // 0

// 매개변수의 최대 개수는 정해진 것은 없으나, 이상적인 것은 0개이며 실제로는 1개~3개사이가 적절하다.
// 이상적인 함수는 한 가지 일만 해야하며, 가급적 작게 만들어야 한다.
// 매개변수가 많이 필요하면 하나의 매개변수를 선언하고 객체를 인수로 전달하는 것이 유리하다.
// 프론트에서 객체를 인수로 전달한다면 아래와 같다.
$.ajax({
    method: 'POST',
    url: '/user',
    data: { id: 1, name: 'Lee' },
    cache: false
});
// 주의할 점은 함수 외부에서 내부로 전달한 객체를 함수 내부에서 변경하면 함수 외부의 객체가 변경되는 부수효과가 발생한다.

// 함수는 return 키워드와 표현식(반환값)으로 이뤄진 반환문을 사용해 실행 결과를 함수 외부로 반환(return)할 수 있다.
function multiply(x, y) {
    return x * y; // 반환문
    // 반환문 이후에 다른 문이 존재하면 그 문은 실행되지 않고 무시된다.
    console.log('실행되지 않는다.');
}

// 함수 호출은 반환값으로 평가된다.
const result = multiply(3, 5);
console.log(result); // 15

function foo () {
    // 반환문을 생략하면 암묵적으로 undefined가 반환된다.
    // return; 만 쓸 경우에도 undefined가 반환된다.
}

console.log(foo()); // undefined

function multiply(x, y) {
    // return 키워드와 반환값 사이에 줄바꿈이 있으면
    return // 세미콜론 자동 삽입 기능(ASI)에 의해 세미콜론이 추가된다.
    x * y; // 무시된다.
}

console.log(multiply(3, 5)); // undefined

// 반환문은 함수 몸체 내부에서만 사용할 수 있다. 전역에서 반환문을 사용하면 문법 에러가 발생한다.
// node.js는 파일별로 모듈시스템에 의해 독립적인 파일 스코프를 갖는다. 따라서 가장 바깥 영역에서 반환문을 사용해도 에러는 발생하지 않는다.

// 참조에 의한 전달과 외부 상태의 변경
// 매개변수 primitive는 원시값을 전달받고, 매개변수 obj는 객체를 전달받는다.
function changeVal(primitive, obj) {
    primitive += 100;
    obj.name = 'Kim';
}

// 외부 상태
let num = 100;
let person = { name: 'Lee' };

console.log(num); // 100
console.log(person); // {name: "Lee"}

// 원시값은 값 자체가 복사되어 전달되고 객체는 참조값이 복사되어 전달된다.
changeVal(num, person);

// 원시값은 원본이 훼손되지 않는다.
console.log(num); // 100

// 객체는 원본이 훼손된다.
console.log(person); // {name: "Kim"}

// 위처럼 원시 값이 아닌 인수에 대해 함수가 외부 상태를 변경해 버리면 상태 변화 추적이 어렵고 코드의 복잡성을 증가시킨다.
// 객체의 변경을 추적하려면 옵저버패턴(Observer) 등을 통해 객체 참조를 공유하는 모든 이들에게 변경 사실을 통지하고 이에 대처하는 추가 대응이 필요하다.
// 해결법 중 하나는 객체를 불변 객체로 만들어 사용하는 것이다. 객체의 복사본을 생성하는 비용은 들지만, 객체를 마치 원시 값처럼 변경 불가능한 값으로 동작하게 하는 것이다.
// 이를 통해 객체의 상태 변경을 원천봉쇄하고 객체의 상태 변경이 필요한 경우에는 객체의 방어적 복사defensive copy를 통해 원본 객체를 완전히 복제, 즉 깊은 복사depp copy를 통해 새로운 객체를 생성하고 재할당을 통해 교체한다.

// 외부 상태를 변경하지 않고, 외부 상태에 의존하지도 않는 함수를 순수 함수라 한다. 순수 함수를 통해 부수효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이려는 프로그래밍 패러다임을 함수형 프로그래밍이라 한다.

