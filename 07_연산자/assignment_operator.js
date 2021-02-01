// 할당 연산자는 우항에 있는 피연산자의 평가 결과를 좌항에 있는 변수에 할당한다.
// 할당 연산자는 좌항의 변수에 값을 할당하므로 변수 값이 변하는 부수 효과가 있다.

let x;

x = 10;
console.log(x); // 10

x += 5; // x = x + 5;
console.log(x); // 15

x -= 5; // x = x - 5;
console.log(x); // 10

x *= 5; // x = x * 5;
console.log(x); // 50

x /= 5; // x = x / 5;
console.log(x); // 10

x %= 5; // x = x % 5;
console.log(x); // 0

let str = 'My name is ';

// 문자열 연결 연산자
str += 'Lee'; // str = str + 'Lee';
console.log(str); // 'My name is Lee'


// 할당문은 표현식인 문이다.
console.log(x = 10); // 10

// 할당문은 값으로 평가되는 표현식인 문으로서 할당된 값으로 평가된다.
// 여러 변수에 동일한 값을 연쇄 할당할 수 있다.

let a, b, c;

// 연쇄 할당. 오른쪽에서 왼쪽으로 진행.
// ① c = 0 : 0으로 평가된다
// ② b = 0 : 0으로 평가된다
// ③ a = 0 : 0으로 평가된다
a = b = c = 0;

console.log(a, b, c); // 0 0 0