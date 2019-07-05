# * Primitive types

<Author name='Juunone'/>

TypeScript는 아래와 같이 변수명 뒤에 **타입(자료형)** 을 명시하는 것으로 타입을 선언할 수 있다.

## 변수 선언

- 선언한 타입에 맞지 않는 값을 할당하면 컴파일 시점에 에러가 발생한다.

```typescript
let foo: string = "Hello";

let bar: number = true; //TS2322: Type 'true' is not assignable to type 'number'.
```

## 타입 선언 방법

- 함수의 매개변수와 반환값에 대한 타입 선언 방법은 아래와 같다.  
- 일반 변수와 마찬가지로 선언된 타입에 일치하지 않는 값이 주어지면
에러가 발생한다.

```typescript
//함수 선언식
function multiply(x: number, y: number) {
  return x * y;
}

//함수 표현식
const multiply2 = (x: number, y: number): number => x * y;
const multiply3 = (x: string, y: number): number => x * y;

console.log(multiply(10, 5));
console.log(multiply2(8, 3));
console.log(multiply2(true, 1)); //error TS2345: Argument of type 'true' is not assignable to parameter of type 'number'.
console.log(multiply3('foo', 1)); //error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
```


## 타입 종류

TypeScript는 ES5, ES6의 상위 집합(superset)이므로 자바스크립트
타입을 그대로 사용할 수 있다. 자바스크립트의 타입 이외에도 TypeScript 고유의 타입이 추가로 제공된다.

|   타입    | JS  | TS  |                                         설명                                          |
| :-------: | :-: | :-: | :-----------------------------------------------------------------------------------: |
|  boolean  |  O  |  O  |                                     true와 false                                      |
|   null    |  O  |  O  |                                 값이 없다는 것을 명시                                 |
| undefined |  O  |  O  |                           값을 할당하지 않은 변수의 초기값                            |
|  number   |  O  |  O  |                           숫자(정수와 실수, Infinity, NaN)                            |
|  string   |  O  |  O  |                                        문자열                                         |
|  symbol   |  O  |  O  |    고유하고 수정 불가능한 데이터 타입이며 주로 객체 프로퍼티의 식별자로 사용(ES6)     |
|  object   |  O  |  O  |                                    객체형(참조형)                                     |
|   array   |  O  |  O  |                                         배열                                          |
|   tuple   |     |  O  |                 고정된 요소 수만큼의 자료형을 미리 선언후 배열을 표현                 |
|   enum    |     |  O  |                        열거형, 숫자 값 집합에 이름을 저장한 것                        |
|    any    |     |  O  | 타입 추론할 수 없거나 타입체크가 필요없는 변수에 사용, 어떤 타입의 값이라도 할당 가능 |
|   void    |     |  O  |                       일반적으로 함수에서 반환값이 없을때 사용                        |
|   never   |     |  O  |                                 결코 발생하지 않는 값                                 |
