# * 자바스크립트 성능 최적화  

회사 작업 중 논리 연산자(`||`, `&&`)를 사용한 초기화가 좋을지 아니면 삼항 연산자(`a ? a : b`)를 사용한 것이 좋을지에 대한 생각에서 성능 최적화 관련 내용을 찾아보게 되었다.

### `||` 연산자  

`||` 연산자는 참을 만나면 뒤에 따라오는 연산을 하지 않으므로 `if`문 대신 사용하면 코드량과 연산 횟수를 줄일 수 있다.
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

### `&&` 연산자

`&&` 연산자는 참을 만나야 다음 연산을 진행하므로 어떤 조건을 만족할 때 실행하도록 하는 코드에서 사용하면 코드량과 연산 횟수를 줄일 수 있다.
```javascript
let userID;
if ( user && user.loggedIn ) {
    userID = user;
}
else {
    userID = null;
}

const userID = user && user.loggedIn && user.id;
```
> if 문에서 조건문에 대한 처리를 어떻게 하는지 찾아보면 좋을 것 같다.  
> 위의 코드들만 살펴보았을 때는 코드량에 대한 이점만 있는 것 같다.  

> 논리 연산자의 경우, 조건이 많이 들어가는 경우에는 오히려 가독성을 떨어뜨릴 수 있다.  