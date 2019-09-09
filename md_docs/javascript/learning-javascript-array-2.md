# * Learning JavaScript - 배열 2편
<Author name='Tesilio'/>  

이 포스팅은 Learning JavaScript의 8장(배열과 배열 처리)을 참고하여 작성 되었다.

---

## `map`과 `filter`
`map`과 `filter`는 배열 메서드 중 가장 유용한 메서드이다. 이들 메서드로 할 수 있는 일은 정말 다양하다.

`map`은 배열 요소를 변형한다. 뭐든 가능하다.  
숫자가 들어있는 객체가 있는데, 필요한 건 숫자라면? 간단하다. 함수로 구성된 배열이 있는데, 프라미스(promise)가 필요하다? 간단하다.  
***일정한 형식의 배열을 다른 형식으로 바꿔야 한다면*** `map`을 쓰면 된다. `map`과 `filter`는 모두 사본을 반환하며 원래 배열은 바뀌지 않는다.

예제를 보자.
```js
const cart = [
  {
    name: 'Widget',
    price: 9.95,
  },
  {
    name: 'Gadget',
    price: 22.95,
  }
];

const names = cart.map(x => x.name);
// ['Widget', 'Gadget']

const prices = cart.map(x => x.price);
// [9.95, 22.95]

const discountPrices = prices.map(x => x * 0.8);
// [7.96, 18.36]
```
콜백 함수는 각 요소에서 호출될 때 요소 자체와 요소 인덱스, 배열 전체를 매개변수로 받는다(배열 매개변수는 그다지 유용하지는 않다).  

다음 예제에는 두 배열에 상품과 가격이 따로 저장되어 있는데, 이 둘을 객체로 결합해 보자.
```js
const items = ['Widget', 'Gadget'];
const prices = [9.95, 22.95];
const cart = items.map((x, i) => ({name: x, price: prices[i]}));
// cart: [{ name: 'Widget', price: 9.95 }, { name: 'Gadget', price: 22.95 }]
```
이 예제는 조금 더 복잡하지만, `map`함수의 가능성을 잘 표현한다. 여기서 우리는 요소 자체(x)만 사용하지 않고 인덱스(i)도 사용했다.  
인덱스를 쓴 까닭은 `items`의 요소와 `prices`의 요소를 인덱스에 따라 결합하기 위해서이다. 여기서 `map`은 다른 배열에서 정보를 가져와서 문자열로 이루어진 배열을 객체 배열로 변형했다.

객체를 괄호로 감싼 이유는, 이렇게하지 않으면 화살표 표기법에서 객체 리터럴의 중괄호를 블록으로 판단하기 때문이다.

`filter`는 이름이 암시하듯 배열에서 필요한 것들만 남길 목적으로 만들어졌다. `filter`는 `map`과 마찬가지로 사본을 반환하며 새 배열에는 필요한 요소만 남는다. 어떤 요소를 남길지는 마음대로이다.

예제를 보자.
```js
// 카드 덱을 만든다.
const cards = [];
for (let suit of ['H', 'C', 'D', 'S'])
  for (let value = 1; value <= 13; value += 1)
    cards.push({ suit, value});
  
// value 가 2인 카드
cards.filter(c => c.value === 2);
// [
//   { suit: 'H', value: 2 },
//   { suit: 'C', value: 2 },
//   { suit: 'D', value: 2 },
//   { suit: 'S', value: 2 },
// ]

// 여기서부터는 반환된 배열의 길이만 적는다.

// 다이아몬드
cards.filter(c => c.suit === 'D');  // length: 13

// 킹, 퀸, 주니어
cards.filter(c => c.value > 10);  // length: 12

// 하트의 킹, 퀸, 주니어
cards.filter(c => c.value > 10 && c.suit === 'H');  // length: 3
```
`map`과 `filter`를 결합하면 정말 다양한 일을 할 수 있다. 예를 들어 앞에서 만든 카드 덱을 짧은 문자열로 표현하고 싶다고 하자.  
카드 그림(suit: 하트, 클로버, 다이아몬드, 스페이드)에는 유니코드 코드 포인트를 쓰고 에이스와 킹, 퀸, 주니어는 숫자 대신 각각 A, K, Q, J를 쓰겠다. 여기에 필요한 함수는 조금 길어지므로 익명 함수를 쓰지 않고 따로 만든다.
```js
function cardToString(c) {
  const suits = {
    'H': '\u2665',
    'C': '\u2663',
    'D': '\u2666',
    'S': '\u2660',
  };
  const values = {
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K',
  };
  // cardToString을 호출할 때마다 매번 값을 만드는 건 그리 효율적인 방법은 아니다.
  // 더 효율적인 방법은 연습문제로 남긴다.
  for(let i = 2; i <=10; i += 1) values[i] = i;
  return values[c.value] + suits[c.suit];
}

// 카드 덱을 만든다.
const cards = [];
for (let suit of ['H', 'C', 'D', 'S'])
  for (let value = 1; value <= 13; value += 1)
    cards.push({ suit, value });

// value가 2인 카드
cards.filter(c => c.value === 2)
  .map(cardToString);   // ['2♥', '2♣', '2♦', '2♠'];

// 하트의 킹, 퀸, 주니어
cards.filter(c => c.value > 10 && c.suit === 'H')
  .map(cardToString);   // ['J♥', 'Q♥', 'K♥'];
```

