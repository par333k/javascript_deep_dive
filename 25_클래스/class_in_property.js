// 프로퍼티
// 인스턴스 프로퍼티
class Person {
    constructor(name) {
        // 인스턴스 프로퍼티
        this.name = name;
    }
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
// constructor 내부에서 this에 인스턴스 프로퍼티를 추가한다.
// 클래스가 암묵적으로 생성한 빈 객체, 즉 인스턴스에 프로퍼티가 추가되어 인스턴스가 초기화된다.

class Person {
    constructor(name) {
        // 인스턴스 프로퍼티
        this.name = name; // name 프로퍼티는 public하다.
    }
}

const me = new Person('Lee');

// name은 public하다.
console.log(me.name); // Lee
// constructor 내부에서 this에 추가한 프로퍼티는 언제나 클래스가 생성한 인스턴스의 프로퍼티가 된다.
// ES6의 클래스는 다른 객체지향 언어처럼 private, public, protected 키워드와 같은 접근 제한자를 지원하지 않는다.
// 따라서 인스턴스 프로퍼티는 public 하다. private 프로퍼티를 정의할 수 있는 사양은 현재 의논중이다.


// 접근자 프로퍼티
// 접근자 프로퍼티는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할때 사용하는 접근자 함수로 구성된 프로퍼티다.
const person = {
    // 데이터 프로퍼티
    firstName: 'Ungmo',
    lastName: 'Lee',

    // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
    // getter 함수
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    // setter 함수
    set fullName(name) {
        // 배열 디스트럭처링 할당: "36.1. 배열 디스트럭처링 할당" 참고
        [this.firstName, this.lastName] = name.split(' ');
    }
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(`${person.firstName} ${person.lastName}`); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); // Heegun Lee

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
console.log(Object.getOwnPropertyDescriptor(person, 'fullName'));
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}

// 위 예제의 객체 리터럴을 클래스로 표현하면 아래와 같다
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
    // getter 함수
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // setter 함수
    set fullName(name) {
        [this.firstName, this.lastName] = name.split(' ');
    }
}

const me = new Person('Ungmo', 'Lee');

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(`${me.firstName} ${me.lastName}`); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
me.fullName = 'Heegun Lee';
console.log(me); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(me.fullName); // Heegun Lee

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'fullName'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// getter는 인스턴스 프로퍼티에 접근할 때마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용한다.
// getter는 메서드 이름 앞에 get 키워드를 사용해 정의한다.
// setter는 인스턴스 프로퍼티에 값을 할당할 때마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용한다.
// setter는 메서드 이름 앞에 set 키워드를 사용해 정의한다.
// getter 와 setter 이름은 인스턴스 프로퍼티처럼 사용된다.
// 즉, getter와 setter는 참조, 할당형식으로 사용되며 내부적으로 작동과정에서 호출된다
// 클래스의 메서드는 기본적으로 프로토타입 메서드가 된다. 따라서 클래스의 접근자 프로퍼티 또한 인스턴스 프로퍼티가 아닌 프로토타입의 프로퍼티가 된다.

// Object.getOwnPropertyNames는 비열거형(non-enumerable)을 포함한 모든 프로퍼티의 이름을 반환한다.(상속 제외)
Object.getOwnPropertyNames(me); // -> ["firstName", "lastName"]
Object.getOwnPropertyNames(Object.getPrototypeOf(me)); // -> ["constructor", "fullName"]

// 클래스 필드 정의 제안
// 클래스 필드(필드 또는 멤버)는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어이다.
// 가령 자바의 클래스 필드는 마치 클래스 내부에서 변수처럼 사용된다.
// 자바의 클래스 정의
/*
public class Person {
    // ① 클래스 필드 정의
    // 클래스 필드는 클래스 몸체에 this 없이 선언해야 한다.
    private String firstName = "";
    private String lastName = "";

    // 생성자
    Person(String firstName, String lastName) {
    // ③ this는 언제나 클래스가 생성할 인스턴스를 가리킨다.
    this.firstName = firstName;
    this.lastName = lastName;
    }

    public String getFullName() {
        // ② 클래스 필드 참조
        // this 없이도 클래스 필드를 참조할 수 있다.
        return firstName + " " + lastName;
    }
}*/

