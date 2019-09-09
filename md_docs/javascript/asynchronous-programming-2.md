# * 비동기적 프로그래밍 - 2. Promise
<Author name='Wabi'/>

콜백의 단점인 콜백 지옥을 보완하기 위해서 만들어진 것이 프로미스 이다. 콜백 자체를 대체하는 것은 아니지만 프로미스를 사용함으로써 안전하고 관리하기 쉬운 코드를 만들 수 있다.

## 프로미스 기본 개념

- 프로미스 기반 비동기적 함수 호출하면 Promise 인스턴스를 반환한다.
- 프로미스는 성공 또는 실패 딱 2 가지뿐 이다.
- 성공 또는 실패가 단 한 번만 일어난다.
- 단 한번의 성공 또는 실패로 해당 프로미스는 결정되었다고 한다. (= settled)
- 프로미스는 객체이다. (= 어디든 전달할 수 있다.)
- 성공, 실패의 중간 단계인 10,20,~50% 완료 라는 진행상황 개념이 없다.
- 프로미스는 객체이므로 전달을 통해 처리를 다른 함수에서 하게 할 수 있다.
- 프로미스는 체인으로 연결할 수 있는 장점이 있다.

## 예시 1) setTimeout 비동기 반환 값 프로미스 사용

```js
function countdown(seconds){
    return new Promise(function(resolve, reject){
        for(let i = seconds; i >= 0; i--){
            setTimeout(function(){
                if(i > 0) console.log(i + '...');
                else resolve(console.log('The end!'));
            }, (seconds - i)*1000);
        }
    });
}

countdown(5).then(
    function(){
        console.log('success');
    }
);
```
### 콘솔로그 결과
```
5...
4...
3...
2...
1...
The end!
success
```

## 예시 2) 이벤트 모듈 EventEmitter, 프로미스 사용 : Node.js

이벤트가 일어나면 이벤트 발생을 담당하는 개체 에서 이벤트가 일어났음을 알린다. 필요한 이벤트는 모두 콜벡을 통해서 주시할 수 있다. 노드에서는 이벤트를 지원하는 모듈 EventEmmitter가 내장되어 있다. (클래스와 함께 하도록 설계되어있으므로, 위 예시 1 코드 countdown 함수를 클래스로 하단 예시코드에서는 바꾼다.)

```js
const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor(seconds, superstitious){
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    }
    go(){
        const countdown = this;
        const timeoutIds = [];
        return new Promise(function(resolve, reject){
            for(let i = countdown.seconds; i >= 0; i--){
                timeoutIds.push(setTimeout(function(){
                    if(countdown.superstitious && i === 13){
                        // 13 일때는 중지 : 대기중인 타임아웃을 전부 취소.
                        timeoutIds.forEach(clearTimeout);
                        return reject(new Error('WTF ERROR!'));
                    }
                    countdown.emit('tick',i);
                    if(i === 0) resolve();
                }, (countdown.seconds - i)*1000));
            }
        });
    }
}
```

EventEmmitter 를 상속하는 클래스는 이벤트를 발생시킬 수 있다. 카운트다운을 시작하고 프로미스를 반환하는 매서드는 go 부분 내부이다.\
카운트가 13일 경우는 에러를 반환하고, this에 특별한 변수를 넣었기 때문에 해당 this를 통해서 프로미스 내부에서 쓸 수 있다.\
`countdown.emit('tick', i)`는 'tick' 이벤트를 발생시키는 부분이다.

사용은 하단 코드를 참조.

```js
const countFn = new Countdown(5);

countFn.on('tick', function(i){
    if(i > 0) console.log(i + '...');
});
countFn.go().then(function(){
    console.log('The end!');
}).catch(function(err){
    console.error(err.message);
});
```

## 예시 3) 프로미스 체인 사용법

```js
function runToGoal(){
    return new Promise(function(resolve, reject){
        console.log('5초 동안 스퍼트!!, 달린다');
        setTimeout(function(){
            resolve('도착!!!');
        }, 5000);
    });
}
function timeLog(time){
    console.log(`${time}...`);
}
function countdown(seconds){
    const timeoutIds = [];
    return new Promise(function(resolve, reject){
        for(let i = seconds; i >= 0; i--){
            timeoutIds.push(setTimeout(function(){
                if(i === 13){
                    timeoutIds.forEach(clearTimeout);
                    //clearTimeout 으로 모든 setTimeout 대기를 막지 않으면 13 이후 12 아래로 다 콘솔로그가 프린트된다.
                    return reject('카운트 다운 실패');
                }
                if(i > 0) timeLog(i);
                else resolve('카운트 다운 종료');
            }, (seconds - i)*1000));
        }
    });
}
```

