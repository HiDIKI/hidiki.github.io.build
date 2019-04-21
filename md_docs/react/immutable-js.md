---
customauthor:
  - name: Wabi
---
# * Redux 찰떡궁합:heart: Immutable JS
<Author/>

## **리엑트 상태관리값의 불변성?**

React는 state 또는 props 의 값이 변경이 되어야 새롭게 다시 렌더링을 하게 된다. `이때 중요한 점으로 변경된 값을 React에서 알기위해 모든 값의 불변성을 유지해주어야 한다.`\
[리엑트 공식문서](https://reactjs.org/docs/rendering-elements.html#updating-the-rendered-element)를 읽다보면 `"immutability"` 를 강조하는 것을 볼 수 있다. `(React elements are immutable.)`

> 불변성 예시

```js
const testObj = {
    data : 1,
    modalFlag : true,
    loadingFlag : false
};
const copyObj = testObj;
++copyObj.data;

console.log(copyObj !== testObj); // false
//하지만 위 console.log 는 두개의 값이 다르지 않지 않는다고 false 로 나온다.
```

> 위 같은 결과가 나온 이유는 copyObj가 다른 객체가 아닌 똑같은 객체를 바라보는 레퍼런스 하나가 만들어진 것이기 때문이다.

```js
const testObj = {
    data : 1,
    modalFlag : true,
    loadingFlag : false
};
const copyObj = {
    ...testObj,
    data : 2
};

console.log(copyObj !== testObj); // true
```
---
## **Redux 그리고 Immutable**

React의 상태관리값(State, Props)의 불변성을 유지하기위해 항상 새로운 객체 반환할 때에 정말 귀찮고 어려울 때가 있다.\
리덕스로 애플리케이션의 컴포넌트 스토어를 하나 두었을때, 처음 data 값이 depth가 깊지 않고 단순하다면 문제가 되지않는다.

```js
const data = {
    a : 1,
    b : 2,
    c : 3,
    flag : true
};

const newData = {
    ...data,
    flag : false
}
```

> 리덕스 액션 중 flag 값을 바꾸는 액션이 있다고 가정하면 해당 액션타입 리듀서 에서는 새로운 data 값으로 flag 를 false로 바꿔서 `newData` 값 처럼 보내 주어야한다. - 위 예시 처럼 단순한 data 구조라면 쉽다.

```js
const data = {
    a : 1,
    b : 2,
    c : 3,
    people : [
        {
            name : 'Wabi',
            age : 29,
            flag : true
        },
        {
            name : 'Yuna',
            age : 30,
            flag : false
        },
        {
            name : 'Zinico',
            age : 26,
            flag : false
        },
        {
            name : 'Hidekuma',
            age : 31,
            flag : false
        },
        {
            name : 'One',
            age : 31,
            flag : true
        }
    ]
};
```

> 위 data 구조에서 people 값 내부 특정 사람(idx)의 flag값을 true로 바꿔야 한다면?

```js
//특정 idx 대입
const newData = {
    ...data,
    people : [
        ...data.people.slice(0,idx),
        {
            ...data.people[idx],
            flag : true
        },
        ...data.people.slice(idx+1,data.people.length)
    ]
};
```

> 위 방식처럼 복잡하고 번거롭다. 사실 위 데이터 구조보다 더 복잡하게 애플리케이션이 많은 상태값을 가질 수도 있기때문에 더더욱 복잡해질 수도 있다.

**immutable.js를 쓸 경우에는**
```js
newData = data.updateIn(['people',idx], (person) => {
   return person.set('flag', true); 
});
```

> 3줄로 줄었다.

위 예시처럼 immutable은 제공하는 몇가지 메서드를 이용해서, 아무리 depth가 깊어도 쉽게 값을 변화하여 새로운 객체를 반환하여 준다.\
immutable은 [공식문서](https://immutable-js.github.io/immutable-js/docs/#/) 또한 너무 정리가 잘되어있어서, 어렵지 않다.

---

## immutable 장점 요약

1. [공식문서](https://immutable-js.github.io/immutable-js/docs/#/)가 너무 잘 정돈되어 있다.
2. [Native Javascript보다 빠르다.](http://blog.klipse.tech/javascript/2016/06/23/immutable-perf.html)
3. 새로운 객체 반환 코드가 간결해지고 추후 유지보수하기에 코드가 보기 편하다.

---

## immutable 간단한 사용 예시보기 (값 읽기,수정)

> immutable 데이터 만들기

```js
//native javascirpt
const data = {
    a : 1,
    b : 2,
    c : 3,
    people : [
        {
            name : 'Wabi',
            age : 29,
            flag : true
        }
    ]
};

//immutable
const data = Map({
    a : 1,
    b : 2,
    c : 3,
    people : List([
        Map({
            name : 'Wabi',
            age : 29,
            flag : true
        })
    ])
});
//객체는 Map으로 배열은 List 로 감싸준다.

const data = fromJS({
    a : 1,
    b : 2,
    c : 3,
    people : [
        {
            name : 'Wabi',
            age : 29,
            flag : true
        }
    ]
});
//또는 fromJS로 최상위를 감싸준다.
```

> immutable 데이터 가져오기

```js
data.toJS(); // immutable 데이터를 native javascirpt 객체로 반환해준다.
data.get('a'); // 1
// 특정 키값 을 반환, 1 depth는 get() 이용
data.getIn(['people',0,'name']); // "Wabi"
// 특정 키값 을 반환, 깊은 depth는 getIn() 이용하고, 해당 키값 위치를 배열로 나열해서 찾으면 된다.

data.getIn(['people',0].concat('name')); // "Wabi"
// 위 처럼 사용도 가능하다.
```

> immutable 데이터 수정하기\
(하단에는, 수정하는 방법은 엄청 다양하므로 set, setIn만 간단히 설명하고 이외 방법은 원하는 로직에따라 [공식문서](https://immutable-js.github.io/immutable-js/docs/#/)를 참조하면 된다.)

```js
data.set('a',2); // a는 2가 된 새로운 객체 반환
data.setIn(['people',0,'name'],'Hidekuma');
// people 배열의 idx가 0인 사람의 이름이 Hidekuma로 바뀐 새로운 객체를 반환한다.
```


