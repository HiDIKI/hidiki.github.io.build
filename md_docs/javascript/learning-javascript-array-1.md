# * Learning JavaScript - 배열 1편
<Author name='Tesilio'/>  

이 포스팅은 Learning JavaScript의 8장(배열과 배열 처리)을 참고하여 작성 되었다.

---

## 배열의 기초

배열의 기본적인 사항을 떠올려 보자.

- 배열은 객체와 달리 본질에서 순서가 있는 데이터 집합이며 0으로 시작하는 숫자형 인덱스를 사용한다.
- 자바스크립트의 배열은 비균질적(nonhomogeneous)이다. 즉, 한 배열의 요소가 모두 같은 타입일 필요는 없다. 배열은 다른 배열이나 객체도 포함할 수 있다.
- 배열 리터럴은 대괄호로 만들고, 배열 요소에 인덱스로 접근할 때도 대괄호를 사용한다.
- 모든 배열에는 요소가 몇 개 있는지 나타내는 `length` 프로퍼티가 있다.
- 배열에 배열 길이보다 큰 인덱스를 사용해서 요소를 할당하면 배열은 자동으로 그 인덱스에 맞게 늘어나며, 빈 자리는 `undefined`로 채워진다.
- `Array` 생성자를 써서 배열을 만들 수도 있지만 그렇게 해야 하는 경우는 별로 없다.

```js
// 배열 리터럴
const arr1 = [1, 2, 3];  // 숫자로 구성된 배열
const arr2 = ['one', 2, 'three'];  // 비균질적 배열
const arr3 = [[1, 2, 3], ['one', 2, 'three']];  // 배열을 포함한 배열
const arr4 = [  // 비균질적 배열
  {
    name: 'Fred',
    type: 'object',
    luckyNumbers: [5, 7, 13],  
  },
  [
    {
      name: 'Susan',
      type: 'Object',
    },
    {
      name: 'Anthony',
      type: 'Object',
    },
  ],
  1,
  () => {
    return 'arrays can contain functions too';
  },
  'three'
];

// 배열 요소에 접근하기
arr1[0];  // 1
arr1[2];  // 3
arr3[1];  // ['one', 2, 'three']
arr4[1][0];  // { name: 'Susan', type: 'object' }

// 배열 길이
arr1.length;  // 3
arr4.length;  // 5
arr4[1].length;  //2

// 배열 길이 늘리기
arr1[4] = 5;
arr1;  // [1, 2, 3, undefined, 5]
arr1.length;  // 5

// 배열의 현재 길이보다 큰 인덱스에 접근하는 것만으로 배열의 길이가 늘어나지는 않는다.
arr2[10];  // undefined
arr2.length;  // 3

// Array 생성자(거의 사용하지 않는다)
const arr5 = new Array();  // 빈 배열
const arr6 = new Array(1, 2, 3);  // [1, 2, 3]
const arr7 = new Array(2);  // 길이가 2인 배열. 요소는 모두 undefined 이다.
const arr8 = new Array('2');  // ['2']
```

---

## 배열 요소 조작
메서드를 설명하기에 앞서, 자주 사용하는 배열 조작 메서드에 대해 짚고 넘어갈 점이 있다. 애석하게도 배열 메서드 중 일부는 배열 **'자체를'** 수정하며, 다른 일부는 새 배열을 반환한다.

예를 들어 `push`는 배열 자체를 수정하며, `concat`은 새 배열을 반환한다. 메서드 이름에 이런 차이점에 대한 힌트가 전혀 없으므로 프로그래머가 전부 기억해야 한다.

### 배열의 처음이나 끝에서 요소 하나를 추가하거나 제거하기
배열의 *처음*은 첫 번째 요소, 즉 인덱스가 0인 요소를 말한다. 마찬가지로 배열의 *끝*은 인덱스가 가장 큰 요소, 즉 배열이 `arr`이라면 `arr.length - 1`인 요소를 말한다.

`push`와 `pop`은 각각 배열의 끝에 요소를 추가하거나 제거한다(수정). `shift`와 `unshift`는 각각 배열의 처음에 요소를 제거하거나 추가한다(수정).
::: tip
이들 메서드의 이름은 컴퓨터 과학 용어에서 나왔다.  
**push**와 **pop**은 데이터를 수직으로 쌓아 올리는 스택(stack)에 해당하는 행동이다.  
**shift**와 **unshift**는 대기열과 비슷한 큐(queue)에 해당하는 행동이다.
:::

`push`와 `unshift`는 새 요소를 추가해서 늘어난 길이를 반환하고, `pop`과 `shift`는 제거된 요소를 반환한다.  

