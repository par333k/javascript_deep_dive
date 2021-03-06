// 실행 컨텍스트의 생성과 식별자 검색 과정

var x = 1; // 선언, 초기화 동시 진행. 평가 시점에 객체 환경에 바인딩 된 BindingObject를 통해 전역 객체이 변수 식별자 키로 등록, 암묵적 undefined 바인딩
const y = 2; // global.y 또는 window.y 처럼 전역 객체의 프로퍼티로서 참조할 수 없다. const의 경우 선언과 초기화가 분리되어 진행된다.

function foo (a) { // 동일한 이름의 식별자를 객체 환경 레코드에 바인딩된 BindingObject를 통해 전역 객체에 키로 등록하고 생성된 함수 객체를 즉시 할당
    var x = 3;
    const y = 4;

    function bar (b) {
        const z = 5;
        console.log(a + b + x + y + z);
    }
    bar(10);
}

foo(20); // 42

// 전역 객체 생성
// 전역 객체는 전역 코드가 평가되기 이전에 생성
// 전역 객체 역시 프로토타입 체인의 일원
// Object.prototype.toString
window.toString(); // -> "[object Window]"

window.__proto__.__proto__.__proto__.__proto__ === Object.prototype; // -> true

// 전역 코드 평가
// 1. 전역 실행 컨텍스트 생성을 위해 비어 있는 전역 실행 컨텍스트를 생성하여 실행 컨텍스트 스택에 푸시
// 2. 전역 렉시컬 환경을 생성하고 전역 실행 컨텍스트에 바인딩
// 2.1 전역 환경 레코드 생성, 전역 변수를 관리하는 전역 스코프, 전역 객체의 빌트인 전역 프로퍼티와 빌트인 전역 함수, 표준 빌트인 객체를 제공.
// 전역 환경 레코드는 객체 환경 레코드와 선언적 환경 레코드로 구성되어 있다.
// 객체 환경 레코드는 기존의 전역 객체가 관리하던 var 키워드로 선언한 전역 변수와 함수 선언문으로 정의한 전역 함수, 빌트인 전역 프로퍼티와
// 빌트인 전역 함수, 표준 빌트인 객체를 관리
// 선언적 환경 레코드는 let, const 키워드로 선언한 전역 변수를 관리.
// 두 레코드는 서로 협력하여 전역 스코프와 전역 객체(전역 변수의 전역 객체 프로퍼티화)를 관리한다.
// 2.1.1 객체환경 레코드 생성, 객체 환경 레코드는 BindingObject 라고 부르는 객체와 연결된다.
// BindingObject는 "전역 객체 생성"에서 생성된 전역 객체이다.
// 전역 코드 평가 과정에서 var키워드로 선언한 전역 변수와 함수 선언문으로 정의된 전역 함수는 전역 환경 레코드의 객체 환경 레코드에 연결된
// BindingObject를 통해 전역 객체의 프로퍼티와 메서드가 된다.
// 2.1.2 선언적 환경 레코드 생성, let, const 로 선언한 전역변수는 선언적 환경 레코드에 등록 및 관리된다
let foo = 1; // 전역 변수

{
    // let, const 키워드로 선언한 변수가 호이스팅되지 않는다면 전역 변수를 참조해야 한다.
    // 런타임에 컨트롤이 변수 선언문에 도달하기 전까지 일시적 사각지대에 빠진다.
    // let 키워드로 선언한 변수도 여전히 호이스팅이 발생하기 때문에 참조 에러(ReferenceError)가 발생한다.
    console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
    let foo = 2; // 지역 변수
}

// 2.2 this바인딩, 전역 환경 레코드의 [[GlobalThisValue]] 내부 슬롯에 this가 바인딩된다
// 전역 코드에서 this를 참조하면 전역 환경 레코드의 [[GlobalThisValue]] 내부 슬롯에 바인딩되어 있는 객체가 반환된다.
// 객체 환경 레코드와 선언적 환경 레코드에는 this 바인딩이 없다. this 바인딩은 전역환경/함수환경 레코드에만 존재한다.
// 2.3 외부 렉시컬 환경에 대한 참조 결정, 현재 평가중인 소스코드는 전역코드로, 전역 코드를 포함하는 소스코드는 없으므로
// 전역 렉시컬 환경의 외부 렉시컬 환경에 대한 참조는 null이 할당된다. 이는 전역 렉시컬 환경이 스코프체인의 종점에 존재함을 의미한다.

// 전역 코드 실행
// 변수 할당문 또는 함수 호출문을 실행하려면 이름이 선언된 식별자인지 확인해야한다.
// 식별자는 스코프가 다르면 같은 이름을 가질 수 있다.
// 어느 스코프의 식별자를 참조하면 되는지 결정하는 것을 식별자 결정identifier_resolution이라 한다.
// 식별자 결정을 위해 식별자를 검색할 때는 실행중인 실행 컨텍스트에서 식별자를 검색하기 시작한다.
// 선언된 식별자는 실행 컨텍스트의 렉시컬 환경의 환경 레코드에 등록되어 있다.
// 실행중인 실행 컨텍스트의 렉시컬 환경에서 식별자를 검색할 수 없다면 외부 렉시컬 환경에 대한 참조가 가리키는 렉시컬환경,
// 즉 상위 스코프로 이동하여 식별자를 검색한다. 이것이 스코프 체인의 동작 원리이다.
// 전역에서 찾지 못한다면 스코프 체인의 종점이므로 참조 에러를 발생시킨다.

