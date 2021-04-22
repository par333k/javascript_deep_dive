// 자바스크립트는 비동기 처리 패턴 중 하나로 콜백 함수를 사용한다.
// 전통적으로 콜백 패턴은 콜백 헬로 인해 가독성이 나쁘고, 비동기 처리 중 발생한 에러의 처리가 곤란하다
// 또한 여러 개의 비동기 처리를 한번에 처리하는데도 한계가 있다.
// 프로미스Promise 는 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현할 수 있다는 장점이 있다.


// 1. 콜백 헬
// GET 요청을 위한 비동기 함수
const get = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            // 서버의 응답을 콘솔에 출력한다.
            console.log(JSON.parse(xhr.response));
        } else {
            console.error(`${xhr.status} ${xhr.statusText}`);
        }
    };
};

// id가 1인 post를 취득
get('https://jsonplaceholder.typicode.com/posts/1');
/*
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere ...",
  "body": "quia et suscipit ..."
}
*/
// get 함수는 비동기 함수다. 비동기 함수란 함수 내부에 비동기로 동작하는 코드를 포함한 함수를 말한다.
// 비동기 함수를 호출하면, 함수 내부의 비동기로 동작하는 코드가 완료되지 않았다 해도 기다리지 않고 즉시 종료된다.
// 즉, 비동기 함수 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 이후에 완료된다.
// 따라서 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.

// setTimeout 함수는 비동기 함수로, 이 함수의 콜백 함수에서 상위 스코프의 변수에 값을 할당해보자
// setTimeout 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머id를 반환하므로 콜백 함수에서 값을 반환하는 것은 무의미하다.
let g = 0;

// 비동기 함수인 setTimeout 함수는 콜백 함수의 처리 결과를 외부로 반환하거나
// 상위 스코프의 변수에 할당하지 못한다.
setTimeout(() => { g = 100; }, 0);
console.log(g); // 0

// GET 요청을 전송하고 응답받는 get 함수가 비동기인 이유는 get 함수 내부의 onload 이벤트 핸들러가 비동기로 동작하기 때문이다.
// get 함수 내부의 onload 이벤트 핸들러는 get 함수가 종료된 이후에 실행된다. 따라서 get 함수의 onload 이벤트 핸들러에서
// 서버의 응답 결과를 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.
// get 함수가 서버의 응답 결과를 반환하도록 수정해보자.
// GET 요청을 위한 비동기 함수
const get = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            // ① 서버의 응답을 반환한다.
            return JSON.parse(xhr.response);
        }
        console.error(`${xhr.status} ${xhr.statusText}`);
    };
};

// ② id가 1인 post를 취득
const response = get('https://jsonplaceholder.typicode.com/posts/1');
console.log(response); // undefined

// get 함수 호출, XMLHttpRequest 객체 생성 후 HTTP 요청을 초기화 하고 전송
// xhr.onload 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩하고 종료. get 함수에 명시적인 반환문이 없으므로 get 함수는 undefined반환
// xhr.onload 이벤트 핸들러 프로퍼티에 바인딩한 이벤트 핸들러의 반환문은 get 함수의 반환문이 아니다.
// 위 상태로는 onload 이벤트 핸들러의 반환값을 캐치할 수 없다.
// 서버의 응답을 상위 스코프의 변수에 할당해도 기대대로 동작하지 않는다.
let todos;

// GET 요청을 위한 비동기 함수
const get = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            // ① 서버의 응답을 상위 스코프의 변수에 할당한다.
            todos = JSON.parse(xhr.response);
        } else {
            console.error(`${xhr.status} ${xhr.statusText}`);
        }
    };
};

