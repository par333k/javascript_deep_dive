// module 이란 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각을 말한다.
// 일반적으로 모듈은 기능을 기준으로 파일 단위로 분리한다
// 모듈이 성립하려면 모듈은 자실만의 파일 스코프(module scope)를 가질 수 있어야 한다.
// 자신만의 파일 스코프를 갖는 모듈의 자산(변수,함수,개겣 등)은 기본적으로 비공개 상태다
// 즉, 모듈은 캡슐화 되어 개별적 존재로서 애플리케이션과 분리되어 존재한다
// 하지만 애플리케이션과 완전히 분리되어 개별적인 모듈은 재사용이 불가능하므로 존재의미가 없다.
// 모듈은 재사용 되어야 의미가 있다. 따라서 모듈은 공개가 필요한 자산에 한정하여 명시적으로 선택적 공개가 가능하다.
// 이를 export라 한다.
// 공개된export 모듈은 자산의 다른 모듈에서 재사용할 수 있다. 이 때 공개된 모듈의 자산을 사용하는 모듈을
// 모듈 사용자module consumer라 한다. 모듈 사용자는 모듈이 공개export 한 자산 중 일부 또는 전체를 선택해
// 자신의 스코프 내로 불러들여 재사용할 수 있다. 이를 import라 한다.
// export와 import를 통해 필요에 따라 다른 모듈에 의해 재사용되고, 기능별로 분리되어 개별적인 파일로 관리되는 것을 통해
// 개발 효율성과 유지보수성을 달성한 애플리케이션 구성이 가능하다.

// 자바스크립트는 하나의 전역을 공유하기 때문에, 기본적으로 모듈시스템이 없다.
// 이러한 한계를 극복하기 위해 CommonJS, AMD 등을 활용한다.
// 브라우저 환경에서는 이러한 사양을 만족하는 모듈 로더 라이브러리를 사용해야 하는 상황이 되었다.
// Node.js 환경에서는 CommonJS 사양을 기본적으로 따름으로서 독립적으로 파일스코프(모듈스코프)를 갖는다.

// ES6에서는 이러한 문제 해결을 위해 클라이언트 사이드에서도 동작하는 모듈 기능을 추가했다.
// IE를 제외한 대부분의 모던브라우저에서 ES6 모듈이 사용가능하다.

// ES6 모듈은 아래처럼 사용가능하며, 파일확장자도 mjs로 사용가능하다.
// <script type="module" src="app.mjs"></script>

// ES6모듈은 독자적 모듈 스코프를 갖는다
// foo.js
// x 변수는 전역 변수다.
var x = 'foo';
console.log(window.x); // foo
// bar.js
// x 변수는 전역 변수다. foo.js에서 선언한 전역 변수 x와 중복된 선언이다.
var x = 'bar';

// foo.js에서 선언한 전역 변수 x의 값이 재할당되었다.
console.log(window.x); // bar
/**
<!DOCTYPE html>
<html>
<body>
<script src="foo.js"></script>
<script src="bar.js"></script>
</body>
</html>
 */

// 분리해서 자바스크립트를 로드해도 하나의 파일 인것처럼 작동한다. x는 중복선언되며 값이 변한다.

// foo.mjs
// x 변수는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
var x = 'foo';
console.log(x); // foo
console.log(window.x); // undefined
// bar.mjs
// x 변수는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
// foo.mjs에서 선언한 x 변수와 스코프가 다른 변수다.
var x = 'bar';
console.log(x); // bar
console.log(window.x); // undefined
/*<!DOCTYPE html>
<html>
<body>
<script type="module" src="foo.mjs"></script>
<script type="module" src="bar.mjs"></script>
</body>
</html>*/
// 더 이상 중복되지 않는다. 스코프가 분리되었기 때문이다.
// 모듈 내에서 선언한 식별자는 모듈 외부에서 참조할 수 없다. 스코프가 다르기 때문이다.

// foo.mjs
const x = 'foo';
console.log(x); // foo

// bar.mjs
console.log(x); // ReferenceError: x is not defined


// export 키워드
// 모듈은 독자적인 모듈 스코프를 갖는다. 따라서 모듈 내부에서 선언한 모든 식별자는 기본적으로 해당 모듈 내부에서만 참조할 수 있다.
// 모듈 내부에서 선언한 식별자를 외부에 공개하여 다른 모듈들이 재사용할 수 있게 하려면 export 키워드를 사용한다
// export 키워드는 선언문 앞에 사용한다. 이로써 변수, 함수, 클래스 등 모든 식별자를 export 할 수 있다.
// lib.mjs
// 변수의 공개
export const pi = Math.PI;

// 함수의 공개
export function square(x) {
    return x * x;
}

// 클래스의 공개
export class Person {
    constructor(name) {
        this.name = name;
    }
}

// 선언문 앞에 매번 export 키워드를 붙이는 것이 번거롭다면 export 할 대상을 하나의 객체로 구성하여 한 번에 export 할 수도 있다.

// lib.mjs
const pi = Math.PI;

function square(x) {
    return x * x;
}

class Person {
    constructor(name) {
        this.name = name;
    }
}

// 변수, 함수 클래스를 하나의 객체로 구성하여 공개
export { pi, square, Person };

// import 키워드
// 다른 모듈에서 export 한 식별자를 자신의 모듈 스코프 내부로 로드하려면 import 키워드를 사용한다.
// ESM의 경우(ES6 모듈) 파일 확장자를 생략할 수 없다.
// app.mjs
// 같은 폴더 내의 lib.mjs 모듈이 export한 식별자 이름으로 import한다.
// ESM의 경우 파일 확장자를 생략할 수 없다.
import { pi, square, Person } from './lib.mjs';

console.log(pi);         // 3.141592653589793
console.log(square(10)); // 100
console.log(new Person('Lee')); // Person { name: 'Lee' }

// export한 식별자 이름을 일일히 지정하지 않고 하나의 이름으로 한 번에 import 할 수도 있다.
// app.mjs
// lib.mjs 모듈이 export한 모든 식별자를 lib 객체의 프로퍼티로 모아 import한다.
import * as lib from './lib.mjs';

console.log(lib.pi);         // 3.141592653589793
console.log(lib.square(10)); // 100
console.log(new lib.Person('Lee')); // Person { name: 'Lee' }

// 모듈이 export한 식별자 이름을 변경하여 import할 수도 있다.
// app.mjs
// lib.mjs 모듈이 export한 식별자 이름을 변경하여 import한다.
import { pi as PI, square as sq, Person as P } from './lib.mjs';

console.log(PI);    // 3.141592653589793
console.log(sq(2)); // 4
console.log(new P('Kim')); // Person { name: 'Kim' }

// 모듈에서 하나의 값만 export 한다면 default 키워드를 사용할 수 있다
// default 키워드를 사용하는 경우 기본적으로 이름 없이 하나의 값을 export 한다.
// lib.mjs
export default x => x * x;

// default 키워드를 사용하는 경우 var, let, const 키워드를 사용할 수 없다.
// lib.mjs
//export default const foo = () => {};
// => SyntaxError: Unexpected token 'const'
// export default () => {};

// default 키워드와 함께 export한 모듈은 {} 없이 임의의 이름으로 import한다.
// app.mjs
import square from './lib.mjs';

console.log(square(3)); // 9

