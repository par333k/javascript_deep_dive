// javascript에서는 원시값을 제외한 나머지 값은 모두 객체다
// 객체는 변경 가능한 값mutable value
// 객체는 프로퍼티와 메서드로 구성된 집합체.
// 프로퍼티: 객체의 상태를 나타내는 값
// 메서드: 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작 - 프로퍼티의 값이 함수일 때
// 자바스크립트의 객체 생성 방법 : 객체 리터럴, Object 생성자 함수, 생성자 함수, Object.create 메서드, 클래스(ES6)

// 객체 리터럴로 객체 선언 - 중괄호 내에 프로퍼티가 있으면 생성
// 해당 중괄호는 코드블럭이 아니기 때문에 끝에 세미콜론을 붙인다.
let person = {
    name: 'Lee',
    sayHello: function () {
        console.log(`Hello! My name is ${this.name}.`);
    }
};

console.log(typeof person); // object
console.log(person); // {name: "Lee", sayHello: ƒ}

// 프로퍼티를 정의하지 않으면 빈 객체
let empty = {}; // 빈 객체
console.log(typeof empty); // object

let person = { // 프로퍼티 키: 빈 문자열을 포함하는 모든 문자열 또는 심벌 값, 프로퍼티 값: 자바스크립트에서 사용할 수 있는 모든 값
    // 프로퍼티 키는 name, 프로퍼티 값은 'Lee'
    name: 'Lee',
    // 프로퍼티 키는 age, 프로퍼티 값은 20
    age: 20
};

//식별자 네이밍 규칙을 따르지 않으면 따옴표 등으로 묶어야 한다
let person = {
    firstName: 'Ung-mo', // 식별자 네이밍 규칙을 준수하는 프로퍼티 키
    'last-name': 'Lee'   // 식별자 네이밍 규칙을 준수하지 않는 프로퍼티 키
};

console.log(person); // {firstName: "Ung-mo", last-name: "Lee"}

let person = {
    firstName: 'Ung-mo',
//    last-name: 'Lee' // SyntaxError: Unexpected token -
};

// 문자열 또는 문자열로 평가할 수 있는 표현식을 사용해 프로퍼티 키를 동적 생성이 가능
// 이 때는 프로퍼티 키로 사용할 표현식을 대괄호[...] 로 묶어야 한다.
let obj = {};
let key = 'hello';

// ES5: 프로퍼티 키 동적 생성
obj[key] = 'world';
// ES6: 계산된 프로퍼티 이름
// var obj = { [key]: 'world' };

console.log(obj); // {hello: "world"}

// 빈 문자열을 프로퍼티 키로 사용할 수 있지만 키로서 의미가 없기에 권장하지 않는다
let foo = {
    '': ''  // 빈 문자열도 프로퍼티 키로 사용할 수 있다.
};

console.log(foo); // {"": ""}

// 프로퍼티 키에 문자열이나 심벌 값 외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 된다
let foo = {
    0: 1,
    1: 2,
    2: 3
};

console.log(foo); // {0: 1, 1: 2, 2: 3}

// 예악어도 프로퍼티 키 사용이 가능하지만 예상치 못한 에러가 생길 수 있으니 권장하지 않는다
let foo = {
    var: '',
    function: ''
};

console.log(foo); // {var: "", function: ""}

// 이미 존재하는 프로퍼티 키를 중복선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다.
// 이 때 에러가 나지 않는 부분을 주의하자
let foo = {
    name: 'Lee',
    name: 'Kim'
};

console.log(foo); // {name: "Kim"}

// 메서드 - 객체에 묶여있는 함수
let circle = {
    radius: 5, // ← 프로퍼티

    // 원의 지름
    getDiameter: function () { // ← 메서드
        return 2 * this.radius; // this는 circle을 가리킨다.
    }
};

console.log(circle.getDiameter()); // 10