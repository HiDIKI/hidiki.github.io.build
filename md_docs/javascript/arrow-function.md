---
customauthor:
  - name: Wabi
---
# * 화살표 함수 표현 (ES6)
<Author/>

## 화살표 함수 특징
- 기존의 function 보다 짧게 구현이 가능하다.
- `Construct` 내부 메서드와 `prototype` 프로퍼티를 갖지 않는다.
- 자신의 this, arguments, super 또는 new.target을 바인딩 하지 않는다.
- 화살표 함수는 익명함수이다.
- 메서드 함수로 사용하기 부적합하다. `(생성자로서 사용할 수 없다.)`
- 사용하려면 babel과 같이 사용해야 IE지원이 가능하다.

---

## 짧게 구현이 가능하다.

### 에시 1
```js
//function
const testFn1 = function(x){
    return x*x;
}
//arrow function
const testFn2 = x => x*x;

testFn1(3); // 9
testFn2(3); // 9

//function
const testFn3 = function(inFn,x){
    return inFn(x);
}
//arrow function
const testFn4 = (inFn,x) => inFn(x);

testFn3(testFn1,7); // 49
testFn4(testFn2,7); // 49
```

### 에시 2
```js
const arr = ['wabi','teak','tesilio','hidekuma','one'];
console.log(arr.map((v,i)=>`인덱스 ${i}는 ${v} 입니다.`));
// expected output: Array 
/*
[
    "인덱스 0는 wabi 입니다.",
    "인덱스 1는 teak 입니다.",
    "인덱스 2는 tesilio 입니다.",
    "인덱스 3는 hidekuma 입니다.",
    "인덱스 4는 one 입니다."
]
*/
```
---

## prototype에 할당이 안된다.

```js
//Bad
const wabi = {
    realName : 'Youbeen Kim',
    age : 29
};
Object.prototype.introduce = () => console.log(`My name is ${this.realName}, i'm ${this.age} years old`);

wabi.introduce();
// My name is undefined, i'm undefined years old

//Good
const wabi = {
    realName : 'Youbeen Kim',
    age : 29
};
Object.prototype.introduce = function(){
    console.log(`My name is ${this.realName}, i'm ${this.age} years old`);
};

wabi.introduce();
// My name is Youbeen Kim, i'm 29 years old
```

## 자신의 this를 가지지 않는다.

### 예시 1
```js
//Bad
const wabi = {
    realName : 'Youbeen Kim',
    age : 29,
    introduce : () => {
        console.log(`My name is ${this.realName}, i'm ${this.age} years old`);
    }
};
wabi.introduce();
// My name is undefined, i'm undefined years old

//Good
const wabi = {
    realName : 'Youbeen Kim',
    age : 29,
    introduce (){ // === introduce : function() {
        console.log(`My name is ${this.realName}, i'm ${this.age} years old`);
    }
};
wabi.introduce();
// My name is Youbeen Kim, i'm 29 years old
```

위 코드로 객체의 메서드 정의로 사용할 수 없다는 것을 볼 수 있다.

### 예시 2
```js
//Bad
const btn1 = document.getElementById('btn1');

btn1.addEventListener('click', () => {
  console.log(this === window); // true
  //this가 전역 객체 window를 가르킨다.
  this.innerHTML = 'Clicked button';
});

//Good
const btn2 = document.getElementById('btn2');

btn2.addEventListener('click', function(){
  console.log(this === btn2); // true
  //'addEventListener'에 바인딩된 요소를 가리킨다.
  this.innerHTML = 'Clicked button';
});
```

이벤트 리스너 내부에 바인딩된 타겟요소를 사용하고 싶은 경우 `arrow function`이 아닌 `일반 함수 function`을 사용하여야 한다.

## 생성자 함수 사용불가

```js
const Hidiki = () => {};

console.log(Hidiki.hasOwnProperty('prototype')); // false

const foo = new Hidiki();
//Uncaught TypeError: Hidiki is not a constructor
```

`Construct` 내부 메서드와 `prototype` 프로퍼티를 갖지 않는다.

## IE지원 불가, babel이용 필요

<img :src="$withBase('/arrow-function/compatibility.png')" alt="compatibility" />