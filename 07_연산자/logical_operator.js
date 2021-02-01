// 논리 연산자는 우항과 좌항의 피연산자를 논리 연산한다, 부수효과는 없다.
// 논리합(||) 연산자
true || true;   // -> true
true || false;  // -> true
false || true;  // -> true
false || false; // -> false

// 논리곱(&&) 연산자
true && true;   // -> true
true && false;  // -> false
false && true;  // -> false
false && false; // -> false

// 논리 부정(!) 연산자
!true;  // -> false
!false; // -> true

// 만약 피연산자가 boolean 값이 아니면 boolean 타입으로 암묵적 타입 변환한다.
!0;       // -> true
!'Hello'; // -> false

// || 또는 && 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다.
'Cat' && 'Dog'; // -> 'Dog'

// 드 모르간 법칙 활용하여 표현식을 가독성 좋게 표현 가능
!(x || y) === (!x && !y)
!(x && y) === (!x || !y)
