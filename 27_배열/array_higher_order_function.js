// 배열 고차 함수
// 고차 함수는 함수를 인수로 전달받거나 함수를 반환하는 함수를 말한다.
// 외부 상태의 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에 기반을 두고 있다.
// 함수형 프로그래밍은 로직 내에 존재하는 조건문과 반복문을 지양하고 변수의 사용을 억제하여 상태 변경을 피하려는 프로그래밍 패러다임이다.
// 순수 함수를 통해 부수 효과를 최대한 억제하는 방향의 노력


// 1. Array.prototype.sort
// 원본 배열을 직접 변경하며 정렬된 배열을 반환한다
// 기본적으로 오름차순으로 요소를 정렬한다
const fruits = ['Banana', 'Orange', 'Apple'];

// 오름차순(ascending) 정렬
fruits.sort();

// sort 메서드는 원본 배열을 직접 변경한다.
console.log(fruits); // ['Apple', 'Banana', 'Orange']

// 한글 문자열 요소도 오름차순 정렬
const fruits = ['바나나', '오렌지', '사과'];

// 오름차순(ascending) 정렬
fruits.sort();

// sort 메서드는 원본 배열을 직접 변경한다.
console.log(fruits); // ['바나나', '사과', '오렌지']

// 내림차순 요소 정렬때는 sort 뒤에 reverse를 사용한다.
const fruits = ['Banana', 'Orange', 'Apple'];

// 오름차순(ascending) 정렬
fruits.sort();

// sort 메서드는 원본 배열을 직접 변경한다.
console.log(fruits); // ['Apple', 'Banana', 'Orange']

// 내림차순(descending) 정렬
fruits.reverse();

// reverse 메서드도 원본 배열을 직접 변경한다.
console.log(fruits); // ['Orange', 'Banana', 'Apple']

// 숫자 요소의 정렬은 주의가 필요하다. 기본 정렬 순서가 유니코드 코드 포인트이기 떄문.
const points = [40, 100, 1, 5, 2, 25, 10];

points.sort();

// 숫자 요소들로 이루어진 배열은 의도한 대로 정렬되지 않는다.
console.log(points); // [1, 10, 100, 2, 25, 40, 5]

// 따라서 숫자 요소를 정렬할 때는 sort 메서드에 정렬 순서를 정의하는 비교 함수를 인수로 전달해야 한다.
// 비교 함수는 양수나 음수, 또는 0을 반환해야 한다.
const points = [40, 100, 1, 5, 2, 25, 10];

// 숫자 배열의 오름차순 정렬. 비교 함수의 반환값이 0보다 작으면 a를 우선하여 정렬한다.
points.sort((a, b) => a - b);
console.log(points); // [1, 2, 5, 10, 25, 40, 100]

// 숫자 배열에서 최소/최대값 취득
console.log(points[0], points[points.length]); // 1

// 숫자 배열의 내림차순 정렬. 비교 함수의 반환값이 0보다 작으면 b를 우선하여 정렬한다.
points.sort((a, b) => b - a);
console.log(points); // [100, 40, 25, 10, 5, 2, 1]

// 숫자 배열에서 최대값 취득
console.log(points[0]); // 100

// 객체를 요소로 갖는 배열을 정렬하는 예제는 다음과 같다.
const todos = [
    { id: 4, content: 'JavaScript' },
    { id: 1, content: 'HTML' },
    { id: 2, content: 'CSS' }
];

// 비교 함수. 매개변수 key는 프로퍼티 키다.
function compare(key) {
    // 프로퍼티 값이 문자열인 경우 - 산술 연산으로 비교하면 NaN이 나오므로 비교 연산을 사용한다.
    // 비교 함수는 양수/음수/0을 반환하면 되므로 - 산술 연산 대신 비교 연산을 사용할 수 있다.
    return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
}

// id를 기준으로 오름차순 정렬
todos.sort(compare('id'));
console.log(todos);
/*
[
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' },
  { id: 4, content: 'JavaScript' }
]
*/

// content를 기준으로 오름차순 정렬
todos.sort(compare('content'));
console.log(todos);
/*
[
  { id: 2, content: 'CSS' },
  { id: 1, content: 'HTML' },
  { id: 4, content: 'JavaScript' }
]
*/

// sort 메서드는 quicksort 알고리즘을 사용해서 동일한 값의 요소가 중복되어 있을 때 초기 순서와 변경될 수 있는 불안정 정렬 알고리즘을 사용했으나
// ES10 에서는 timsort 알고리즘을 사용하도록 바뀌었다. timsort 알고리즘은 merge sort를 기반으로 최적화가 이뤄진 정렬 알고리즘으로 stable sort에 속한다.


