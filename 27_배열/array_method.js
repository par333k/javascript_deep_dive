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


// 8. Array.prototype.splice
// 원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 제거하는 경우에 사용한다
// splice 메서드는 3개의 매개변수가 있으며 원본 배열을 직접 변경한다.
// start : 원본 배열의 요소를 제거하기 시작할 인덱스, start만 지정하면 start부터 모든 요소를 제거.
// deleteCount : 원본 배열의 요소를 제거하기 시작할 인덱스인 start부터 제거할 요소의 개수. 0일 경우 아무런 요소도 제거되지 않는다.
// items : 제거한 위치에 삽입할 요소들의 목록. 생략할 경우 원본 배열에서 요소들을 제거하기만 한다(옵션)
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 2개의 요소를 제거하고 그 자리에 새로운 요소 20, 30을 삽입한다.
const result = arr.splice(1, 2, 20, 30);

// 제거한 요소가 배열로 반환된다.
console.log(result); // [2, 3]
// splice 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 20, 30, 4]

// splice 메서드의 두 번째 인수, 즉 제거할 요소의 개수를 0으로 지정하면 아무런 요소도 제거하지 않고 새로운 요소들을 삽입한다
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 0개의 요소를 제거하고 그 자리에 새로운 요소 100을 삽입한다.
const result = arr.splice(1, 0, 100);

// 원본 배열이 변경된다.
console.log(arr); // [1, 100, 2, 3, 4]
// 제거한 요소가 배열로 반환된다.
console.log(result); // []

// splice 메서드의 세 번쨰 인수, 즉 제거한 위치에 추가할 요소들의 목록을 전달하지 않으면 원본 배열에서 지정된 요소를 제거하기만 한다.
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 2개의 요소를 제거한다.
const result = arr.splice(1, 2);

// 원본 배열이 변경된다.
console.log(arr); // [1, 4]
// 제거한 요소가 배열로 반환된다.
console.log(result); // [2, 3]

// splice 메서드의 두 번쨰 인수, 즉 제거할 요소의 개수를 생략하면 첫 번째 인수로 전달된 시작 인덱스부터 모든 요소를 제거한다.
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 모든 요소를 제거한다.
const result = arr.splice(1);

// 원본 배열이 변경된다.
console.log(arr); // [1]
// 제거한 요소가 배열로 반환된다.
console.log(result); // [2, 3, 4]

// 배열에서 특정 요소를 제거하려면 indexOf 메서드를 통해 특정 요소의 인덱스를 취득한 다음 splice 메서드를 사용한다.
const arr = [1, 2, 3, 1, 2];

// 배열 array에서 item 요소를 제거한다. item 요소가 여러 개 존재하면 첫 번째 요소만 제거한다.
function remove(array, item) {
    // 제거할 item 요소의 인덱스를 취득한다.
    const index = array.indexOf(item);

    // 제거할 item 요소가 있다면 제거한다.
    if (index !== -1) array.splice(index, 1);

    return array;
}

console.log(remove(arr, 2)); // [1, 3, 1, 2]
console.log(remove(arr, 10)); // [1, 3, 1, 2]

// filter 메서드를 사용하여 특정 요소를 제거할 수도 있다. 하지만 특정 요소가 중복된 경우 모두 제거된다.
const arr = [1, 2, 3, 1, 2];

// 배열 array에서 모든 item 요소를 제거한다.
function removeAll(array, item) {
    return array.filter(v => v !== item);
}

console.log(removeAll(arr, 2)); // [1, 3, 1]


// 9. Array.prototype.slice
// 인수로 전달된 범위의 요소들을 복사하여 배열로 반환한다.
// 원본 배열은 변경되지 않는다. 이름이 유사한 splice 메서드는 원본 배열을 변경하므로 구별을 잘 해야 한다
// slice 메서드는 두 개의 매개변수를 갖는다.
// start : 복사를 시작할 인덱스, 음수인 경우 배열의 끝에서의 인덱스를 나타낸다.
// end : 복사를 종료할 인덱스, 이 인덱스에 해당하는 요소는 복사되지 않는다. 기본값은 length 프로퍼티 값이다.
const arr = [1, 2, 3];

// arr[0]부터 arr[1] 이전(arr[1] 미포함)까지 복사하여 반환한다.
arr.slice(0, 1); // -> [1]

// arr[1]부터 arr[2] 이전(arr[2] 미포함)까지 복사하여 반환한다.
arr.slice(1, 2); // -> [2]

// 원본은 변경되지 않는다.
console.log(arr); // [1, 2, 3]

// slice 메서드는 첫 번째 인수로 전달받은 인덱스부터 두 번째 인수로 전달받은 인덱스 이전까지 요소들을 복사해 배열로 반환한다.
const arr = [1, 2, 3];

