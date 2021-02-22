// 자바스크립트는 프로토타입 기반의 객체 지향 프로그래밍 언어
// ES6에서 클래스가 도입되었고, 프로토타입 기반의 인스턴스를 생성하지만 정확히 동일하진 않다.
// 별개의 새로운 객체 성성 매커니즘으로 보는 것이 합당하며 해당 부분은 클래스 단원에서 정리

// OOP (객체 지향 프로그래밍) 이란?
// 이름과 주소 속성을 갖는 객체
const person = {
    name: 'Lee',
    address: 'Seoul'
};

console.log(person); // {name: "Lee", address: "Seoul"}
// 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라고 한다.
// 객체 지향 프로그래밍은 이러한 객체의 집합으로 프로그램을 표현한다.

const circle = {
    radius: 5, // 반지름 - 원의 상태

    // 원의 지름: 2r
    getDiameter() { // 동작
        return 2 * this.radius;
    },

    // 원의 둘레: 2πr
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    },

    // 원의 넓이: πrr
    getArea() {
        return Math.PI * this.radius ** 2;
    }
};

console.log(circle);
// {radius: 5, getDiameter: ƒ, getPerimeter: ƒ, getArea: ƒ}

console.log(circle.getDiameter());  // 10
console.log(circle.getPerimeter()); // 31.41592653589793
console.log(circle.getArea());      // 78.53981633974483

// 객체란 객체의 상태를 나타내는 프로퍼티와 동작인 메서드를 하나로 묶은 복합적인 자료구조

// 상속inheritance는 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것.
// 생성자 함수
function Circle(radius) {
    this.radius = radius;
    this.getArea = function () {
        // Math.PI는 원주율을 나타내는 상수다.
        return Math.PI * this.radius ** 2;
    };
}

// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea); // false

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
// 메서드를 중복 생성 하는 것은 메모리 낭비, 상속을 통해 중복 제거가 가능하다
// 자바스크립트는 프로토타입을 기반으로 상속을 구현한다

// 생성자 함수
function Circle(radius) {
    this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
// 공유해서 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
    return Math.PI * this.radius ** 2;
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
// 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
