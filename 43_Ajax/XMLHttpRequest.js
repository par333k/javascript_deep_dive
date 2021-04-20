// XMLHttpRequest
// 브라우저는 주소창이나 HTML의 form 태그 또는 a 태그를 통해 HTTP 요청 전송 기능을 기본 제공한다.
// JavaScript를 사용하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용한다.
// Web API인 XMLHttpRequest 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메서드와 프로퍼티를 제공한다.

// XMLHttpRequest 객체 생성
// XMLHttpRequest 생성자 함수를 호출하여 생성한다. 해당 객체는 브라우저에서 제공하는 Web API 이므로 브라우저 환경에서만 정상적으로 실행된다.
// node.js 환경에선 이 객체를 쓸 이유가 없다. http.request가 거의 같은 일을 처리해 주기 때문이다.
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// XMLHttpRequest 프로토타입 프로퍼티
// 1. readyState : HTTP 요청의 현재 상태를 나타냄.
// UNSENT : 0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3 , DONE: 4
// 2. status : HTTP 요청에 대한 HTTP 응답 상태코드를 나타내는 정수 (200, 403, 500 등)
// 3. statusText : HTTP 요청에 대한 응답 메세지를 나타내는 문자열 ("OK" 등)
// 4. responseType : HTTP 응답 타입 (document, json, text, blob, arraybuffer)
// 5. response : HTTP 요청에 대한 응답 몸체, responseType에 따라 타입이 다르다.
// 6. responseText : 서버가 전송한 HTTP 요청에 대한 응답 문자열

// XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티
// 1. onreadystatechange : readyState 프로퍼티 값이 변경된 경우
// 2. onloadstart : HTTP 요청에 대한 응답을 받기 시작한 경우
// 3. onprogress : HTTP 요청에 대한 응답을 받는 도중 주기적으로 발생
// 4. onabort : abort 메서드에 의해 HTTP 요청이 중단된 경우
// 5. onerror : HTTP 요청에 에러가 발생한 경우
// 6. onload : HTTP 요청이 성공적으로 완료한경우
// 7. ontimeout : HTTP 요청 시간이 초과한 경우
// 8. onloadend : HTTP 요청이 완료한 경우, HTTP 요청이 성공 또는 실패하면 발생

// XMLHttpRequest 객체의 메서드
// 1. open : HTTP 요청 초기화
// 2. send : HTTP 요청 전송
// 3. abort : 이미 전송된 HTTP 요청 중단
// 4. setRequestHeader : 특정 HTTP 요청 헤더의 값을 설정
// 5. getResponseHeader : 특정 HTTP 요청 헤더의 값을 문자열로 반환

// XMLHttpRequest 객체의 정적 프로퍼티
// 1. UNSENT : 0 = open 메서드 호출 이전
// 2. OPENED : 1 = open 메서드 호출 이후
// 3. HEADERS_RECEIVED : 2 = send 메서드 호출 이후
// 4. LOADING : 3 = 서버 응답 중(응답 데이터 미완성 상태)
// 5. DONE : 4 = 서버 응답 완료


// HTTP 요청 전송 순서
// 1. XMLHttpRequest.prototype.open 메서드로 HTTP 요청을 초기화한다.
// 2. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로 특정 HTTP 요청의 헤더 값을 설정한다.
// 3. XMLHttpReqeust.prototype.send 메서드로 HTTP 요청을 전송한다.
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open('GET', '/users');

// HTTP 요청 헤더 설정
// 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json
xhr.setRequestHeader('content-type', 'application/json');

// HTTP 요청 전송
xhr.send();

// XMLHttpRequest.prototype.open
// open 메서드는 서버에 전송할 HTTP 요청을 초기화한다. open 메서드를 호출하는 방법은 다음과 같다
// xhr.open(method, url[, async])
// 매개변수 : 설명
// method : HTTP 요청 메서드(GET, POST, PUT, DELETE 등)
// url : HTTP 요청을 전송할 url
// async : 비동기 요청 여부, 옵션으로 기본값은 true이며, 비동기 방식으로 동작한다.

// XMLHttpRequest.prototype.send
// send 메서드는 open 메서드로 초기화된 HTTP 요청을 서버에 전송한다.
// 서버로 전송하는 데이터는 GET, POST 요청 메서드에 따라 전송 방식에 차이가 있다.
// GET 요청 메서드의 경우 데이터를 URL의 일부분인 쿼리 문자열로 서버에 전송한다
// POST 요청 메서드의 경우 데이터(payload)를 요청 몸체에 담아 전송한다.
// send 메서드에는 요청 몸체에 담아 전송할 데이터를 인수로 전달할 수 있다/
// 페이로드가 객체인 경우 반드시 JSON.stringify 메서드를 사용하여 직렬화한 다음 전달해야 한다.
xhr.send(JSON.stringify({ id: 1, content: 'HTML', completed: false }));
// HTTP 요청 메서드가 GET인 경우 send 메서드에 페이로드로 전달한 인수는 무시되고 요청 몸체는 null로 설정된다.

