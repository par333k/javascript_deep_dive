// 제너레이터
// ES6에서 도입된 것으로, 코드 블록의 실행을 일시 중지 했다가 필요한 시점에 재개할 수 있는 특수한 함수다.
// 일반 함수와의 차이는 아래와 같다.
// 1. 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
// - 일반 함수를 호출하면 제어권이 함수에게 넘어가고 함수 코드를 일괄 실행한다. 즉, 함수 호출자는 함수를 호출한 뒤로는 실행을 제어할 수 없다.
// 제너레이터 함수는 함수 실행을 함수 호출자가 제어할 수 있다. 다시 말해, 함수 호출자가 실행을 일시 중지시키거나 재개할 수 있다.
// 함수의 제어권을 함수가 독점하는 것이 아니라, 함수 호출자에게 양도yield 할 수 있다는 것을 의미한다.
// 2. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
// - 일반 함수를 호출하면 매개변수를 통해 함수 외부에서 값을 주입받고 함수 코드를 일괄 실행하여 결과값을 함수 외부로 반환한다.
// 즉, 함수가 실행되고 있는 동안 함수 외부에서 함수 내부로 값을 전달하여 함수의 상태를 변경할 수 없다.
// 제너레이터 함수는 함수 호출자와 양방향으로 함수의 상태를 주고받을 수 있다.
// 다시 말해, 제너레이터 함수는 함수 호출자에게 상태를 전달할 수 있고 함수 호출자로부터 상태를 전달받을 수 도 있다.
// 3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
// - 일반 함수를 호출하면 함수 코드를 일괄 실행하고 값을 반환한다.
// 제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 이터러블이면서 동시에 이터레이터인 제너레이터 객체를 반환한다.

// 제너레이터 함수는 function* 키워드로 선언한다. 그리고 하나 이상의 yield 표현식을 포함한다.
// 제너레이터 함수 선언문
function* genDecFunc() {
    yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
    yield 1;
};

// 제너레이터 메서드
const obj = {
    * genObjMethod() {
        yield 1;
    }
};

// 제너레이터 클래스 메서드
class MyClass {
    * genClsMethod() {
        yield 1;
    }
}

// asterisk (*) 의 위치는 function 키워드와 함수 이름 사이라면 어디든지 상관없다.
// 다음 예제의 제너레이터 함수는 모두 유효하다.
// 하지만 일관성을 유지하기 위해 function 키워드 바로 뒤에 붙이는 것을 권장한다.
function* genFunc() { yield 1; }

function * genFunc() { yield 1; }

function *genFunc() { yield 1; }

function*genFunc() { yield 1; }

// 제너레이터 함수는 화살표 함수로 정의할 수 없다.
/*
const genArrowFunc = * () => {
    yield 1;
}; // SyntaxError: Unexpected token '*'
*/

// 제너레이터 함수는 new 연산자와 함께 생성자 함수로 호출할 수 없다.
function* genFunc() {
    yield 1;
}

new genFunc(); // TypeError: genFunc is not a constructor


// 제너레이터 객체
// 제너레이터 함수를 호출하면 일반 함수처럼 함수 코드 블록을 실행하는 것이 아니라, 제너레이터 객체를 생성해 반환한다.
// 제너레이터 함수가 반환한 제너레이터 객체는 이터러블이면서 동시에 이터레이터다.

// 다시말해, 제너레이터 객체는 Symbol.iterator 메서드를 상속받는 이터러블이며
// value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 next 메서드를 소유하는 이터레이터다.
// 제너레이터 함수
function* genFunc() {
    yield 1;
    yield 2;
    yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
const generator = genFunc();

// 제너레이터 객체는 이터러블이면서 동시에 이터레이터다.
// 이터러블은 Symbol.iterator 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체다.
console.log(Symbol.iterator in generator); // true
// 이터레이터는 next 메서드를 갖는다.
console.log('next' in generator); // true

// 제너레이터 객체는 next 메서드를 갖는 이터레이터이지만 이터레이터에는 없는 return, throw 메서드를 갖는다.
// 제너레이터 객체의 세 개의 메서드를 호출하면 다음과 같이 동작한다.
// 1. next 메서드를 호출하면 제너레이터 함수의 yield 표현식까지 코드 블록을 실행하고 yield된 값을 value 프로퍼티 값으로,
// false 를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.
// 2. return 메서드를 호출하면 인수로 전달받은 값을 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환.
function* genFunc() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } catch (e) {
        console.error(e);
    }
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.return('End!')); // {value: "End!", done: true}