// foo 함수 코드 평가
// 현재 실행 컨텍스트가 foo 함수를 호출하기 직전이라고 가정
var x = 1;
const y = 2;

function foo (a) {
    var x = 3;
    const y = 4;

    function bar (b) {
        const z = 5;
        console.log(a + b + x + y + z);
    }
    bar(10);
}

foo(20); // ← 호출 직전
// 1. 함수 실행 컨텍스트 생성
// foo 함수 실행 컨텍스트는 실행 컨텍스트 스택의 최상위인 실행 중인 실행 컨텍스트가 된다.
// 2. foo 함수 렉시컬 환경을 생성하고 foo 함수 실행 컨텍스트에 바인딩한다.
// 2.1 함수 렉시컬 환경을 구성하는 컴포넌트 중 하나인 함수 환경 레코드는 매개변수, arguments객체, 함수 내부에서 선언한 지역변수나 중첩함수를 등록 및 관리한다.
// 2.2 함수 환경 레코드의 [[ThisValue]]내부 슬롯에 this가 바인딩된다.
// 2.3 외부 렉시컬 환경에 대한 참조 결정, foo 는 전역 코드에 정의된 전역함수 이므로 외부 렉시컬 환경에 대한 참조에는 전역 렉시컬 환경의 참조가 할당된다.
// 자바스크립트는 함수를 어디서 호출했는지가 아니라 어디에 정의했는지에 따라 상위 스코프를 결정하고, 상위 스코프를 기억한다.
// 함수 객체의 내부 슬롯 [[Environment]]에 렉시컬 환경의 참조가 저장된다.

// foo 함수 코드 실행
// 매개변수에 인수가 할당되고, 변수 할당문이 실행되어 지역변수 x,y에 값이 할당된다. 함수 bar가 호출된다.
// 식별자 결정을 위해 실행중인 실행 컨텍스트의 렉시컬 환경에서 식별자를 검색하기 시작한다.
// 검색된 식별자에 값을 바인딩한다

// bar 함수코드 평가
var x = 1;
const y = 2;

function foo (a) {
    var x = 3;
    const y = 4;

    function bar (b) {
        const z = 5;
        console.log(a + b + x + y + z);
    }
    bar(10); // ← 호출 직전
}

foo(20);
// bar 함수가 호출되면 함수 내부로 코드의 제어권이 이동한다.
// foo와 동일한 방식으로 함수 내부가 평가된다.
// bar 함수 코드의 소스코드가 런타임에서 순차적으로 실행된다
// console 식별자를 스코프 체인에서 검색한다.
// console 식별자는 bar 함수 렉시컬 환경에 없으므로, 최상위까지 스코프를 타고 올라가 BindingObject를 통해 전역 객체에서 찾는다
// console 식별자에 바인딩된 객체인 console 객체에서 log 메서드를 검색한다.
// console의 프로토타입 체인을 통해 직접 소유하는 log 메서드를 찾는다.
// 표현식을 평가한다(a + b + x + y + z)
// console.log 메서드에 평가한 표현식의 값을 전달하여 호출한다
// bar 함수 코드가 실행 종료된다. foo 실행 컨텍스트가 실행중인 실행 컨텍스트가 된다
// 이 때, bar 함수 렉시컬 환경이 즉시 소멸하지 않는다. 누군가 bar 함수 렉시컬 환경을 참조하고 있다면 가비지 컬렉터에 의해 소멸되지 않는다.
// 모든 객체와 값이 그렇듯 참조가 되지 않을 때 비로소 소멸한다.
// bar 함수가 종료되면 foo 함수 역시 이어서 종료된다.
// 최종적으로 전역 코드 실행이 종료된다


// 실행 컨텍스트와 블록 레벨 스코프
// let 과 const 키워드로 선언한 변수는 모든 코드블록을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다
let x = 1;

if (true) { // 실행 시 if 문을 위한 블록 레벨 스코프 생성.
    // if문의 코드 블록을 위한 렉시컬 환경의 외부 렉시컬 환경에 대한 참조는 if 문이 실행되기 이전의 전역 렉시컬 환경을 가리킨다.
    let x = 10;
    console.log(x); // 10
}
// if문 코드블록의 실행이 종료되면 if문의 코드 블록이 실행되기 이전의 렉시컬 환경으로 되돌린다.
console.log(x); // 1

// for 문의 변수 선언문에 let 키워드를 사용한 for문은 코드 블록이 반복해서 실행될 때마다 코드블록을 위한 새로운 렉시컬 환경을 생성한다.
