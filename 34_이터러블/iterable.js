// 이터러블과 유사 배열 객체
// 유사 배열 객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말한다.
// 인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티 키로 가지므로 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있다.
// 유사 배열 객체
const arrayLike = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};

// 유사 배열 객체는 length 프로퍼티를 갖기 때문에 for 문으로 순회할 수 있다.
for (let i = 0; i < arrayLike.length; i++) {
    // 유사 배열 객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있다.
    console.log(arrayLike[i]); // 1 2 3
}

// 유사 배열 객체는 이터러블이 아니기 때문에 Symbol.iterator 메서드가 없어 for ... of 문으로 순회할 수 없다.
for (const item of arrayLike) {
    console.log(item); // 1 2 3
}
// -> TypeError: arrayLike is not iterable

// 단! arguments, NodeList, HTMLCollection은 유사 배열 객체이면서 이터러블이다.
// 정확히는 ES6에서 이터러블이 도입되면서 유사 배열 객체인 세 객체에 Symbol.iterator 메서드를 구현하여 이터러블이 되었다.
// 이터러블이 된 이후에도 length 프로퍼티를 가지며 인덱스로 접근할 수 있는 것에는 변함이 없다.
// 배열도 마찬가지로 ES6에서 이터러블이 도입되면서 Symbol.iterator 메서드를 구현하여 이터러블이 되었다.
// ES6에서 도입된 Array.from 메서드를 사용하여 유사배열객체 또는 이터러블을 인수로 전달받아 배열로 변환하여 반환할 수 있다.
// 유사 배열 객체
const arrayLike = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};

// Array.from은 유사 배열 객체 또는 이터러블을 배열로 변환한다
const arr = Array.from(arrayLike);
console.log(arr); // [1, 2, 3]


// 이터레이션 프로토콜의 필요성

// 이터레이션 프로토콜은 자료구조와 메서드를 잇는 하나의 인터페이스 역할을 한다.
// ES5 까지는 순회 가능한 자료구조들이 각자 나름의 구조를 가지고 다양한 방법을 통해 순회가 가능했다
// 이러한 방식은 다양한 자료구조가 각자의 순회 방식을 가질 경우 각 순회 문법들은 다양한 자료구조의 순회방식을 모두 지원해야한다.
// 이는 효율적이지 않다. 다양한 자료구조가 이터레이션 프로토콜을 준수하도록 만든다면, 각 메서드들은 이터레이션 프로토콜만 지원하도록 구현하면된다.
// 즉, 이터러블을 지원하는 메서드는 내부에서 Symbol.iterator 메서드를 호출해 이터레이터를 생성하고 이터레이터의 next 메서드를 호출하여
// 이터러블을 순회하며 이터레이터 리절트 객체를 반환한다. 그리고 이터레이터 리절트 객체의 value/done 프로퍼티 값을 취득한다.
// 이처럼 다양한 자료구조가 하나의 순회방식을 갖도록 규정하여 메서드가 효율적으로 자료구조를 활용할 수 있도록 하는 것이 이터러블 프로토콜이다.


// 사용자 정의 이터러블
// 사용자 정의 이터러블 구현
// 피보나치 수열을 구현한 사용자 정의 이터러블
const fibonacci = {
    // Symbol.iterator 메서드를 구현하여 이터러블 프로토콜을 준수한다.
    [Symbol.iterator]() {
        let [pre, cur] = [0, 1]; // "36.1. 배열 디스트럭처링 할당" 참고
        const max = 10; // 수열의 최대값

        // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환해야 하고
        // next 메서드는 이터레이터 리절트 객체를 반환해야 한다.
        return {
            next() {
                [pre, cur] = [cur, pre + cur]; // "36.1. 배열 디스트럭처링 할당" 참고
                // 이터레이터 리절트 객체를 반환한다.
                return { value: cur, done: cur >= max };
            }
        };
    }
};

// 이터러블인 fibonacci 객체를 순회할 때마다 next 메서드가 호출된다.
for (const num of fibonacci) {
    console.log(num); // 1 2 3 5 8
}

// 이터러블은 for ... of 문 뿐만 아니라 스프레드 문법, 배열 디스트럭처링 할당에도 사용할 수 있다.
// 이터러블은 스프레드 문법의 대상이 될 수 있다.
const arr = [...fibonacci];
console.log(arr); // [ 1, 2, 3, 5, 8 ]

// 이터러블은 배열 디스트럭처링 할당의 대상이 될 수 있다.
const [first, second, ...rest] = fibonacci;
console.log(first, second, rest); // 1 2 [ 3, 5, 8 ]

// 이터러블을 생성하는 함수
// 위 피보나치 이터러블 예제에 대해, 이터러블 내부에 수열의 최대값 max를 외부에서 전달할 수 있도록 수정하는 예제.
// 피보나치 수열을 구현한 사용자 정의 이터러블을 반환하는 함수. 수열의 최대값을 인수로 전달받는다.
const fibonacciFunc = function (max) {
    let [pre, cur] = [0, 1];

    // Symbol.iterator 메서드를 구현한 이터러블을 반환한다.
    return {
        [Symbol.iterator]() {
            return {
                next() {
                    [pre, cur] = [cur, pre + cur];
                    return { value: cur, done: cur >= max };
                }
            };
        }
    };
};

