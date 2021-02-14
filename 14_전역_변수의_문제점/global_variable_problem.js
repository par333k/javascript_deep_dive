// 1. 암묵적 결합implicit coupling
// 전역변수는 모든 코드가 전역 변수를 참조, 변경할 수 있는 암묵적 결합을 허용한다
// 따라서 가독성은 나빠지고 의도치 않게 상태가 변경될 수 있는 위험성도 높아진다

// 2. 긴 생명주기
// 전역 변수는 생명주기가 길어 메모리 리소스도 오랜 기간 소비한다
// 또한 var 키워드는 변수의 중복 선언을 허용하여 의도치 않은 재할당의 위험이 있다.
var x = 1;

// ...

// 변수의 중복 선언. 기존 변수에 값을 재할당한다.
var x = 100;
console.log(x); // 100

// 3. 스코프 체인 상에서 종점에 존재
// 전역 변수의 검색 속도가 가장 느리다. 가장 마지막에 검색되기 때문.

// 4. 네임스페이스 오염
// 자바스크립트의 가장 큰 문제점 중 하나는 파일이 분기되어 있다해도 하나의 전역 스코프를 공유한다는 것이다.
// 따라서 다른 파일 내에서 동일한 이름으로 명명된 전역 변수나 전역 함수가 같은 스코프 내에 존재할 경우 예상치 못한 결과를 가져올 수 있다.

// 전역 변수의 사용을 억제하는 방법 - 변수의 스코프는 좁을수록 좋다.

// 1. 즉시 실행 함수 - 모든 코드를 즉시 실행 함수로 감싸면 모든 변수는 즉시 실행 함수의 지역 변수가 된다
// 라이브러리 등에 자주 사용되는 기법

(function () {
    var foo = 10; // 즉시 실행 함수의 지역 변수
    // ...
  }());
  
  console.log(foo); // ReferenceError: foo is not defined

// 2. 네임스페이스 객체 
// 전역에 네임스페이스 역할을 담당할 객체를 생성하고 전역 변수처럼 사용하고 싶은 변수를 프로퍼티로 추가한다.
var MYAPP = {}; // 전역 네임스페이스 객체

MYAPP.name = 'Lee';

console.log(MYAPP.name); // Lee

// 계층적 구성도 가능
var MYAPP = {}; // 전역 네임스페이스 객체

MYAPP.person = {
  name: 'Lee',
  address: 'Seoul'
};

console.log(MYAPP.person.name); // Lee
// 네임스페이스 객체 자체가 전역 변수에 할당되므로 유용한 방법은 아니다.

// 3. 모듈 패턴
// 클로저를 기반으로 동작한다. 모듈 패턴의 특징은 전역 변수의 억제는 물론 캡슐화 까지 구현 가능하다.
// 캡슐화는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다.
// 모듈 패턴은 한정적으로 정보 은닉의 구현 또한 가능하다(캡슐화의 의미에서)
var Counter = (function () {
    // private 변수
    var num = 0;
  
    // 외부로 공개할 데이터나 메서드를 프로퍼티로 추가한 객체를 반환한다.
    // public member
    return {
      increase() {
        return ++num;
      },
      decrease() {
        return --num;
      }
    };
  }());
  
// private 변수는 외부로 노출되지 않는다.
console.log(Counter.num); // undefined
  
console.log(Counter.increase()); // 1
console.log(Counter.increase()); // 2
console.log(Counter.decrease()); // 1
console.log(Counter.decrease()); // 0

// 4. ES6 모듈
// ES6 모듈은 파일 자체의 독자적인 모듈 스코프를 제공한다.
// <script type="module" src="파일경로"> 로 활용 가능하다.
// 일반적으로 웹팩 등의 모듈 번들러를 사용하는 것이 일반적이다.
