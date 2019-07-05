# * `Promise` 객체 순회시 완료 순서 보장
<Author name='Tesilio'/>

`Array` 객체에 담긴 n개의 `Promise` 객체들을 순서대로 완료(`resolve`)해야 하는 경우가 있다. `Promise.all()`함수는 비동기로 실행되어 완료순서를 보장받을 수 없다. 순서를 보장받는 두가지 방법을 알아보자.

---

## 1. 재귀함수를 이용하는 방법
```js
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const msList = [500, 400, 300, 200, 100];

async function recursivePromise(targetList, resultList = []){
    const value = targetList.shift();
    await delay(value);
    console.log(value);
    resultList.push(value);
    if (targetList.length > 0) {
        await recursivePromise(targetList, resultList);
    }
    return resultList;
}

recursivePromise(msList).then(resultList => {
    console.log(resultList);
});

// 500
// 400
// 300
// 200
// 100
// [ 500, 400, 300, 200, 100 ]
```
`async/await`를 이용하여 작성되었다. `Array.prototype.shift()` 함수를 사용했고 `stack overflow error`에 대응되지 않았기 때문에 큰 사이즈의 배열 순회에 사용하기엔 적합하지 않다.

## 2. `Array.prototype.reduce()`를 이용하는 방법
```js
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const msList = [500, 400, 300, 200, 100];

const result = msList.reduce(async (previousMs, currentMs, index, array) => {
    await previousMs;
    await delay(currentMs);
    console.log(currentMs);
    array[index] = currentMs;
    return array;
}, Promise.resolve());
result.then(resultList => {
    console.log(resultList);
});

// 500
// 400
// 300
// 200
// 100
// [ 500, 400, 300, 200, 100 ]
```
- `Array.prototype.reduce()`함수는 첫번째 매개변수로 `callback` 함수를 받는다.
  - `callback` 함수의 첫번째 인수는 순회 중 값을 누적시킨다.
- 두번째 매개변수로는 `callback` 함수의 최초 호출시 첫 번째 인수에 제공할 값을 받는다.
  - 예제에서는 `Promise.resolve()`로 명시하여 첫 번째 순회부터 `Promise`객체로 정의했다.
- 이와 `async/await`를 이용하여 간단히 `Promise` 객체의 완료 시점을 보장받고 순회할 수 있다.
