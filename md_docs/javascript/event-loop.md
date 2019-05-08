---
customauthor:
  - name: Juunone
---
# * Event Loop
<Author/>

자바스크립트는 "단일 스레드" 기반의 언어이다.  
동시에 하나의 작업만들 처리할 수 있다는 말인데, 자바스크립트가 사용되는 환경에서는 많은 작업이 동시에 처리된다. 
예를들어 마우스 입력 및 키보드 입력을 받는 일들을 동시에 처리하거나, 다수의 네트워크 요청을 처리하기도 한다.

**자바스크립트는 "이벤트 루프"에 기반한 동시성(concurrency) 모델을 가지고 있습니다.**  
**즉 "이벤트 루프" 를 통해 비동기 방식으로 동시성을 지원한다.**  

## Javascript Engine

- Javascript Engine은 자바스크립트로 작성한 코드를 해석하고 실행하는 **인터프리터**다.
- 자바스크립트 엔진은 세가지 영역으로 나뉜다.
    - Call stack
    - Task Queue(Event Queue)
    - Heap

<p style="text-align:center;"><img :src="$withBase('/js-event-loop/javascript_engine.png')" alt="javascript_engine" /></p>

> [출처 : Alexander Zlatkov Medium](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)    

### Stack
자바스크립트의 함수가 실행되는 방식을 "Run to Completion" 이라고 말한다.  
하나의 함수가 실행되면 이 함수의 실행이 종료될때까지 어떤 작업도 중간에 실행되지 못한다.  
현재 스택에 쌓여있는 모든 함수들이 실행을 마치고 스택에서 제거되면 다음 요청을 순차적으로 호출 스택에 담아 처리한다.

```javascript
function baz(){
   console.log('Hello from baz');
}
function bar() {
   baz(); 
}
function foo() {
   bar(); 
}
foo();
```
위 코드는 아래 그림과 같이 작동한다.

<p style="text-align:center;"><img :src="$withBase('/js-event-loop/stack_frame.gif')" alt="stack_frame" /></p>

> [출처 : ITNEXT Medium](https://itnext.io/how-javascript-works-in-browser-and-node-ab7d0d09ac2f)

### Heap
동적으로 생성된 객체(인스턴스)들은 힙 안에 할당됩니다. 힙은 구조화되지 않은 넓은 메모리 영역을 지칭합니다.

### Queue
자바스크립트 런타임 환경에서 처리해야하는 Task들을 임시로 저장하는곳입니다.
태스크큐는 콜백 함수들이 대기하는 큐형태의 배열이고, **이벤트루프**는 호출 스택이 비워질 때마다 태스트큐에서 함수들을 꺼내서 다시 스택으로 넣어주고 실행하는 역할을 해준다.  


## Event Loop
앞서 설명과 같이 **이벤트루프**는 콜스택과 콜백큐를 감시하면서 콜스택이 비어있을경우 콜백큐에서 첫번째 이벤트를 가져와 콜스택에 밀어넣는 역할을 하며, 결과적으로 해당 이벤트가 실행되게 됩니다.

한가지 가정을 해보자면 많은 시간을 소모하는 함수가 stack에 push 된다면, 싱글스레드 기반의 자바스크립트는 해당 함수가 끝날떄까지
아무런 추가 작업을 하지 못하는 상황이 발생할 수 있다. 사용자 관점에서는 브라우저가 먹통처럼 보일 수 있다.
이런 문제를 해결하기 위해 자바스크립트 엔진이 아닌 **Web API**에 정의되어있는 함수들은 비동기(콜백)로 실행된다.

```javascript
console.log('Start');

setTimeout(function() { 
    console.log('Time-out');
}, 5000);

console.log('End');

// Start
// End
// 5초뒤 Time-out
```

위 코드를 실행하면 'Start', 'End', 'Time-out' 순으로 출력이 되는걸 확인 할 수 있다.  
먼저 스택에 "console.log('Start')" push 되고 'Start' 를 출력하고 스택을 나간다.  
다음 setTimeout() 함수가 스택에 push 되지만 5초뒤에 작동할 함수를 스택에 쌓아둘 수 없다.
스택에 쌓아두지 않고 따로 처리를 하게된다.
그다음 스택에 "console.log('End')" 가 push 되고 'End' 를 출력한뒤
5초뒤 "console.log('Time-out')"이 스택에 push 되고, 마지막으로 'Time-out'을 출력한다.

> 위 자바스크립트 엔진 그림에서 Web APIs 영역을 확인 할 수 있습니다.

<p style="text-align:center;"><img :src="$withBase('/js-event-loop/settimeout1.png')" alt="settimeout1" /></p>
setTimeout 콜백함수는 Web APIs로 보내지고 스택에서 pop 됩니다.

<p style="text-align:center;"><img :src="$withBase('/js-event-loop/settimeout2.png')" alt="settimeout1" /></p>
Web APIs timer 5초뒤 작업이 끝나면 태스크큐로 옮겨집니다.

<p style="text-align:center;"><img :src="$withBase('/js-event-loop/settimeout3.png')" alt="settimeout1" /></p>
이벤트루프는 콜스택이 비어있는지 확인하고 태스트큐의 첫번째 함수를 콜스택으로 push 해주고 이벤트가 실행됩니다.
단, 콜스택이 비워있는 상태가 아니라면 태스트큐에 있는 작업을 콜스택으로 push 하지 않습니다.

> [출처 : Philip Roberts](https://youtu.be/8aGhZQkoFbQ)

## Reference
::: tip 참조
- [MDN web docs[Event loop]](https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop)
- [Sessionstack blog](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5)
- [Philip Roberts - Talk on the Event loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html) 30분짜리 훌륭한 비디오.
- [Philip Roberts의 자바스크립트 엔진 시각화 도구: Loupe](http://latentflip.com/loupe)
:::
