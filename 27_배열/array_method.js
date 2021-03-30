// 배열 메서드
// Array 생성자 함수는 정적 메서드를 제공하며, 배열 객체의 프로토타입인 Array.prototype은 프로토타입 메서드를 제공한다.
// 배열 메서드는 결과물을 반환하는 패턴이 두 가지이다.
// 원본 배열 (배열 메서드를 호출한 배열)을 직접 변경하는 메서드와 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드가 있다.
const arr = [1];

// push 메서드는 원본 배열(arr)을 직접 변경한다.
arr.push(2);
console.log(arr); // [1, 2]

// concat 메서드는 원본 배열(arr)을 직접 변경하지 않고 새로운 배열을 생성하여 반환한다.
const result = arr.concat(3);
console.log(arr);    // [1, 2]
console.log(result); // [1, 2, 3]
// ES5 이후 도입된 배열 메서드는 대부분 원본 배열을 직접 변경하지 않지만 초창기 배열 메서드는 원본 배열을 직접 변경하는 경우가 많다.
// 가급적 원본 배열을 변경하지 않는 메서드를 사용 하는 편이 좋다.


// 1. Array.isArray
// 전달된 인수가 배열이면 true, 배열이 아니면 false를 반환한다
// true
Array.isArray([]);
Array.isArray([1, 2]);
Array.isArray(new Array());

// false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(1);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({ 0: 1, length: 1 })

// 2. Array.prototype.indexOf
// 원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환한다
// 원본 배열에 인수로 전달한 요소와 중복되는 요소가 여러 개 있다면 첫 번째로 점색된 요소의 인덱스를 반환한다.
// 원본 배열에 인수로 전달한 요소가 존재하지 않으면 -1을 반환한다.
const arr = [1, 2, 2, 3];

// 배열 arr에서 요소 2를 검색하여 첫 번째로 검색된 요소의 인덱스를 반환한다.
arr.indexOf(2);    // -> 1
// 배열 arr에 요소 4가 없으므로 -1을 반환한다.
arr.indexOf(4);    // -> -1
// 두 번째 인수는 검색을 시작할 인덱스다. 두 번째 인수를 생략하면 처음부터 검색한다.
arr.indexOf(2, 2); // -> 2

//  indexOf 메서드는 배열에 특정 요소가 존재하는지 확인할 때 유용하다.
const foods = ['apple', 'banana'];

// foods 배열에 'orange' 요소가 존재하는지 확인한다.
if (foods.indexOf('orange') === -1) {
    // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
    foods.push('orange');
}

console.log(foods); // ["apple", "banana", "orange"]

// indexOf 메서드 대신 ES7에서 도입된 Array.prototype.includes 메서드를 사용하면 가독성이 더 좋다.
const foods = ['apple', 'banana'];

// foods 배열에 'orange' 요소가 존재하는지 확인한다.
if (!foods.includes('orange')) {
    // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
    foods.push('orange');
}

console.log(foods); // ["apple", "banana", "orange"]

// 3. Array.prototype.push
// push 메서드는 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다.
// push 메서드는 원본 배열을 직접 변경한다.
const arr = [1, 2];

// 인수로 전달받은 모든 값을 원본 배열 arr의 마지막 요소로 추가하고 변경된 length 값을 반환한다.
let result = arr.push(3, 4);
console.log(result); // 4

// push 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 2, 3, 4]

// 마지막 요소로 추가할 요소가 하나뿐이라면 push 메서드를 사용하지 않고 length 프로퍼티를 사용하여 배열의 마지막에 요소를 추가하는게 더 빠르다
const arr = [1, 2];

// arr.push(3)과 동일한 처리를 한다. 이 방법이 push 메서드보다 빠르다.
arr[arr.length] = 3;
console.log(arr); // [1, 2, 3]

// push 메서드는 원본 배열을 직접 변경하는 부수 효과가 있다. 따라서 push 메서드보다는 ES6의 스프레드 문법을 사용하는 편이 좋다.
// 스프레드 문법을 사용하면 함수 호출 없이 표현식으로 마지막에 요소를 추가할 수 있으며 부수 효과도 없다.
const arr = [1, 2];

// ES6 스프레드 문법
const newArr = [...arr, 3];
console.log(newArr); // [1, 2, 3]

// 4. Array.prototype.pop
// pop 메서드는 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.
// 원본 배열이 빈 배열이면 undefined를 반환하고, pop 메서드는 원본 배열을 직접 변경한다.
const arr = [1, 2];