예제를 보자.
```js
const arr = ['b', 'c', 'd'];
arr.push('e');
// 4. arr은 이제 ['b', 'c', 'd', 'e'] 이다.

arr.pop();
// 'e'. arr은 이제 ['b', 'c', 'd'] 이다.

arr.unshift('a');
// 4. arr은 이제 ['a', 'b', 'c', 'd'] 이다.

arr.shift();
// 'e'. arr은 이제 ['b', 'c', 'd'] 이다.
```

### 배열의 끝에 여러 요소 추가하기
`concat`메서드는 배열의 끝에 여러 요소를 추가한 사본을 반환한다.

`concat`에 배열을 넘기면 이 메서드는 배열을 분해해서 원래 배열에 추가한 사본을 반환한다.

예제를 보자.
```js
const arr = [1, 2, 3];
arr.concat(4, 5, 6);
// [1, 2, 3, 4, 5, 6]. arr은 바뀌지 않는다.

arr.concat([4, 5, 6]);
// [1, 2, 3, 4, 5, 6]. arr은 바뀌지 않는다.

arr.concat([4, 5], 6);
// [1, 2, 3, 4, 5, 6]. arr은 바뀌지 않는다.

arr.concat([4, [5, 6]]);
// [1, 2, 3, 4, [5, 6]]. arr은 바뀌지 않는다.
```
`concat`은 제공받은 배열을 한 번만 분해한다. 배열 안에 있는 배열을 다시 분해하지는 않는다.

### 배열 일부 가져오기
배열의 일부만 가져올 때는 `slice`메서드를 사용한다.

`slice`메서드는 매개변수 두 개를 받는다. 첫 번째 매개변수는 어디서부터 가져올지를, 두 번째 매개변수는 어디까지 가져올지를(바로 앞 인덱스까지 가져온다) 지정한다. 두 번째 매개변수를 생략하면 배열의 마지막까지 반환한다.  

이 메서드에서는 음수 인덱스를 쓸 수 있고, 음수 인덱스를 쓰면 배열의 끝에서부터 요소를 센다.

예제를 보자.
```js
const arr = [1, 2, 3, 4, 5];
arr.slice(3);
// [4, 5]. arr은 바뀌지 않는다.

arr.slice(2, 4);
// [3, 4]. arr은 바뀌지 않는다.

arr.slice(-2);
// [4, 5]. arr은 바뀌지 않는다.

arr.slice(1, -2);
// [2, 3]. arr은 바뀌지 않는다.

arr.slice(-2, -1);
// [4]. arr은 바뀌지 않는다.
```

### 임의의 위치에 요소 추가하거나 제거하기
`splice`는 배열을 자유롭게 수정할 수 있다.

첫 번째 매개변수는 수정을 시작할 인덱스이고, 두 번째 매개변수는 제거할 요소 숫자이다. 아무 요소도 제거하지 않을 때는 0을 넘긴다. 나머지 매개변수는 배열에 추가될 요소이다.

예제를 보자.
```js
const arr = [1, 5, 7];
arr.splice(1, 0, 2, 3, 4);
// []. arr은 이제 [1, 2, 3, 4, 5, 7] 이다.

arr.splice(5, 0, 6);
// []. arr은 이제 [1, 2, 3, 4, 5, 6, 7] 이다.

arr.splice(1, 2);
// [2, 3]. arr은 이제 [1, 4, 5, 6, 7] 이다.

arr.splice(2, 1, 'a', 'b');
// [5]. arr은 이제 [1, 4, 'a', 'b', 6, 7] 이다.
```

### 배열 안에서 요소 교체하기
`copyWithin`은 `ES6`에서 도입한 새 메서드이다. 이 메서드는 배열 요소를 복사해서 다른 위치에 붙여넣고, 기존의 요소를 덮어쓴다.

첫 번째 매개변수는 복사한 요소를 붙여넣을 위치이고, 두 번째 매개변수는 복사를 시작할 위치이고, 세 번째 매개변수는 복사를 끝낼 위치이다(생략 가능).

`slice`와 마찬가지로, 음수 인덱스를 사용하면 배열의 끝에서부터 센다.

예제를 보자.
```js
const arr = [1, 2, 3, 4];
arr.copyWithin(1, 2);
// arr은 이제 [1, 3, 4, 4] 이다.

arr.copyWithin(2, 0, 2);
// arr은 이제 [1, 3, 1, 3] 이다.

arr.copyWithin(0, -3, -1);
// arr은 이제 [3, 1, 1, 3] 이다.

```

