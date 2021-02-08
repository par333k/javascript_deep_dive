// 원시 타입의 값은 변경 불가능한 값(immutable value), 한번 생성된 원시 값은 읽기 전용
// 원시 값은 변경 불가능하다는 말은 원시 값 자체를 변경할 수 없다는 것이지 변수 값을 변경할 수 없다는 것이 아니다.
// 변수는 언제든지 재할당을 통해 변수 값을 교체할 수 있다.
// 상수는 재할당이 금지된 변수다.

// const 키워드를 사용해 선언한 변수는 재할당이 금지된다. 상수는 재할당이 금지된 변수일 뿐이다.
const o = {};

// const 키워드를 사용해 선언한 변수에 할당한 원시값(상수)은 변경할 수 없다.
// 하지만 const 키워드를 사용해 선언한 변수에 할당한 객체는 변경할 수 있다.
o.a = 1;
console.log(o); // {a: 1}

// 원시 값의 불변성은 데이터의 신뢰성을 보장한다.

// 문자열은 0개 이상의 문자들로 이뤄진 집합이다.
let str1 = '';      // 0개의 문자로 이뤄진 문자열(빈 문자열)
let str2 = 'Hello'; // 5개의 문자로 이뤄진 문자열

// 자바스크립트는 원시 타입의 문자열 타입을 제공한다.
let str = 'Hello';
str = 'world'; // 식별자 str이 world의 주소를 가리키도록 변경된 것

let str = 'string';

// 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용해 각 문자에 접근할 수 있다.
// 유사 배열 객체란 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말한다.
// 원시 값을 객체처럼 사용하면 원시 값을 감싸는 래퍼 객체로 자동 변환된다.
console.log(str[0]); // s

// 원시 값인 문자열이 객체처럼 동작한다.
console.log(str.length); // 6
console.log(str.toUpperCase()); // STRING

// 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용해 각 문자에 접근할 수 있다.
// 하지만 문자열은 원시값이므로 변경할 수 없다. 이때 에러가 발생하지 않는다.
str[0] = 'S';

console.log(str); // string

let score = 80;

// copy 변수에는 score 변수의 값 80이 복사되어 할당된다.
// 원시 값에 의한 전달
let copy = score;

console.log(score, copy);    // 80  80
console.log(score === copy); // true

// score 변수와 copy 변수의 값은 다른 메모리 공간에 저장된 별개의 값이다.
// 따라서 score 변수의 값을 변경해도 copy 변수의 값에는 어떠한 영향도 주지 않는다.
score = 100;

console.log(score, copy);    // 100  80
console.log(score === copy); // false

// ECMAScript 사양에서는 변수를 통해 메모리를 어떻게 관리해야 하는지 명확하게 정의되어 있지 않다.
// 따라서 실제로는 원시 값을 갖는 변수를 할당하는 시점에서는 두 변수가 같은 원시 값을 참조하다가 어느 한 쪽 변수에 재할당이 이뤄졌을 때 비로소 새 메모리 공간에 재할당된 값을 저장할 수도 있다.
// 엄격하게 표현하면 변수에는 값이 전달 되는 것이 아니라 메모리 주소가 전달된다. 이는 변수와 같은 식별자는 값이 아니라 메모리 주소를 기억하고 있기 때문이다.
// 식별자는 메모리 주소에 붙인 이름이다.

// 숫자리터럴 10에 의해 생성된 원시 값 10이 저장된 메모리 공간의 주소를 x라는 식별자에 전달
let x = 10;
// 식별자 표현식으로서 숫자 값 80으로 평가되는데, 평가 방식은 두 가지가 있을 수 있다.
// 1. 새로운 80을 생성(복사)해서 메모리 주소를 전달. 할당 시점에 두 변수가 기억하는 메모리 주소가 다르다
// 2. score의 80값 메모리 주소를 그대로 전달. 할당 시점에 두 변수가 기억하는 메모리 주소가 같다.
let copy = score;

// 값에 의한 전달도 사실은 값을 전달하는 것이 아니라 메모리 주소를 전달. 단 , 전달된 메모리 주소를 통해 메모리 공간에 접근하면 값을 참조할 수 있다.
// 원시값을 갖는 변수를 할당하면, 결국은 시점에 관계없이 두 변수의 원시 값은 서로 다른 메모리 공간에 저장된 별개의 값이 되어 어느 한 쪽에서 재할당을 통해 값을 변경해도 서로 간섭할 수 없다.