// id가 1인 post를 취득
get('https://jsonplaceholder.typicode.com/posts/1');
console.log(todos); // ② undefined
// xhr.onload 이벤트 핸들러 프로퍼티에 바인딩 된 이벤트 핸들러는 언제나 2번console.log 가 종료된 이후에 호출된다.
// 이는 비동기를 처리하는 자바스크립트 환경과 엔진의 특징 때문이다.
// 서버로부터 응답이 도착하면 xhr 객체에서 load 이벤트가 발생한다. 이 때 xhr.onload 핸들러 프로퍼티에 바인딩한 이벤트 핸들러가
// 즉시 실행되는 것이 아니다. xhr.onload 이벤트 핸들러는 load 이벤트가 발생하면 일단 태스크 큐에 저장되어 대기하다가, 콜 스택이 비면
// 이벤트 루프에 의해 콜 스택으로 푸시되어 실행된다. 이벤트 핸들러 역시 함수이기에 평가-> 실행컨택스트생성-> 콜스택 푸시-> 실행 과정을 따른다.
// 따라서 xhr.onload 이벤트 핸들러가 실행되는 시점에는 콜 스택이 빈 상태여야 하므로 console.log 가 실행된 이후여야 한다.

// 이처럼 비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없고, 상위 스코프의 변수에 할당할 수도 없다.
// 따라서 비동기 함수의 처리 결과(서버의 응답 등)에 대한 후속 처리는 비동기 함수 내부에서 수행해야 한다.
// 이 때, 비동기 함수를 범용적으로 사용하기 위해 비동기 함수에 비동기 처리 결과에 대한 후속 처리를 수행하는 콜백 함수를 전달하는 것이 일반적이다.
// 필요에 따라 비동기 처리가 성공하면 호출될 콜백 함수와 비동기 처리가 실패하면 호출될 콜백 함수를 전달할 수 있다.
// GET 요청을 위한 비동기 함수
const get = (url, successCallback, failureCallback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            // 서버의 응답을 콜백 함수에 인수로 전달하면서 호출하여 응답에 대한 후속 처리를 한다.
            successCallback(JSON.parse(xhr.response));
        } else {
            // 에러 정보를 콜백 함수에 인수로 전달하면서 호출하여 에러 처리를 한다.
            failureCallback(xhr.status);
        }
    };
};

// id가 1인 post를 취득
// 서버의 응답에 대한 후속 처리를 위한 콜백 함수를 비동기 함수인 get에 전달해야 한다.
get('https://jsonplaceholder.typicode.com/posts/1', console.log, console.error);
/*
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere ...",
  "body": "quia et suscipit ..."
}
*/
// 이처럼 콜백 함수를 통해 비동기 처리 결과에 대한 후속 처리를 수행하는 비동기 함수가 비동기 처리 결과를 가지고
// 또다시 비동기 함수를 호출해야 한다면 콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상이 발생하는데, 이를 콜백 헬이라 한다.
// GET 요청을 위한 비동기 함수
const get = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            // 서버의 응답을 콜백 함수에 전달하면서 호출하여 응답에 대한 후속 처리를 한다.
            callback(JSON.parse(xhr.response));
        } else {
            console.error(`${xhr.status} ${xhr.statusText}`);
        }
    };
};

const url = 'https://jsonplaceholder.typicode.com';

// id가 1인 post의 userId를 취득
get(`${url}/posts/1`, ({ userId }) => {
    console.log(userId); // 1
    // post의 userId를 사용하여 user 정보를 취득
    get(`${url}/users/${userId}`, userInfo => {
        console.log(userInfo); // {id: 1, name: "Leanne Graham", username: "Bret",...}
    });
});
// GET 요청을 통해 서버로부터 응답을 취득하고 이 데이터를 사용하여 또다시 GET 요청을 한다.
// 콜백 헬은 가독성을 나쁘게 하며 실수를 유발하는 원인이 된다.
get('/step1', a => {
    get(`/step2/${a}`, b => {
        get(`/step3/${b}`, c => {
            get(`/step4/${c}`, d => {
                console.log(d);
            });
        });
    });
});

// 2. 에러 처리의 한계
// 비동기 처리를 위한 콜백 패턴의 문제점 중에서 가장 심각한 것은 에러처리가 곤란하다는 것이다.
try {
    setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
    // 에러를 캐치하지 못한다
    console.error('캐치한 에러', e);
}

