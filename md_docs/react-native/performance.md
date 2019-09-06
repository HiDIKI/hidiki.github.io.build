# 리엑트 네이티브 퍼포먼스 Do or Don't

### 1. 리엑트 네이티브의 성능은 리엑트 성능 개선과 동일하게 보면 된다.

> React 성능에 대해 알고 있는 모든 정보가 React Native 애플리케이션에도 적용된다.

- 리엑트 포퍼먼스 문서를 보고 리엑트 네이티브 문서를 읽는 것이 첫 단계이다.
- flutter 를 쓸지 리엑트 네이티브가 빠른지 안빠른지 논의하며 시간을 허비하는것은 안좋다.

---

### 2. 사용자에게 UI 피드백 제공

> 일반적으로 유저 액션 뒤 에는 100ms 단위로 피드백을 제공해야 한다.

1. "100ms 단위로 피드백" 이 문턱은 넘지 말아야 할 장벽이어야 된다는 것을 명심하라.
2. 피드백을 주는 것은 결코 시기상조가 아니라는 것을 명심하라.

React Native [TouchableOpacity 컴포넌트](https://facebook.github.io/react-native/docs/touchableopacity)를 사용하는 것은 훌륭하고 간단한 해결책 중 하나이다.
사용자에게 피드백을 주는 방법은 다양하다.

유저에게 액션이 일어나는 동안 피드백을 제공함으로, 이후에 무언가가 "발생할 것" 임을
나타내는 좋은 방법이다.

이미 가지고 있는 컨탠츠를 렌더링하고, 컨탠츠를 로드하는 동안 로더 및/또는 일부 자리를 표시하기위해 컴포넌트를 구성하는 기술을
[Skeleton Screens](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a)이라고 부른다.

다른 예시로, 클릭으로 카트, 즐겨찾기에 아이템을 추가하거나 채팅 메시지를 게시하는 등의 액션은
대부분 API 호출을 포함할 것이다. 이때 TouchableOpacity 컴포넌트가, 마치 액션이 이미 성공적으로 응답한 것처럼 행동한다.
이 패턴은 [Optimistic UI](https://uxplanet.org/optimistic-1000-34d9eefe4c05)라고 불리며 업계 전반에 널리 퍼져있다.

ReactApolo와 함께 GraphQL을 사용할 경우,
ReactApollo의 매개변수 ['optimalResponse'](https://www.apollographql.com/docs/react/features/optimistic-ui/) 는 이 패턴을 구현하기 위한 훌륭한 해결책을 가지고 있다.

---

### 3. Images.

> React Native 앱의 성능과 사용성에 관해서 큰 주제로 이미지가 있다.
웹의 경우에는 벡그라운드에서 거대한 이미지를 다운로드, 캐싱, 디코딩, 스케일링, 디스플레이하는 큰 일을 하고 있다.

#### 3-1. 이미지 캐싱 라이브러리 사용

React Native 코드는 [Image 컴포넌트](https://facebook.github.io/react-native/docs/image)를 제공하는데, 이 컴포넌트는 단일 이미지를 표시하는 데에는 유용하지만, 많은 이미지를 다룰 때 몇 가지 문제가 있다.
특히 깜박임 문제가 있고, 앱에 이미지가 너무 많이 로드되면 로딩이 중단되는 경우도 있다.
위 이슈를 해결하기 위해, [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)로 바꾸게 되면 좋은 결과를 얻을 수 있다.

*(최근 Expo에 버금가는 react-native NPM 레지스트리에서
12%의 react-native-fast-image가 다운로드되었다.)*


#### 3-2. 필요한 크기의 이미지를 로드

[react-native-fast-image](https://github.com/DylanVann/react-native-fast-image) 는 우리가 가지고 있던 많은 문제들을 해결해주었지만, 여전히 우리의 앱에 무작위로 충돌하는 몇몇 이슈들이 몇몇 이미지와 연관되어 존재할 수 있다.
간단한 예로, 우리의 앱이 각각 수백 킬로바이트의 용량을 가진 수십 개의 이미지를 다운로드하고, 캐싱하도록 요청했을 수 도 있다.

이미지 업로드에 어느 정도 제한을 두어 이 문제를 해결할 수도 있지만, 좋은 방법은 아니다.
**어떤 경우에도 로드 중인 이미지의 양과 크기를 주의해야한다.**
그러면 장치에 많은 부담이 가해질 수 있기 때문이다.
좋은 해결책은 위 일들의 큰 부분을 기기에서 하는게 아닌 이전에 하는 것이다.

비록 앱에 이미지 메모리 이슈가 없더라도, 보여줄 이미지를 보다 정확한 크기로 정하는 것은
좋은 방법이다. 이렇게 하면 유저 디바이스에 대한 부담이 줄어들 것 이다.

> 글 저자, Nelio 앱개발자 "우리는 최근에 이미지 스케일링 CDN 솔루션으로 전환했는데,
이 솔루션을 사용하면 우리가 디스플레이하고 싶은 크기로 정확하게 스케일링된 이미지를 다운로드할 수 있다.
기록을 위해 우리는 [CloudImage](https://www.cloudimage.io/en/home)를 선택했고, 현재 [CloudImage](https://www.cloudimage.io/en/home)에 매우 만족하고 있다.
그것은 우리가 특정한 크기로 즉시 이미지를 요청할 수 있게 해준다.
GraphQL resolvers 변경해서 이미지 URL을 cloudImage로 변경하는 빠른 로직을 구현한다
이런 변경로직은 클라이언트 사이드에서도 이루어질 수 있다. 다른 방법으로는,
[Cloudinary](https://cloudinary.com/) 사용하거나 [imgProxy](https://github.com/imgproxy/imgproxy) 또는 [Thumbor](https://github.com/thumbor/thumbor)와 같은 오픈 소스 솔루션을 사용할 수도 있다."

- [CloudImage](https://www.cloudimage.io/en/home)
- [Cloudinary](https://cloudinary.com/)
- [imgProxy](https://github.com/imgproxy/imgproxy)
- [Thumbor](https://github.com/thumbor/thumbor)

---

### 4. Pure components 를 현명하게 사용하자

> React Native 앱이나 React 앱이나 똑같다.
<br/>React 앱에 좋은 대부분의 해결책은 React Native 앱에도 좋다.

React 퍼포먼스에 관한 가장 인기 있는 해결책은 PureComponent
또는 [React.memo()](https://reactjs.org/docs/react-api.html#reactmemo) 이고, 리액트에서의 쓸모없는 re-render 줄이는 것이 해결책이 될 수 있지만, 잘못 쓰게 될 경우 반대로 복잡한 앱이 되버릴 수도 있다.
<br/>PureComponent는 props들이 바뀌지 않았을 때 컴포넌트가 re-render 되는 것을
막는 방법이다. 이보다 정확하게 구현해야 하는 방법은 props를 얕게 비교하는
[shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)를 구현해야 한다.

> 새로운 컴포넌트를 구현할 때 기본적으로 PureComponent를 사용하는 것이 좋은 패턴이라고 생각하지만, 그것이 도움이 되기 보다는 해로울 수 있다는 것을 항상 명심하는 것이 좋다.

re-render를 줄일 필요가 있거나 정말로 줄이고 싶은 경우,
그 경우 컴포넌트를 삽입할 때 부모 컴포넌트의 렌더 메소드 내부에 있는 PureComponent는
어떤 새로운 Props도 만들어서는 안 된다는 점을 명심해야한다.

#### pure component를 사용해서 랜더링할 때, 어느 새로운 Props도 만들면 안된다.

Props를 주는 두 가지 주요 용도는 새로운 object와 새로운 funcion을 제공하는 것이다.
위 예는 child component를 children prop로 제공하는 것도 보여주지만,
JSX를 넘어서면, 결국에는 단지 일반 JS Object에 불과하다.

Object에 관해서, Array도 Object라는 것을 명심하라.
컴포넌트를 더 functional 스타일로 바꾸려할 때, 
대부분의 functional function이 새로운 참조를 생성한다는 점을 항상 기억해야 된다.
렌더링 시간에 이 function들을 호출하면 안된다.

React-Native를 사용할 때 많이 사용할 수 있는 또 다른 패턴은
[renderProps:](https://reactjs.org/docs/render-props.html) 컴포넌트를 반환하는 function을 props로 제공하는 것이다.
props 관점에서, 렌더 props는 props으로 제공되는 정기적인 function일 뿐이므로 런타임에 renderProps를 만들면 안된다.

---

### 5. HOCs 사용을 섣부르게 하면 안된다.

> High Order Component를 사용하는 것은 때때로 코드 복잡성을 증가시킬 수 있다.

부모 컴포넌트에서 자식 컴포넌트에 Props로 내려주어도 되거나, 새로운 props가 계속 생성되는
컴포넌트의 경우 굳이 HOC 패턴을 쓰게되면 악효과이다. (당연한 말인데;)

---

### 6. 벌크 리듀서를 지양해야한다.

> 필요한 경우에만 스토어를 업데이트하도록 좀 더 정확하게 필요한 참조 & 업데이트하는게 중요하다.

- [리덕스 기본 튜토리얼 참조](https://redux.js.org/basics/reducers#designing-the-state-shape)

---

### 7. Selector 를 공유하지말자.

> mapStateToProps의 복잡성이 증가하면 mapStateToProps에서 수행하는 일부 로직이 무거워지는 것을 볼 수 있고 그로 인해, 때때로 너무 많이 다시 render하고 있다는 것을 알아차릴 수 있다.

위 해결책으로 사용하는 라이브러리 reselect를 잘못 사용하면 새로운 성능 문제도 발생할 수 있다.
어플리케이션의 다른 장소에서 당신의 리듀서를 공유하거나, 같은 구성요소의 다른 여러 인스턴스에서 공유하는 경우에 이슈가 발생할 수 있다.

어떤 경우든, 컴포넌트 또는 동일한 컴포넌트의 다른 인스턴스 간에
선택 항목을 공유하기 시작할 때 발생될 수 있는 문제에 대해 정말로 주의해야 한다.
[참고 Q&A reselect github 글](https://github.com/reduxjs/reselect#q-can-i-share-a-selector-across-multiple-component-instances)

- [reselect](https://github.com/reduxjs/reselect)
- [re-reselect](https://github.com/toomuchdesign/re-reselect)

---

### 8. React Native 0.59 사용

- RN 0.59 는 React Native로 hooks를 사용할 수 있게 해준다.

- React Native 0.59는 한동안 업데이트되지 않았던 JavaScriptCore의 업그레이드된 버전을 Android 기기에 가져온다. *(이 업데이트는 2019년 8월 1일부터 Google Play 스토어에서
적용되는 25% 향상된 퍼포먼스와 64비트 지원 효과가 있다.)*

---

### 9. FlatList 옵션 사용

컴포넌트로 List를 렌더링할 때는 항상 FlatList 또는 SectionList과 같은 VirtualizedList를 기반으로 하는 컴포넌트를 사용해야한다.

- [VirtualizedList](https://facebook.github.io/react-native/docs/virtualizedlist)
- [FlatList](https://facebook.github.io/react-native/docs/flatlist)
- [SectionList](https://facebook.github.io/react-native/docs/sectionlist)

목록의 항목 수, 구성 요소의 복잡성 및 치수에 따라,
많은 항목이 성능에 직접적인 영향을 미치기 때문에 이들의 props을
수정하는 데 시간을 할애할 수 있을 것이다.

---

### 10. 디버깅 툴을 사용하여 성능 문제를 파악하기

> 성능 문제를 이해하려고 할 때, 우선적으로 구성 요소가 마운트 또는 렌더링되는 시간을 이해하려고 시도부터 해야한다.

---

[참고 글 원문 링크](https://hackernoon.com/react-native-performance-do-and-dont-1198e97b730a)