// 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.
let result = arr.pop();
console.log(result); // 2

// pop 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1]

// pop과 push 메서드를 사용하면 스택을 쉽게 구현할 수 있다.
// 스택의 예제는 아래와 같다.
const Stack = (function () {
    function Stack(array = []) {
        if (!Array.isArray(array)) {
            // "47. 에러 처리" 참고
            throw new TypeError(`${array} is not an array.`);
        }
        this.array = array;
    }

    Stack.prototype = {
        // "19.10.1. 생성자 함수에 의한 프로토타입의 교체" 참고
        constructor: Stack,
        // 스택의 가장 마지막에 데이터를 밀어 넣는다.
        push(value) {
            return this.array.push(value);
        },
        // 스택의 가장 마지막 데이터, 즉 가장 나중에 밀어 넣은 최신 데이터를 꺼낸다.
        pop() {
            return this.array.pop();
        },
        // 스택의 복사본 배열을 반환한다.
        entries() {
            return [...this.array];
        }
    };

    return Stack;
}());

const stack = new Stack([1, 2]);
console.log(stack.entries()); // [1, 2]

stack.push(3);
console.log(stack.entries()); // [1, 2, 3]

stack.pop();
console.log(stack.entries()); // [1, 2]

// 클래스로 스택을 구현하면 다음과 같다.
class Stack {
    #array; // private class member

    constructor(array = []) {
        if (!Array.isArray(array)) {
            throw new TypeError(`${array} is not an array.`);
        }
        this.#array = array;
    }

    // 스택의 가장 마지막에 데이터를 밀어 넣는다.
    push(value) {
        return this.#array.push(value);
    }

    // 스택의 가장 마지막 데이터, 즉 가장 나중에 밀어 넣은 최신 데이터를 꺼낸다.
    pop() {
        return this.#array.pop();
    }

    // 스택의 복사본 배열을 반환한다.
    entries() {
        return [...this.#array];
    }
}

const stack = new Stack([1, 2]);
console.log(stack.entries()); // [1, 2]

stack.push(3);
console.log(stack.entries()); // [1, 2, 3]

stack.pop();
console.log(stack.entries()); // [1, 2]

// 5. Array.prototype.unshift
// unshift 메서드는 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다.
// unshift 메서드는 원본 배열을 직접 변경한다.
const arr = [1, 2];

// 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 값을 반환한다.
let result = arr.unshift(3, 4);
console.log(result); // 4

// unshift 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [3, 4, 1, 2]
// unshift 역시 원본 배열을 직접 변경한다. 따라서 ES6의 스프레드 문법을 사용하는 편이 좋다.
const arr = [1, 2];

// ES6 스프레드 문법
const newArr = [3, ...arr];
console.log(newArr); // [3, 1, 2]

// 6. Array.prototype.shift
// shift 메서드는 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다.
// 원본 배열이 빈 배열이면 undefined를 반환한다. shift 메서드는 원본 배열을 직접 변경한다.
const arr = [1, 2];

// 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다.
let result = arr.shift();
console.log(result); // 1

// shift 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [2]

// shift 메서드와 push 메서드를 사용하면 큐를 쉽게 규현할 수 있다.
// 생성자 함수로 만든 큐는 다음과 같다.
const Queue = (function () {
    function Queue(array = []) {
        if (!Array.isArray(array)) {
            // "47. 에러 처리" 참고
            throw new TypeError(`${array} is not an array.`);
        }
        this.array = array;
    }

    Queue.prototype = {
        // "19.10.1. 생성자 함수에 의한 프로토타입의 교체" 참고
        constructor: Queue,
        // 큐의 가장 마지막에 데이터를 밀어 넣는다.
        enqueue(value) {
            return this.array.push(value);
        },
        // 큐의 가장 처음 데이터, 즉 가장 먼저 밀어 넣은 데이터를 꺼낸다.
        dequeue() {
            return this.array.shift();
        },
        // 큐의 복사본 배열을 반환한다.
        entries() {
            return [...this.array];
        }
    };

    return Queue;
}());

const queue = new Queue([1, 2]);
console.log(queue.entries()); // [1, 2]

queue.enqueue(3);
console.log(queue.entries()); // [1, 2, 3]

queue.dequeue();
console.log(queue.entries()); // [2, 3]

// 큐를 클래스로 구현하면 다음과 같다
class Queue {
    #array; // private class member

