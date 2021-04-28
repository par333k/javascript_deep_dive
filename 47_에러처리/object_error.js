// Error 객체
// Error 생성자 함수는 에러 객체를 생성한다.
// Error 생성자 함수에는 에러를 상세히 설명하는 에러 메세지를 인수로 전달 가능하다.
const error = new Error('invalid');

// Error 생성자 함수가 생성한 에러 객체는 message프로퍼티와 stack 프로퍼티를 갖는다.
// message 프로퍼티의 값은 인수로 전달한 에러메세지이며
// stack 프로퍼티의 값은 에러를 발생시킨 콜스택의 호출 정보를 나타내는 문자열이다.
// Error 생성자 함수를 포함해 7가지의 에러 객체를 생성할 수 있는 생성자 함수가 있다
// 모두 Error.prototype을 상속받는다.

// Error : 일반적 에러 객체
// SyntaxError : 자바스크립트 문법에 맞지 않는 문을 해석할 때 발생하는 에러 객체
// ReferenceError : 참조할 수 없는 식별자를 참조했을 때 발생하는 에러 객체
// TypeError : 피연산자 또는 인수의 데이터 타입이 유효하지 않을 때 발생하는 에러 객체
// RangeError : 숫자값의 허용 범위를 벗어났을 때 발생하는 에러 객체
// URIError : encodeURI 또는 decodeURI 함수에 부적절한 인수를 전달했을 때 발생하는 에러 객체
// EvalError : eval 함수에서 발생하는 에러 객체
/**
 * 1 @ 1;    // SyntaxError: Invalid or unexpected token
 * foo();    // ReferenceError: foo is not defined
 * null.foo; // TypeError: Cannot read property 'foo' of null
 * new Array(-1); // RangeError: Invalid array length
 * decodeURIComponent('%'); // URIError: URI malformed
 */

// throw 문
// Error 생성자 함수로 에러 객체를 생성한다고 에러가 발생하는 것은 아니다.
// 즉, 에러 객체 생성과 에러 발생은 의미가 다르다.
try {
    // 에러 객체를 생성한다고 에러가 발생하는 것은 아니다.
    new Error('something wrong');
} catch (error) {
    console.log(error);
}

// 에러를 발생시키려면 try 코드 블록에서 throw 문으로 에러 객체를 던져야 한다
// > throw 표현식;
// throw 문의 표현식은 어떤 값이라고 상관없지만 일반적으로 에러 객체를 지정한다.
// 에러를 던지면 catch문의 에러 변수가 생성되고 전달된 에러 객체가 할당된다. 이후 코드블록이 실행된다.
try {
    // 에러 객체를 던지면 catch 코드 블록이 실행되기 시작한다.
    throw new Error('something wrong');
} catch (error) {
    console.log(error);
}

// 예제
// 외부에서 전달받은 콜백 함수를 n번만큼 반복 호출한다
const repeat = (n, f) => { // 에러 발생 가능성이 있는 함수
    // 매개변수 f에 전달된 인수가 함수가 아니면 TypeError를 발생시킨다.
    if (typeof f !== 'function') throw new TypeError('f must be a function');

    for (var i = 0; i < n; i++) {
        f(i); // i를 전달하면서 f를 호출
    }
};

try {
    repeat(2, 1); // 두 번째 인수가 함수가 아니므로 TypeError가 발생(throw)한다.
} catch (err) {
    console.error(err); // TypeError: f must be a function
}


// 에러의 전파
// 에러는 호출자caller 방향으로 전파된다.
// 즉, 콜 스택 아래 방향(실행 중인 실행 컨텍스트가 푸시되기 직전에 푸시된 실행 컨텍스트 방향)으로 전파된다.
const foo = () => {
    throw Error('foo에서 발생한 에러'); // ④
};

const bar = () => {
    foo(); // ③
};

const baz = () => {
    bar(); // ②
};

try {
    baz(); // ①
} catch (err) {
    console.error(err);
}

// 1에서 함수를 호출하고, 2에서 bar 함수가 호출되고, 3에서 foo함수가 호출되고, foo 함수는 4에서 에러를 throw한다.
// foo 함수가 throw한 에러는 foo 실행 컨텍스트 -> bar 실행컨텍스트 -> baz 실행컨텍스트 -> 전역 컨텍스트로 전파되어 캐치된다.
// 이 과정에서 throw된 에러를 캐치하여 적절하게 대응하면 프로그램을 종료시키지 않고 코드의 실행흐름을 복구할 수 있다
// 캐치하지 않으면 프로그램은 종료된다.

// 주의!
// 비동기 함수인 setTimeout이나 프로미스 후속 처리 메서드의 콜백함수는 호출자가 없다.
// setTimeout이나 프로미스의 후속 처리 메서드의 콜백 함수는 태스크 큐나 마이크로태스트 큐에 일시 저장되었다가
// 콜 스택이 비면 이벤트 루프에 의해 콜 스택으로 푸시되어 실행된다.
// 이때 콜 스택에 푸시된 콜백 함수의 실행 컨텍스트는 콜 스택의 가장 하부에 존재하게 된다
// 따라서 에러를 전파할 호출자가 존재하지 않는다.
// 결국, 비동기 함수의 콜백 내의 에러를 잡기 위해서는 해당 콜백 함수 자체에 대한 try - catch가 이뤄져야 한다.
setTimeout(() => {
    try {
        throw new Error('에러!');
    } catch (e) {
        console.error(e);
    }
});

// async, await 를 사용한다면 비동기 함수 내부의 에러를 async 함수 내에서 처리할 수 있습니다.
async function func() {
    try {
        const res = await fetch('https://nonexistent-domain.nowhere');
    } catch (e) {
        console.log(e.message);
    }
}

func(); // 출력 결과: Failed to fetch

// await를 사용하지 않으면 캐치되지 않는다.