// 2. Array.prototype.forEach
// forEach 메서드는 for 문을 대체할 수 있는 고차 함수다.
const numbers = [1, 2, 3];
let pows = [];

// for 문으로 배열 순회
for (let i = 0; i < numbers.length; i++) {
    pows.push(numbers[i] ** 2);
}
console.log(pows); // [1, 4, 9]

// 위 예제를 forEach로 바꿀경우
const numbers = [1, 2, 3];
let pows = [];

// forEach 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
numbers.forEach(item => pows.push(item ** 2));
console.log(pows); // [1, 4, 9]

// forEach 메서드는 반복문을 추상화한 고차 함수로서 내부에서 반복문을 통해 자신을 호출한 배열을 순회하며
// 수행해야 할 처리를 콜백 함수로 전달받아 반복 호출한다

// forEach 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
[1, 2, 3].forEach((item, index, arr) => {
    console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
});
/*
요소값: 1, 인덱스: 0, this: [1,2,3]
요소값: 2, 인덱스: 1, this: [1,2,3]
요소값: 3, 인덱스: 2, this: [1,2,3]
*/

// JSON.stringify 메서드는 객체를 JSON 포맷의 문자열로 변환한다.

// ForEach메서드는 원본 배열(this)를 변경하지 않는다. 하지만 콜백 함수를 통해 원본 배열을 변경할 수는 있다.
const numbers = [1, 2, 3];

// forEach 메서드는 원본 배열을 변경하지 않지만 콜백 함수를 통해 원본 배열을 변경할 수는 있다.
// 콜백 함수의 세 번째 매개변수 arr은 원본 배열 numbers를 가리킨다.
// 따라서 콜백 함수의 세 번째 매개변수 arr을 직접 변경하면 원본 배열 numbers가 변경된다.
numbers.forEach((item, index, arr) => { arr[index] = item ** 2; });
console.log(numbers); // [1, 4, 9]

// forEach 메서드의 반환값은 언제나 undefined다
const result = [1, 2, 3].forEach(console.log);
console.log(result); // undefined

// forEach 메서드의 두 번째 인수로 forEach 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있다.
class Numbers {
    numberArray = [];

    multiply(arr) {
        arr.forEach(function (item) {
            // TypeError: Cannot read property 'numberArray' of undefined
            this.numberArray.push(item * item);
        });
    }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
// forEach 메서드의 콜백 함수는 일반 함수로 호출되므로 콜백 함수 내부의 this는 undefined이다.
// 전역 객체가 아닌 이유는 class 내부의 모든 코드에는 암묵적으로 strict mode가 적용되기 때문.
// 따라서 forEach 메서드의 콜백 함수 내부의 this와 multifly 메서드 내부의 this를 일치시키려면
// 두 번째 인수로 forEach 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달한다.
class Numbers {
    numberArray = [];

    multiply(arr) {
        arr.forEach(function (item) {
            this.numberArray.push(item * item);
        }, this); // forEach 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달
    }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray); // [1, 4, 9]

// 더 나은 방법은 애로우 펑션을 쓰는 것이다. 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다.
// 따라서 화살표 함수 내부에서 this를 참조하면 상위 스코프, 즉 multiply 메서드 내부의 this를 그대로 참조한다.
class Numbers {
    numberArray = [];

    multiply(arr) {
        // 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.
        arr.forEach(item => this.numberArray.push(item * item));
    }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray); // [1, 4, 9]

// forEach 메서드의 동작을 이해하기 위해 폴리필을 살펴보자
// 만약 Array.prototype에 forEach 메서드가 존재하지 않으면 폴리필을 추가한다.
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        // 첫 번째 인수가 함수가 아니면 TypeError를 발생시킨다.
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        // this로 사용할 두 번째 인수를 전달받지 못하면 전역 객체를 this로 사용한다.
        thisArg = thisArg || window;