// 3. throw 메서드를 호출하면 인수로 전달받은 에러를 발생시키고 undefined를 value 프로퍼티 값으로, true를 done 프로퍼티 값으로
// 갖는 이터레이터 리절트 객체를 반환한다.
function* genFunc() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } catch (e) {
        console.error(e);
    }
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.throw('Error!')); // {value: undefined, done: true}


// 제너레이터의 일시 중지와 재개
// 제너레이터는 yield 키워드와 next 메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재개할 수 있다.
// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다. 함수의 코드블록을 실행하는 것이 아니다.
// 제너레이터 객체의 next 메서드를 호출해야 제너레이터 함수의 코드 블록을 실행한다.
// 단, yield 표현식까지만 실행한다. yield 키워드는 제너레이터 함수의 실행을 일시 중지시키거나
// yield 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환한다.
// 제너레이터 함수
function* genFunc() {
    yield 1;
    yield 2;
    yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
// 이터러블이면서 동시에 이터레이터인 제너레이터 객체는 next 메서드를 갖는다.
const generator = genFunc();

// 처음 next 메서드를 호출하면 첫 번째 yield 표현식까지 실행되고 일시 중지된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 첫 번째 yield 표현식에서 yield된 값 1이 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 1, done: false}

// 다시 next 메서드를 호출하면 두 번째 yield 표현식까지 실행되고 일시 중지된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 두 번째 yield 표현식에서 yield된 값 2가 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 2, done: false}

// 다시 next 메서드를 호출하면 세 번째 yield 표현식까지 실행되고 일시 중지된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 세 번째 yield 표현식에서 yield된 값 3이 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 3, done: false}

// 다시 next 메서드를 호출하면 남은 yield 표현식이 없으므로 제너레이터 함수의 마지막까지 실행한다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 제너레이터 함수의 반환값 undefined가 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었음을 나타내는 true가 할당된다.
console.log(generator.next()); // {value: undefined, done: true}

// 제너레이터 객체의 next 메서드를 호출하면 yield 표현식까지 실행되고 일시 중지suspend 된다.
// 이때 함수의 제어권이 호출자로 양도yield 된다. 필요한 시점에 호출자가 next메서드를 호출하면 중지된 코드부터 실행이 재개된다.
// 이때 제네레이터 객체의 next 메서드는 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다.
// next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 yield 표현식에서 yield 된 값(yield 키워드 뒤의 값)이 할당되고
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 boolean 값이 할당된다.

// next 메서드를 반복 호출하여 yield 표현식까지 실행과 일시 중지를 반복하다 제너레이터 함수가 끝까지 실행되면
// next 메서드가 반환하는 이터레이터 리절트 객체의 value 프로퍼티에는 제너레이터 함수의 반환값이 할당되고
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었음을 나타내는 true가 할당된다.
/**
 * generator.next() -> yield -> generator.next() -> yield -> ... -> generator.next() -> return
 */

// 이터레이터의 next 메서드와 달리 제너레이터 객체의 next 메서드에는 인수를 전달할 수 있다.
// 제너레이터 객체의 next 메서드에 전달한 인수는 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당된다.
// yield 표현식을 할당받는 변수에 yield 표현식의 평가 결과가 할당되지 않는 것을 주의해야한다.
function* genFunc() {
    // 처음 next 메서드를 호출하면 첫 번째 yield 표현식까지 실행되고 일시 중지된다.
    // 이때 yield된 값 1은 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당된다.
    // x 변수에는 아직 아무것도 할당되지 않았다. x 변수의 값은 next 메서드가 두 번째 호출될 때 결정된다.
    const x = yield 1;

    // 두 번째 next 메서드를 호출할 때 전달한 인수 10은 첫 번째 yield 표현식을 할당받는 x 변수에 할당된다.
    // 즉, const x = yield 1;은 두 번째 next 메서드를 호출했을 때 완료된다.
    // 두 번째 next 메서드를 호출하면 두 번째 yield 표현식까지 실행되고 일시 중지된다.
    // 이때 yield된 값 x + 10은 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당된다.
    const y = yield (x + 10);

    // 세 번째 next 메서드를 호출할 때 전달한 인수 20은 두 번째 yield 표현식을 할당받는 y 변수에 할당된다.
    // 즉, const y = yield (x + 10);는 세 번째 next 메서드를 호출했을 때 완료된다.
    // 세 번째 next 메서드를 호출하면 함수 끝까지 실행된다.
    // 이때 제너레이터 함수의 반환값 x + y는 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당된다.
    // 일반적으로 제너레이터의 반환값은 의미가 없다.
    // 따라서 제너레이터에서는 값을 반환할 필요가 없고 return은 종료의 의미로만 사용해야 한다.
    return x + y;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
// 이터러블이며 동시에 이터레이터인 제너레이터 객체는 next 메서드를 갖는다.
const generator = genFunc(0);

// 처음 호출하는 next 메서드에는 인수를 전달하지 않는다.
// 만약 처음 호출하는 next 메서드에 인수를 전달하면 무시된다.
// next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 첫 번째 yield된 값 1이 할당된다.
let res = generator.next();
console.log(res); // {value: 1, done: false}

// next 메서드에 인수로 전달한 10은 genFunc 함수의 x 변수에 할당된다.
// next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 두 번째 yield된 값 20이 할당된다.
res = generator.next(10);
console.log(res); // {value: 20, done: false}

// next 메서드에 인수로 전달한 20은 genFunc 함수의 y 변수에 할당된다.
// next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 제너레이터 함수의 반환값 30이 할당된다.
res = generator.next(20);
console.log(res); // {value: 30, done: true}

// 제너레이터의 활용
// 이터러블의 구현
// 제너레이터 함수를 사용하면 이터레이션 프로토콜을 준수해 이터러블을 생성하는 방식보다 간단히 이터러블을 구현할 수 있다.
// 이터레이션 프로토콜을 준수하여 무한 피보나치 수열을 생성하는 함수.
// 무한 이터러블을 생성하는 함수
const infiniteFibonacci = (function () {
    let [pre, cur] = [0, 1];

    return {
        [Symbol.iterator]() { return this; },
        next() {
            [pre, cur] = [cur, pre + cur];
            // 무한 이터러블이므로 done 프로퍼티를 생략한다.
            return { value: cur };
        }
    };
}());

// infiniteFibonacci는 무한 이터러블이다.
for (const num of infiniteFibonacci) {
    if (num > 10000) break;
    console.log(num); // 1 2 3 5 8...2584 4181 6765
}

// 제너레이터를 사용한 무한 피보나치 수열 생성
// 무한 이터러블을 생성하는 제너레이터 함수
const infiniteFibonacci = (function* () {
    let [pre, cur] = [0, 1];

    while (true) {
        [pre, cur] = [cur, pre + cur];
        yield cur;
    }
}());

// infiniteFibonacci는 무한 이터러블이다.
for (const num of infiniteFibonacci) {
    if (num > 10000) break;
    console.log(num); // 1 2 3 5 8...2584 4181 6765
}

// 비동기 처리
// 제너레이터 함수는 next 메서드와 yield 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있다.
// 이러한 특성을 활용하면 프로미스를 사용한 비동기 처리를 동기 처리처럼 구현할 수 있다.
// 다시 말해, 프로미스의 후속 처리 메서드 then/catch/finally 없이 비동기 처리 결과를 반환하도록 구현할 수 있다.
// node-fetch는 node.js 환경에서 window.fetch 함수를 사용하기 위한 패키지다.

// 브라우저 환경에서 이 예제를 실행한다면 아래 코드는 필요 없다.
// https://github.com/node-fetch/node-fetch
const fetch = require('node-fetch');

// 제너레이터 실행기
const async = generatorFunc => {
    const generator = generatorFunc(); // ②

    const onResolved = arg => {
        const result = generator.next(arg); // ⑤

        return result.done
            ? result.value // ⑨
            : result.value.then(res => onResolved(res)); // ⑦
    };

    return onResolved; // ③
};

(async(function* fetchTodo() { // ①
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    const response = yield fetch(url); // ⑥
    const todo = yield response.json(); // ⑧
    console.log(todo);
    // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
})()); // ④

// 예제의 동작 순서
// 1. async 함수가 호출(1)되면 인수로 전달받은 제너레이터 함수 fetchTodo를 호출하여 제너레이터 객체를 생성(2)하고
// onResolved 함수를 반환(3)한다. onResolved 함수는 상위 스코프의 generator 변수를 기억하는 클로저다. async 함수가
// 반환한 onResolved 함수를 즉시 호출(4)하여 (2)에서 생성한 제너레이터 객체의 next 메서드를 처음 호출(5)한다.
// 2. next 메서드가 처음 호출(5)되면 제너레이터 함수 fetchTodo의 첫 번째 yield 문(6)까지 실행된다. 이 때 next 메서드가
// 반환한 이터레이터 리절트 객체의 done 프로퍼티 값이 false, 즉 아직 제너레이터 함수가 끝까지 실행되지 않았다면 이터레이터
// 리절트 객체의 value 프로퍼티 값, 즉 첫 번째 yield 된  fetch함수가 반환한 프로미스가 resolve한 Response 객체를
// onResolved 함수에 인수로 전달하면서 재귀 호출(7)한다.
// 3. onResolved 함수에 인수로 전달된 Response 객체를 next 메서드에 인수로 전달하면서 next 메서드를 두 번째로 호출(5)한다.
// 이때 next 메서드에 인수로 전달한 Response 객체는 제너레이터 함수 fetchTodo의 response 변수(6)에 할당되고 제너레이터 함수
// fetchTodo의 두 번째 yield문(8)까지 실행된다.
// 4. next 메서드가 반환한 이터레이터 리절트 객체의 done 프로퍼티 값이 false, 즉 아직 제너레이터 함수 fetchTodo가 끝까지
// 실행되지 않았다면 이터레이터 리절트 객체의 value 프로퍼티 값, 즉 두 번째 yield 된 response.json 메서드가 반환한 프로미스가
// resolve 한 todo객체를 onResolved 함수에 인수로 전달하면서 재귀 호출(7) 한다.
// 5. onResolved 함수에 인수로 전달된 todo객체를 next 메서드에 인수로 전달하면서 next 메서드를 세 번째로 호출(5)한다.
// 이 때 next 메서드에 인수로 전달한 todo객체는 제너레이터 함수 fetchTodo의 todo변수(8)에 할당되고, 제너레이터 함수 fetchTodo가 끝까지 실행된다.
// 6. next 메서드가 반환한 이터레이터 리절트 객체의 done 프로퍼티 값이 true, 즉 제너레이터 함수 fetchTodo가 끝까지 실행되었다면
// 이터레이터 리절트 객체의 value 프로퍼티 값, 즉 제너레이터 함수 fetchTodo의 반환값인 undefined를 그대로 반환(9)하고 처리를 종료한다.

// 위 예제의 제너레이터 함수를 실행하는 제너레이터 실행기인 async 함수는 이해를 돕기위해 간략화한 예제이다.
// async/await 를 사용하면 위 함수와 같은 제너레이터 실행기를 사용할 필요가 없다
// 혹시 제너레이터 실행기가 필요하다면 직접 구현하는 것보다 co 라이브러리를 사용하자.
const fetch = require('node-fetch');
// https://github.com/tj/co
const co = require('co');

co(function* fetchTodo() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    const response = yield fetch(url);
    const todo = yield response.json();
    console.log(todo);
    // { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
});



