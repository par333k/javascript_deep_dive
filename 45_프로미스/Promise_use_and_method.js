// 프로미스의 후속 처리 메서드
// 프로미스는 후속 메서드 then, catch, finally를 제공한다.
// 프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백 함수가 선택적으로 호출된다.
// 이때 후속 처리 메서드의 콜백 함수에 프로미스의 처리 결과가 인수로 전달된다.
// 모든 후속 처리 메서드는 프로미스를 반환하며, 비동기로 동작한다.

// Promise.prototype.then
// then 메서드는 두 개의 콜백 함수를 인수로 전달받는다.
// 첫 번째 콜백 함수는 프로미스가 fulfilled 상태(resolve 함수가 호출된 상태)가 되면 호출된다.
// 이때 콜백 함수는 프로미스의 비동기 처리 결과를 인수로 전달받는다.
// 두 번째 콜백 함수는 프로미스가 rejected 상태(reject 함수가 호출된 상태)가 되면 호출된다.
// 이때 콜백 함수는 프로미스의 에러를 인수로 전달받는다.
// 즉, 첫 번째 콜백 함수는 비동기 처리가 성공했을 때 호출되는 성공 처리 콜백 함수이며,
// 두 번째 콜백 함수는 비동기 처리가 실패했을 때 호출되는 실패 처리 콜백 함수다.
// fulfilled
new Promise(resolve => resolve('fulfilled'))
    .then(v => console.log(v), e => console.error(e)); // fulfilled

// rejected
new Promise((_, reject) => reject(new Error('rejected')))
    .then(v => console.log(v), e => console.error(e)); // Error: rejected

// then 메서드는 언제나 프로미스를 반환한다. 만약 then 메서드의 콜백 함수가 프로미스를 반환하면 그 프로미스를 그대로 반환하고,
// 콜백 함수가 프로미스가 아닌 값을 반환하면 그 값을 암묵적으로 resolve 또는 reject 하여 프로미스를 생성해 반환한다.

// Promise.prototype.catch
// catch 메서드는 한 개의 콜백 함수를 인수로 전달받는다. catch 메서드의 콜백함수는 프로미스가 reject일때만 호출된다.
// rejected
new Promise((_, reject) => reject(new Error('rejected')))
    .catch(e => console.log(e)); // Error: rejected
// catch 메서드는 then(undefined, onRejected)와 동일하게 동작하며, 언제나 프로미스를 반환한다.
// rejected
new Promise((_, reject) => reject(new Error('rejected')))
    .then(undefined, e => console.log(e)); // Error: rejected

// Promise.prototype.finally
// finally 메서드는 한 개의 콜백 함수를 인수로 전달받는다.  성공과 실패에 상관없이 무조건 한 번 호출된다.
// finally 메서드는 프로미스의 상태와 상관없이 공통적으로 수행해야 할 처리 내용이 있을때 유용하며 항상 프로미스를 반환한다.
new Promise(() => {})
    .finally(() => console.log('finally')); // finally