        // for 문으로 배열을 순회하면서 콜백 함수를 호출한다.
        for (var i = 0; i < this.length; i++) {
            // call 메서드를 통해 thisArg를 전달하면서 콜백 함수를 호출한다.
            // 이때 콜백 함수의 인수로 배열 요소, 인덱스, 배열 자신을 전달한다.
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// forEach 메서드도 내부에서는 반복문 (for문)을 통해 배열을 순회한다.
// 단 이것을 내부로 은닉하여 로직의 흐름을 이해하기 쉽게 하고 복잡성을 해결한다.
// forEach 메서드는 break, continue 문을 사용할 수 없다.
[1, 2, 3].forEach(item => {
    console.log(item);
//    if (item > 1) break; // SyntaxError: Illegal break statement
});

[1, 2, 3].forEach(item => {
    console.log(item);
//    if (item > 1) continue;
    // SyntaxError: Illegal continue statement: no surrounding iteration statement
});

// 희소 배열의 경우 존재하지 않는 요소는 순회 대상에서 제외된다.
// 희소 배열
const arr = [1, , 3];

// for 문으로 희소 배열을 순회
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // 1, undefined, 3
}

// forEach 메서드는 희소 배열의 존재하지 않는 요소를 순회 대상에서 제외한다.
arr.forEach(v => console.log(v)); // 1, 3

// forEach 메서드는 for 문에 비해 성능이 좋지는 않지만 가독성에서의 이점이 있다.


// 3. Array.prototype.map
// map  메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다
// 그리고 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다. 이 때 원본 배열은 변경되지 않는다.
const numbers = [1, 4, 9];

// map 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
// 그리고 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다.
const roots = numbers.map(item => Math.sqrt(item));

// 위 코드는 다음과 같다.
// const roots = numbers.map(Math.sqrt);

// map 메서드는 새로운 배열을 반환한다
console.log(roots);   // [ 1, 2, 3 ]
// map 메서드는 원본 배열을 변경하지 않는다
console.log(numbers); // [ 1, 4, 9 ]

// forEach 메서드와 map 메서드의 공통점은 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출하는 것이다.
// 차이는 forEach 메서드는 언제나 undefined 를 반환하고 map 메서드는 콜백 함수의 반환값들로 구성된 새로운 배열을 반환하는 것이다.
// 즉, forEach 메서드는 반복문을 대체하기 위한 고차함수라면  map은 요소값을 다른값으로 매핑한 새로운 배열을 생성하기 위한 고차함수이다.
// map 메서드가 생성하여 반환하는 새로운 배열의 length 프로퍼티 값은 map 메서드를 호출한 배열의 length 프로퍼티 값과 반드시 일치한다.
// 즉, map 메서드를 호출한 배열과 map 메서드가 생성하여 반환한 배열은 1:1 매핑한다.

// map 메서드는 콜백 함수를 호출할 때 3개의 인수, map 메서드를 호출한 배열의 요소값과 인덱스 그리고 map 메서드를 호출한 this를 순차전달한다.
// map 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
[1, 2, 3].map((item, index, arr) => {
    console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
    return item;
});
/*
요소값: 1, 인덱스: 0, this: [1,2,3]
요소값: 2, 인덱스: 1, this: [1,2,3]
요소값: 3, 인덱스: 2, this: [1,2,3]
*/

// forEach  메서드와 마찬가지로 map 메서드의 두 번째 인수로 map 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있다.
class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        return arr.map(function (item) {
            // 외부에서 this를 전달하지 않으면 this는 undefined를 가리킨다.
            return this.prefix + item;
        }, this); // map 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
// ['-webkit-transition', '-webkit-user-select']

// 더 나은 방법은 애로우 펑션을 쓰자!
class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        // 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.
        return arr.map(item => this.prefix + item);
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
// ['-webkit-transition', '-webkit-user-select']


// 4. Array.prototype.filter
// filter 메서드는 자신을 호출한 배열의 모든 요소를 순회하며 인수로 전달 받은 콜백 함수를 반복 호출한다
// 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다.
const numbers = [1, 2, 3, 4, 5];

// filter 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
// 그리고 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다.
// 다음의 경우 numbers 배열에서 홀수인 요소만을 필터링한다(1은 true로 평가된다).
const odds = numbers.filter(item => item % 2);
console.log(odds); // [1, 3, 5]

// filter 메서드는 자신을 호출한 배열에서 필터링 조건을 만족하는 특정 요소만 추출하여 새로운 배열을 만들고 싶을 때 사용한다.
// 따라서 filter 메서드로 생성된 새로운 배열의 length 프로퍼티 값은 filter를 호출한 배열의 length 프로퍼티 값과 작거나 같다.
// forEach, map 메서드와 마찬가지로 filter 메서드의 콜백 함수는 filter 메서드를 호출한 배열의 요소값과 인덱스, filter 메서드를 호출한
// 배열 자체, 즉 this를 순차적으로 전달받을 수 있다.
// filter 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
[1, 2, 3].filter((item, index, arr) => {
    console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
    return item % 2;
});
/*
요소값: 1, 인덱스: 0, this: [1,2,3]
요소값: 2, 인덱스: 1, this: [1,2,3]
요소값: 3, 인덱스: 2, this: [1,2,3]
*/

// 마찬가지로, 애로우펑션을 쓰면 this를 사용할 때 더 편리하다.
// filter 메서드는 자신을 호출한 배열에서 특정 요소를 제거하기 위해 사용할 수도 있다.
class Users {
    constructor() {
        this.users = [
            { id: 1, name: 'Lee' },
            { id: 2, name: 'Kim' }
        ];
    }

