// strict mode란?
function foo() {
    x = 10;
}
foo();

console.log(x); // ?
// foo 함수 내에서 선언하지 않은 x에 값 10 할당
// 엔진은 x 변수가 어디서 선언되었는지 스코프 체인을 통해 검색
// foo 함수 스코프 -> 상위스코프인 전역스코프 -> 없어서 레퍼런스 에러 발생을 기대하지만,
// 자바스크립트 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성한다. 마치 전역 변수처럼 사용할 수 있도록
// 이러한 현상을 암묵적 전역implicit global 이라 한다.
// 암묵적 전역은 오류를 발생시킬 수 있는 원인이 될 가능성이 크다. 따라서 반드시 var, let, const 키워드를 사용해야한다.
// strict mode 는 ES5에서 도입되었으며 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여
// 오류 발생 가능성이 높거나 최적화 작업에 문제가 있는 코드에 대한 명시적인 에러를 발생시킨다
// ESLint 같은 린트 도구를 사용해도 유사한 효과를 얻을 수 있다.
// strict mode 보다 ESLint가 코딩 컨벤션의 설정과 강제라는 측면까지 더하면 장점이 더 많다.

// strict mode의 적용
// 전역의 선두, 또는 함수 몸체 선두에 'use strict';를 추가한다.
// 전역의 선두에 추가하면 스크립트 전체에 strict 모드가 적용된다.
'use strict';

function foo() {
    x = 10; // ReferenceError: x is not defined
}
foo();

// 함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수에 strict mode가 적용된다
function foo() {
    'use strict';

    x = 10; // ReferenceError: x is not defined
}
foo();

// 코드의 선두에 'use strict'; 를 위치시키지 않으면 제대로 동작하지 않는다.
function foo() {
    x = 10; // 에러를 발생시키지 않는다.
    'use strict';
}
foo();
