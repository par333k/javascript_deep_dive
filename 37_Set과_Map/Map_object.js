// Map 객체
// Map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다. Map 객체는 객체와 유사하지만 다음과 같은 차이가 있다.
// 1. Map 객체는 키로 사용할 수 있는 값으로 객체를 포함한 모든 값이다.
// 2. Map 객체는 이터러블이다
// 3. Map 객체의 요소 개수는 map.size로 요소 개수를 확인할 수 있다.

// Map 객체의 생성
// Map 객체는 Map 생성자 함수로 생성한다. Map 생성자 함수에 인수를 전달하지 않으면 빈 Map 객체가 생성된다.
const map = new Map();
console.log(map); // Map(0) {}

// Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성한다. 이때 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 한다.
const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
console.log(map1); // Map(2) {"key1" => "value1", "key2" => "value2"}

const map2 = new Map([1, 2]); // TypeError: Iterator value 1 is not an entry object

// Map 생성자 함수의 인수로 전달한 이터러블에 중복된 키를 갖는 요소가 존재하면 값이 덮어써진다.
// 따라서 Map 객체에는 중복된 키를 갖는 요소가 존재할 수 없다.
const map = new Map([['key1', 'value1'], ['key1', 'value2']]);
console.log(map); // Map(1) {"key1" => "value2"}

// Map 객체의 요소 개수를 확인할 때는 Map.prototype.size 프로퍼티를 사용한다.
const { size } = new Map([['key1', 'value1'], ['key2', 'value2']]);
console.log(size); // 2

// Map 객체에 요소를 추가할 때는 Map.prototype.set 메서드를 사용한다.
const map = new Map();
console.log(map); // Map(0) {}

map.set('key1', 'value1');
console.log(map); // Map(1) {"key1" => "value1"}

// set 메서드는 새로운 요소가 추가된 Map 객체를 반환한다. 따라서 set 메서드를 호출한 후에 set 메서드를 연속적으로 호출할 수 있다.
const map = new Map();

map
    .set('key1', 'value1')
    .set('key2', 'value2');

console.log(map); // Map(2) {"key1" => "value1", "key2" => "value2"}

// Map 객체에 중복된 키를 갖는 요소의 추가는 허용되지 않는다. 이때 에러가 발생하지는 않고 무시된다.
const map = new Map();

map
    .set('key1', 'value1')
    .set('key1', 'value2');

console.log(map); // Map(1) {"key1" => "value2"}

// 일치 비교 연산자 ===을 사용하면 NaN과 NaN을 다르다고 평가한다. 하지만 Map 객체는 NaN과 NaN을 같다고 평가하여 중복 추가를 허용하지 않는다.
// +0과 -0은 일치 비교 연산자 ===와 마찬가지로 같다고 평가하여 중복 추가를 허용하지 않는다.
const map = new Map();

console.log(NaN === NaN); // false
console.log(0 === -0); // true

// NaN과 NaN을 같다고 평가하여 중복 추가를 허용하지 않는다.
map.set(NaN, 'value1').set(NaN, 'value2');
console.log(map); // Map(1) { NaN => 'value2' }

// +0과 -0을 같다고 평가하여 중복 추가를 허용하지 않는다.
map.set(0, 'value1').set(-0, 'value2');
console.log(map); // Map(2) { NaN => 'value2', 0 => 'value2' }

// 객체는 문자열 또는 심벌 값만 키로 사용할 수 있다. 하지만 Map 객체는 키 타입에 제한이 없다.
// 따라서 객체를 포함한 모든 값을 키로 사용할 수 있다. 이는 Map 객체와 일반 객체의 가장 두드러지는 차이점이다.
const map = new Map();

const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

// 객체도 키로 사용할 수 있다.
map
    .set(lee, 'developer')
    .set(kim, 'designer');

console.log(map);
// Map(2) { {name: "Lee"} => "developer", {name: "Kim"} => "designer" }

// 요소 취득
// Map 객체에서 특정 요소를 취득할 때는 Map.prototype.get 메서드를 사용한다.
// get 메서드 인수로 키를 전달하면 Map 객체에서 인수로 전달한 키를 갖는 값을 반환한다.
// 존재하지 않으면 undefined를 반환한다.
const map = new Map();

const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

map
    .set(lee, 'developer')
    .set(kim, 'designer');

console.log(map.get(lee)); // developer
console.log(map.get('key')); // undefined

