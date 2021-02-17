// 내부 슬롯과 내부 메서드
// 내부 슬롯과 내부 메서드는 ECMAScript 사양에서 사용하는 의사 프로퍼티pseudo property와 의사 메서드pseudo method다
// ECMAScript 사양에 [[...]] 로 감싸져있다.
// 내부 슬롯과 내부 메서드는 직접적으로 호출하거나 접근할 수 없는게 원칙
// 일부에 한해 간접적 접근의 수단을 줌
// 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖는다. 이 경우 내부 슬롯이지만 __proto__를 통해 간접적 접근이 가능하다.

const o = {};

// 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근할 수 없다.
//o.[[Prototype]] // -> Uncaught SyntaxError: Unexpected token '['
// 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.
o.__proto__ // -> Object.prototype

// 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본 값으로 자동 정의한다
// 프로퍼티의 상태란 값value, 값의 갱신 여부writable, 열거 가능 여부enumerable, 재정의 가능 여부configurable을 말한다
// 내부 상태 값meta-property인 내부 슬롯 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]이다.
// 직접 접근은 불가능 하지만 Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인 가능하다.

const person = {
    name: 'Lee'
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
// 첫 번째 매개변수에는 객체의 참조를 전달, 두 번째 매개변수에는 프로퍼티 키를 전달
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: "Lee", writable: true, enumerable: true, configurable: true} => Property Descriptor 객체

// ES8 이후에는 Object.getOwnPropertyDescriptors 메서드가 도입되어 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
const person = {
    name: 'Lee'
};

// 프로퍼티 동적 생성
person.age = 20;

// 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: true},
  age: {value: 20, writable: true, enumerable: true, configurable: true}
}
*/

