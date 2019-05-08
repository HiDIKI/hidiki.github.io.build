---
customauthor:
  - name: Wabi
---
# * 비동기적 프로그래밍 - 4. async/await
<Author/>

- callback이나 promise 이후로 나온 비동기 코드를 작성하는 새로운 방법이다.
- 실제로는 최상위에 위치한 promise를 사용하는 방식이다.
- plain callback 이나 node callback과 함께 사용할 수 없다.
- 작업은 비동기 코드이지만, 코드의 모양새는 동기 코드와 유사하게 만들어 준다.
- async 함수 내부에만 await 를 쓸 수 있다. (= 코드 최상위 스코프에서는 사용할 수 없다.)
- 모든 async 함수는 promise를 반환한다.

[async/await 는 generator를 기반으로 만들어졌다.](https://tc39.github.io/ecmascript-asyncawait/)
Node는 7.6 버전부터는 async/await 를 별도의 도구없이도 지원하기 시작했고, Node 8 버전부터는 async/await를 완벽하게 지원한다. 이처럼 지원이 확정된 이유로는 async/await 는 promise 에 비해 훨씬 직관적이고 사용법도 쉬울 뿐더러, 코드 이해도 향상에도 도움을 준다.

## 예시 1) 프로미스에서 async/await로 변환

```js
const users = ['Wabi','Taek','Tesilio','Hidekuma','One'];

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

const getNextUserByName = idx => new Promise(resolve=>{
    setTimeout(() => resolve(users[idx] || '없습니다.',1000));
});
// 프로미스 활용
let resultObj;
Promise.resolve({})
.then(getRandomIdx)
.then(getUserByIdx)
.then(obj => {
    resultObj = {...obj};
    return getNextUserByName(obj.idx+1);
})
.then(nextName => console.log(`배열 ${resultObj.idx+1} 번째 ${resultObj.name}가 있습니다. 그리고 다음순서는 ${nextName}`));

// async await 활용
const result = async () => {
    const objIdx = await getRandomIdx();
    const objName = await getUserByIdx(objIdx);
    const nextName = await getNextUserByName(objName.idx + 1);
    return `배열 ${objName.idx+1} 번째 ${objName.name}가 있습니다. 그리고 다음순서는 ${nextName}`;
}
result().then(res=>console.log(res))
```
### 콘솔로그 결과 (랜덤이기 때문에 이름,IDX 가 다를 수 있다.)
```
배열 5 번째 One가 있습니다. 그리고 다음순서는 없습니다.
```

한눈에 보기에도 너무 간결하고 쉽게 구현할 수 있다.\
심지어 에러 헨들링 조차 쉽게할 수 있다. 이전의 프로미스는 `promise.catch`로 에러를 잡아야 했다면, `async/await`는 동기와 비동기 에러 모두를 `try/catch` 으로도 처리할 수 있게 해준다.

## 예시 2) 에러 헨들링
```js
// async await 활용
const result = async () => {
    try{
        const objIdx = await getRandomIdx();
        const objName = await getUserByIdx(objIdx);
        const nextName = await getNextUserByName(objName.idx + 1);
        return `배열 ${objName.idx+1} 번째 ${objName.name}가 있습니다. 그리고 다음순서는 ${nextName}`;
    }catch(err){
        console.error(err);
    }
}
result().then(res=>console.log(res))
```

## async/await 의 단점

1. async 함수를 사용하면 내부에서 무조건 promise를 사용해야 된다.
2. 비동기 코드를 동기 코드처럼 보이게 해주니 데이터 반환 시점에 대해 큰 고려를 못하고 지나칠 수도 있다.
3. 크로스 브라우징을 위해서 babel 필수적으로 따라온다.