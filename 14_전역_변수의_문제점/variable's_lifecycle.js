// 전역 변수를 '반드시' 사용해야 할 이유가 없다면 지역변수를 사용해야 한다.

// 변수는 선언 - 할당 - 해제를 통해 생명주기를 갖는다. 
// 전역 변수의 생명주기는 애플리케이션의 생명 주기와 같다.
// 지역 변수의 생명 주기는 함수의 생명 주기와 일치한다.
// 물론 함수가 생성한 스코프를 참조하고 있다면 생명주기가 일치하지 않을 수도 있다.(ex:클로저) 
function foo() {
    var x = 'local';
    console.log(x); // local
    return x;
}

foo();
console.log(x); // ReferenceError: x is not defined

var x = 'global';

function foo() {
  console.log(x); // undefined로 초기화, 호이스팅은 스코프를 단위로 동작한다.
  var x = 'local';
}

foo();
console.log(x); // global

// 전역 코드는 마지막 문이 실행되어 더 이상 실행할 문이 없을 때 종료한다.
// var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 된다. 즉 전역 객체의 생명주기와 일치한다.
