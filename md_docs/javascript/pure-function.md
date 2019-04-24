---
customauthor:
  - name: Wabi
---
# * 서브루틴, 순수한 함수
<Author/>

## 서브루틴

다른 코드에서 `procedure`, `routine`, `subprogram`, `macro` 등 다양하게 불려지는 서브루틴은 자바스크립트에서는 함수 또는 메서드라고 불러지고 프로그래밍에 있어서 단순반복이 연속되는 부분을 일부 떼어내어 코드를 간단하게 만드는 것을 말한다. `(서브루틴 === 알고리즘)`

---

### 예시 1. : 서브루틴 function
```js
const hour = new Date().getHours();
let Lunch = false;
if(12<=hour && hour <= 13) Lunch = true;
```

> 위 코드가 여러번 반복되어야 해서, 하단에 함수로 바꾸면,

```js
function isCurrentLunch(){
    const hour = new Date().getHours();
    let Lunch = false;
    if(12<=hour && hour <= 13) Lunch = true;
    else Lunch = false;
    return Lunch;
}
```

> 함수명에 반환값이 불리언 이라면 `is`를 붙이는 것이 일반적이고, 함수명에 `current`를 넣은 이유, 현재 시간에 따라 항상 값이 다르기 때문이다.

---

## 순수한 함수 : pure function

위 예시 1 코드는 순수한 함수라고 부를 수 없다. 순수한 함수('pure function')은 입력값이 같을 때, 결과값도 같은 수학적인 정의에 충실한 함수를 말한다.\
따라서, 위 예시 1 코드는 `시간에 따라 결과값이 달라서` 순수한 함수라고 부를 수 없다.

### 예시 1 코드를 순수한 함수로 바꿀시,
```js
function isCurrentLunch(hour){
    let Lunch = false;
    if(12<=hour && hour <= 13) Lunch = true;
    else Lunch = false;
    return Lunch;
}
```

> 이제는 입력값이 같으면 결과도 항상 같고, `다른 부수적인 효과`를 일으키지도 않기 때문에 순수한 함수라고 볼 수 있다.

### 예시 2. : pure function

위 `'다른 부수적인 효과'` 가 일어나는 function 예시 (순수한 함수가 아닌)

```js
const people = ['wabi','yuna','hidekuma','one','teak','twice'];
let idx = -1;
function getNextPerson(){
    if(++idx >= people.length) idx = 0;
    return people[idx];
}
```

- 함수의 결과가 항상 다르다.
- `idx`가 `getNextPerson` 함수에 속하지 않는데도 함수를 호출하면 변수가 바뀐다.

위 2가지가 `순수한 함수`라는 정의를 어긴다.

**위 코드 수정 : 클로저 이용해서 함수안에 변수를 넣기**

```js
const getNextPerson = (function(){
    const people = ['wabi','yuna','hidekuma','one','teak','twice'];
    let idx = -1;
    return function(){
        if(++idx >= people.length) idx = 0;
        return people[idx];
    };
})();
```

> 하지만 입력이 같아도 결과가 다르기 때문에 순수 함수라고 볼 수 없다.\
만약 위 함수 `getNextPerson`를 다른곳에서도 사용한다고하면, 결과값에 영향을 끼치게 되므로 `부수적인 효과`가 일어난다.

```js
test1 = getNextPerson;
test2 = getNextPerson;

test1(); // 'wabi'
test1(); // 'yuna'
test1(); // 'hidekuma'
test2(); // 'one'
```

**위 코드 수정 : 디자인 패턴(반복자, iterator), 이터레이터를 사용하기**

```js
//const people = ['wabi','yuna','hidekuma','one','teak','twice'];
const getNextPerson = (function(){
    function getNextPerson(people){
        this.people = people;
        this.idx = 0;
    };
    getNextPerson.prototype.next = function() {
        return this.people[this.idx++];
    };
    getNextPerson.prototype.done = function() {
        return this.people.length === this.idx;
    };
    return getNextPerson;
})();
```

> 위 코드의 `getNextRainbowColor`함수는 순수한 함수이다.\
항상 같은 것을 반환 하기 때문에 안전하다. 결국에는 next() 메서드도 매번 다른 값을 반환하기 때문에 순수한 함수가 아니다? 라고 할 수도 있지만, 반환 자체가 메서드라는 점, 자신이 속한 객체 안에서 동작하기 때문에 `getNextRainbowColor` 함수를 다른곳에 또 호출하더라도 독립적인 이터레이터가 생성된다. (= 다른 이터레이터를 침범하지 않는다.)

```js
test1 = new getNextPerson(['wabi','yuna','hidekuma','one','teak','twice']);
test2 = new getNextPerson(['wabi','yuna','hidekuma','one','teak','twice']);

test1(); // 'wabi'
test1(); // 'yuna'
test1(); // 'hidekuma'
test2(); // 'wabi'

test3 = new getNextPerson(['wabi','yuna','hidekuma','one','teak','twice']);
while (!test3.done()) {
  console.log(test3.next());
}
// 'wabi'
// 'yuna'
// 'hidekuma'
// 'one'
// 'teak'
// 'twice'
```

---

**etc. 제너레이터 (ES6) 사용하기**

```js
const people = ['wabi','yuna','hidekuma','one','teak','twice'];
function* getNextPerson(people){
    const length = people.length;
    for(let idx = 0; idx < length; idx ++){
        yield people[idx];
    }
}

test1 = getNextPerson(people);
test2 = getNextPerson(people);

test1.next(); // {value: "wabi", done: false}
test1.next(); // {value: "yuna", done: false}
test1.next(); // {value: "hidekuma", done: false}
test1.next(); // {value: "one", done: false}

test2.next(); // {value: "wabi", done: false}

test1.next(); // {value: "teak", done: false}
test1.next(); // {value: "twice", done: false}
test1.next(); // {value: undefined, done: true}

test2.next(); // {value: "yuna", done: false}
```

> 위 코드 `getNextRainbowColor` 함수 또한 제너레이터를 이용한 순수한 함수이다.