// arr[1]부터 이후의 모든 요소를 복사하여 반환한다.
arr.slice(1); // -> [2, 3]

// slice 메서드의 첫 번째 인수가 음수인 경우 배열의 끝에서부터 요소를 복사하여 배열로 반환한다.
const arr = [1, 2, 3];

// 배열의 끝에서부터 요소를 한 개 복사하여 반환한다.
arr.slice(-1); // -> [3]

// 배열의 끝에서부터 요소를 두 개 복사하여 반환한다.
arr.slice(-2); // -> [2, 3]

// slice 메서드의 인수를 모두 생략하면 원본 배열의 복사본을 생성하여 반환한다.
const arr = [1, 2, 3];

// 인수를 모두 생략하면 원본 배열의 복사본을 생성하여 반환한다.
const copy = arr.slice();
console.log(copy); // [1, 2, 3]
console.log(copy === arr); // false

// 이때 생성된 복사본은 얕은 복사를 통해 생성된다.
const todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
];

// 얕은 복사(shallow copy)
const _todos = todos.slice();
// const _todos = [...todos];

// _todos와 todos는 참조값이 다른 별개의 객체다.
console.log(_todos === todos); // false

// 배열 요소의 참조값이 같다. 즉, 얕은 복사되었다.
console.log(_todos[0] === todos[0]); // true

// 객체를 프로퍼티 값으로 갖는 객체의 경우 얕은 복사는 한 단계까지만 복사하는 것을 말하고
// 깊은 복사는 객체에 중첩되어 있는 객체까지 모두 복사하는 것을 말한다.
// slice 메서드, 스프레드 문법, Object.assign 메서드는 모두 얕은 복사를 수행한다.
// 깊은 복사를 위해서는 Lodash 라이브러리의 cloneDeep 메서드를 사용하는 것을 추천한다

// slice 메서드가 복사본을 생성하는 것을 이용하여 arguments, HTMLCollection, NodeList 같은 유사 배열 객체를 배열로 변환할 수 있다.
function sum() {
    // 유사 배열 객체를 배열로 변환(ES5)
    var arr = Array.prototype.slice.call(arguments);
    console.log(arr); // [1, 2, 3]

    return arr.reduce(function (pre, cur) {
        return pre + cur;
    }, 0);
}

console.log(sum(1, 2, 3)); // 6

// Array.from 메서드는 유사 배열 객체 또는 이터러블 객체를 배열로 반환한다.
function sum() {
    const arr = Array.from(arguments);
    console.log(arr); // [1, 2, 3]

    return arr.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3)); // 6

// arguments객체는 유사 배열 객체이면서 이터러블 객체다. 이터러블 객체는 ES6의 스프레드 문법을 사용하여 간단하게 배열로 변환할 수 있다.
function sum() {
    // 이터러블을 배열로 변환(ES6 스프레드 문법)
    const arr = [...arguments ];
    console.log(arr); // [1, 2, 3]

    return arr.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3)); // 6


// 10. Array.prototype.join
// join 메서드는 원본 배열의 모든 요소를 문자열로 변환한 후, 인수로 전달받은 문자열, 즉 구분자separator로 연결한 문자열을 반환한다.
// 구분자는 생략 가능하며 기본 구분자는 콤마(',')다.
const arr = [1, 2, 3, 4];

// 기본 구분자는 ','이다.
// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 기본 구분자 ','로 연결한 문자열을 반환한다.
arr.join(); // -> '1,2,3,4';

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 빈문자열로 연결한 문자열을 반환한다.
arr.join(''); // -> '1234'

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 구분자 ':'로 연결한 문자열을 반환한다.
arr.join(':'); // -> '1:2:3:4'


// 11. Array.prototype.reverse
// reverse 메서드는 원본 배열의 순서를 반대로 뒤집는다. 이 때 원본 배열이 변경된다.
// 반환값은 변경된 배열이다.
const arr = [1, 2, 3];
const result = arr.reverse();

// reverse 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [3, 2, 1]
// 반환값은 변경된 배열이다.
console.log(result); // [3, 2, 1]

// 12. Array.prototype.fill
// ES6에서 도입된 fill 메서드는 인수로 전달받은 값을 배열의 처음부터 끝까지 요소로 채운다. 이때 원본 배열이 변경된다.
const arr = [1, 2, 3];

// 인수로 전달 받은 값 0을 배열의 처음부터 끝까지 요소로 채운다.
arr.fill(0);

// fill 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [0, 0, 0]

// 두 번째 인수로 요소 채우기를 시작할 인덱스를 전달할 수 있다.
const arr = [1, 2, 3];

