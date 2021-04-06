// 정규표현식의 패턴은 문자열의 일정한 규칙을 표현하기 위해 사용한다.
// 정규 표현식의 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용한다.

// 1. 문자열 검색
// 정규표현식의 패턴에 문자 또는 문자열을 지정하면 검색 대상 문자열에서 패턴으로 지정한 문자 또는 문자열을 검색한다.
const target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴. 플래그가 생략되었으므로 대소문자를 구별한다.
const regExp = /is/;

// target과 정규 표현식이 매치하는지 테스트한다.
regExp.test(target); // -> true

// target과 정규 표현식의 매칭 결과를 구한다.
target.match(regExp);
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]

// 대소문자 구별을 하지 않으려면 플래그 i를 사용한다.
const target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴. 플래그 i를 추가하면 대소문자를 구별하지 않는다.
const regExp = /is/i;

target.match(regExp);
// -> ["Is", index: 0, input: "Is this all there is?", groups: undefined]

// 검색 대상 문자열 내에서 패턴과 매치하는 모든 문자열을 전역 검색하려면 플래그 g를 사용한다.
const target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴.
// 플래그 g를 추가하면 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.
const regExp = /is/ig;

target.match(regExp); // -> ["Is", "is", "is"]


// 2. 임의의 문자열 검색
// .은 임의의 문자 한 개를 의미한다. .의 갯수만큼의 문자열과 매치한다.
const target = 'Is this all there is?';

// 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색한다.
const regExp = /.../g;

target.match(regExp); // -> ["Is ", "thi", "s a", "ll ", "the", "re ", "is?"]

// 3. 반복 검색
// {m,n}은 앞선 패턴(다음 예제의 경우 A)이 최소 m번, 최대 n번 반복되는 문자열을 의미한다. 콤마 뒤에 공백이 있으면 정상 동작하지 않는다.
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{1,2}/g;

target.match(regExp); // -> ["A", "AA", "A", "AA", "A"]

// {n}은 앞선 패턴이 n번 반복되는 문자열을 의미한다. 즉, {n}은 {n, n}과 같다.
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{2}/g;

target.match(regExp); // -> ["AA", "AA"]

// {n,}은 앞선 패턴이 최소 n번 이상 반복되는 문자열을 의미한다.
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 2번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /A{2,}/g;

target.match(regExp); // -> ["AA", "AAA"]

