// ES6의 객체 리터럴 확장 기능
// 축약표현
// ES5
var x = 1, y = 2;

var obj = {
    x: x,
    y: y
};

console.log(obj); // {x: 1, y: 2}

// ES6
let x = 1, y = 2;

// 프로퍼티 축약 표현
const obj = { x, y }; // 변수 이름과 프로퍼티 키가 동일할 때 가능

console.log(obj); // {x: 1, y: 2}

// 계산된 프로퍼티 이름
// ES5
var prefix = 'prop';
var i = 0;

var obj = {};

// 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
// 객체 외부에서 대괄호 표기법 사용
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
// ES6
const prefix = 'prop';
let i = 0;

// 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
const obj = {
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}

// 메서드 축약 표현
// ES5
var obj = {
    name: 'Lee',
    sayHi: function() {
        console.log('Hi! ' + this.name);
    }
};

obj.sayHi(); // Hi! Lee
// ES6
// function 키워드 생략가능
const obj = {
    name: 'Lee',
    // 메서드 축약 표현
    sayHi() { // es6의 메서드 축약표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작
        console.log('Hi! ' + this.name);
    }
};

obj.sayHi(); // Hi! Lee
