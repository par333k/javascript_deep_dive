// 전역에 strict mode를 적용하는 것은 피하자
// 전역에 작용한 strict mode는 스크립트 단위로 적용된다.
`<!DOCTYPE html>
<html>
<body>
  <script>
    'use strict';
  </script>
  <script>
    x = 1; // 에러가 발생하지 않는다.
    console.log(x); // 1
  </script>
  <script>
    'use strict';

    y = 1; // ReferenceError: y is not defined
    console.log(y);
  </script>
</body>
</html>`
// strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다.
// 특히 외부 서드파티 라이브러리를 사용하는 경우 라이브러리가 non-strict mode 인 경우도 있기 때문에 전역 사용은 주의해야한다.
// 이러한 경우 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용한다.
// 즉시 실행 함수의 선두에 strict mode 적용
(function () {
    'use strict';

    // Do something...
}());

// 함수 단위로 strict mode 적용도 피하자
// 모든 함수에 일일히 strict mode를 적용하는 것은 번거롭고
// strict mode가 적용된 함수가 참조할 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제가 발생할 수 있다.
(function () {
    // non-strict mode
    var lеt = 10; // 에러가 발생하지 않는다.

    function foo() {
        'use strict';

//        let = 20; // SyntaxError: Unexpected strict mode reserved word
    }
    foo();
}());

// 따라서 strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

// strict mode 에러의 대표적 사례
// 1. 암묵적 전역
(function () {
    'use strict';

    x = 1;
    console.log(x); // ReferenceError: x is not defined
}());

// 2. 변수, 함수, 매개변수의 삭제
// delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError 발생
(function () {
    'use strict';

    var x = 1;
//    delete x;
    // SyntaxError: Delete of an unqualified identifier in strict mode.

    function foo(a) {
//        delete a;
        // SyntaxError: Delete of an unqualified identifier in strict mode.
    }
//    delete foo;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
}());

// 3. 매개변수 이름의 중복
// 중복된 매개변수 이름 사용시 SyntaxError 발생
(function () {
    'use strict';

    //SyntaxError: Duplicate parameter name not allowed in this context
//    function foo(x, x) {
//        return x + x;
//    }
    console.log(foo(1, 2));
}());

// 4. with 문의 사용
// with 문은 전달된 객체를 스코프 체인에 추가한다. 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서
// 코드가 간단해지지만 성능과 가독성이 나빠진다. with는 사용하지 않는 편이 좋다.
(function () {
    'use strict';

    // SyntaxError: Strict mode code may not include a with statement
//    with({ x: 1 }) {
//        console.log(x);
//    }
}());


// strict mode 적용에 따른 변화

// 1. 일반 함수의 this
// strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩 된다.
// 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다. 이 때 에러는 발생하지 않는다.
(function () {
    'use strict';

    function foo() {
        console.log(this); // undefined
    }
    foo();

    function Foo() {
        console.log(this); // Foo
    }
    new Foo();
}());

// 2. arguments 객체
// strict mode 에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.
(function (a) {
    'use strict';
    // 매개변수에 전달된 인수를 재할당하여 변경
    a = 2;

    // 변경된 인수가 arguments 객체에 반영되지 않는다.
    console.log(arguments); // { 0: 1, length: 1 }
}(1));