// +는 앞선 패턴이 최소 한번 이상 반복되는 문자열을 의미한다.
// 즉, +는 {1,} 과 같다. 다음 예제의 경우 A+는 앞선 패턴 'A'가 한번 이상 반복되는 문자열,
// 즉, 'A'만으로 이루어진 문자열 'A','AA','AAA', ...와 매치한다.
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 한 번 이상 반복되는 문자열('A, 'AA', 'AAA', ...)을 전역 검색한다.
const regExp = /A+/g;

target.match(regExp); // -> ["A", "AA", "A", "AAA"]

// ?는 앞선 패턴이 최대 한 번(0번 포함) 이상 반복되는 문자열을 의미한다. 즉, ?는 {0,1}과 같다.
// 다음 예제의 경우 /colou?r/는 'colo'다음 'u'가 최대 한 번 (0번 포함) 이상 반복되고 'r'이 이어지는 문자열 'color', 'colour'와 매치한다.
const target = 'color colour';

// 'colo' 다음 'u'가 최대 한 번(0번 포함) 이상 반복되고 'r'이 이어지는 문자열 'color', 'colour'를 전역 검색한다.
const regExp = /colou?r/g;

target.match(regExp); // -> ["color", "colour"]

// 4. OR 검색
// | 는  or의 이미를 갖는다. 다음 예제의 /A|B/는 'A'또는 'B'를 의미한다.
const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'를 전역 검색한다.
const regExp = /A|B/g;

target.match(regExp); // -> ["A", "A", "A", "B", "B", "B", "A", "B"]

// 분해되지 않은 단어 레벨로 검색하기 위해서는 +를 함께 사용한다.
const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
const regExp = /A+|B+/g;

target.match(regExp); // -> ["A", "AA", "B", "BB", "A", "B"]

// 위 예제는 패턴을 or로 한 번 이상 반복하는 것인데 이를 간단히 표현하면 다음과 같다.
// [] 내의 문자는 or로 동작한다. 그 뒤에 +를 사용하면 앞선 패턴을 한 번 이상 반복한다.
const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
const regExp = /[AB]+/g;

target.match(regExp); // -> ["A", "AA", "B", "BB", "A", "B"]

// 범위를 지정하려면 [] 내에 -를 사용한다.
const target = 'A AA BB ZZ Aa Bb';

// 'A' ~ 'Z'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ... ~ 또는 'Z', 'ZZ', 'ZZZ', ...
const regExp = /[A-Z]+/g;

target.match(regExp); // -> ["A", "AA", "BB", "ZZ", "A", "B"]

// 대소문자를 구별하지 않고 알파벳을 검색하는 방법은 다음과 같다.
const target = 'AA BB Aa Bb 12';

// 'A' ~ 'Z' 또는 'a' ~ 'z'가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[A-Za-z]+/g;

target.match(regExp); // -> ["AA", "BB", "Aa", "Bb"]

// 숫자를 검색하는 방법은 다음과 같다.
const target = 'AA BB 12,345';

// '0' ~ '9'가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[0-9]+/g;

target.match(regExp); // -> ["12", "345"]

// 위 예제의 경우 쉼표 때문에 매칭 결과가 분리되므로 쉼표를 패턴에 포함시킨다.
const target = 'AA BB 12,345';

// '0' ~ '9' 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[0-9,]+/g;

target.match(regExp); // -> ["12,345"]


// 위 예제를 간단히 표현하면 다음과 같다. \d는 숫자를 의미한다. 즉, \d는 [0-9]와 같다.
// \D는 반대로 동작한다. 즉, \D는 숫자가 아닌 문자를 의미한다.
const target = 'AA BB 12,345';

// '0' ~ '9' 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
let regExp = /[\d,]+/g;

target.match(regExp); // -> ["12,345"]

// '0' ~ '9'가 아닌 문자(숫자가 아닌 문자) 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[\D,]+/g;

target.match(regExp); // -> ["AA BB ", ","]

// \w는 알파벳, 숫자, 언더스코어를 의미한다. 즉, \w는 [A-Za-z0-9_]와 같다
// \W는 반대로 알파벳, 숫자, 언더스코어가 아닌 문자를 의미한다.
const target = 'Aa Bb 12,345 _$%&';

// 알파벳, 숫자, 언더스코어, ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
let regExp = /[\w,]+/g;

target.match(regExp); // -> ["Aa", "Bb", "12,345", "_"]

// 알파벳, 숫자, 언더스코어가 아닌 문자 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[\W,]+/g;

target.match(regExp); // -> [" ", " ", ",", " $%&"]

// 5. NOT 검색
// [ ... ] 내의 ^는 not의 의미를 갖는다
const target = 'AA BB Aa Bb 12';

// 숫자를 제외한 문자열을 전역 검색한다.
const regExp = /[^0-9]+/g;

target.match(regExp); // -> ["AA BB Aa Bb"]

// 6. 시작 위치로 검색
// [ ... ] 밖의 ^는 문자열의 시작을 의미한다.
const target = 'https://poiemaweb.com';

// 'https'로 시작하는지 검사한다.
const regExp = /^https/;

regExp.test(target); // -> true

// 7. 마지막 위치로 검색
// $는 문자열의 마지막을 의미한다.
const target = 'https://poiemaweb.com';

// 'com'으로 끝나는지 검사한다.
const regExp = /com$/;

regExp.test(target); // -> true


// 자주 사용하는 정규 표현식
// 1. 특정 단어로 시작하는지 검사
// [ ... ] 바깥의 ^은 문자열의 시작을 의미하고, ?은 앞선 패턴(다음 예제의 경우 's')이 최대 한 번(0번 포함)이상 반복되는지를 의미한다.
// 다시 말해, 검색 대상 문자열에 앞선 패턴('s')이 있어도 없어도 매치된다.
const url = 'https://example.com';

// 'http://' 또는 'https://'로 시작하는지 검사한다.
/^https?:\/\//.test(url); // -> true

/^(http|https):\/\//.test(url); // -> true

// 2. 특정 단어로 끝나는지 검사
// `$`는 문자열의 마지막을 의미한다.
const fileName = 'index.html';

// 'html'로 끝나는지 검사한다.
/html$/.test(fileName); // -> true

// 3. 숫자로만 이루어진 문자열인지 검사
// [ ... ] 바깥의 ^은 문자열의 시작을, $는 문자열의 마지막을 의미한다. \d는 숫자를 의미하고 +는 앞선 패턴이 최소 한 번 이상 반복되는 문자열을 의미한다.
const target = '12345';

// 숫자로만 이루어진 문자열인지 검사한다.
/^\d+$/.test(target); // -> true


// 4. 하나 이상의 공백으로 시작하는지 검사
// \s는 여러가지 공백 문자 (스페이스, 탭 등)를 의미한다. 즉, \s는 [\t\r\n\v\f]와 같은 의미다.
const target = ' Hi!';

// 하나 이상의 공백으로 시작하는지 검사한다.
/^[\s]+/.test(target); // -> true

// 5. 아이디로 사용 가능한지 검사
// 알파벳 대소문자, 또는 숫자로 시작하고 끝나며 4~10 자리인지 검사
const id = 'abc123';

// 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4 ~ 10자리인지 검사한다.
/^[A-Za-z0-9]{4,10}$/.test(id); // -> true

// 6. 메일 주소 형식에 맞는지 검사
const email = 'ungmo2@gmail.com';

/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(email); // -> true

// 참고로 인터넷 메세지 형식 규약인 RFC 5322에 맞는 정교한 패턴 매칭이 필요하다면 다음과 같이 무척 복잡한 패턴을 사용해야 한다.
/**
 * /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|
 * \\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|
 * \[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|
 * [01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|
 * \\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
 */

// 7. 핸드폰 번호 형식에 맞는지 검사
const cellphone = '010-1234-5678';

/^\d{3}-\d{3,4}-\d{4}$/.test(cellphone); // -> true

// 8. 특수 문자 포함 여부 검사
const target = 'abc#123';

// A-Za-z0-9 이외의 문자가 있는지 검사한다.
(/[^A-Za-z0-9]/gi).test(target); // -> true

// 특수 문자를 선택적으로 검사하고 싶을 경우
(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi).test(target); // -> true

// 특수 문자를 제거할 때는 String.prototype.replace 메서드를 사용한다.
target.replace(/[^A-Za-z0-9]/gi, ''); // -> abc123