---

## 배열의 마법 `reduce`
`map`이 배열의 각 요소를 변형한다면 `reduce`는 ***배열 자체*** 를 변형한다. `reduce`라는 이름은 이 메서드가 보통 배열을 값 하나로 줄이는 데 쓰이기 때문에 붙었다.  
예를 들어 배열에 들어있는 숫자를 더하거나 평균을 구하는 것은 배열을 값 하나로 줄이는 동작이다. 하지만 `reduce`가 반환하는 ***값 하나*** 는 객체일 수도 있고, 다른 배열일 수도 있다.  
사실 `reduce`는 `map`과 `filter`를 비롯해 여태까지 설명한 배열 메서드의 동작을 대부분 대신할 수 있다.

`reduce`는 `map`이나 `filter`와 마찬지로 콜백 함수를 받는다. 그런데 여태까지 설명한 콜백에서 첫 번째 매개변수는 항상 현재 배열 요소였지만, `reduce`는 다르다.  
`reduce`가 받는 첫 번째 매개변수는 배열이 줄어드는 대상인 ***어큐뮬레이터(accumulator)*** 이다. 두 번째 매개변수부터는 여태까지 설명한 콜백의 순서대로 현재 배열 요소, 현재 인덱스, 배열 자체이다.

`reduce`는 초깃값도 옵션으로 받을 수 있다. 배열의 숫자를 더하는 단순한 예제를 보자.
```js
const arr = [5, 7, 2, 4];
const sum = arr.reduce((a, x) => a += x, 0);
``` 
`reduce`의 콜백 함수는 매개변수로 누적값 `a`와 현재 배열 요소 `x`를 받았다. 이 예제에서 누적값은 `0`으로 시작한다. `reduce`의 첫 예제이니 자바스크립트가 하는 방식대로 한 단계씩 진행하며 이해해 보기로 하자.

1. 첫 번째 배열 요소 5에서 (익명) 함수를 호출한다. `a`의 초깃값은 `0`이고 `x`의 값은 `5`이다. 함수는 `a`와 `x(5)`의 합을 반환한다. 이 값은 다음 단계에서 `a`의 값이 된다.
2. 두 번째 배열 요소 `7`에서 함수를 호출한다. `a`의 초깃값은 이전 단계에서 전달한 `5`이고, `x`의 값은 `7`이다. 함수는 `a`와 `x`의 합 `12`를 반환한다. 이 값은 다음 단계에서 `a`의 값이 된다.
3. 세 번째 배열 요소 `2`에서 함수를 호출한다. 이 단계에서 `a`는 `12`이고 `x`는 `2`이다. 한수는 `a`와 `x`의 합인 `14`를 반환한다.
4. 네 번째이자 마지막 배열 요소인 `4`에서 함수를 호출한다. `a`는 `14`이고 `x`는 `4`이다. 함수는 `a`와 `x`의 합인 `18`을 반환하며 이 값은 `reduce`의 값이고 `sum`에 할당되는 값이다.

예민한 사람이라면 `a`에 값을 할당할 필요도 없다는 것을 눈치챘을 것이다. 화살표 함수에서 명시적인 `return`문이 필요하지 않았던 것처럼, 함수에서 중용한 건 무엇을 반환하는가 이므로 그냥 `a + x`를 반환해도 됐을 것이다.  
하지만 `reduce`를 더 잘 활용하려면 누적값이 어떻게 변하는지 생각하는 습관을 기르는 게 좋다.

더 흥미로운 예제를 보기 전에, 누적값이 `undefined`로 시작한다면 어떻게 될지 생각해 보자. 누적값이 제공되지 않으면 `reduece`는 첫 번째 배열 요소를 초깃값으로 보고 두 번째 요소에서부터 함수를 호출한다.

