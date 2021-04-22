// 마이크로태스크 큐
setTimeout(() => console.log(1), 0);

Promise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3));

// 1->2->3 으로 동작할 것 같지만 실제로는 2, 3, 1 순서로 동작한다.
// 왜냐면 프로미스의 후속처리 메서드의 콜백 함수는 태스크 큐가 아니라 마이크로태스크 큐에 저장되기 때문이다(혹은 job queue라고도 한다)
// 마이크로태스크 큐는 태스크 큐와는 별도의 큐다. 마이크로태스크 큐에는 프로미스의 후속 처리 메서드의 콜백 함수가 일시 저장된다.
// 그 외의 비동기 함수의 콜백 함수나 이벤트 핸들러는 태스크 큐에 일시 저장된다.
// 콜백 함수나 이벤트 핸들러를 일시 저장한다는 점에서 태스크 큐와 동일하지만 마이크로태스크 큐는 태스크큐보다 우선순위가 높다.
// 즉, 이벤트 루프는 콜 스택이 비면 먼저 마이크로태스크 큐에서 대기하고 있는 함수를 가져와 실행한다.
// 이후 마이크로태스크큐가 비면 태크스 큐에서 대기하고 있는 함수를 가져와 실행한다.



// fetch
// XMLHttpRequest 객체와 마찬가지로 HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API이다.
// fetch 함수는 프로미스를 지원하며 비동기 처리를 위한 콜백 패턴의 단점에서 자유롭다.
// 비교적 최근에 추가된 Web API 기에 IE에서는 작동이 정상적이지 않을 수 있다.
// fetch 함수에는 HTTP 요청을 전송할 URL과 HTTP 요청 메서드, HTTP 요청 헤더, 페이로드 등을 설정한 객체를 전달한다.
// const promise = fetch(url [, options]);

// fetch 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환한다.
fetch('https://jsonplaceholder.typicode.com/todos/1')
    // response는 HTTP 응답을 나타내는 Response 객체이다.
    // json 메서드를 사용하여 Response 객체에서 HTTP 응답 몸체를 취득하여 역직렬화한다.
    .then(response => response.json())
    // json은 역직렬화된 HTTP 응답 몸체이다.
    .then(json => console.log(json));
// {userId: 1, id: 1, title: "delectus aut autem", completed: false}

// fetch 함수를 통해 HTTP 요청을 전송해 보자.
const request = {
    get(url) {
        return fetch(url);
    },
    post(url, payload) {
        return fetch(url, {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    },
    patch(url, payload) {
        return fetch(url, {
            method: 'PATCH',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    },
    delete(url) {
        return fetch(url, { method: 'DELETE' });
    }
};

// GET
request.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(todos => console.log(todos))
    .catch(err => console.error(err));
// {userId: 1, id: 1, title: "delectus aut autem", completed: false}

// POST
request.post('https://jsonplaceholder.typicode.com/todos', {
    userId: 1,
    title: 'JavaScript',
    completed: false
}).then(response => response.json())
    .then(todos => console.log(todos))
    .catch(err => console.error(err));
// {userId: 1, title: "JavaScript", completed: false, id: 201}

// PATCH
request.patch('https://jsonplaceholder.typicode.com/todos/1', {
    completed: true
}).then(response => response.json())
    .then(todos => console.log(todos))
    .catch(err => console.error(err));
// {userId: 1, id: 1, title: "delectus aut autem", completed: true}

// DELETE
request.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(todos => console.log(todos))
    .catch(err => console.error(err));
// {}