// 프로미스로 구현한 비동기 함수 get을 후속처리 구현해보자.
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
promiseGet('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => console.log('Bye!'));


// 프로미스의 에러처리
// 프로미스는 에러를 문제없이 처리할 수 있다.
// 위 예제의 비동기 함수 get은 프로미스를 반환한다.
// 비동기 처리 결과에 대한 후속 처리는 프로미스가 제공하는 후속 처리 메서드 then, catch, finally를 사용하여 수행한다.
// 비동기 처리에서 발생한 에러는 then 메서드의 두 번째 콜백 함수로 처리할 수 있다.
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
promiseGet(wrongUrl).then(
    res => console.log(res),
    err => console.error(err)
); // Error: 404
// 비동기 처리에서 발생한 에러는 프로미스의 후속 처리 메서드 catch를 사용해 처리할 수도 있다.
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
promiseGet(wrongUrl)
    .then(res => console.log(res))
    .catch(err => console.error(err)); // Error: 404

// catch 메서드를 호출하면 내부적으로 then(undefined, onRejected)을 호출한다.
// 따라서 위 예제는 내부적으로 다음과 같이 처리된다.
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
promiseGet(wrongUrl)
    .then(res => console.log(res))
    .then(undefined, err => console.error(err)); // Error: 404

// 단, then 메서드의 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못하고 코드가 복잡해져서 가독성이 좋지 않다.
promiseGet('https://jsonplaceholder.typicode.com/todos/1').then(
    res => console.xxx(res), // 에러가 나지만 안잡힘
    err => console.error(err)
); // 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못한다.

// 이런 문제를 해결하기 위해 catch 메서드를 모든 then 메서드를 호출한 이후에 호출하면 비동기 처리에서 발생한 rejected 상태 뿐만 아니라
// then 메서드 내부에서 발생한 에러까지 모두 캐치할 수 있다
promiseGet('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => console.xxx(res))
    .catch(err => console.error(err)); // TypeError: console.xxx is not a function
// 또한 then 메서드에서 두 번째 콜백 함수를 전달하는 것보다 catch 메서드를 사용하는 것이 가독성이 좋고 명확하다.
// 따라서 에러처리는 catch를 적극 사용하자.


// 프로미스 체이닝
// 콜백 헬이 발생하는 예제를 프로미스로 바꿔보자.
const url = 'https://jsonplaceholder.typicode.com';

// id가 1인 post의 userId를 취득
promiseGet(`${url}/posts/1`)
    // 취득한 post의 userId로 user 정보를 취득
    .then(({ userId }) => promiseGet(`${url}/users/${userId}`))
    .then(userInfo => console.log(userInfo))
    .catch(err => console.error(err));
// 프로미스 후속 메서드는 언제나 프로미스를 반환하므로 연속적으로 호출할 수 있다.
// 이를 프로미스 체이닝이라고 한다.

// 위 예제에서 후속처리 메서드의 콜백 함수는 다음과 같이 인수를 전달받으면서 호출된다
// then : promiseGet 함수가 반환한 프로미스가 resolve한 값(id가 1인 post) => 콜백 함수가 반환한 프로미스 (후속 처리 메서드의 반환값)
// then : 첫 번째 then 메서드가 반환한 프로미스가 resolve한 값(post의 userId로 취득한 user 정보)
// => 콜백 함수가 반환한 값(undefined)을 resolve한 프로미스(후속 처리 메서드의 반환값)
// catch(에러가 없으면 호출 안됨) : promiseGet 함수 또는 앞선 후속 처리 메서드가 반환한 프로미스가 reject한 값
// => 콜백 함수가 반환한 값(undefined)을 resolve한 프로미스

// 이처럼 then, catch, finally 후속 처리 메서드는 콜백 함수가 반환한 프로미스를 반환한다.
// 만약 후속 처리 메서드의 콜백 함수가 프로미스가 아닌 값을 반환하더라도 암묵적으로 resolve, reject 하여 프로미스를 생성해 반환한다.
// 프로미스는 프로미스 체이닝을 통해 비동기 처리 결과를 전달받아 후속 처리를 하므로 비동기 처리를 위한 콜백 패턴에서 발생하던
// 콜백 헬이 발생하지 않는다. 다만 프로미스도 콜백 패턴을 사용하는 것은 맞다.

// 콜백 패턴의 가독성이 좋지 않은 것을 해결하기 위해 ES8의 async/await 가 나왔다.
// 이것은 마치 프로미스의 후속 처리 없이 비동기 함수를 동기처럼 처리 결과를 반환하도록 구현한다.
const url = 'https://jsonplaceholder.typicode.com';

(async () => {
    // id가 1인 post의 userId를 취득
    const { userId } = await promiseGet(`${url}/posts/1`);

    // 취득한 post의 userId로 user 정보를 취득
    const userInfo = await promiseGet(`${url}/users/${userId}`);

    console.log(userInfo);
})();

// 프로미스의 정적 메서드
// 프로미스는 생성자 함수로 사용되지만 함수도 객체이므로 메서드를 가질 수 있다.
// 5 가지 정적 메서드가 있다.

// 1. Promise.resolve / Promise.reject
// 이미 존재하는 값을 래핑하여 프로미스를 생성하기 위해 사용 한다.
// Promise.resolve 메서드는 인수로 전달받은 값을 resolve 하는 프로미스를 생성한다.
// 배열을 resolve하는 프로미스를 생성
const resolvedPromise = Promise.resolve([1, 2, 3]);
resolvedPromise.then(console.log); // [1, 2, 3]

// 위 예제는 다음 예제와 동일하게 동작한다.
const resolvedPromise = new Promise(resolve => resolve([1, 2, 3]));
resolvedPromise.then(console.log); // [1, 2, 3]

// Promise.reject 메서드는 인수로 전달받은 값을 reject 하는 프로미스를 생성한다.
// 에러 객체를 reject하는 프로미스를 생성
const rejectedPromise = Promise.reject(new Error('Error!'));
rejectedPromise.catch(console.log); // Error: Error!

// 위 예제는 다음 예제와 동일하게 동작한다.
const rejectedPromise = new Promise((_, reject) => reject(new Error('Error!')));
rejectedPromise.catch(console.log); // Error: Error!

// Promise.all
// Promise.all 메서드는 여러 개의 비동기 처리를 모두 병렬처리할 때 사용한다.
const requestData1 = () => new Promise(resolve => setTimeout(() => resolve(1), 3000));
const requestData2 = () => new Promise(resolve => setTimeout(() => resolve(2), 2000));
const requestData3 = () => new Promise(resolve => setTimeout(() => resolve(3), 1000));

// 세 개의 비동기 처리를 순차적으로 처리
const res = [];
requestData1()
    .then(data => {
        res.push(data);
        return requestData2();
    })
    .then(data => {
        res.push(data);
        return requestData3();
    })
    .then(data => {
        res.push(data);
        console.log(res); // [1, 2, 3] ⇒ 약 6초 소요
    })
    .catch(console.error);
// 위 예제는 세 개의 비동기 처리를 순차적으로 처리한다.
// 세 개의 비동기 처리는 서로 의존하지 않고 개별적으로 수행된다
// 즉, 앞선 비동기 처리 결과를 다음 비동기 처리가 사용하지 않으므로 위 예제의 경우 세 개의 비동기 처리를 순차적으로 처리할 필요가 없다.

// Promise.all 을 이용해 병렬로 처리해 보자.
const requestData1 = () => new Promise(resolve => setTimeout(() => resolve(1), 3000));
const requestData2 = () => new Promise(resolve => setTimeout(() => resolve(2), 2000));
const requestData3 = () => new Promise(resolve => setTimeout(() => resolve(3), 1000));

Promise.all([requestData1(), requestData2(), requestData3()])
    .then(console.log) // [ 1, 2, 3 ] ⇒ 약 3초 소요
    .catch(console.error);

// Promise.all 메서드는 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달 받는다.  그리고 전달받은 모든 프로미스가 모두 fulfilled
// 상태가 되면 모든 처리 결과를 배열에 저장해 새로운 프로미스를 반환한다.
// 위 예제의 경우 Promise.all 메서드는 3개의 프로미스를 요소로 갖는 배열을 전달받았다.
// Promise.all 메서드는 인수로 전달받은 배열의 모든 프로미스가 모두 fulfilled 상태가 되면 종료한다.
// 따라서 이 메서드가 종료되는데 걸리는 시간은 3초보다 조금 더 걸린다.
// 모든 프로미스가 fulfilled 상태가 되면 resolve 된 처리 결과를 모두 배열에 저장해 새로운 프로미스를 반환한다.
// 이 때, 첫 번째 프로미스가 가장 나중에 resolve 되어도 결과를 프로미스 순서대로 저장해 새로운 프로미스를 반환한다. 즉, 처리 순서가 보장된다.
// Promise.all 메서드는 하나라도 reject 가 일어나면 나머지 프로미스를 기다리지 않고 즉시 종료한다.
Promise.all([
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error 1')), 3000)),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error 2')), 2000)),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error 3')), 1000))
])
    .then(console.log)
    .catch(console.log); // Error: Error 3