// 자바스크립트와 달리 클래스 필드를 마치 변수처럼 클래스 몸체에 this없이 선언한다.
// 클래스 기반 객체지향 언어의 this는 언제나 클래스가 생성할 인스턴스를 가리킨다.
// 3과 같은 경우의 this는 주로 클래스 필드가 생성자 또는 메서드의 매개변수 이름과 동일할 때 클래스 필드임을 명확히 하기 위해 사용한다.
// 자바스크립트의 클래스 몸체에는 메서드만 선언할 수 있다. 따라서 클래스 몸체에 자바와 유사하게 클래스 필드를 선언하면 문법 에러가 발생한다.

class Person {
    // 클래스 필드 정의
    name = 'Lee';
}

const me = new Person('Lee');
// 위 예제는 최신브라우저나 node.js 12버전 이상에서는 에러가 나지 않는다. 이는 자바스크립트 사양의 변경때문이다.
// 인스턴스 프로퍼티를 마치 클래스 기반 객체지향 언어의 클래스 필드처럼 정의할 수 있는 새로운 표준사양이 진행중이기 때문이다.

// 따라서 최신 버전의 브라우저나 node.js 환경에서는 클래스 필드를 클래스 몸체에 정의할 수 있다.
class Person {
    // 클래스 필드 정의
    name = 'Lee';
}

const me = new Person();
console.log(me); // Person {name: "Lee"}
// 클래스 몸체에서 클래스 필드를 정의하는 경우 this에 클래스 필드를 바인딩해서는 안 된다.
// this는 클래스의 constructor와 메서드 내에서만 유효하다.
class Person {
    // this에 클래스 필드를 바인딩해서는 안된다.
//    this.name = ''; // SyntaxError: Unexpected token '.'
}

// 클래스 필드를 참조하는 경우 자바스크립트에서는 this를 반드시 사용해야 한다.
class Person {
    // 클래스 필드
    name = 'Lee';

    constructor() {
        console.log(name); // ReferenceError: name is not defined
    }
}

new Person();

// 클래스 필드에 초기값을 할당하지 않으면 undefined를 갖는다.
class Person {
    // 클래스 필드를 초기화하지 않으면 undefined를 갖는다.
    name;
}

const me = new Person();
console.log(me); // Person {name: undefined}

// 인스턴스를 생성할 때 외부의 초기값으로 클래스 필드를 초기화해야 할 필요가 있다면 constructor에서 클래스 필드를 초기화해야 한다.
class Person {
    name;

    constructor(name) {
        // 클래스 필드 초기화.
        this.name = name;
    }
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}

// 인스턴스를 생성할 때 클래스 필드를 초기화할 필요가 있다면 constructor 밖에서 클래스 필드를 정의할 필요가 없다.
// this, 즉 클래스가 생성한 인스턴스에 클래스 필드에 해당하는 프로퍼티가 없다면 자동 추가되기 때문이다.
class Person {
    constructor(name) {
        this.name = name;
    }
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}

// 함수는 일급 객체이므로 함수를 클래스 필드에 할당할 수 있다. 따라서 클래스 필드를 통해 메서드를 정의할 수도 있다.
class Person {
    // 클래스 필드에 문자열을 할당
    name = 'Lee';

    // 클래스 필드에 함수를 할당
    getName = function () {
        return this.name;
    }
    // 화살표 함수로 정의할 수도 있다.
    // getName = () => this.name;
}

const me = new Person();
console.log(me); // Person {name: "Lee", getName: ƒ}
console.log(me.getName()); // Lee

// 이처럼 클래스 필드에 함수를 할당하는 경우, 이 함수는 프로토타입 메서드가 아닌 인스턴스 메서드가 된다.
// 모든 클래스 필드는 인스턴스 프로퍼티가 되기 때문이다.
// 따라서 클래스 필드에 함수를 할당하는 것은 권장하지 않는다.