// XMLHttpRequest.prototype.setRequestHeader
// setRequestHeader 메서드는 특정 HTTP 요청의 헤더 값을 설정한다. setReqeustHeader 메서드는 반드시 open 메서드를 호출한 이후에
// 호출해야 한다. 자주 사용하는 HTTP 요청 헤더인 Content-type과 Accept에 대해 살펴보자.
// Content-type은 요청 몸체에 담아 전송할 데이터의 MIME 타입의 정보를 표현한다.
// 자주 사용되는 MIME 타입은 다음과 같다.
// MIME 타입 : 서브타입
// text : text/plain, text/html, text/css, text/javascript
// application : application/json, application/x-www-form-urlencode
// multipart : multipart/formed-data

// 요청 몸체에 담아 서버로 전송할 페이로드의 MIME타입 지정 예
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open('POST', '/users');

// HTTP 요청 헤더 설정
// 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json
xhr.setRequestHeader('content-type', 'application/json');

// HTTP 요청 전송
xhr.send(JSON.stringify({ id: 1, content: 'HTML', completed: false }));

// HTTP 클라이언트가 서버에 요청할 때 서버가 응답할 데이터의 MIME타입을 Accept로 지정할 수 있다.
// 서버가 응답할 데이터의 MIME 타입 지정: json
xhr.setRequestHeader('accept', 'application/json');

// HTTP 응답 처리
// 서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 한다.
// XMLHttpRequest 객체가 가진 이벤트 핸들러 프로퍼티 중에서 HTTP 요청의 현재 상태를 나타내는
// readyState 프로퍼티 값이 변경된 경우 발생하는 readystatechange 이벤트를 캐치하여 HTTP 응답을 처리할 수 있다.
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
// https://jsonplaceholder.typicode.com은 Fake REST API를 제공하는 서비스다.
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// HTTP 요청 전송
xhr.send();

// readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가
// 변경될 때마다 발생한다.
xhr.onreadystatechange = () => {
    // readyState 프로퍼티는 HTTP 요청의 현재 상태를 나타낸다.
    // readyState 프로퍼티 값이 4(XMLHttpRequest.DONE)가 아니면 서버 응답이 완료되지 상태다.
    // 만약 서버 응답이 아직 완료되지 않았다면 아무런 처리를 하지 않는다.
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    // status 프로퍼티는 응답 상태 코드를 나타낸다.
    // status 프로퍼티 값이 200이면 정상적으로 응답된 상태이고
    // status 프로퍼티 값이 200이 아니면 에러가 발생한 상태다.
    // 정상적으로 응답된 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨 있다.
    if (xhr.status === 200) {
        console.log(JSON.parse(xhr.response));
        // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
    } else {
        console.error('Error', xhr.status, xhr.statusText);
    }
};

// send 메서드를 통해 HTTP 요청을 서버에 전송하면 서버는 응답을 반환한다.
// 하지만 언제 응답이 클라이언트에 도달할지는 알 수 없기 때문에 readystatechange 이벤트를 통해 HTTP 요청의 현재 상태를 확인한다.
// xhr.readystate가 XMLHttpRequest.DONE인지 확인하여 서버의 응답이 완료되었는지 onreadystatechange 핸들러를 통해 확인한다.
// 응답이 완료되면 HTTP 상태코드를 확인하어 정상/에러처리를 구문한다. 정상이라면 응답 몸체를 나타내는 xhr.response에서 데이터를 취득한다.
// readystatechange 이벤트 대신 load 이벤트를 캐치해도 좋다. load 이벤트는 HTTP 요청이 성공적으로 완료된 경우에만 발생한다.
// 즉, load 이벤트를 캐치하면 DONE인지 확인할 필요가 없다.
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
// https://jsonplaceholder.typicode.com은 Fake REST API를 제공하는 서비스다.
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// HTTP 요청 전송
xhr.send();

// load 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생한다.
xhr.onload = () => {
    // status 프로퍼티는 응답 상태 코드를 나타낸다.
    // status 프로퍼티 값이 200이면 정상적으로 응답된 상태이고
    // status 프로퍼티 값이 200이 아니면 에러가 발생한 상태다.
    // 정상적으로 응답된 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨 있다.
    if (xhr.status === 200) {
        console.log(JSON.parse(xhr.response));
        // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
    } else {
        console.error('Error', xhr.status, xhr.statusText);
    }
};
