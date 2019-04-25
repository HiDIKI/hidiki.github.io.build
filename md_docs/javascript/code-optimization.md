---
customauthor:
  - name: taekbari
---

# * 자바스크립트 성능 최적화  
<Author/>

### `||` 연산자  

`||` 연산자는 참을 만나면 뒤에 따라오는 연산을 하지 않으므로 `if`문 대신 사용하면 코드량과 연산 횟수를 줄일 수 있다.  
첫 번째 값이 참이면 첫 번째 값을 가지게 되고 거짓이면 두 번째 값을 갖는다.  
```javascript  
let result;
if ( value ) {
    result = value;
}
else {
    result = 'default value';
}

const result = value || 'default value';
```  

`||` 연산자의 잘못된 사용 예는 다음과 같다.  
```javascript
const result = 20 || undefined;
const result1 = [1, 2] || 0;
const result2 = { test: 'test' } || '';
```  
> 위의 예제들은 앞에 설정된 값이 항상 참이기 때문에 두 번째 값을 절대로 만나지 앟는다.  

### `&&` 연산자

`&&` 연산자는 참을 만나야 다음 연산을 진행하므로 어떤 조건을 만족할 때 실행하도록 하는 코드에서 사용하면 코드량과 연산 횟수를 줄일 수 있다.  
```javascript  
/*
user 객체는 다음과 같이 구성된다고 가정.
user = {
    loggedIn: boolean,
    id: string
}
*/
let userID;
if ( user && user.loggedIn ) {
    userID = user;
}
else {
    userID = null;
}

const userID = user && user.loggedIn && user.id;
console.log( userID ); // user.id에 설정된 값을 할당.
```  
> 논리 연산자의 경우, 조건이 많이 들어가는 경우에는 오히려 가독성을 떨어뜨릴 수 있다.  

### 변수, 객체 생성  

변수, 객체를 생성할 경우에는 생성자를 사용하는 것보다는 리터럴 형식으로 작성한다.  
```javascript  
// bad
const arr = new Array();
const obj = new Object();
const str = new String( 'test' );

// good
const arr = [];
const obj = {};
const str = 'test';
```  

### 반복문  

* `for`문 안에서 `Array.length`를 직접 사용하는 것보다 선언 후 사용한다.  
* 구문이 반복될 때, 배열의 길이를 가져오는 연산을 줄이기 위한 방법이다.  
```javascript  
// bad
for ( let i = 0; i < arr.length; i++ ) {
    // ...
}

// good
const length = arr.length;
for ( let i = 0; i < length; i++ ) {
    // ...
}
```  

* `for-in`의 사용을 최소화한다.  
`for-in`외의 반복문은 주어진 배열 객체를 배열의 특성에 맞게 순차적으로 모든 요소를 탐색하지만, `for-in` 구문은 배열을 배열이 아닌 일반 객체로 취급하며, 반복 시점마다 객체의 모든 속성을 무작위로 탐색한다.(스코프 체이닝)  