// 요소 존재 여부 확인
// 특정 요소의 존재 확인은 Map.prototype.has 메서드를 사용한다.
// has 메서드는 특정 요소의 존재 여부를 나타내는 boolean 값을 반환한다.
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

console.log(map.has(lee)); // true
console.log(map.has('key')); // false

// 요소 삭제
// Map 객체의 요소를 삭제하려면 Map.prototype.delete 메서드를 사용한다.
// delete 메서드는 삭제 성공 여부를 나타내는 boolean 값을 반환한다.
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.delete(kim);
console.log(map); // Map(1) { {name: "Lee"} => "developer" }

// 만약 존재하지 않는 키로 Map 객체의 요소를 삭제하려 하면 에러 없이 무시된다.
const map = new Map([['key1', 'value1']]);

// 존재하지 않는 키 'key2'로 요소를 삭제하려 하면 에러없이 무시된다.
map.delete('key2');
console.log(map); // Map(1) {"key1" => "value1"}

// delete 메서드는 삭제 성공 여부를 나타내는 boolean 값을 반환한다.
// 따라서 set 메서드와 달리 연속적으로 호출할 수 없다
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.delete(lee).delete(kim); // TypeError: map.delete(...).delete is not a function

// 요소 일괄 삭제
// Map 객체의 요소를 일괄 삭제하려면 Map.prototype.clear 메서드를 사용한다.
// clear 메서드는 언제나 undefined를 반환한다.
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.clear();
console.log(map); // Map(0) {}

// 요소 순회
// Map.prototype.forEach 메서드를 통해 요소를 순회한다. Array.prototype.forEach 메서드랑 유사하다.
// forEach 메서드의 콜백 함수 내부에서 this로 사용될 객체(옵션)를 인수로 전달한다.
// 이때 콜백 함수는 다음과 같이 3개의 인수를 전달받는다.
// 첫 번째 인수 : 현재 순회 중인 요소값
// 두 번째 인수 : 현재 순회 중인 요소키
// 세 번째 인수 : 현재 순회 중인 Map 객체 자체
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.forEach((v, k, map) => console.log(v, k, map));
/*
developer {name: "Lee"} Map(2) {
  {name: "Lee"} => "developer",
  {name: "Kim"} => "designer"
}
designer {name: "Kim"} Map(2) {
  {name: "Lee"} => "developer",
  {name: "Kim"} => "designer"
}
*/

// Map 객체는 이터러블이다. 따라서 for ... of 문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭칭 할당의 대상이 될 수도 있다.
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

// Map 객체는 Map.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in map); // true

// 이터러블인 Map 객체는 for...of 문으로 순회할 수 있다.
for (const entry of map) {
    console.log(entry); // [{name: "Lee"}, "developer"]  [{name: "Kim"}, "designer"]
}

// 이터러블인 Map 객체는 스프레드 문법의 대상이 될 수 있다.
console.log([...map]);
// [[{name: "Lee"}, "developer"], [{name: "Kim"}, "designer"]]

// 이터러블인 Map 객체는 배열 디스트럭처링 할당의 대상이 될 수 있다.
const [a, b] = map;
console.log(a, b); // [{name: "Lee"}, "developer"]  [{name: "Kim"}, "designer"]

// Map 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드를 제공한다.
// Map.prototype.keys : Map 객체에서 요소키를 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환한다.
// Map.prototype.values : Map 객체에서 요소값을 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환한다.
// Map.prototype.entries : Map 객체에서 요소키와 요소값을 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환한다.

const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

// Map.prototype.keys는 Map 객체에서 요소키를 값으로 갖는 이터레이터를 반환한다.
for (const key of map.keys()) {
    console.log(key); // {name: "Lee"} {name: "Kim"}
}

// Map.prototype.values는 Map 객체에서 요소값을 값으로 갖는 이터레이터를 반환한다.
for (const value of map.values()) {
    console.log(value); // developer designer
}

// Map.prototype.entries는 Map 객체에서 요소키와 요소값을 값으로 갖는 이터레이터를 반환한다.
for (const entry of map.entries()) {
    console.log(entry); // [{name: "Lee"}, "developer"]  [{name: "Kim"}, "designer"]
}

// Map 객체는 요소의 순서에 의미를 갖지 않지만 Map 객체를 순회하는 순서는 요소가 추가된 순서를 따른다
// 이는 다른 이터러블의 순회와 호환성을 유지하기 위함이다.

