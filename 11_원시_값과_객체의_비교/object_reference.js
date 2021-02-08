// 객체는 프로퍼티의 값에도 제약이 없으며 동적으로 추가되고 삭제될 수 있다.
// 따라서 객체는 원시 값과 같이 확보해야 할 메모리 공간의 크기를 사전에 정해둘 수 없다.
// 이러한 방식은 class 기반의 객체를 생성하는 C++이나 JAVA에 비해 프로퍼티 접근 비용이 높다
// 이를 해결하기위해 V8 엔진에서느느 동적 탐색법 대신 히든 클래스와 인라인 캐싱이라는 방법을 사용한다

// 객체는 변경 가능한 값이다.
// 객체를 할당한 변수가 기억하는 메모리 주소를 통해 메모리 공간에 접근하면 참조 값(referrence value)에 접근할 수 있다.
// 참조 값은 생성된 객체가 저장된 메모리 공간의 주소 그 자체다.
let person = {
    name: 'Lee'
};

// 할당이 이뤄지는 시점에 객체 리터럴이 해석되고, 그 결과 객체가 생성된다.
let person = {
    name: 'Lee'
};

// person 변수에 저장되어 있는 참조값으로 실제 객체에 접근해서 그 객체를 반환한다.
console.log(person); // {name: "Lee"}

// 원시 값은 변경 불가능한 값이므로 원시 값을 갖는 변수의 값을 변경하려면 재할당 외에는 방법이 없다.
// 하지만 객체는 변경 가능한 값으로 직접 객체를 변경할 수 있다.
// 재할당 없이 프로퍼티를 동적으로 추가할 수도 있고, 갱신할 수도 있으며, 프로퍼티를 삭제할 수도 있다.

// 프로퍼티 값 갱신
person.name = 'Kim';

// 프로퍼티 동적 생성
person.address = 'Seoul';

console.log(person); // {name: "Kim", address: "Seoul"}
// 객체를 할당한 변수의 참조 값은 변경되지 않는다.
// 객체는 여러개의 식별자가 하나의 객체를 공유할 수 있다는 특징이 있다.

const o = { x: { y: 1 } };

// 얕은 복사
// 한 단계까지만 복사
const c1 = { ...o }; // 35장 "스프레드 문법" 참고
console.log(c1 === o); // false
console.log(c1.x === o.x); // true

// lodash의 cloneDeep을 사용한 깊은 복사
// "npm install lodash"로 lodash를 설치한 후, Node.js 환경에서 실행
// 객체에 중첩되어 있는 객체까지 모두 복사
const _ = require('lodash');
// 깊은 복사
const c2 = _.cloneDeep(o);
console.log(c2 === o); // false
console.log(c2.x === o.x); // false

// 얕은 복사와 깊은 복사로 생성된 객체는 원본과는 다른 객체다. 즉, 원본과 복사본은 참조 값이 다른 별개의 객체다.
// 얕은 복사는 객체에 중첩되어 있는 객체의 경우 참조값을 복사하고, 깊은 복사는 객체에 중첩되어 있는 객체까지 모두 복사해서 원시 값처럼 완전한 복사본을 만드는 차이가 있다.

const v = 1;

// "깊은 복사"라고 부르기도 한다.
const c1 = v;
console.log(c1 === v); // true

const o = { x: 1 };

// "얕은 복사"라고 부르기도 한다.
const c2 = o;
console.log(c2 === o); // true

// 참조에 의한 전달
let person = {
    name: 'Lee'
};

// 참조값을 복사(얕은 복사)
// person의 참조 값을 복사해서 copy에 저장
let copy = person;
// -> 두 개의 식별자가 하나의 객체를 공유한다는 것
// 어느 한 쪽에서 객체를 변경하면 서로 영향을 주고 받는다.

// copy와 person은 동일한 객체를 참조한다.
console.log(copy === person); // true

// copy를 통해 객체를 변경한다.
copy.name = 'Kim';

// person을 통해 객체를 변경한다.
person.address = 'Seoul';

// copy와 person은 동일한 객체를 가리킨다.
// 따라서 어느 한쪽에서 객체를 변경하면 서로 영향을 주고 받는다.
console.log(person); // {name: "Kim", address: "Seoul"}
console.log(copy);   // {name: "Kim", address: "Seoul"}

// 결국 '값에 의한 전달'과 '참조에 의한 전달'은 식별자가 기억하는 메모리 공간에 저장되어 있는 값을 복사해서 전달한다는 면에서 동일하다.
// 실제로는 자바스크립트에는 '참조에 의한 전달'은 존재하지 않고 '값에 의한 전달'만이 존재한다고 할 수 있다. 변수에 저장되어 있는 값이 원시값이냐 참조값이냐의 차이만 있기 때문이다.

let person1 = {
    name: 'Lee'
};

let person2 = {
    name: 'Lee'
};
// === 일치 비교 연산자는 변수에 저장되어 있는 값을 타입 변환하지 않고 비교한다
// === 객체를 할당한 변수를 비교하면 참조 값을 비교하고, 원시 값을 할당한 변수를 비교하면 원시 값을 비교한다.
console.log(person1 === person2); // ① false - 객체의 내용은 같지만 다른 메모리에 저장되어있는 별개의 객체므로 false다. 참조 값이 전혀 다르기 때문.
console.log(person1.name === person2.name); // ② true - 프로퍼티 값을 참조하는 표현식은 '값'으로 평가될 수 있다. 두 표현식 모두 원시 값 'Lee'를 평가하기 때문에 원시값의 일치를 비교하여 true가 된다.
