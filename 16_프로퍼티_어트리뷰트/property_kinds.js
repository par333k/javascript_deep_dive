// 프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분 가능
// 데이터 프로퍼티data property : 키와 값으로 구성된 일반적인 프로퍼티

// [[Value]] 프로퍼티 생성시 값 저장, 키를 통해 값에 접근하면 반환되는 값
// [[Writable]] 프로퍼티 값의 변경 가능 여부를 boolean으로 나타냄
// [[Enumerable]] 프로퍼티의 열거 가능 여부를 나타내며 boolean 값을 갖는다. for...in이나 Object.keys 메서드로 열거 불가
// [[Configurable]] 프로퍼티의 재정의 가능 여부를 boolean으로 나타냄. false경우 값 변경이 금지되나 writable이 ture인경우 값의 변경과 writable을 false로는 변경가능
const person = {
    name: 'Lee'
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 취득한다.
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: "Lee", writable: true, enumerable: true, configurable: true}
const person = {
    name: 'Lee'
};

// 프로퍼티 동적 생성
person.age = 20;

console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: true},
  age: {value: 20, writable: true, enumerable: true, configurable: true}
}
*/
// 프로퍼티가 생성될 때 [[Value]]의 값은 프로퍼티 값으로 초기화 되며 나머지는 true가 기본이다.

// 접근자 프로퍼티accessor property : 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출하는 접근자 함수accessor function로 구성된 프로퍼티
// [[Get]] 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다
// [[Set]] 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰드 [[Set]]의 값, setter 함수가 호출되고 결과가 프로퍼티 값에 저장
// [[Enumerable]], [[Configurable]] 은 데이터 프로퍼티와 같다.

const person = {
    // 데이터 프로퍼티
    firstName: 'Jinwoong',
    lastName: 'Park',

    // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
    // getter 함수
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    // setter 함수
    set fullName(name) {
        // 배열 디스트럭처링 할당: "31.1 배열 디스트럭처링 할당" 참고
        [this.firstName, this.lastName] = name.split(' ');
    }
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(person.firstName + ' ' + person.lastName); // Jinwoong Park

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = 'Jinwoong2 Park2';
console.log(person); // {firstName: "Jinwoong2", lastName: "Park2"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); // Jinwoong2 Park2

// firstName은 데이터 프로퍼티다.
// 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: "Jinwoong2", writable: true, enumerable: true, configurable: true}

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}

// Prototype 이란?
// 프로토타입은 어떤 객체의 상위 객체. 하위 객체에게 자신의 프로퍼티와 메서드를 상속한다.
// 하위 객체는 자신의 프로퍼티 또는 메서드인 것처럼 자유롭게 사용한다.
// 프로토타입 체인은 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조.
// 객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면
// 프로토타입 체인을 따라서 차례대로 검색한다.

// 프로퍼티의 구별은 일반적으로 다음과 같다
// 일반 객체의 __proto__는 접근자 프로퍼티다.
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티다.
Object.getOwnPropertyDescriptor(function() {}, 'prototype');
// {value: {...}, writable: true, enumerable: false, configurable: false}

// 프로퍼티의 정의
// 새 프로퍼티를 추가하며 어트리뷰트를 명시적으로 정의하거나 재정의 하는것.
// Object.defineProperty 메서드 사용
const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName', {
    value: 'Jinwoong',
    writable: true,
    enumerable: true,
    configurable: true
});
// defineProperty 메서드로 프로퍼티를 정의할 때 디스크립터 객체의 프로퍼티를 일부 생략하면 기본값이 아래와 같이 적용된다
// value = undefined, get = undefined, set = undefined, writable = false, enumerable = false, configurable = false
Object.defineProperty(person, 'lastName', {
    value: 'Park'
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
// firstName {value: "Jinwoong", writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Park", writable: false, enumerable: false, configurable: false}

// [[Enumerable]]의 값이 false인 경우
// 해당 프로퍼티는 for...in 문이나 Object.keys 등으로 열거할 수 없다.
// lastName 프로퍼티는 [[Enumerable]]의 값이 false이므로 열거되지 않는다.
console.log(Object.keys(person)); // ["firstName"]

// [[Writable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없다.
// lastName 프로퍼티는 [[Writable]]의 값이 false이므로 값을 변경할 수 없다.
// 이때 값을 변경하면 에러는 발생하지 않고 무시된다.
person.lastName = 'Kim';

// [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 삭제할 수 없다.
// lastName 프로퍼티는 [[Configurable]]의 값이 false이므로 삭제할 수 없다.
// 이때 프로퍼티를 삭제하면 에러는 발생하지 않고 무시된다.
delete person.lastName;

// [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 재정의할 수 없다.
// Object.defineProperty(person, 'lastName', { enumerable: true });
// Uncaught TypeError: Cannot redefine property: lastName

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Park", writable: false, enumerable: false, configurable: false}

// 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
    // getter 함수
    get() {
        return `${this.firstName} ${this.lastName}`;
    },
    // setter 함수
    set(name) {
        [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable: true,
    configurable: true
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
// fullName {get: ƒ, set: ƒ, enumerable: true, configurable: true}

person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 한번에 여러개 정의하고 싶을 경우 Object.defineProperties 사용
const person = {};

Object.defineProperties(person, {
    // 데이터 프로퍼티 정의
    firstName: {
        value: 'Jinwoong',
        writable: true,
        enumerable: true,
        configurable: true
    },
    lastName: {
        value: 'Park',
        writable: true,
        enumerable: true,
        configurable: true
    },
    // 접근자 프로퍼티 정의
    fullName: {
        // getter 함수
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        // setter 함수
        set(name) {
            [this.firstName, this.lastName] = name.split(' ');
        },
        enumerable: true,
        configurable: true
    }
});

person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}