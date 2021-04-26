// 에러 처리의 필요성
// 에러가 발생하지 않는 코드를 만드는 것은 불가능하다
// 에러를 잘 대처하지않으면 프로그램은 강제 종료되고 사용자 데이터도 유실될 수 있다.
console.log('[Start]');

foo(); // ReferenceError: foo is not defined
// 발생한 에러를 방치하면 프로그램은 강제 종료된다.

// 에러에 의해 프로그램이 강제 종료되어 아래 코드는 실행되지 않는다.
console.log('[End]');

// try ... catch 문을 사용해 발생한 에러에 적절하게 대응하면 프로그램이 강제 종료되지 않고 계속해서 코드를 실행시킬 수 있다.
console.log('[Start]');

try {
    foo();
} catch (error) {
    console.error('[에러 발생]', error);
    // [에러 발생] ReferenceError: foo is not defined
}

// 발생한 에러에 적절한 대응을 하면 프로그램이 강제 종료되지 않는다.
console.log('[End]');

// 직접적으로 에러를 발생하지 않는 예외exception적인 상황이 발생할 수도 있다.
// 예외적인 상황에 적절하게 대응하지 않으면 에러로 이어질 가능성이 크다.
// DOM에 button 요소가 존재하지 않으면 querySelector 메서드는 에러를 발생시키지 않고 null을 반환한다.
const $button = document.querySelector('button'); // null

$button.classList.add('disabled');
// TypeError: Cannot read property 'classList' of null

// 위 예제의 querySelector 메서드는 인수로 전달한 문자열이 CSS 선택자 문법에 맞지 않는 경우 에러를 발생시킨다.
const $elem = document.querySelector('#1');
// DOMException: Failed to execute 'querySelector' on 'Document': '#1' is not a valid selector.

// querySelector 메서드는 인수로 전달한 CSS 선택자 문자열로 DOM에서 요소 노드를 찾을 수 없는 경우 에러를 발생시키지 않고
// null을 반환한다. 이때 if 문으로 querySelector 메서드의 반환값을 확인하거나 단축 평가 또는 옵셔널 체이닝 연산자인 ?.를 사용하지 않으면
// 다음 처리에서 에러로 이어질 가능성이 크다.
// DOM에 button 요소가 존재하는 경우 querySelector 메서드는 에러를 발생시키지 않고 null을 반환한다.
const $button = document.querySelector('button'); // null
$button?.classList.add('disabled');


// 이처럼 에러나 예외적인 상황에 대응하지 않으면 프로그램은 강제 종료된다. 에러나 예외적인 상황은 무척 다양하기 때문에 아무런 조치없이
// 프로그램이 강제 종료되면 원인파악 및 대응이 어렵다.
// 즉, 에러와 예외적인 상황이 발생할 수 있다는 것을 전제하고 대응 코드를 늘 작성해야 한다.
