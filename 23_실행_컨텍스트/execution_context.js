// 실행 컨텍스트를 생성하는 4가지 타입의 소스 코드
// 1. 전역 코드 : 전역에 존재하는 소스코드를 말한다. 전역에 정의된 함수, 클래스 등의 내부 코드는 미포함
// 전역 실행 컨텍스트 생성
// 2. 함수 코드 : 함수 내부에 존재하는 소스코드를 말한다. 함수 내부에 중첩된 함수, 클래스 등의 내부 코드는 포함되지 않는다.
// 함수 실행 컨텍스트 생성
// 3. eval 코드 : 빌트인 전역 함수인 eval 함수에 인수로 전달되어 실행되는 소스코드를 말한다.
// eval 실행 컨텍스트 생성
// 4. 모듈 코드 : 모듈 내부에 존재하는 소스코드를 말한다. 모듈 내부의 함수, 클래스 등의 내부 코드는 포함되지 않는다.
// 모듈 실행 컨텍스트 생성

// 자바스크립트는 소스코드를 평가와 실행 두 과정으로 나누어 처리한다
// 평가 과정에서는 실행 컨텍스트를 생성하고 변수, 함수 등의 선언문만 먼저 실행하여 실행 컨텍스트가 관리하는 스코프에 등록한다.
// 평가 과정이 끝나면 선언문을 제외한 소스코드가 순차적으로 실행되는 런타임이 실행되고, 변수 값의 변경 등 소스코드의 실행결과는 다시 실행 컨텍스트가 관리하는 스코프에 등록된다.

var x;
x = 1;
// 평가과정에서 var x 실행하고 스코프에 등록, undefined로 초기화
// 평가과정이 끝나면 실행과정에서 변수할당문 x = 1;만 실행, x가 등록된 변수인지 스코프에서 확인. 값을 할당.

// 전역 변수 선언
const x = 1;
const y = 2;

// 함수 정의
function foo(a) {
    // 지역 변수 선언
    const x = 10;
    const y = 20;

    // 메서드 호출
    console.log(a + x + y); // 130
}

// 함수 호출
foo(100);

// 메서드 호출
console.log(x + y); // 3


// 실행 컨텍스트는 소스코드를 실행하는 데 필요한 환경을 제공하고 코드의 실행결과를 실제로 관리하는 영역이다.
// 코드가 실행되려면 다음과 같이 스코프, 식별자, 코드 실행 순서 등의 관리가 필요하다.
// 실행 컨텍스트는 식별자(변수, 함수, 클래스 등의 이름)를 등록하고 관리하는 스코프와 코드 실행 순서 관리를 구현한 내부 메커니즘으로
// 모든 코드는 실행 컨텍스트를 통해 실행되고 관리된다.
// 식별자와 스코프는 실행 컨텍스트의 렉시컬 환경으로 관리하고, 코드 실행순서는 실행 컨텍스트 스택으로 관리한다

// 실행 컨텍스트 스택 (stack 자료구조로 관리됨)
const x = 1;

function foo () {
    const y = 2;

    function bar () {
        const z = 3;
        console.log(x + y + z);
    }
    bar();
}

foo(); // 6

// 스택 순서 : 전역 컨텍스트 -> foo 함수 실행 컨텍스트 -> bar 함수 실행 컨텍스트
// pop은 스택 특성상 반대로 bar->foo->전역

// 1. 전역 변수 x와 foo 함수는 전역 실행컨텍스트에 등록. 전역 변수 x에 값이 할당되고 함수 foo가 호출
// 2. foo 호출 시 전역 코드의 실행은 중단, 코드의 제어권이 foo 함수 내부로 이동
// foo 함수 내부 코드를 평가하여 foo 함수 실행 컨텍스트를 생성하고 스택에 push
// 함수의 지역 변수 y와 중첩함수 bar가 foo 함수 실행컨텍스트에 등록. y에 값이 할당되고 bar가 호출
// 3. foo 함수의 코드 실행은 잠깐 중단되고 코드의 제어권이 bar 함수 내부로 이동.
// 마찬가지로 bar 함수 내부 코드 평가 및 bar 함수 실행 컨텍스트 생성 및 스택에 푸시
// bar의 함수 지역 변수 z가 bar 함수 실행컨텍스트에 등록, bar 실행, z에 값 할당 및 console.log 호출 후 종료
// 4. foo 함수로 복귀 및 foo 종료
// 5. 전역 코드로 제어권 이동.
// 결론: 실행컨텍스트 스택은 코드의 실행 순서를 관리.  실행 컨텍스트 스택의 최상위에 존재하는 실행 컨텍스트는 언제나 현재 실행중인 코드의 컨텍스트

// 렉시컬 환경
// 렉시컬 환경은 식별자와 식별자에 바인딩 된 값, 그리고 상위 스코프에 대한 참조를 기록하는 자료구조로 실행 컨텍스트를 구성하는 컴포넌트다.
// 키와 값을 갖는 객체 형태의 스코프(전역, 함수, 블록 스코프)를 생성하여 식별자를 키로 등록하고 식별자에 바인딩된 값을 관리한다.
// 렉시컬 환경은 스코프를 구분하여 식별자를 등록하고 관리하는 저장소 역할을 하는 렉시컬 스코프의 실체다
// 실행 컨텍스트는 LexicalEnvironment 컴포넌트와 VariableEnvironment 컴포넌트로 구성된다.
// 두 컴포넌트는 strict mode, eval 코드, try/catch 문 과 같은 특수한 상황 및 어떤 상황에 따라서는
// 두 컴포넌트의 내용이 달라지는 경우도 있을 수 있다.

// 렉시컬 환경으로 두 컴포넌트를 통일해 고려할 경우 환경 레코드와 외부 렉시컬 환경에 대한 참조 두 가지로 구성된다.
// 1. 환경 레코드Environment_Record : 스코프에 포함된 식별자를 등록하고 식별자에 바인딩된 값을 관리하는 저장소
// 환경 레코드는 소스코드의 타입에 따라 관리하는 내용에 차이가 있다.
// 2. 외부 렉시컬 환경에 대한 참조Outer_Lexical_Environment_Reference : 외부 렉시컬 환경에 대한 참조는 상위 스코프를 가리킨다.
// 상위 스코프란 외부 렉시컬 환경, 즉 해당 실행 컨텍스트를 생성한 소스코드를 포함하는 상위 코드의 렉시컬 환경을 말한다.
// 외부 렉시컬 환경에 대한 참조를 통해 단방향 링크드 리스트인 스코프 체인을 구현한다.


