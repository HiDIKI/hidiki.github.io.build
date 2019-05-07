---
customauthor:
  - name: Wabi
---
# * Map & Set
<Author/>

Map과 Set은 일반적인 알고리즘을 구현하는데 효과적으로 사용될 수 있는 자료구조이다.

- 맵은 키와 값을 연결한다는 점에서 객체와 비슷하다.
- 셋은 중복을 허용하지 않는다는 점을 제외 하면 배열과 비슷하다.

---

## ES6 이전 키와 값을 연결하는데 객체 사용시, 생기는 여러가지 단점.

- 프로토타입 체인 때문에 의도하지 않은 연결이 생길 수 있다.
- 객체 안에 연결된 키와 값이 몇 개나 되는지 쉽게 알아낼 수 있는 방법이 없다.
- 키는 반드시 문자열이나 심볼이어야 하므로 객체를 키로 써서 값과 연결할 수 없다.
- 객체는 프로퍼티 순서를 전혀 보장하지 않는다.

---
## Map 

### 예시 1)
```js
const u1 = {name : 'Wabi'};
const u2 = {name : 'Yuna'};
const u3 = {name : 'Zinico'};
const u4 = {name : 'Yuri'};

const userRoles = new Map();

userRoles.set(u1, 'User');
userRoles.set(u2, 'User');
userRoles.set(u3, 'Admin');

//체인 프로그래밍도 가능하다.
userRoles
.set(u1, 'User')
.set(u2, 'User')
.set(u3, 'Admin');
```

::: tip Note
메서드를 체인으로 연결할 수 있다.
:::

### 예시 2)
```js
const userRoles = new Map([
    [u1,'User'],
    [u2,'User'],
    [u3,'Admin']
]);

userRoles.get(u2); // User

userRoles.has(u1); // true
userRoles.get(u1); // "User"
userRoles.has(u4); // false
userRoles.get(u4); // undefined

userRoles.get(u1); // 'User'
userRoles.set(u1, 'Admin');
userRoles.get(u1); // 'Admin'

userRoles.size; // 3
```

::: tip Note
요소를 지울때는 delete()\
모두 지울 때는 clear()
:::

---

## WeakMap

### Map과 차이점
- 키는 반드시 객체여야 한다.
- WeakMap의 키는 가비지 콜렉션에 포함될 수 있다.
- WeakMap은 이터러블이 아니며 clear() 메서드도 없다.

::: tip Note
가비지 콜렉션('garbage collection')은 메모리 관리 기법 중의 하나로, 동적으로 할당했던 메모리 영역 중에서 필요없는 영역을 해제하는 기능이다.
:::

### 예시 )
```js
const SecretHolder = (function(){
    const secrets = new WeakMap();
    return class {
        setSecret(secret){
            secrets.set(this, secret);
        }
        getSecret(){
            return secrets.get(this);
        }
    }
})();

const a = new SecretHolder();
const b = new SecretHolder();

a.setSecret('secret A');
b.setSecret('secret B');

a.getSecret(); // secret A
b.getSecret(); // secret B
```

---

## Set

중복을 허용하지 않는 데이터 집합

### 예시 1)
```js
const roles = new Set();

roles.add('User'); // Set ['User']
roles.add('Admin'); // Set ['User','Admin']

roles.size; // 2
roles.add('User'); // Set ['User','Admin']
```

###  예시 2) Set, 집합연산
```js
let setA = new Set([1, 2, 3, 4, 5]);
let setB = new Set([4, 5, 6, 7, 8]);
// 합집합
let unionSet = new Set([...setA, ...setB])
for (let value of unionSet) {
  console.log(value);
}
// 차례대로 1, 2, 3, 4, 5, 6, 7, 8 출력

// 교집합
let intersectionSet = new Set(
  [...setA].filter(v => setB.has(v))
);
for (let value of intersectionSet) {
  console.log(value);
}
// 차례대로 4, 5 출력

// 차집합
let differenceSet = new Set(
  [...setA].filter(v => !setB.has(v))
);
for (let value of differenceSet) {
  console.log(value);
}
// 차례대로 1, 2, 3 출력
```
---

## WeakSet

WeakMap 과 마찬가지로 이터러블이 아니고, 가비지 콜렉션의 대상이 된다.\
쓰이는 용도로는 객체가 셋 안에 존재하는지 아닌지 체크 용도로 거의 쓰인다.

### 예시 1)
```js
const naughty = new WeakSet();

const children = [
    {name : 'Wabi'},
    {name : 'Yuna'}
];

naughty.add(children[1]);

for(let child of children){
    if(naughty.has(child)){
        console.log(`This child ${child.name} is naughty`);
    }else{
        console.log(`This child ${child.name} is kind and good`);
    }
}
```