    constructor(array = []) {
        if (!Array.isArray(array)) {
            throw new TypeError(`${array} is not an array.`);
        }
        this.#array = array;
    }

    // 큐의 가장 마지막에 데이터를 밀어 넣는다.
    enqueue(value) {
        return this.#array.push(value);
    }

    // 큐의 가장 처음 데이터, 즉 가장 먼저 밀어 넣은 데이터를 꺼낸다.
    dequeue() {
        return this.#array.shift();
    }

    // 큐의 복사본 배열을 반환한다.
    entries() {
        return [...this.#array];
    }
}

const queue = new Queue([1, 2]);
console.log(queue.entries()); // [1, 2]

queue.enqueue(3);
console.log(queue.entries()); // [1, 2, 3]

queue.dequeue();
console.log(queue.entries()); // [2, 3]

// 7. Array.prototype.concat
// concat 메서드는 인수로 전달된 값들(배열 또는 원시값)을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다.
// 인수로 전달한 값이 배열인 경우 배열을 해체하여 새로운 배열의 요소로 추가한다. 원본 배열은 변경되지 않는다.
const arr1 = [1, 2];
const arr2 = [3, 4];

// 배열 arr2를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
// 인수로 전달한 값이 배열인 경우 배열을 해체하여 새로운 배열의 요소로 추가한다.
let result = arr1.concat(arr2);
console.log(result); // [1, 2, 3, 4]

// 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
result = arr1.concat(3);
console.log(result); // [1, 2, 3]

// 배열 arr2와 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
result = arr1.concat(arr2, 5);
console.log(result); // [1, 2, 3, 4, 5]

// 원본 배열은 변경되지 않는다.
console.log(arr1); // [1, 2]

// push와 shift 메서드는 concat 메서드로 대체할 수 있다. push와 unshift 메서드는 concat 메서드와 유사하게 동작하지만 미묘한 차이가 있다.
// push와 unshift 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 하며, concat 메서드를 사용할 경우 반환값을 변수에 할당해야한다.
const arr1 = [3, 4];

// unshift 메서드는 원본 배열을 직접 변경한다.
// 따라서 원본 배열을 변수에 저장해 두지 않으면 변경된 배열을 사용할 수 없다.
arr1.unshift(1, 2);
// unshift 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 결과를 확인할 수 있다.
console.log(arr1); // [1, 2, 3, 4]

// push 메서드는 원본 배열을 직접 변경한다.
// 따라서 원본 배열을 변수에 저장해 두지 않으면 변경된 배열을 사용할 수 없다.
arr1.push(5, 6);
// push 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 결과를 확인할 수 있다.
console.log(arr1); // [1, 2, 3, 4, 5, 6]

// unshift와 push 메서드는 concat 메서드로 대체할 수 있다.
const arr2 = [3, 4];

// concat 메서드는 원본 배열을 변경하지 않고 새로운 배열을 반환한다.
// arr1.unshift(1, 2)를 다음과 같이 대체할 수 있다.
let result = [1, 2].concat(arr2);
console.log(result); // [1, 2, 3, 4]

// arr1.push(5, 6)를 다음과 같이 대체할 수 있다.
result = result.concat(5, 6);
console.log(result); // [1, 2, 3, 4, 5, 6]

// 인수로 전달받은 값이 배열인 겨웅 push와 unshift 메서드는 배열을 그대로 원본 배열의 마지막/ 첫 번째 요소로 추가하지만
// concat 메서드는 인수로 전달받은 배열을 해체하여 새로운 배열의 마지막 요소로 추가한다.
const arr = [3, 4];

// unshift와 push 메서드는 인수로 전달받은 배열을 그대로 원본 배열의 요소로 추가한다
arr.unshift([1, 2]);
arr.push([5, 6]);
console.log(arr); // [[1, 2], 3, 4,[5, 6]]

// concat 메서드는 인수로 전달받은 배열을 해체하여 새로운 배열의 요소로 추가한다
let result = [1, 2].concat([3, 4]);
result = result.concat([5, 6]);

console.log(result); // [1, 2, 3, 4, 5, 6]

// concat 메서드는 ES6의 스프레드 문법으로 대체할 수 있다.
let result = [1, 2].concat([3, 4]);
console.log(result); // [1, 2, 3, 4]

// concat 메서드는 ES6의 스프레드 문법으로 대체할 수 있다.
result = [...[1, 2], ...[3, 4]];
console.log(result); // [1, 2, 3, 4]