### 특정 값으로 배열 채우기
ES6에서 도입한 새 메서드 `fill`은 환영할만한 좋은 메서드이다. 이 메서드는 정해진 값으로 배열을 채운다.

크기를 지정해서 배열을 생성하는 Array 생성자와 잘 어울린다. 배열의 일부만 채우려 할 때는 시작 인덱스와 끝 인덱스를 지정하면 된다. 음수 인덱스도 사용할 수 있다.

예제를 보자.
```js
const arr = new Array(5).fill(1);  // arr이 [1, 1, 1, 1, 1]로 초기화된다.
arr.fill('a');
// arr은 이제 ['a', 'a', 'a', 'a', 'a'] 이다.

arr.fill('b', 1);
// arr은 이제 ['a', 'b', 'b', 'b', 'b'] 이다.

arr.fill('c', 2, 4);
// arr은 이제 ['a', 'b', 'c', 'c', 'b'] 이다.

arr.fill(5.5, -4);
// arr은 이제 ['a', 5.5, 5.5, 5.5, 5.5] 이다.

arr.fill(0, -3, -1);
// arr은 이제 ['a', 5.5, 0, 0, 5.5] 이다.
```

### 배열 정렬과 역순 정렬
`reverse`는 이름 그대로 배열 요소의 순서를 반대로 바꾼다(수정).
```js
const arr = [1, 2, 3, 4, 5];
arr.reverse();
// arr은 이제 [5, 4, 3, 2, 1] 이다.
```

`sort`는 배열 요소의 순서를 정렬한다.
```js
const arr = [5, 3, 2, 4, 1];
arr.sort();
// arr은 이제 [1, 2, 3, 4, 5] 이다.
```

`sort`는 정렬 함수를 받을 수 있다. 이 기능은 매우 편리하다. 예를 들어 일반적으로는 객체가 들어있는 배열을 정렬할 수 없지만, 정렬 함수를 사용하면 가능하다.
```js
const arr = [
  {
    name: 'Susan',
  },
  {
    name: 'Jim',
  },
  {
    name: 'Trevor',
  },
  {
    name: 'Amanda',
  }
];
arr.sort();
// arr은 바뀌지 않는다.

arr.sort((a, b) => a.name > b.name);
// arr은 name 프로퍼티의 알파벳 순으로 정렬된다.

arr.sort((a, b) => a.name[1] < b.name[1])
// arr은 name 프로퍼티의 두 번째 글자의 알파벳 역순으로 정렬된다.
```
::: tip
이 예제의 정렬 함수에서는 불리언을 반환했지만, 숫자를 반환하는 함수도 쓸 수 있다. `0`이 반환되면 `sort`는 요소가 순서상 같다고 간주하고 순서를 바꾸지 않는다.  
이를 응용하면 알파벳 순으로 정렬하면서 k로 시작하는 단어만 원래 순서를 유지한다는 식의 응용이 가능하다.  
즉, k로 시작하는 단어는 j로 시작하는 어떤 단어보다 뒤에 있고 l로 시작하는 어떤 단어보다 앞에 있지만, k로 시작하는 단어들은 순서를 그대로 유지하는 것이다.
:::

---

## 배열 검색
배열 안에서 뭔가 찾으려 할 때는 몇 가지 방법이 있다.  

`indexOf`는 찾고자 하는 것과 정확히 일치(===)하는 첫 번째 요소의 인덱스를 반환한다. `indexOf`의 짝인 `lastIndexOf`는 배열의 끝에서부터 검색한다. 배열의 일부분만 검색하려면 시작 인덱스를 지정할 수 있다.

`indexOf`와 `lastIndexOf`는 일치하는 것을 찾지 못하면 -1을 반환한다.
 ```js
const o = {
  name: 'Jerry',
};
const arr = [1, 5, 'a', o, true, 5, [1, 2], '9'];
arr.indexOf(5);  // 1
arr.lastIndexOf(5);  // 5
arr.indexOf('a');  // 2
arr.lastIndexOf('a');  // 2
arr.indexOf({ name: 'Jerry'});  // -1
arr.indexOf(o);  // 3
arr.indexOf([1, 2]);  // -1
arr.indexOf('9');  // 7
arr.indexOf(9);  // -1

arr.indexOf('a', 5);  // -1
arr.indexOf(5, 5);  // 5
arr.lastIndexOf(5, 4);  // 1
arr.lastIndexOf(true, 3);  // -1
```
`findIndex`는 일치하는 것을 찾지 못했을 때 -1을 반환한다는 점에서는 `indexOf`와 비슷하지만, 보조 함수를 써서 검색 조건을 지정할 수 있으므로 `indexOf`보다 더 다양한 상황에서 활용할 수 있다.

