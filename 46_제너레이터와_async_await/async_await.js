// async, await
// ES8 에서 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 동작하도록 구현하는 async , await가 도입
// async, await 은 프로미스 기반으로 동작한다. 프로미스의 후속 처리 메서드 없이 마치 동기 처리처럼 프로미스가
// 처리 결과를 반환하도록 구현할 수 있다.
// 제너레이터 예제의 async, await 적용
const fetch = require('node-fetch');

async function fetchTodo() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    const response = await fetch(url);
    const todo = await response.json();
    console.log(todo);
    // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
}

fetchTodo();

// async 함수
// await 키워드는 반드시 async함수 내부에서 사용해야 한다. async 함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환한다.
// async 함수가 명시적으로 프로미스를 반환하지 않더라도 async 함수는 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.

// async 함수 선언문
async function foo(n) { return n; }
foo(1).then(v => console.log(v)); // 1

// async 함수 표현식
const bar = async function (n) { return n; };
bar(2).then(v => console.log(v)); // 2

// async 화살표 함수
const baz = async n => n;
baz(3).then(v => console.log(v)); // 3

// async 메서드
const obj = {
    async foo(n) { return n; }
};
obj.foo(4).then(v => console.log(v)); // 4

// async 클래스 메서드
class MyClass {
    async bar(n) { return n; }
}
const myClass = new MyClass();
myClass.bar(5).then(v => console.log(v)); // 5

// 클래스의 constructor메서드는 async 메서드가 될 수 없다.
// 클래스의 constructor 메서드는 인스턴스를 반환해야 하지만 async함수는 언제나 프로미스를 반환해야 한다.
class MyClass {
    async constructor() { }
    // SyntaxError: Class constructor may not be an async method
}

const myClass = new MyClass();

// await 키워드
// await 키워드는 프로미스가 settled 상태(비동기 처리가 수행된 상태)가 될 때까지 대기하다가
// settled상태가 되면 프로미스가 resolve한 처리 결과를 반환한다.
// await 키워드는 반드시 프로미스 앞에서 사용해야 한다.
const fetch = require('node-fetch');

const getGithubUserName = async id => {
    const res = await fetch(`https://api.github.com/users/${id}`); // ①
    const { name } = await res.json(); // ②
    console.log(name); // Ungmo Lee
};

getGithubUserName('ungmo2');

// (1)의 fetch함수가 수행한 http 요청에 대한 서버의 응답이 도착해서 fetch함수가 반환한 프로미스가 settled 상태가 될 때까지
// (1)은 대기하게된다. 이후 프로미스가 settled 상태가 되면 프로미스가 resolve한 처리 결과가 res 변수에 할당된다.
// await 키워드는 이처럼 다음 실행을 일시 중지시켰다가 프로미스가 settled 상태가 되면 다시 재개한다.
async function foo() {
    const a = await new Promise(resolve => setTimeout(() => resolve(1), 3000));
    const b = await new Promise(resolve => setTimeout(() => resolve(2), 2000));
    const c = await new Promise(resolve => setTimeout(() => resolve(3), 1000));

    console.log([a, b, c]); // [1, 2, 3]
}
foo(); // 약 6초 소요된다.
// 모든 프로미스에 await를 쓰는 것은 주의해야 한다. 비동기 처리의 장점을 잃게 된다.
// 위 처럼 순서를 지키지 않아도 될 때에는 promise.all을 응용하자.
async function foo() {
    const res = await Promise.all([
        new Promise(resolve => setTimeout(() => resolve(1), 3000)),
        new Promise(resolve => setTimeout(() => resolve(2), 2000)),
        new Promise(resolve => setTimeout(() => resolve(3), 1000))
    ]);

    console.log(res); // [1, 2, 3]
}

foo(); // 약 3초 소요된다.

// 만약 처리 순서를 지켜야 한다면 모든 프로미스에 await 키워드를 써서 순차적으로 처리해야 한다.
async function bar(n) {
    const a = await new Promise(resolve => setTimeout(() => resolve(n), 3000));
    // 두 번째 비동기 처리를 수행하려면 첫 번째 비동기 처리 결과가 필요하다.
    const b = await new Promise(resolve => setTimeout(() => resolve(a + 1), 2000));
    // 세 번째 비동기 처리를 수행하려면 두 번째 비동기 처리 결과가 필요하다.
    const c = await new Promise(resolve => setTimeout(() => resolve(b + 1), 1000));

    console.log([a, b, c]); // [1, 2, 3]
}

bar(1); // 약 6초 소요된다.

// 에러 처리
// 에러는 호출자caller 방향으로 전파된다. 즉 콜 스택의 아래 방향(실행 중인 실행 컨택스트가 푸시되기 직전에 푸시된 실행 컨텍스트 방향)
// 으로 전파된다. 하지만 비동기 함수의 콜백 함수를 호출한 것은 비동기 함수가 아니기 때문에 try ... catch 문을 사용해 에러를 캐치할 수 없다.
try {
    setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
    // 에러를 캐치하지 못한다
    console.error('캐치한 에러', e);
}

// async, await 에서 에러처리는 try ... catch를 사용할 수 있다. 콜백 함수를 인수로 전달받는 비동기 함수와는 달리
// 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다.

const fetch = require('node-fetch');

const foo = async () => {
    try {
        const wrongUrl = 'https://wrong.url';

        const response = await fetch(wrongUrl);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error(err); // TypeError: Failed to fetch
    }
};

foo();
// 위 예제에서 catch 문은 http 통신 네트워크 에러 뿐만 아니라 try 코드 블록 내의 모든 문에서 발생한 일반적인 에러까지 모두 캐지할 수 있다.
// async 함수 내에서 catch 문을 사용해 에러처리를 하지않으면 async 함수는 발생한 에러를 reject 하는 프로미스를 반환한다.
// 따라서 async 함수를 호출하고 Promise.prototype.catch 후속 처리 메서드를 사용해 에러를 캐치할 수도 있다.

const fetch = require('node-fetch');

const foo = async () => {
    const wrongUrl = 'https://wrong.url';

    const response = await fetch(wrongUrl);
    const data = await response.json();
    return data;
};

foo()
    .then(console.log)
    .catch(console.error); // TypeError: Failed to fetch
