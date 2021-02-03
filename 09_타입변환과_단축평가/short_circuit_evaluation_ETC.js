// 단축 평가
// 논리합(||) 또는 논리곱(&&) 연산자 표현식의 평가 결과는 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다.

// 좌항에서 우항으로 평가 진행.
'Cat' && 'Dog' // -> "Dog"
'Cat' || 'Dog' // -> "Cat"

// && 는 좌항이 truthy 값이므로 논리 연산의 결과를 결정하는 두 번째 피연산자를 반환
// || 는 둘 중 하나만 true 여도 true를 반환하므로 Cat을 반환
// 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환하는 것을 단축 평가라고 한다.

// 논리합(||) 연산자
'Cat' || 'Dog'  // -> "Cat"
false || 'Dog'  // -> "Dog"
'Cat' || false  // -> "Cat"

// 논리곱(&&) 연산자
'Cat' && 'Dog'  // -> "Dog"
false && 'Dog'  // -> false
'Cat' && false  // -> false

// 단축평가를 이용해 if문을 대체
let done = true;
let message = '';

// 주어진 조건이 true일 때
if (done) message = '완료';

// if 문은 단축 평가로 대체 가능하다.
// done이 true라면 message에 '완료'를 할당
message = done && '완료';
console.log(message); // 완료

// 주어진 조건이 false일 때
if (!done) message = '미완료';

// if 문은 단축 평가로 대체 가능하다.
// done이 false라면 message에 '미완료'를 할당
message = done || '미완료';
console.log(message); // 미완료

// 객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때
let elem = null;
let value = elem.value; // TypeError: Cannot read property 'value' of null

// 단축평가 사용시 에러가 나지 않는다
// elem이 null이나 undefined와 같은 Falsy 값이면 elem으로 평가되고
// elem이 Truthy 값이면 elem.value로 평가된다.
let value = elem && elem.value; // -> null

// 함수 매개변수에 기본값을 설정할 때
// 인수를 전달하지 않아 매개변수에 undefined가 할당될 때 매개변수의 기본값을 단축 평가를 사용해 설정하면 에러 방지 가능
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
    str = str || '';
    return str.length;
}

getStringLength();     // -> 0
getStringLength('hi'); // -> 2

// ES6의 매개변수의 기본값 설정
function getStringLength(str = '') {
    return str.length;
}

getStringLength();     // -> 0
getStringLength('hi'); // -> 2

// 옵셔널 체이닝 연산자 ?. 는 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
// 프로퍼티 참조란 객체의 프로퍼티에 접근해 프로퍼티 값을 참조하는 것.
let elem = null;

// elem이 null 또는 undefined이면 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
let value = elem?.value;
console.log(value); // undefined

// 옵셔널 체이닝 연산자 도입 이전에는 논리 연산자 && 이용
// elem이 Falsy 값이면 elem으로 평가되고 elem이 Truthy 값이면 elem.value로 평가된다.
let value = elem && elem.value;
console.log(value); // null

// &&는 좌항이 falsy면 좌항 피연산자를 그대로 반환, 0 이나 ''는 객체로 평가될 때도 있다.
let str = '';

// 문자열의 길이(length)를 참조한다.
let length = str && str.length;

// 문자열의 길이(length)를 참조하지 못한다.
console.log(length); // ''


// 문자열의 길이(length)를 참조한다. ?.는 좌항 피연산자가 false로 평가되는 Falsy 값이라도
// null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.
let length = str?.length;
console.log(length); // 0

// null 병합 연산자 ?? 는 좌항의 연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고 그렇지 않으면 좌항의 피연산자를 반환
// ?? 는 변수에 기본값을 설정할 때 유용
// 좌항의 피연산자가 null 또는 undefined이면 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.
let foo = null ?? 'default string';
console.log(foo); // "default string"

// ?? 도입 이전에는 || 를 사용한 단축 평가로 기본 값 설정.
// Falsy 값인 0이나 ''도 기본값으로서 유효하다면 예기치 않은 동작이 발생할 수 있다. 좌항을 반환하길 기대하지만 우항을 반환할 수 있음.
let foo = '' || 'default string';
console.log(foo); // "default string"

// null 병합 연산자 ?? 는 좌항의 피연산자가 falsy값이라도도null 또는 undefined가 아니면 좌항 피연산자를 그대로 반환
// 좌항의 피연산자가 Falsy 값이라도 null 또는 undefined이 아니면 좌항의 피연산자를 반환한다.
let foo = '' ?? 'default string';
console.log(foo); // ""