// 프로퍼티 접근방식 : 마침표 표기법(.) 과 대괄호 표기법([...])
let person = {
    name: 'Lee'
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법에 의한 프로퍼티 접근
// 대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 한다.
console.log(person['name']); // Lee
// console.log(person[name]); - ReferenceError: name is not defined
// 객체에 존재하지 않느 프로퍼티에 접근하면 undefined를 반환, 에러가 발생하지 않는다.
console.log(person.age); // undefined
// 프로퍼티키가 식별자 네이밍 규칙을 준수하지 않는 이름이라면 반드시 대괄호 표기법을 사용해야한다. 단, 프로퍼티 키가 숫자로 이뤄진 문자열일경우 따옴표 생략이 가능하다.
let person = {
    'last-name': 'Lee',
    1: 10
};

//person.'last-name';  // -> SyntaxError: Unexpected string
person.last-name;    // -> 브라우저 환경: NaN -> name 이라는 window 객체의 프로퍼티가 존재해서 undefined - '' 로 평가
                     // -> Node.js 환경: ReferenceError: name is not defined -> name이라는 식별자가 선언이 없으므로 ref error
person[last-name];   // -> ReferenceError: last is not defined
person['last-name']; // -> Lee

// 프로퍼티 키가 숫자로 이뤄진 문자열인 경우 따옴표를 생략할 수 있다.
//person.1;     // -> SyntaxError: Unexpected number
//person.'1';   // -> SyntaxError: Unexpected string
person[1];    // -> 10 : person[1] -> person['1']
person['1'];  // -> 10