// break 는 레이블 문, 반복문, switch 문의 코드 블록을 탈출한다. 이외의 경우에는 SyntaxError 발생한다.
if (true) {
//    break; // Uncaught SyntaxError: Illegal break statement
}

// foo라는 레이블 식별자가 붙은 레이블 문
foo: console.log('foo');

// 레이블 문은 프로그램의 실행순서를 제어하는 데 사용, switch문의 case문과 default 문도 레이블 문
// foo라는 식별자가 붙은 레이블 블록문
foo: {
    console.log(1);
    break foo; // foo 레이블 블록문을 탈출한다.
    console.log(2);
}

console.log('Done!');

// 중첩 for 문의 탈출
// 내부 for문에서 break를 쓰면 외부 for문으로 탈출, 전체를 탈출하려면 레이블 문 이용
// outer라는 식별자가 붙은 레이블 for 문
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
        if (i + j === 3) break outer;
        console.log(`inner [${i}, ${j}]`);
    }
}

console.log('Done!');

// 문자열에서 특정 문자의 인덱스 검색에 활용하는 break
let string = 'Hello World.';
let search = 'l';
let index;

// 문자열은 유사배열이므로 for 문으로 순회할 수 있다.
for (let i = 0; i < string.length; i++) {
    // 문자열의 개별 문자가 'l'이면
    if (string[i] === search) {
        index = i;
        break; // 반복문을 탈출한다.
    }
}

console.log(index); // 2

// 참고로 String.prototype.indexOf 메서드를 사용해도 같은 동작을 한다.
console.log(string.indexOf(search)); // 2