위 예시 코드를 하단에 성공과 실패로 나뉘어서 실행예시를 들어온다.

### 성공 : promise resolve
```js
var test = countdown(5);
test.then(msg => console.log(msg))
.then(runToGoal)
.then(msg => console.log(msg))
.catch(err => console.error(err));
```
### 콘솔로그 결과
```
5...
4...
3...
2...
1...
카운트 다운 종료

(runToGoal 함수 시작)
5초 동안 스퍼트!!, 달린다

(5초뒤)

도착!!!
```

### 실패 : promise reject
```js
var test = countdown(15);
test.then(msg => console.log(msg))
.then(runToGoal)
.then(msg => console.log(msg))
.catch(err => console.error(err));
```
### 콘솔로그 결과
```
15...
14...
카운트 다운 실패
```

위 예시 코드로 알 수 있듯이 프로미스 체인을 이용하면 모든 단계의 에러를 한번에 캐치할 수 있다. 체인 중 어느 한곳의 에러만으로도 catch 핸들러가 동작한다.

## 예시 4) 결정되지 않는 프로미스 방지 : 프로미스 타임아웃 추가

프로미스를 웹 통신에 사용하거나, 특정 함수에 사용을 하는데 해당 프로미스가 만약 너무 오래걸리는 통신이나, 오래걸리는 알고리즘이거나, 또는 promise resolve reject 호출하는 것을 잊어서 프로미스가 성공이나 실패로 결정나지 않는다면 프로미스는 자체적으로 결정되지 않았다고 해결하지 못한다.

위 문제를 프로미스에 타임아웃을 걸어서 걸어둔 시간 이후로도 응답이 없다면 reject를 시키는 코드를 만들 수 있다.

```js
function halfFail(){
    return new Promise(function(resolve, reject){
        if(Math.random() < 0.5) return; //아래 resolve 도달 불가
        console.log('2초 뒤 완료.');
        setTimeout(function(){
            resolve('완료!!');
        },2000)
    });
}
```

위 코드는 50% 확률로 프로미스의 resolve를 반환 안한다.

```js
halfFail().then(msg => console.log(msg));
```
### 콘솔로그 결과
```
2초 뒤 완료.
(2초뒤)
완료
```
### 또는
```
log 노출 없음 (= 결정이 안된 프로미스)
```

위 예시처럼 코드를 잘못 만들지는 않지만, 같은 결과로 프로미스가 반환되지 않는 경우 또는 개발자가 프로미스 반환시간에 제한을 걸어야 하는 경우가 생길 수도 있다.

```js
function addTimeout(fn, timeout = 1000){
    return function(...args){
        return new Promise(function(resolve, reject){
            const tid = setTimeout(reject, timeout, new Error('프로미스 타임아웃'));
            fn(...args).then(function(...args){
                clearTimeout(tid);
                resolve(...args);
            }).catch(function(...args){
                clearTimeout(tid);
                reject(...args);
            });
        });
    }
}
```

## 예시 5) 프로미스 타임아웃 추가 최종 예시

```js
function addTimeout(fn, timeout = 1000){
    return function(...args){
        return new Promise(function(resolve, reject){
            const tid = setTimeout(reject, timeout, '프로미스 타임아웃');
            fn(...args).then(function(...args){
                clearTimeout(tid);
                resolve(...args);
            }).catch(function(...args){
                clearTimeout(tid);
                reject(...args);
            });
        });
    }
}
function countdown(seconds){
    return new Promise(function(resolve, reject){
        for(let i = seconds; i >= 0; i--){
            setTimeout(function(){
                if(i > 0) timeLog(i);
                else resolve('카운트 다운 종료');
            }, (seconds - i)*1000);
        }
    });
}
function halfFail(){
    return new Promise(function(resolve, reject){
        if(Math.random() < 0.5) return; //아래 resolve 도달 불가
        console.log('2초 뒤 완료.');
        setTimeout(function(){
            resolve('완료!!');
        },2000)
    });
}

countdown(2)
.then(msg => console.log(msg))
.then(addTimeout(halfFail, 3000))
.then(msg => console.log(msg))
.catch(err => console.error(err));
```

### 콘솔로그 결과

```
2...
1...
카운트 다운 종료
2초 뒤 완료.
완료!!
```
### 또는
```
2...
1...
카운트 다운 종료
프로미스 타임아웃
```
