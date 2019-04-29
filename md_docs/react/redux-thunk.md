---
customauthor:
  - name: Wabi
---
# * Redux thunk
<Author/>

리덕스를 사용하는 애플리케이션 에서는 비동기 작업을 위해서 특정 미들웨어를 사용해야한다. 이때 redux-saga, mobX, redux thunk 등 많은 미들웨어 라이브러리 중 어떤 것과 아키텍쳐링을 구현하냐에 따라 사용하는 라이브러리가 다를 것 이다.

Redux-thunk는 그중에서도 가장 기본적인 비동기작업처리 미들웨어 이다.\
리덕스를 개발한 `Dan Abramov`가 만들었고, [redux 공식 매뉴얼 : 비동기 액션 생성자](https://lunit.gitbook.io/redux-in-korean/advanced/asyncactions#undefined-4)에서도 Redux-thunk를 사용하여 비동기 작업을 다룬다. 그만큼 Redux-thunk로 비동기 작업을 관리하는건 매우 직관적이고 간단하다.

## Thunk?

thunk는 서브루틴(이하 '함수')에 추가 계산을 주입하는 데 사용되는 함수이다.

예시)
```js
const wabi = '29' + 'years old'; // '29years old'
```

```js
const wabi = () => '29' + 'years old';

wabi(); //'29years old'
```
위 코드와 아래 코드가 다른점은 함수형태로 감쌌다는 점이다.
즉, wabi() 라고 `함수 호출`을 해야 값이 반환된다.

---

## Redux-thunk의 액션 생성자 예시

redux-thunk는 위 예시에서 thunk 가 무엇인지 본 것 처럼, 리덕스에 객체를 보내기만 하는것이 아닌, `함수를 생성하는 액션 생성자`를 보낼 수 있게 해주는 미들웨어이다.

예시) 일반적인 액션 생성자
```js
const highlight = (flag) => ({
    type:'HIGHLIGHT',
    flag
})

const insertJSON = (json) => ({
    type:'INSERTJSON',
    json
})

const insertValue = (selKey,entryInfo,val,rerender) => ({
    type:'INSERTVALUE',
    selKey,entryInfo,val,rerender
})
```

위에서 보는 것 처럼 `일반적인 액션 생성자`는 파라미터를 가지고 액션객체를 생성하는 작업만 한다.

`일반적인 액션 생성자`는 비동기작업`(= 1초뒤 실행 또는 현재 애플리케이션 상황에 따라 작업 진행 또는 중지)`이 불가하지만, redux-thunk는 가능하다.

예시 1) 위 `highlight 액션 생성자` 1초 뒤 실행 비동기 작업
```js
const highlight = (flag) => ({
    type:'HIGHLIGHT',
    flag
})
const highlightAsync = () => {
    return dispatch => { // dispatch 파라미터를 가진 함수 반환
        setTimeout(() => {
            dispatch(highlight(true));
        }, 1000);
    }
}
//1초 뒤 하이라이트 flag가 true로 상태값이 변경되는 함수를 반환한다.
```

store.dispatch(highlightAsync()); 를 호출하면 액션타입 `HIGHLIGHT` 액션이 1초뒤 디스패치된다.

예시 2) flag가 현재 상태의 반대로 상태변화를 하게 나타낸다. (1초 뒤)
```js
const highlight = (flag) => ({
    type:'HIGHLIGHT',
    flag
})
const highlightAsync = () => {
    return (dispatch,getState) => { // dispatch, getState 파라미터를 가진 함수 반환
        const { highlight } = getState();
        setTimeout(() => {
            dispatch(highlight(!highlight));
        }, 1000);
    }
}
```

위 예시에서는 getState 파라미터를 통해 현재상태값을 확인후 해당 boolean값의 반대로 상태변화를 1초 뒤 일으키는 함수를 반환한다.
또는 dispatch를 하기 싫을 경우, return 으로 상태변화를 중단 할수도 있다.

예시 3) 상태변화 중단
```js
const highlight = (flag) => ({
    type:'HIGHLIGHT',
    flag
})
const highlightAsync = () => {
    return (dispatch,getState) => { // dispatch, getState 파라미터를 가진 함수 반환
        const { highlight } = getState();
        if(!highlight) return;
        //하이라이트가 false 일 경우, 중단
        setTimeout(() => {
            dispatch(highlight(highlight));
        }, 1000);
    }
}
```
위 예시처럼 현재 스토어 상태 값에 따라서 액션 dispatch를 중단 시킬 수도 있다.

---

## Redux-thunk를 이용한 웹 요청 예시
```js
//액션 타입 정의
const API_REQUEST = "API_REQUEST";
const API_SUCCESS = "API_SUCCESS";
const API_FAILURE = "API_FAILURE";

//액션 생성자
const asyncRequest = () => ({
  type: API_REQUEST
})

const asyncSuccess = (data) => ({
  type:API_SUCCESS,
  data
})

const asyncFailure = (error) => ({
  type: API_FAILURE,
  error
})

//웹 통신 액션 생성자 내부 들어갈 promise 반환 함수 'callAPI'
const callAPI = (data) => {
  const promise = fetch({...data
    //data 매개변수에 api 통신을 위한 fetch함수에 사용될 변수 삽입.
  });
  return promise.then(response => response.json())
}

//웹 통신 액션
const dispatchAsyncAct = data => (dispatch,getState) =>{
  dispatch(asyncRequest);
  callAPI(data)
    .then(json => dispatch(asyncSuccess(json))
    .catch(error => dispatch(asyncFailure(error))
}
```

위 예시코드 웹 통신 로직은 애플리케이션의 리덕스 구조나 코드패턴이 개발자마다, 다르기 때문에 여러 코드를 보고 자신의 프로젝트에 알맞게 쓰면 된다.

---

## 요약

redux-thunk는 리듀서에 액션객체를 보내는 일반적인 액션생성자에서 함수형태(thunk)의 액션생성자, 즉 내부에 dispatch, getState를 매개변수로 가지고있는 함수 형태를 가진 액션 생성자를 리듀서에 보내게 해주는 미들웨어 이다.