// 클래스 필드에 화살표 함수를 할당하여 화살표 내부의  this가 인스턴스를 가리키게 하는 경우도 있다.
`
<!DOCTYPE html>
<html>
<body>
  <button class="btn">0</button>
  <script>
    class App {
      constructor() {
        this.$button = document.querySelector('.btn');
        this.count = 0;

        // increase 메서드를 이벤트 핸들러로 등록
        // 이벤트 핸들러 increase 내부의 this는 DOM 요소(this.$button)를 가리킨다.
        // 하지만 increase는 화살표 함수로 정의되어 있으므로
        // increase 내부의 this는 인스턴스를 가리킨다.
        this.$button.onclick = this.increase;

        // 만약 increase가 화살표 함수가 아니라면 bind 메서드를 사용해야 한다.
        // $button.onclick = this.increase.bind(this);
      }

      // 인스턴스 메서드
      // 화살표 함수 내부의 this는 언제나 상위 컨텍스트의 this를 가리킨다.
      increase = () => this.$button.textContent = ++this.count;
    }
    new App();
  </script>
</body>
</html>
`
// 인스턴스가 여러개 생성된다면 이 방법도 메모리의 손해를 감수할 수밖에 없다.

// 인스턴스를 생성할 때 외부 초기값으로 클래스 필드를 초기화할 필요가 있다면 constructor에서 인스턴스 프로퍼티를 정의하는 방식을,
// 인스턴스를 생성할 때 외부 초기값으로 클래스 필드를 초기화할 필요가 없다면 기존 방식과 클래스 필드 정의 제안 둘 다 모두 사용할 수 있다.

// private 필드 정의 제안
// 인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다. 즉, 언제나 public이다.
// 이는 클래스 필드 정의 제안을 사용하더라도 public으로 그대로 노출 된다.
// 크롬 74버전 이상, Node.js 12버전 이상 에서 도입된 private 필드 정의사양을 사용 가능하다.

// private 필드의 선두에는 #을 붙여준다. private 필드를 참조할 때에도 #을 붙여주어야 한다.
class Person {
    // private 필드 정의
    #name = '';

    constructor(name) {
        // private 필드 참조
        this.#name = name;
    }
}

const me = new Person('Lee');

// private 필드 #name은 클래스 외부에서 참조할 수 없다.
console.log(me.#name);
// SyntaxError: Private field '#name' must be declared in an enclosing class

// private 필드는 클래스 내부에서만 참조할 수 있다.
// 다만 접근자 프로퍼티를 통해 간접적으로 접근하는 방법은 유효하다.
class Person {
    // private 필드 정의
    #name = '';

    constructor(name) {
        this.#name = name;
    }

    // name은 접근자 프로퍼티다.
    get name() {
        // private 필드를 참조하여 trim한 다음 반환한다.
        return this.#name.trim();
    }
}

const me = new Person(' Lee ');
console.log(me.name); // Lee
// private 필드는 반드시 클래스 몸체에 정의해야 한다. private 필드를 직접 constructor에 정의하면 에러가 발생한다.
class Person {
    constructor(name) {
        // private 필드는 클래스 몸체에서 정의해야 한다.
        this.#name = name;
        // SyntaxError: Private field '#name' must be declared in an enclosing class
    }
}


// static 필드 정의 제안
// 클래스에는 static 키워드를 사용해 정적 메서드는 정의할 수 있으나 필드를 정의할 수는 없었다.
// 이 부분 역시 정식으로 도입된 것은 아니지만 node.js 12 이상에서 사용 가능하다.
class MyMath {
    // static public 필드 정의
    static PI = 22 / 7;

    // static private 필드 정의
    static #num = 10;

    // static 메서드
    static increment() {
        return ++MyMath.#num;
    }
}

console.log(MyMath.PI); // 3.142857142857143
console.log(MyMath.increment()); // 11
