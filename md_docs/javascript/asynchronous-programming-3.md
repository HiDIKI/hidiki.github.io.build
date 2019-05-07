---
customauthor:
  - name: Wabi
---
# * 비동기적 프로그래밍 - 3. Generator
<Author/>

제너레이터는 함수와 호출자 사이의 양방향 통신이 가능하다. 제너레이터는 동기적 성격을 가지고 있지만 프로미스와 같이 사용을 하면 훨씬 더 관리하기 효율적인 비동기 코드를 만들 수 있다.

## 기초 예시 1) 데이터 이동 : yield -> next()
```js
function* getHidikiMembers() {
  yield 'Wabi';
  yield 'Teak';
  yield 'Tesilio';
  yield 'One';
  yield 'Hidekuma';
}

const hidikiMembers = getHidikiMembers();
console.log(hidikiMembers.next()); // {value: "Wabi", done: false}
console.log(hidikiMembers.next()); // {value: "Teak", done: false}
console.log(hidikiMembers.next()); // {value: "Tesilio", done: false}
console.log(hidikiMembers.next()); // {value: "One", done: false}
console.log(hidikiMembers.next()); // {value: "Hidekuma", done: false}
console.log(hidikiMembers.next()); // {value: undefined, done: true}
```

## 기초 예시 2) 데이터 이동 : next() -> yield
```js
function *askFavoriteColor(){
    const name = yield 'What is your name?';
    const color = yield 'What is your favorite color?'
    return `${name}'s favorite color is ${color}.`;
}

const wfc = askFavoriteColor();
wfc.next(); // {value:'What is your name?', done:false}
wfc.next('Wabi'); // {value:'What is your favorite color?', done:false}
wfc.next('red'); // {value:'Wabi's favorite color is red.', done:true}
```

- 함수 내부 `yield` 마다 반환&제어되고 `next()` 를 통해 순환 흐름이 생성된다.
- 제너레이터 함수의 `next()` 와 함수 내부 `yield` 가 서로 데이터를 주고받을 수 있다는 점을 예시에서 확인할 수 있다.

1. 제너레이터는 화살표 함수로 만들수 없고 반드시 function *을 써야한다.
2. 반복문으로 사용시, 제너레이터에서 중요한 값을 절대 return으로 반환하려고 하면 안된다. (이유는 하단 코드 참고)

```js
function* abc(){
    yield 'a';
    yield 'b';
    return 'c';
}

const it = abc();
it.next(); // {value : 'a', done : false}
it.next(); // {value : 'b', done : false}
it.next(); // {value : 'c', done : true}

/*이렇게 value값이 c 까지 반환은 하지만 done이 true로 반환 될 시,
for ... of 루프에서 c는 출력되지 않는다.
이유는 done 이 true 이면 value 프로퍼티에 주의를 기울이지 않기 때문이다.*/

for(let l of abc()){
    console.log(l);
}
// 'a' 와 'b'는 출력되지만 'c'는 출력되지 않는다.
```

## 예시 1-1) 프로미스를 제너레이터로 변환 : 우선 프로미스로 구현 예시

```js
const users = ['Wabi','Teak','Tesilio','Hidekuma','One'];

const getRandomIdx = obj => new Promise(resolve => {
  setTimeout(() => resolve({
      ...obj,
      idx : Math.floor(Math.random() * users.length)
  }), 1000);
});

const getUserByIdx = obj => new Promise(resolve => {
  setTimeout(() => resolve({
      ...obj,
      name : users[obj.idx]
  }), 1000);
});

// 프로미스 활용할 경우 : 프로미스 함수 매개 변수 삽입과 반환이 Object라면 아래처럼 단순하게 구현 가능.
Promise.resolve({})
.then(getRandomIdx)
.then(getUserByIdx)
.then(obj => console.log(`배열 ${obj.idx+1} 번째 ${obj.name}가 있습니다.`))

