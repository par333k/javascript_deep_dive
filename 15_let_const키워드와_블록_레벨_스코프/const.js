// const는 상수를 선언하기 위해 사용하지만, 반드시 그런 것은 아니다.
// 대부분 let과 비슷하지만 몇 가지 차이점이 있다.

// 1. 선언과 초기화 - const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다
const foo = 1;
// const foo; // SyntaxError: Missing initializer in const declaration

// const 역시 let처럼 블록레벨 스코프를 가지며 호이스팅이 발생하지 않는 것처럼 동작한다.

{
    // 변수 호이스팅이 발생하지 않는 것처럼 동작한다
    console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
    const foo = 1;
    console.log(foo); // 1
}

// 블록 레벨 스코프를 갖는다.
console.log(foo); // ReferenceError: foo is not defined

// 2. 재할당 금지 - const 키워드로 선언한 변수는 재할당이 금지된다
const foo = 1;
// foo = 2; // TypeError: Assignment to constant variable.

// 3. 상수 - 원시 값을 할당한 경우 변경 불가능하다. 상수란 재할당이 금지된 변수를 뜻한다.
// 상태 유지와 가독성, 유지보수의 편의를 위해 적극적으로 사용해야 한다.
// 세전 가격
let preTaxPrice = 100;

// 세후 가격
// 0.1의 의미를 명확히 알기 어렵기 때문에 가독성이 좋지 않다.
let afterTaxPrice = preTaxPrice + (preTaxPrice * 0.1);

console.log(afterTaxPrice); // 110
// 이럴때 0.1 을 const로 선언해서 쓰면 좋다.
// 세율을 의미하는 0.1은 변경할 수 없는 상수로서 사용될 값이다.
// 변수 이름을 대문자로 선언해 상수임을 명확히 나타낸다.
const TAX_RATE = 0.1;

// 세전 가격
let preTaxPrice = 100;

// 세후 가격
let afterTaxPrice = preTaxPrice + (preTaxPrice * TAX_RATE);

console.log(afterTaxPrice); // 110
// const 키워드로 선언된 변수에 할당한 원시값은 변경 불가능하고 재할당이 금지된다.
// 따라서 이를 잘 활용하면 유지보수성이 대폭 증가한다.

// 4. const 키워드와 객체 - 원시값이 아닌 객체를 할당할 경우 값 변경이 가능하다. 재할당 없이 변경이 가능하기 때문이다.

const person = {
    name: 'Lee'
};

// 객체는 변경 가능한 값이다. 따라서 재할당없이 변경이 가능하다.
person.name = 'Kim';

console.log(person); // {name: "Kim"}

// const 키워드는 재할당을 금지할 뿐 '불변'을 의미하지는 않는다.