// 인수로 전달받은 값 0을 배열의 인덱스 1부터 끝까지 요소로 채운다.
arr.fill(0, 1);

// fill 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 0, 0]

// 세 번째 인수로 요소 채우기를 멈출 인덱스를 전달할 수 있다.
const arr = [1, 2, 3, 4, 5];

// 인수로 전달받은 값 0을 배열의 인덱스 1부터 3 이전(인덱스 3 미포함)까지 요소로 채운다.
arr.fill(0, 1, 3);

// fill 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 0, 0, 4, 5]

// fill 메서드를 사용하면 배열을 생성하면서 특정 값으로 요소를 채울 수 있다.
const arr = new Array(3);
console.log(arr); // [empty × 3]

// 인수로 전달받은 값 1을 배열의 처음부터 끝까지 요소로 채운다.
const result = arr.fill(1);

// fill 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 1, 1]

// fill 메서드는 변경된 원본 배열을 반환한다.
console.log(result); // [1, 1, 1]

// fill 메서드로 요소를 채울 경우 모든 요소를 하나의 값만으로 채울 수 밖에 없다.
// Array.from 메서드를 사용하면 두 번째 인수로 전달한 콜백 함수를 통해 요소값을 만들면서 배열을 채울 수 있다.
// Array.from 메서드는 두 번쨰 인수로 전달한 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소 값과 인덱스를 순차적으로 전달하면서 호출하고,
// 콜백 함수의 반환값으로 구성된 배열을 반환한다.
// 인수로 전달받은 정수만큼 요소를 생성하고 0부터 1씩 증가하면서 요소를 채운다.
const sequences = (length = 0) => Array.from({ length }, (_, i) => i);
// const sequences = (length = 0) => Array.from(new Array(length), (_, i) => i);

console.log(sequences(3)); // [0, 1, 2]


// 13. Array.prototype.includes
// ES7에서 도입된 것으로, 특정 요소가 배열에 포함되어 있으면 true, 아니면 false로 반환한다. 첫 번째 인수로 검색할 대상을 지정한다.
const arr = [1, 2, 3];

// 배열에 요소 2가 포함되어 있는지 확인한다.
arr.includes(2); // -> true

// 배열에 요소 100이 포함되어 있는지 확인한다.
arr.includes(100); // -> false

// 두 번째 인수로 검색을 시작할 인덱스를 전달할 수 있다. 두 번째 인수를 생략할 경우 기본값 0이 설정된다.
// 두 번째 인수에 음수를 전달하면 length 프로퍼티 값과 음수 인덱스를 합산하여 검색 시작 인덱스를 설정한다.
const arr = [1, 2, 3];

// 배열에 요소 1이 포함되어 있는지 인덱스 1부터 확인한다.
arr.includes(1, 1); // -> false

// 배열에 요소 3이 포함되어 있는지 인덱스 2(arr.length - 1)부터 확인한다.
arr.includes(3, -1); // -> true

// 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환하는 indexOf 메서드를 사용하여도 배열 내에 특정 요소가 포함되어 있는지 확인할 수 있다.
// 하지만 indexOf 메서드를 사용하면 반환값이 -1인지 확인해 보아야 하고 배열에 NaN이 포함되어 있는지 확인할 수 없다는 문제가 있다.
[NaN].indexOf(NaN) !== -1; // -> false
[NaN].includes(NaN);       // -> true


// 14. Array.prototype.flat
// ES10에서 도입된 flat 메서드는 인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화한다.
[1, [2, 3, 4, 5]].flat(); // -> [1, 2, 3, 4, 5]

// 중첩 배열을 평탄화할 깊이를 인수로 전달할 수 있다. 인수를 생략할 경우 기본값은 1이다. 인수로 Infinity를 전달하면 중첩 배열 모두를 평탄화한다.
// 중첩 배열을 평탄화하기 위한 깊이 값의 기본값은 1이다.
[1, [2, [3, [4]]]].flat();  // -> [1, 2, [3, [4]]]
[1, [2, [3, [4]]]].flat(1); // -> [1, 2, [3, [4]]]

// 중첩 배열을 평탄화하기 위한 깊이 값을 2로 지정하여 2단계 깊이까지 평탄화한다.
[1, [2, [3, [4]]]].flat(2); // -> [1, 2, 3, [4]]
// 2번 평탄화한 것과 동일하다.
[1, [2, [3, [4]]]].flat().flat(); // -> [1, 2, 3, [4]]

// 중첩 배열을 평탄화하기 위한 깊이 값을 Infinity로 지정하여 중첩 배열 모두를 평탄화한다.
[1, [2, [3, [4]]]].flat(Infinity); // -> [1, 2, 3, 4]