// 이터러블을 반환하는 함수에 수열의 최대값을 인수로 전달하면서 호출한다.
for (const num of fibonacciFunc(10)) {
    console.log(num); // 1 2 3 5 8
}

// 앞에서 살펴본 피보나치 함수는 이터러블을 반환한다.
// 만약 이터레이터를 생성하려면 이터러블의 Symbol.iterator 메서드를 호출해야 한다.
// fibonacciFunc 함수는 이터러블을 반환한다.
const iterable = fibonacciFunc(5);
// 이터러블의 Symbol.iterator 메서드는 이터레이터를 반환한다.
const iterator = iterable[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 5, done: true }

// 이터러블이면서 이터레이터 객체를 생성하면 Symbol.iterator 메서드를 호출하지 않아도 된다.
// 다음 객체는 Symbol.iterator 메서드와 next 메서드를 소유한 이터러블이면서 이터레이터다.
// Symbol.iterator 메서드는 this를 반환하므로 next 메서드를 갖는 이터레이터를 반환한다.

// 이터러블이면서 이터레이터인 객체. 이터레이터를 반환하는 Symbol.iterator 메서드와
// 이터레이션 리절트 객체를 반환하는 next 메서드를 소유한다.
/*{
    [Symbol.iterator]() { return this; },
    next() {
    return { value: any, done: boolean };
}
}*/

// 앞에서 본 피보나치 함수를 이터러블이면서 이터레이터인 객체를 생성하여 반환하는 함수로 변경해보자.
// 이터러블이면서 이터레이터인 객체를 반환하는 함수
const fibonacciFunc = function (max) {
    let [pre, cur] = [0, 1];

    // Symbol.iterator 메서드와 next 메서드를 소유한 이터러블이면서 이터레이터인 객체를 반환
    return {
        [Symbol.iterator]() { return this; },
        // next 메서드는 이터레이터 리절트 객체를 반환
        next() {
            [pre, cur] = [cur, pre + cur];
            return { value: cur, done: cur >= max };
        }
    };
};

// iter는 이터러블이면서 이터레이터다.
let iter = fibonacciFunc(10);

// iter는 이터러블이므로 for...of 문으로 순회할 수 있다.
for (const num of iter) {
    console.log(num); // 1 2 3 5 8
}

// iter는 이터러블이면서 이터레이터다
iter = fibonacciFunc(10);

// iter는 이터레이터이므로 이터레이션 리절트 객체를 반환하는 next 메서드를 소유한다.
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 2, done: false }
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: 5, done: false }
console.log(iter.next()); // { value: 8, done: false }
console.log(iter.next()); // { value: 13, done: true }


// 무한 이터러블과 지연 평가
// 무한 이터러블을 생성하는 함수를 무한 수열을 통해 구현해보자.
// 무한 이터러블을 생성하는 함수
const fibonacciFunc = function () {
    let [pre, cur] = [0, 1];

    return {
        [Symbol.iterator]() { return this; },
        next() {
            [pre, cur] = [cur, pre + cur];
            // 무한을 구현해야 하므로 done 프로퍼티를 생략한다.
            return { value: cur };
        }
    };
};

// fibonacciFunc 함수는 무한 이터러블을 생성한다.
for (const num of fibonacciFunc()) {
    if (num > 10000) break;
    console.log(num); // 1 2 3 5 8...4181 6765
}

// 배열 디스트럭처링 할당을 통해 무한 이터러블에서 3개의 요소만 취득한다.
const [f1, f2, f3] = fibonacciFunc();
console.log(f1, f2, f3); // 1 2 3


// 이터러블은 데이터 공급자의 역할을 한다. 배열이나 문자열 등은 모든 데이터를 메모리에 미리 확보한 다음 데이터를 공급한다.
// 하지만 위 예제의 이터러블은 지연 평가(lazy evaluation)를 통해 데이터를 생성한다. 지연 평가는 데이터가 필요한 시점 이전까지는
// 미리 데이터를 생성하지 않다가 데이터가 필요한 시점이 되면 그때야 비로소 데이터를 생성하는 기법이다.
// 즉, 평가 결과가 필요할 때까지 평가를 늦추는 기법이 지연 평가다.
// 위 예제의 fibonacciFunc 함수는 무한 이터러블을 생성한다. 하지만 fibonacciFunc 함수가 생성한 무한 이터러블은 데이터를 공급하는
// 메커니즘을 구현한 것으로 데이터 소비자인 for ... of 문이나 배열 디스트럭처링 할당 등이 실행되기 이전까지 데이터를 생성하지는 않는다.
// for ... of 문의 경우 이터러블을 순회할 떄 내부에서 이터레이터의 next 메서드를 호출하는데 바로 이때 데이터가 생성된다.
// next 메서드가 호출되기 이전까지는 데이터를 생성하지 않는다. 즉, 데이터가 필요할 때까지 데이터의 생성을 지연하다가 데이터가 필요한 순간
// 데이터를 생성한다
// 이처럼 지연 평가를 사용하면 불필요한 데이터를 미리 생성하지 않고 필요한 데이터를 필요한 순간에 생성하므로 빠른 실행 속도를 기대할 수 있고
// 불필요한 메모리를 소비하지 않으며 무한도 표현할 수 있다는 장점이 있다.

