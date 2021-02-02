// 반복문은 조건식의 평가 결과가 참인 경우 코드 블록을 실행한다. 조건식이 거짓일 때까지 반복된다.

// 순서는 변수 i 선언문, 조건식, 블록실행, 증감식으로 선언문은 최초 1회만 선언.
for (let i = 0; i < 2; i++) {
    console.log(i);
}

// 무한루프 - 변수 선언문, 조건식, 증강식은 모두 옵션
// for (;;) { ... }

// 중첩 for 문
for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= 6; j++) {
        if (i + j === 6) console.log(`[${i}, ${j}]`);
    }
}

// while 문
let count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다. 조건식의 평가 결과가 boolean값이 아니면 강제로 참/거짓으로 변환해 판단한다
while (count < 3) {
    console.log(count); // 0 1 2
    count++;
}

// 무한루프
// while (true) { ... }

let count = 0;

// 무한루프 탈출조건 설정
while (true) {
    console.log(count);
    count++;
    // count가 3이면 코드 블록을 탈출한다.
    if (count === 3) break;
} // 0 1 2

// do - while 문
let count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
do {
    console.log(count);
    count++;
} while (count < 3); // 0 1 2