//하지만 삽입 & 반환 데이터 타입이 다르다면 불가피하게 밖에 변수를 활용해야한다.
const getNextUserByName = idx => new Promise(resolve=>{
    setTimeout(() => resolve(users[idx] || '없습니다.',1000));
});
let resultObj;
Promise.resolve({})
.then(getRandomIdx)
.then(getUserByIdx)
.then(obj => {
    resultObj = {...obj};
    return getNextUserByName(obj.idx+1);
})
.then(nextName => console.log(`배열 ${resultObj.idx+1} 번째 ${resultObj.name}가 있습니다. 그리고 다음순서는 ${nextName}`));
```
### 콘솔로그 결과 (랜덤이기 때문에 이름,IDX 가 다를 수 있다.)
```
배열 1 번째 Wabi가 있습니다.
배열 5 번째 One가 있습니다. 그리고 다음순서는 없습니다.
```

## 예시 1-2) 프로미스를 제너레이터로 변환 : 제너레이터로 구현 예시

```js
//잘못된 활용
function* gen () {
  const objId = yield getRandomIdx();
  const objName = yield getUserByIdx();
  console.log({...objId,...objName});
}
const g = gen();
g.next(); // {value: Promise, done: false}
g.next(); // {value: Promise, done: false}
g.next(); // {value: undefined, done: true}
//Uncaught TypeError: Cannot read property 'idx' of undefined
//위 처럼 잘못되는 이유는 next() 가 프로미스를 value 로 반환 하기 때문이다.

//옳바른 활용
function* gen () {
  const objId = yield getRandomIdx();
  const objName = yield getUserByIdx(objId);
  yield getNextUserByName(objName.idx+1);
}
const g = gen();
g.next().value.then(objId => {
    g.next(objId).value.then(objName => {
        //현재 스코프 내부 objName 상태
        /*
        {
            value : {
                idx : 1,
                name : "Teak"
            },
            done : false
        }
        */
        g.next(objName).value.then(nextName => {
            console.log(`배열 ${resultObj.idx+1} 번째 ${resultObj.name}가 있습니다. 그리고 다음순서는 ${nextName}`)
        });
    });
});
```
### 콘솔로그 결과 (랜덤이기 때문에 이름,IDX 가 다를 수 있다.)
```
배열 5 번째 One가 있습니다. 그리고 다음순서는 Hidekuma
```
### 위 제너레이터의 호출 순서 정리
```text
next(main) → promise(gen) → yield(gen) → then(main) →  // Object id 획득
next(main) → promise(gen) → yield(gen) → then(main) → // Object name 획득
next(main) → promise(gen) → yield(gen) → then(main) → // nextName 획득

console.log(`배열 ${resultObj.idx+1} 번째 ${resultObj.name}가 있습니다. 그리고 다음순서는 ${nextName}`)
```

위 처럼 `코루틴`을 수동으로 콜백 지옥 처럼 제너레이터를 쓴다면 비동기 처리 부분만 편하게 만들 뿐, 제너레이터 실행부분에서 또 힘들게 된다.
그래서 제너레이터 실행함수를 따로 만들어서 활용한다.

::: tip Note
코루틴이란?\
main과 generator('gen') 사이에서 제어권을 서로 주고 받는 것을 볼 수 있다. 이것을 코루틴(coroutine)이라고 부른다. 코루틴이란 여러개의 함수를 반환값 없이 중단 및 실행 시킬수 있는 제어구조를 말한다.
:::

```js
const co = gen => new Promise(resolve => {
  const g = gen();
  const onFulfilled = res => {
    const ret = g.next(res);
    next(ret);
  }
  const next = ret => {
    if (ret.done) return resolve(ret.value);
    return ret.value.then(onFulfilled)
  }
  onFulfilled();
});

function* gen () {
  const objId = yield getRandomIdx();
  const objName = yield getUserByIdx(objId);
  return getNextUserByName(objName.idx+1);
  //co 함수 내부 ret.done 값이 true 일때 종료하기위해 return을 사용하였다.
}
co(gen).then(user => console.log(user)); // Teak (랜덤한 이름)
```

위 처럼 실행함수 사용하면 제너레이터 사용하는 부분도 쉽게 구현 가능하다.

제너레이터를 사용하기 위한 실행 라이브러리 & 제너레이터 사용 라이브러리
- [co : 제너레이터 실행기](https://github.com/tj/co)
- [Koa](https://koajs.com/),
- [Redux-saga](https://github.com/redux-saga/redux-saga)

제너레이터를 사용하기위해서 직접 실행 함수를 만들기보다는 위 3가지 라이브러리 등 프로젝트에 알맞게 이미 만들어진 실행기를 쓰는 것이 시간 절약하기에 좋다.