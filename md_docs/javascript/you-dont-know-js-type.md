---
customauthor:
  - name: taekbari
---

# * YOU DON'T KNOW JS - 타입  
<Author/>  

## 타입  

자바스크립트 명세에서 `타입`의 정의 : 자바스크립트 엔진, 개발자 모두에게 어떤 값을 다른 값과 분별할 수 있는, 고유한 내부 특성의 집합이다.  
> ex) 기계(엔진)와 사람(개발자)이 42(숫자)란 값을 "42"(문자열)란 값과 다르게 취급한다면, 두 값은 타입(숫자와 문자열)이 서로 다르다.  

거의 모든 자바스크립트 프로그램에서 다양한 방식으로 **강제변환**이 일어나므로 타입을 확실하게 인지하고 사용하는 것이 증요하다.  

### 내장 타입  

자바스크립트에는 다음 7가지 내장 타입이 있다.  
* null  
* undefined  
* boolean  
* number  
* string  
* object  
* symbol  

`typeof` 연산자를 사용해서 값 타입을 알 수 있는데 7가지의 내장 타입과 1:1로 정확하게 매칭되지 않는다.  
`null`의 경우 아래와 같이 결과 값으로 `null`이 반환되지 않고 `object`를 반환한다.  
```javascript  
typeof null === 'object'  // true
```  
추가적으로 `typeof`가 반환하는 문자열로 `function`이 있다.  
명세를 살펴보면 `function`은 `object`의 '하위 타입'이며 '호출 가능한 객체'라고 명시되어 있다.  

### 값은 타입을 가진다  

값에는 타입이 있지만, 변수엔 따로 타입이란 없다. 변수는 언제라도 어떤 형태의 값이라도 가질 수 있다.  
자바스크립트에서는 '타입 강제'를 하지 않기 때문에, 변수에 `typeof` 연산자를 대어보는 것은 변수의 타입을 물어보는 질문과 같지만, 실제로 타입이란 개념이 변수에 없으므로 변수에 들어있는 값의 타입을 물어보는 것과 같다.  

#### 값이 없는 vs 선언되지 않은  

값이 없는(`undefined`) : 접근 가능한 스코프에 변수가 선언되었으나 값이 할당되지 않은 상태  
선언되지 않은(`undefined`) : 접근 가능한 스코프에 변수 자체가 선언조차 되지 않은 상태  

선언되지 않은 변수의 `typeof` 연산 결과 때문에 두 상태가 같다고 생각할 수 있지만 엄연히 다른 개념이다.  
```javascript  
let a;
typeof a;  // "undefined"
typeof b;  // "undefined"
```  

`typeof` 연산으로 인해 개념에 혼동이 발생할 수 있지만, 다음과 같이 안전가드 역할을 할 수도 있다.  
```javascript  
let a = 2, c = 0;

if ( b ) {  // ReferenceError: b is not defined
  c = a + b;
}

if ( typeof b !== 'undefined' ) {
  c = a + b;
}
```  

## 값  

### 배열  

자바스크립트 배열은 타입이 엄격한 다른 언어와 달리 문자열, 숫자, 객체 심지어 다른 배열이나 어떤 타입의 값이라도 담을 수 있는 그릇이다.  
```javascript  
let a = [1, '2', [3]];
```  

배열의 크기를 미리 지정하지 않고도 선언할 수 있으며 원하는 위치에 값을 추가할 수 있다. 이로 인해서 중간에 '빈 슬롯'이 생길 수 있다.  
```javascript  
let a = [];

a[0] = 1;
a[2] = 3;

a[1]; // undefined
a.length; // 3
```  

배열 인덱스는 숫자인데, 배열 자체도 하나의 객체여서 키/프로퍼티 문자열을 추가할 수 있다.  
**(하지만 배열 length가 증가하지는 않는다)**  
```javascript  
let a = [];

a[0] = 1;
a['footer'] = 2;

a.length; // 1
a['footer'];  // 2
a.footer; // 2
```  

키로 넣은 문자열 값이 **10진수 숫자**로 타입이 바뀌면, 문자열 키가 아닌 숫자 키를 사용한 것 같은 결과가 초래된다.  
```javascript  
let a = [];

a['13'] = 42;
a.length; // 14
```  

> 문자열 타입의 키/프로퍼티 사용이 필요할 경우에는 배열보다는 객체를 사용하는 것을 추천한다.  

### 문자열  

흔히 문자열은 단지 문자의 배열이라고 생각하지만 자바스크립트에서는 실제로 생김새만 비슷할 뿐 문자 배열과 같지 않다.  
```javascript  
let a = 'foo';
let b = ['f', 'o', 'o'];
```  
> 문자열은 배열과 겉모습이 닮았다.(유사배열) 둘 다 `length` 프로퍼티, `indexOf()`, `concat()` 메서드를 가진다.  

겉모습은 비슷하지만 문자열은 불변 값(immutable)이고 배열은 가변 값(mutable)이다. 배열처럼(`a[1]`) 문자열의 특정 문자를 접근하는 형태가 자바스크립트 엔진에서 유효한 것은 아니다.(인터넷 익스플로러 구버전에서는 문법 에러로 인식한다.)  
문자열은 불변 값이므로 문자열 메서드는 그 내용을 바로 변경하는 것이 아니고 새로운 문자열을 생성한 후 반환한다.  

> 문자열을 다룰 때 유용한 대부분의 배열 메서드는 사실상 문자열에 쓸 수 없지만, 문자열에 대해 불변 배열 메서드를 빌려 쓸 수는 있다.  
```javascript  
let a = 'foo';

a.join; // undefined
a.map; // undefined

let c = Array.prototype.join.call( a, '-' );
let d = Array.prototype.map.call( a, (value) => {
  return value.toUpperCase() + '.';
}).join('');

c;  // "f-o-o"
d;  // "F.O.O."
```  

> `reverse` 메서드는 가변 메서드이기 때문에 문자열에서 사용할 수 없다.  
```javascript  
let a = 'foo';

a.reverse;  // undefined
Array.prototype.reverse.call( a );  // Uncaught TypeError
```  