// Promise.all 메서드는 인수로 전달받은 이터러블의 요소가 프로미스가 아닌 경우 Promise.resolve 메서드를 통해 프로미스로 래핑한다.
Promise.all([
    1, // => Promise.resolve(1)
    2, // => Promise.resolve(2)
    3  // => Promise.resolve(3)
])
    .then(console.log) // [1, 2, 3]
    .catch(console.log);

// 깃허브 아이디로 깃허브 사용자 이름을 취득하는 3개의 비동기 처리를 모두 병렬로 처리하는 예제이다.
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

const githubIds = ['jeresig', 'ahejlsberg', 'ungmo2'];

Promise.all(githubIds.map(id => promiseGet(`https://api.github.com/users/${id}`)))
    // [Promise, Promise, Promise] => Promise [userInfo, userInfo, userInfo]
    .then(users => users.map(user => user.name))
    // [userInfo, userInfo, userInfo] => Promise ['John Resig', 'Anders Hejlsberg', 'Ungmo Lee']
    .then(console.log)
    .catch(console.error);

// 위 예제의 Promise.all 메서드는 promiseGet 함수가 반환한 3개의 프로미스로 이루어진 배열을 인수로 전달 받고
// 이 프로미스들이 모두 fulfill 상태가 되면 처리 결과를 배열에 저장해 새로운 프로미스를 반환한다.
// 이 때 Promise.all 메서드가 반환한 프로미스는 세 개의 사용자 객체로 이루어진 배열을 담고 있다.
// 이 배열은 첫 번째 then 메서드에 인수로 전달된다