앞 예제에서 초깃값을 생략하고 다시 생각해 보자.
```js
const arr = [5, 7, 2, 4];
const sum = arr.reduce((a, x) => a += x);
```
1. 두 번째 배열 요소 `7`에서 함수가 호출된다. `a`의 초깃값은 첫 번째 배열 요소인 `5`이고 `x`의 값은 `7`이다. 함수는 `a`와 `x`이 합인 `12`를 반환하고 이값이 다음 단계에서 `a`의 값이다.
2. 세 번째 배열 요소 `2`에서 함수를 호출한다. `a`의 초깃값은 `12`이고 `x`의 값은 `2`이다. 함수는 `a`와 `x`의 합인 `14`를 반환한다.
3. 네 번째이자 마지막 배열 요소인 `4`에서 함수를 호출한다. `a`는 `14`이고 `x`는 `4`이다. 함수는 `a`와 `x`의 합인 `18`을 반환하며 이 값은 `reduce`의 값이고 `sum`에 할당되는 값이다.

단계는 하나 줄었지만 결과는 같다. 이 예제를 포함해, 배열의 첫 번째 요소가 그대로 초깃값이 될 수 있을 때는 초깃값을 생략해도 된다.

`reduce`는 보통 숫자나 문자열 같은 원시 값을 누적값으로 사용하지만, 객체 또한 누적값이 될 수 있고 이를 통해 아주 다양하게 활용할 수 있는데도 간과하는 사람들이 많다.  
예를 들어 영단어로 이루어진 배열이 있고 각 단어를 첫 글자에 따라 묶는다고 하면 `reduce`와 함께 객체를 쓸 수 있다.
```js
const words = ['Beachball', 'Rodeo', 'Angel',
  'Aardvark', 'Xylophone', 'November', 'Chocolater',
  'Papaya', 'Uniform', 'Joker', 'Clover', 'Bali'];
const alphabetical = words.reduce((a, x) => {
  if ( !a[x[0]]) a[x[0]] = [];
  a[x[0]].push(x);
  return a;
}, {});
```
이 예제는 조금 더 복잡하지만 원칙은 같다. 배열의 모든 요소에서 콜백 함수는 전 단계의 결과에 이 단어의 첫 번째 글자인 프로퍼티가 있는지 확인한다. 그런 프로퍼티가 없다면 빈 배열을 추가한다.  
즉 `'Beachball'`을 만나면 `a.B` 프로퍼티를 확인하는 데 그런 프로퍼티는 없으므로 빈 배열을 만든다. 그리고 그 단어를 적절한 배열에 추가한다. `'Beachball'`은 `a.B` 프로퍼티가 없었으므로 빈 배열에 추가고, 마지막으로 `{ B: [Beachball]}`인 `a`를 반환한다.

`reduce`는 통계에도 사용할 수 있다. 예를 들어 데이터 셋의 평균(mean)과 분산(variance)을 계산한다고 해 보자.
```js
const data = [3.3, 5, 7.2, 12, 4, 6, 10.3];
// 도널스 커누스(Donald Knuth)가 분산 계산을 위해 만든 알고리즘이다.
const stats = data.reduce((a, x) => {
  a.N += 1;
  let delta = x - a.mean;
  a.mean += delta / a.N;
  a.M2 += delta * (x - a.mean);
  return a;
}, { N: 0, mean: 0, M2: 0 });
if (stats.N > 2) {
  stats.variance = stats.M2 / (stats.N - 1);
  stats.stdev = Math.sqrt(stats.variance);
}
```
변수 여러 개, 특히 `mean`과 `M2`를 사용해야 하므로 이번에도 객체를 누적값으로 썼다. 원한다면 `N` 대신 인덱스에서 `1`을 뺀 값을 써도 되긴 한다.

`reduce`의 유연성을 알아보기 위해 한 가지 예제를 더 살펴보겠다. 예제 자체는 매우 조악하지만, 이번에는 문자열을 누적값으로 사용한다.
```js
const words = [
  'Beachball',
  'Rodeo',
  'Angel',
  'Aardvark',
  'Xylophone',
  'November',
  'Chocolate',
  'Papaya',
  'Uniform',
  'Joker',
  'Clover',
  'Bali',
];
const longWords = words.reduce((a, w) => w.length > 6 ? a + ' ' + w : a, '').trim();
// longWords: 'Beachball Aardvark Xylophone November Chocolate Uniform'
```
이 예제는 문자열 누적값을 써서 6글자가 넘는 단어를 모아 문자열 하나로 만들었다. `reduce`대신 `filter`와 `join`을 써서 같은 결과를 얻을 수 있다. `reduce`다음에 `trim`을 호출한 이유를 먼저 생각해 보자.
