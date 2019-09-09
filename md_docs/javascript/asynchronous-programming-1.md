# * 비동기적 프로그래밍 - 1. Callback
<Author name='Wabi'/>

## 예시 1) setTimeout callback function 이용 예시
```js
console.log(`Before setTimeout 5 seconds : HI`);
setTimeout(function(){
    console.log(`After setTimeout 5 seconds : BYE`);
}, 5000); // 5 seconds
console.log("test 1");
console.log("test 2");
```
### 콘솔로그 결과
```
Before setTimeout 5 seconds : HI
test 1
test 2
After setTimeout 5 seconds : BYE
```
## 예시 2) setInterval callback function 이용 예시
```js
let start = 10;
let i = 0;
console.log(`0 : ${start} Sec`);
const intervalId = setInterval(function(){
    let now = --start;
    if(now !== start || ++i > 10){
        return clearInterval(intervalId);
    }
    console.log(`${i} : ${now} Sec`);
},3000);
```
### 콘솔로그 결과
```
0 : 10 Sec
(3초 뒤)
1 : 9 Sec
(3초 뒤)
2 : 8 Sec
(3초 뒤)
3 : 7 Sec
(3초 뒤)
4 : 6 Sec
(3초 뒤)
5 : 5 Sec
(3초 뒤)
6 : 4 Sec
(3초 뒤)
7 : 3 Sec
(3초 뒤)
8 : 2 Sec
(3초 뒤)
9 : 1 Sec
(3초 뒤)
10 : 0 Sec
```

::: tip Note
setTimeout, setInterval, clearInterval은 모두 전역 객체 (브라우저에서는 window, 노드에서는 global)에 정의되어 있다.
:::

## 예시 3) 오류 우선 콜백 패턴 : Error first callback (Node.js)

```js
const fs = require('fs');

const fname = 'wabi_report.txt';
fs.readFile(fname, function(err, data){
    if(err) return console.error(`파일을 읽을 수 없습니다. : ${fname} : ${err.message}`);

    console.log(`${fname} 내용 : ${data}`);
});
```

::: tip Note
콜백을 사용하다보면 예외처리가 어려워질 때가 있다. 그래서 표준을 잡은 방법으로 오류를 우선적으로 처리하는 방법이 오류 우선 콜백 패턴이다. (첫 번째 매개변수에 에러 객체를 쓰는 것)\
'Error first callback' 패턴은 프로미스를 사용하지 않을 경우 노드 개발에서는 표준이나 다름없다.
:::

## 예시 4) 콜백의 단점 : 콜백 지옥 (Node.js)

```js
const fs = require('fs');

fs.readFile('wabi_report_04_27.txt', function(err, dataA){
    if(err) console.error(err);
    fs.readFile('wabi_report_04_28.txt', function(err, dataB){
        if(err) console.error(err);
        fs.readFile('wabi_report_04_29.txt', function(err, dataC){
            if(err) console.error(err);
            fs.readFile('wabi_report_04_30.txt', function(err, dataD){
                if(err) console.error(err);
                setTimeout(function(){
                    fs.writeFile('wabi_report_0427_0430.txt',dataA+dataB+dataC+dataD,function(err){
                        if(err) console.error(err);
                    });
                },60000);
            });
        });
    });
});
```

위 코드는 4/27~30 까지의 리포트.txt 파일을 불러와서 에러가 없을경우
순차적으로 읽은 뒤 마지막으로 1분 뒤 파일하나로 합치는 작업을 나타낸다.