// Promise.race
// Promise.race 메서드는 Promise.all 메서드와 동일하게 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받는다.
// Promise.race 메서드는 Promise.all 메서드처럼 모든 프로미스가 fulfilled 상태가 되는 것을 기다리는 것이 아니라
// 가장 먼저 fulfilled 상태가 된 프로미스의 처리 결과를 resolve 하는 새로운 프로미스를 반환한다. (race와 의미적으로 일치)(
Promise.race([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000)) // 3
])
    .then(console.log) // 3
    .catch(console.log);
// 프로미스가 rejected 상태가 되면 Promise.all 메서드와 동일하게 처리된다. 즉, Promise.race 메서드에 전달된 프로미스가 하나라도
// rejected 상태가 되면 에러를 reject 하는 새로운 프로미스를 즉시 반환한다.
Promise.race([
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error 1')), 3000)),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error 2')), 2000)),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error 3')), 1000))
])
    .then(console.log)
    .catch(console.log); // Error: Error 3

// Promise.allSettled
// Promise.allSettled 메서드는 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받는다.
// 전달받은 프로미스가 모두 settled(비동기 처리가 수행된 상태)가 되면 처리 결과를 배열로 반환한다.
// ES11 에 도입된 Promise.allSettled 메서드는 IE를 제외한 대부분의 모던 브라우저에서 지원한다.
Promise.allSettled([
    new Promise(resolve => setTimeout(() => resolve(1), 2000)),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error!')), 1000))
]).then(console.log);
/*
[
  {status: "fulfilled", value: 1},
  {status: "rejected", reason: Error: Error! at <anonymous>:3:54}
]
*/
// Promise.allSettled 메서드가 반환한 배열에는 fulfilled 또는 rejected 상태와는 상관없이
// Promise.allSettled 메서드가 인수로 전달받은 모든 프로미스들의 처리 결과가 모두 담겨 있다.
// 프로미스의 처리 결과를 나타내는 객체는 다음과 같다.
// 프로미스가 fulfilled : 처리 상태의 status 프로퍼티와 결과인 value 프로퍼티를 갖는다
// 프로미스가 rejected : 처리상태의 status 프로퍼티와 에러를 나타내는 reason 프로퍼티를 갖는다.
/*
[
    // 프로미스가 fulfilled 상태인 경우
    {status: "fulfilled", value: 1},
    // 프로미스가 rejected 상태인 경우
    {status: "rejected", reason: Error: Error! at <anonymous>:3:60}
]
*/


