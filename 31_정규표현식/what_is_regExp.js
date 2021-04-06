// 정규표현식은 문자열을 대상으로 패턴 매칭 기능을 제공한다.
// 패턴 매칭 기능이란 특정 패턴과 일치하는 문자열을 검색하거나 추출 또는 치환할 수 있는 기능을 말한다.
// 가령 휴대폰 전화번호 매칭등에 사용할 수 있다.
// 사용자로부터 입력받은 휴대폰 전화번호
const tel = '010-1234-567팔';

// 정규 표현식 리터럴로 휴대폰 전화번호 패턴을 정의한다.
const regExp = /^\d{3}-\d{4}-\d{4}$/;

// tel이 휴대폰 전화번호 패턴에 매칭하는지 테스트(확인)한다.
regExp.test(tel); // -> false

// 정규 표현식을 사용하면 반복문, 조건문 없이 패턴을 정의하고 테스트 하는 것으로 간단히 체크할 수 있지만
// 정규 표현식은 주석이나 공백을 허용하지 않고 여러 기호를 혼합해 사용하기 때문에 가독성은 좋지않다.


// 정규표현식 객체를 생성하기 위해서는 정규표현식 리터럴이나 RegExp 생성자 함수를 사용한다.
// 정규표현식 리터럴은 /regexp/i 와 같은 형태로 표현한다.
// /는 시작, 종료 기호, 그 안에는 패턴, 그리고 종료기호 뒤의 i는 플래그를 나타낸다.
const target = 'Is this all there is?';

// 패턴: is
// 플래그: i => 대소문자를 구별하지 않고 검색한다.
const regexp = /is/i;

// test 메서드는 target 문자열에 대해 정규표현식 regexp의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.
regexp.test(target); // -> true

// RegExp 생성자 함수를 사용하여 RegExp 객체를 생성할 수도 있다.
/**
 * pattern : 정규표현식의 패턴
 * flags: 정규 표현식의 플래그(g, i, m, u, y)
 */
// new RegExp(pattern[, flags]);
const target = 'Is this all there is?';

const regexp = new RegExp(/is/i); // ES6
// const regexp = new RegExp(/is/, 'i');
// const regexp = new RegExp('is', 'i');

regexp.test(target); // -> true

// RegExp 메서드
// 1. RegExp.prototype.exec
// exec 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다.
// 매칭 결과가 없는 경우 null을 반환한다.
// exec 메서드는 문자열 내의 모든 패턴을 검색하는 g플래그를 지정해도 첫 번째 매칭 결과만 반환하므로 주의하기 바란다.
const target = 'Is this all there is?';
const regExp = /is/;

regExp.exec(target); // -> ["is", index: 5, input: "Is this all there is?", groups: undefined]

// 2. RegExp.prototype.test
// test 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 boolean 값으로 반환한다.
const target = 'Is this all there is?';
const regExp = /is/;

regExp.test(target); // -> true

// 3. String.prototype.match
// String 표준 빌트인 객체가 제공하는 match 메서드는 대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환한다.
const target = 'Is this all there is?';
const regExp = /is/;

target.match(regExp); // -> ["is", index: 5, input: "Is this all there is?", groups: undefined]

// exec 메서드는 문자열 내의 모든 패턴을 검색하는 g 플래그를 지정해도 첫 번째 매칭 결과만 반환한다.
// 하지만 match 메서드는 g 플래그가 지정되면 모든 매칭 결과를 배열로 반환한다.
const target = 'Is this all there is?';
const regExp = /is/g;

target.match(regExp); // -> ["is", "is"]


// 플래그의 종류 - 주로 쓰이는 3가지
// i : ignore case, 대소문자를 구별하지 않고 패턴을 검색한다
// g : Global, 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.
// m : Multi line, 문자열의 행이 바뀌더라도 패턴 검색을 계속한다.

// 플래그는 옵션이므로 선택적으로 사용할 수 있으며, 순서와 상관없이 하나 이상의 플래그를 동시에 설정할 수도 있다.
// 어떠한 플래그를 사용하지 않은 경우 대소문자를 구별해서 패턴을 검색한다.
// 문자열에 패턴 검색 매칭이 1개 이상 존재해도 첫 번째 대상만 검색하고 종료한다.
const target = 'Is this all there is?';

// target 문자열에서 is 문자열을 대소문자를 구별하여 한 번만 검색한다.
target.match(/is/);
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 한 번만 검색한다.
target.match(/is/i);
// -> ["Is", index: 0, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하여 전역 검색한다.
target.match(/is/g);
// -> ["is", "is"]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 전역 검색한다.
target.match(/is/ig);
// -> ["Is", "is", "is"]