하지만 `findIndex`는 검색을 시작할 인덱스를 지정할 수 없고, 뒤에서부터 찾는 `findLastIndex`같은 짝도 없다.
```js
const arr = [
  {
    id: 5,
    name: 'Judith',
  },
  {
    id: 7,
    name: 'Francis',
  },
];
arr.findIndex(o => o.id === 5);
// 0

arr.findIndex(o => o.name === 'Francis');
// 1

arr.findIndex(o => o === 3);
// -1

arr.findIndex(o => o.id === 17);
// -1
```
`indexOf`와 `findIndex`는 조건에 맞는 요소의 인덱스를 찾을 때 알맞지만, 조건에 맞는 요소의 인덱스가 아니라 요소 자체를 원할 때는 `find`를 사용한다.

`find`는 `findIndex`와 마찬가지로 검색 조건을 함수로 전달할 수 있다. 조건에 맞는 요소가 없을 때는 `undefined`를 반환한다.
```js
const arr = [
  {
    id: 5,
    name: 'Judith',
  },
  {
    id: 7,
    name: 'Francis',
  },
];
arr.find(o => o.id === 5);
// 객체 { id: 5, name: 'Judith' }

arr.find(o => o.id === 2);
// undefined
```
`find`와 `findIndex`에 전달하는 함수는 배열의 각 요소를 첫 번째 매개변수로 받고, 현재 요소의 인덱스와 배열 자체도 매개변수로 받는다.

이런 점을 다양하게 응용할 수 있다. 예를들어, 특정 인덱스보다 뒤에 있는 제곱수를 찾아야 한다고 하자.
```js
const arr = [1, 17, 16, 5, 4, 16, 10, 3, 49];
arr.find((x, i) => i > 2 && Number.isInteger(Math.sqrt(x)));
// 4
```
`find`와 `findIndex`에 전달하는 함수의 `this`도 수정할 수 있다. 이를 이용해서 함수가 객체의 메서드인 것처럼 호출할 수 있다.

ID를 조건으로 Person 객체를 검색하는 예제를 보자. 두 방법의 결과는 같다.
```js
class Person {
  constructor(name) {
    this.name = name;
    this.id = Person.nextId++;
  }
}
Person.nextId = 0;
const jamie = new Person('jamie'),
  juliet = new Person('juliet'),
  peter = new Person('peter'),
  jay = new Person('Jay');
const arr = [jamie, juliet, peter, jay];

// 옵션 1: ID를 직접 비교하는 방법
arr.find(p => p.id === juliet.id);  // juliet 객체

// 옵션 2: 'this' 매개변수를 이용하는 방법
arr.find(function (p) {
  return p.id === this.id;
}, juliet);  // juliet 객체
```
이렇게 간단한 예제에서는 `find`와 `findIndex`에서 `this`값을 바꾸는 의미가 별로 없지만, 나중에 이 방법이 더 유용하게 쓰이는 경우를 보게 될 것이다.

간혹 조건을 만족하는 요소의 인덱스도, 요소 자체도 필요 없고, 조건을 만족하는 요소가 있는지 없는지만 알면 충분할 때가 있다. 물론 앞에서 설명한 함수를 사용하고 -1이나 `null`이 반환되는지 확인해도 되지만, 자바스크립트에는 이럴 때 쓰라고 만든 `some`과 `every` 메서드가 있다.

`some`은 조건에 맞는 요소를 찾으면 즉시 검색을 멈추고 `true`를 반환하며, 조건에 맞는 요소를 찾지 못하면 `false`를 반환한다.

예제를 보자.
```js
const arr = [5, 7, 12, 15, 17];
arr.some(x => x%2 === 0);
// true; 12는 짝수이다.

arr.some(x => Number.isInteger(Math.sqrt(x)));
// false; 제곱수가 없다.
```
`every`는 배열의 모든 요소가 조건에 맞아야 `true`를 반환하며 그렇지 않다면 `false`를 반환한다.

`every`는 조건에 맞지 않는 요소를 찾아야만 검색을 멈추고 `false`를 반환한다. 조건에 맞지 않는 요소를 찾지 못하면 배열 전체를 검색한다.
```js
const arr = [4, 6, 16, 36];
arr.every(x => x%2 === 0);
// true; 홀수가 없다.

arr.every(x => Number.isInteger(Math.sqrt(x)));
// false; 6은 제곱수가 아니다.
```
`some`과 `every`도 콜백함수를 호출할 때 `this`로 사용할 값을 두 번째 매개변수로 받을 수 있다.