// setTimeout은 비동기 함수로, setTimeout의 콜백 함수가 실행될 때, 이 함수는 이미 콜 스택에서 제거된 상태다.
// 이것은 setTimeout 함수의 콜백 함수를 호출한 것이 setTimeout함수가 아니라는 것을 의미한다.
// setTimeout 함수의 콜백 함수 호출자caller 가 setTimeout 함수라면 콜 스택의 현재 실행 중인 실행 컨텍스트가
// 콜백 함수의 실행 컨텍스트일 때 현재 실행 중인 실행 컨텍스트의 하위 실행 컨텍스트가 setTimeout 함수여야 한다.

// [에러는 호출자caller 방향으로 전파된다!]

// 즉, 콜 스택의 아래 방향(실행 중인 실행 컨텍스트가 푸시되기 직전에 푸시된 실행 컨텍스트 방향)으로 전파된다.
// 하지만 앞에서 살펴본 바와 같이 setTimeout 함수의 콜백 함수를 호출한 것은 setTimeout 함수가 아니다.
// 따라서 setTimeout 함수의 콜백 함수가 발생시킨 에러는 catch 블록에서 캐치되지 않는다.


// 프로미스의 생성
// 콜백 헬과 에러처리의 대안으로 ES6에서 도입되었다.

// Promise 생성자 함수를 new 연산자와 함께 호출하면 Promise 객체를 생성한다.
// ES6에서 도입된 Promise는 호스트 객체가 아닌 ECMAScript 사양에 정의된 표준 빌트인 객체다.
// Promise 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달받는데 이 콜백 함수는 resolve와 reject 함수를 인수로 전달받는다.
// 프로미스 생성
const promise = new Promise((resolve, reject) => {
    // Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
    if (true/* 비동기 처리 성공 */) {
        resolve('result');
    } else { /* 비동기 처리 실패 */
        reject('failure reason');
    }
});

// Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 비동기 처리를 수행한다.
// 성공시 resolve 함수를, 실패시 reject 함수를 호출한다.
// 앞의 get 함수를 프로미스로 바꿔보자.

// GET 요청을 위한 비동기 함수
const promiseGet = url => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onload = () => {
            if (xhr.status === 200) {
                // 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
                resolve(JSON.parse(xhr.response));
            } else {
                // 에러 처리를 위해 reject 함수를 호출한다.
                reject(new Error(xhr.status));
            }
        };
    });
};

// promiseGet 함수는 프로미스를 반환한다.
promiseGet('https://jsonplaceholder.typicode.com/posts/1');

// 비동기 함수인 promiseGet은 함수 내부에서 프로미스를 생성/반환 한다.
// 비동기 처리는 Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 수행한다.
// 만약 비동기 처리가 성공하면 비동기 처리 결과를 resolve함수에 인수로 전달하면서 호출하고,
// 비동기 처리가 실패하면 에러를 reject 함수에 인수로 전달하면서 호출한다.

// 프로미스 객체는 상태정보를 갖는다
// pending : 비동기 처리가 아직 수행되지 않은 상태로 프로미스 생성 직후 기본 상태이다
// fulfilled : 비동기 처리가 성공으로 수행된 상태로 resolve 함수 호출로 인해 해당 상태로 변경된다
// rejected : 비동기 처리가 실패로 수행된 상태로 reject 함수 호출로 인해 해당 상태로 변경된다.

// 프로미스의 fulfilled 또는 rejected 상태를 settled 상태라고 한다.
// 프로미스는 일단 settled 상태가 되면 다시 다른 상태로 변경될 수 없다.
// 프로미스는 비동기 처리 상태와 더불어 비동기 처리 결과도 상태로 갖는다.
// fulfilled된 프로미스
const fulfilled = new Promise(resolve => resolve(1));
// Promise 객체의 프로토타입 내부 [[PromiseValue]]에 비동기 처리 결과 정보가 들어있다
// 내부 객체 [[PromiseStatus]]에는 비동기 처리 상태 정보가 들어있다.
// rejected된 프로미스
const rejected = new Promise((_, reject) => reject(new Error('error occurred')));
// 마찬가지로 내부객체에 상태정보와 결과정보를 갖고있다.

// 비동기 처리가 실패하면 처리 결과인 Error 객체를 값으로 갖는다. 즉, 프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체다.