    // 요소 추출
    findById(id) {
        // id가 일치하는 사용자만 반환한다.
        return this.users.filter(user => user.id === id);
    }

    // 요소 제거
    remove(id) {
        // id가 일치하지 않는 사용자를 제거한다.
        this.users = this.users.filter(user => user.id !== id);
    }
}

const users = new Users();

let user = users.findById(1);
console.log(user); // [{ id: 1, name: 'Lee' }]

// id가 1인 사용자를 제거한다.
users.remove(1);

user = users.findById(1);
console.log(user); // []

// filter 메서드를 사용해 특정 요소를 제거할 경우, 특정 요소가 중복되어 있다면 중복된 요소가 모두 제거된다.
// 특정 요소를 하나만 제거하려면 indexOf 메서드를 통해 특정 요소의 인덱스를 취득한 다음 splice 메서드를 사용한다.


// 5. Array.prototype.reduce
// reduce 메서드는 콜백 함수의 반환값을 다음 순회 시에 콜백 함수의 첫 번째 인수로 전달하며 콜백 함수를 호출하여 하나의 결과값을 만들어 반환한다.
// 이 때 원본배열은 변경되지 않는다.
// reduce 메서드는 첫 번째 인수로 콜백 함수, 두 번째 인수로 초기값을 전달받는다. reduce 메서드의 콜백 함수에는 4개의 인수,
// 초기값 또는 콜백 함수의 이전 반환값, reduce 메서드를 호출한 배열의 요소값과 인덱스, reduce 메서드를 호출한 배열 자체, 즉 this가 전달된다.
// [1, 2, 3, 4]의 모든 요소의 누적을 구한다.
const sum = [1, 2, 3, 4].reduce((accumulator, currentValue, index, array) => accumulator + currentValue, 0);

console.log(sum); // 10
// reduce 메서드는 자신을 호출한 배열의 모든 요소를 순회하며 하나의 결과값을 구해야 하는 경우에 사용한다.
// 평균 구하기
const values = [1, 2, 3, 4, 5, 6];

const average = values.reduce((acc, cur, i, { length }) => {
    // 마지막 순회가 아니면 누적값을 반환하고 마지막 순회면 누적값으로 평균을 구해 반환한다.
    return i === length - 1 ? (acc + cur) / length : acc + cur;
}, 0);

console.log(average); // 3.5

// 최대값 구하기
const values = [1, 2, 3, 4, 5];

const max = values.reduce((acc, cur) => (acc > cur ? acc : cur), 0);
console.log(max); // 5
// 최대값을 구할 때는 reduce 메서드보다 Math.max 메서드를 사용하는 방법이 더 직관적이다.
const values = [1, 2, 3, 4, 5];

const max = Math.max(...values);
// var max = Math.max.apply(null, values);
console.log(max); // 5

// 요소의 중복 횟수 구하기
const fruits = ['banana', 'apple', 'orange', 'orange', 'apple'];

const count = fruits.reduce((acc, cur) => {
    // 첫 번째 순회 시 acc는 초기값인 {}이고 cur은 첫 번째 요소인 'banana'다.
    // 초기값으로 전달받은 빈 객체에 요소값인 cur을 프로퍼티 키로, 요소의 개수를 프로퍼티 값으로
    // 할당한다. 만약 프로퍼티 값이 undefined(처음 등장하는 요소)이면 프로퍼티 값을 1로 초기화한다.
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
}, {});

// 콜백 함수는 총 5번 호출되고 다음과 같이 결과값을 반환한다.
/*
{banana: 1} => {banana: 1, apple: 1} => {banana: 1, apple: 1, orange: 1}
=> {banana: 1, apple: 1, orange: 2} => {banana: 1, apple: 2, orange: 2}
*/

console.log(count); // { banana: 1, apple: 2, orange: 2 }

// 중첩 배열 평탄화
const values = [1, [2, 3], 4, [5, 6]];

const flatten = values.reduce((acc, cur) => acc.concat(cur), []);
// [1] => [1, 2, 3] => [1, 2, 3, 4] => [1, 2, 3, 4, 5, 6]

console.log(flatten); // [1, 2, 3, 4, 5, 6]
// 중첩 배열을 평탄화 할때는 reduce 메서드보다 ES10에 도입된 Array.prototype.flat 메서드를 사용하는편이 더 직관적이다.
[1, [2, 3, 4, 5]].flat(); // -> [1, 2, 3, 4, 5]

// 인수 2는 중첩 배열을 평탄화하기 위한 깊이 값이다.
[1, [2, 3, [4, 5]]].flat(2); // -> [1, 2, 3, 4, 5]

// 중복 요소 제거
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

const result = values.reduce((acc, cur, i, arr) => {
    // 순회 중인 요소의 인덱스가 자신의 인덱스라면 처음 순회하는 요소다.
    // 이 요소만 초기값으로 전달받은 배열에 담아 반환한다.
    // 순회 중인 요소의 인덱스가 자신의 인덱스가 아니라면 중복된 요소다.
    if (arr.indexOf(cur) === i) acc.push(cur);
    return acc;
}, []);

console.log(result); // [1, 2, 3, 5, 4]
// 중복 요소를 제거할 때는 reduce 메서드보다 filter 메서드를 사용하는 방법이 더 직관적이다.
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

// 순회중인 요소의 인덱스가 자신의 인덱스라면 처음 순회하는 요소이다. 이 요소만 필터링한다.
const result = values.filter((v, i, arr) => arr.indexOf(v) === i);
console.log(result); // [1, 2, 3, 5, 4]

// 또는 중복되지 않는 유일한 값들의 집합인 Set을 사용할 수도 있다. 중복 요소 제거에는 이 방법이 좋다.
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

// 중복을 허용하지 않는 Set 객체의 특성을 활용하여 배열에서 중복된 요소를 제거할 수 있다.
const result = [...new Set(values)];
console.log(result); // [1, 2, 3, 5, 4]

// reduce 메서드의 두 번쨰 인수로 전달하는 초기값은 생략할 수 있다.
// reduce 메서드의 두 번째 인수, 즉 초기값을 생략했다.
const sum = [1, 2, 3, 4].reduce((acc, cur) => acc + cur);
console.log(sum); // 10

// 그러나 reduce 메서드를 호출할 때는 언제나 초기값을 전달하는 것이 안전하다.
const sum = [].reduce((acc, cur) => acc + cur);
// TypeError: Reduce of empty array with no initial value
// 빈 배열로 호출 시 에러가 발생한다.
const sum = [].reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 0
// 초기값 전달시 에러가 발생하지 않는다.

// reduce 메서드로 객체의 특정 프로퍼티 값을 합산하는 경우
const products = [
    { id: 1, price: 100 },
    { id: 2, price: 200 },
    { id: 3, price: 300 }
];

// 1번째 순회 시 acc는 { id: 1, price: 100 }, cur은 { id: 2, price: 200 }이고
// 2번째 순회 시 acc는 300, cur은 { id: 3, price: 300 }이다.
// 2번째 순회 시 acc에 함수에 객체가 아닌 숫자값이 전달된다. 이때 acc.price는 undefined다.
const priceSum = products.reduce((acc, cur) => acc.price + cur.price);

console.log(priceSum); // NaN
// 이처럼 객체의 특정 프로퍼티 값을 합산하는 경우에는 반드시 초기값을 전달해야 한다.
const products = [
    { id: 1, price: 100 },
    { id: 2, price: 200 },
    { id: 3, price: 300 }
];

/*
1번째 순회 : acc => 0,   cur => { id: 1, price: 100 }
2번째 순회 : acc => 100, cur => { id: 2, price: 200 }
3번째 순회 : acc => 300, cur => { id: 3, price: 300 }
*/
const priceSum = products.reduce((acc, cur) => acc + cur.price, 0);

console.log(priceSum); // 600


// 6. Array.prototype.some
// some 메서드는 콜백 함수의 반환값이 단 한번이라도 참이면 true, 모두 거짓이면 false를 반환한다.
// some 메서드를 호출한 배열이 빈 배열일 경우 언제나 false를 반환한다.
// 배열의 요소 중에 10보다 큰 요소가 1개 이상 존재하는지 확인
[5, 10, 15].some(item => item > 10); // -> true

// 배열의 요소 중에 0보다 작은 요소가 1개 이상 존재하는지 확인
[5, 10, 15].some(item => item < 0); // -> false

// 배열의 요소 중에 'banana'가 1개 이상 존재하는지 확인
['apple', 'banana', 'mango'].some(item => item === 'banana'); // -> true

// some 메서드를 호출한 배열이 빈 배열인 경우 언제나 false를 반환한다.
[].some(item => item > 3); // -> false
// 마찬가지로 애로우 펑션을 사용해 this에 대한 문제를 쉽게 해결할 수 있다.


// 7. Array.prototype.every
// some과는 반대로, 콜백 함수의 반환값이 모두 참이면 true, 단 한 번이라도 거짓이면 false를 반환한다.
// 배열의 모든 요소가 3보다 큰지 확인
[5, 10, 15].every(item => item > 3); // -> true

// 배열의 모든 요소가 10보다 큰지 확인
[5, 10, 15].every(item => item > 10); // -> false

// every 메서드를 호출한 배열이 빈 배열인 경우 언제나 true를 반환한다.
[].every(item => item > 3); // -> true


// 8. Array.prototype.find
// ES6에서 도입된 메서드로, 콜백 함수의 반환값이 true인 첫 번째 요소를 반환한다. true인 요소가 없다면 undefined를 반환한다.
const users = [
    { id: 1, name: 'Lee' },
    { id: 2, name: 'Kim' },
    { id: 2, name: 'Choi' },
    { id: 3, name: 'Park' }
];

// id가 2인 첫 번째 요소를 반환한다. find 메서드는 배열이 아니라 요소를 반환한다.
users.find(user => user.id === 2); // -> {id: 2, name: 'Kim'}
// Array#filter는 배열을 반환한다.
[1, 2, 2, 3].filter(item => item === 2); // -> [2, 2]

// Array#find는 요소를 반환한다.
[1, 2, 2, 3].find(item => item === 2); // -> 2

// 9. Array.prototype.findIndex
// ES6에서 도입된 메서드로 콜백 함수의 반환값이 true인 첫 번째 요소의 인덱스를 반환한다. true인 요소가 존재하지 않는다면 -1을 반환한다.
const users = [
    { id: 1, name: 'Lee' },
    { id: 2, name: 'Kim' },
    { id: 2, name: 'Choi' },
    { id: 3, name: 'Park' }
];

// id가 2인 요소의 인덱스를 구한다.
users.findIndex(user => user.id === 2); // -> 1

// name이 'Park'인 요소의 인덱스를 구한다.
users.findIndex(user => user.name === 'Park'); // -> 3

// 위와 같이 프로퍼티 키와 프로퍼티 값으로 요소의 인덱스를 구하는 경우
// 다음과 같이 콜백 함수를 추상화할 수 있다.
function predicate(key, value) {
    // key와 value를 기억하는 클로저를 반환
    return item => item[key] === value;
}

// id가 2인 요소의 인덱스를 구한다.
users.findIndex(predicate('id', 2)); // -> 1

// name이 'Park'인 요소의 인덱스를 구한다.
users.findIndex(predicate('name', 'Park')); // -> 3


// 10. Array.prototype.flatMap
// ES10에서 도입된 flatMap 메서드는 map 메서드를 통해 생성된 새로운 배열을 평탄화한다.
// 즉, map 메서드와 flat 메서드를 순차적으로 실행하는 효과가 있다
const arr = ['hello', 'world'];

// map과 flat을 순차적으로 실행
arr.map(x => x.split('')).flat();
// -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// flatMap은 map을 통해 생성된 새로운 배열을 평탄화한다.
arr.flatMap(x => x.split(''));
// -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// 단 flatMap 메서드는 1단계만 평탄화가 가능하다. 깊이를 지정해야한다면 map 메서드와 flat 메서드를 각각호출한다.
const arr = ['hello', 'world'];

// flatMap은 1단계만 평탄화한다.
arr.flatMap((str, index) => [index, [str, str.length]]);
// -> [[0, ['hello', 5]], [1, ['world', 5]]] => [0, ['hello', 5], 1, ['world', 5]]

// 평탄화 깊이를 지정해야 하면 flatMap 메서드를 사용하지 말고 map 메서드와 flat 메서드를 각각 호출한다.
arr.map((str, index) => [index, [str, str.length]]).flat(2);
// -> [[0, ['hello', 5]], [1, ['world', 5]]] => [0, 'hello', 5, 1, 'world', 5]
