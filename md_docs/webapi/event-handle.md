# * DOM Event Handle
<Author name="Juunone"/>

Web API Event의 stopPropagation, preventDefault Methods에 대해 설명하고자 한다.

**이벤트 버블링이란 ?**
- 자식에서 발생된 이벤트가 부모 노드에 순차적으로 전달되는 현상

**이벤트 캡처링이란 ?**
- 부모에서 발생된 이벤트가 자식 노드에 순차적으로 전달되는 현상

## event.stopPropagation

**event.stopPropagation : 이벤트 캡쳐링과 버블링에 있어 현재 이벤트 이후의 전파를 막는다.**

<p style="text-align:center;"><img :src="$withBase('/webapi-event-handle/browser_handle_click.jpg')" alt="browser_handle_click" /></p>

> [출처 : Screencasts dot org Youtube](https://youtu.be/IyCnbyWZkRU)    

위 이미지를 보면 사용자가 a 태그 클릭시 해당 태그를 감싸고 있는, `li, ul` 에 순차적으로 이벤트가 전달된다.   
`a click -> li click -> ul click` 순으로 해당 노드들에 순차적으로 클릭 이벤트를 발생시킨다.  
사용자의 의도와는 다르게 이벤트가 발생하게 된다.  
::: tip i.e.
의도치 않은 이벤트 전파를 막아주는게 **stopPropagation** 이다.
:::

## event.preventDefault

**event.preventDefault : 이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소한다.**

preventDefault는 브라우저 이벤트를 작동하지 못하게 하는 method 이다.  
`<a>,<input>,<textarea>` 와 같은 태그의 브라우저 기본 동작을 막을 수 있다.  

::: tip e.g.
a 태그는 적용된 href 속성을 통해 설정된 링크로 페이지 이동을 해주는 기본 기능을 제공한다.  
a 태그 클릭 이벤트 발생시 **preventDefault** 메서드를 실행하면 페이지를 이동하는 브라우저의 기본 기능을 막는다.
:::

## Reference
::: tip 참조
- [MDN web docs[stopPropagation]](https://developer.mozilla.org/ko/docs/Web/API/Event/stopPropagation)
- [MDN web docs[preventDefault]](https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault)
:::
