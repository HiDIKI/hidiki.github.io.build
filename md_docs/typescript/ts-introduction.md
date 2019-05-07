---
customauthor:
  - name: juunone
---

# * Introduction

<Author/>

[타입스크립트 공식페이지](https://www.typescriptlang.org/)에 들어가면 메인에 아래와 같은 문구가 적혀있다.  
- **TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.**   
타입스크립트는 자바스크립트로 컴파일되는, 자바스크립트의 상위집합이다.

## Superset of Javascript

<p style="text-align:center;"><img :src="$withBase('/ts-introduction/javascript_superset.png')" alt="javascript_superset" /></p>

> [출처 : Superset of Javascript](https://howtodoinjava.com/typescript)

**타입스크립트는 자바스크립트의 상위집합이다.**  
타입스크립트는 ES5, ES6의 superset으로 기존 자바스크립트 문법을 그대로 사용할 수 있으며,  
ES6의 새로운 메소드나 기능들을 사용하기 위해  별도의 Transpiler(예: babel)을 필요로 하지 않는다.  
새로운 기능을 브라우저의 엔진 혹은 Node.js를 통해 실행 할 수 있다.  
TypeScript 컴파일러는 TypeScript 문법을 자바스크립트 문법으로 변환시켜주며,  
이때 코드에서 변수를 정의한 순서나 이름을 바꾸지 않는다.  
따라서, 자바스크립트 결과물을 브라우저에서 디버깅하여 TypeScript 코드를 수정하기에도 용이하다.

## TypeScript의 역사

JavaScript가 대규모 어플리케이션에 적합하지 않다는 팀과 고객사의 불평들을 해소하기 위해  
핵심 개발자인 [Anders Hejlsberg](https://en.wikipedia.org/wiki/Anders_Hejlsberg) 리드하에 TypeScript
탄생하게 되었다.  
타입스크립트의 방향과 목표는 타입스크립트 [위키 로드맵](https://github.com/Microsoft/TypeScript/wiki/Roadmap)을 통해 확인 가능하다.

## TypeScript의 장점

- Javascript 표준과 상호 호환
  - 서드파티 자바스크립트 패키지 사용이 가능하다.
  - 러닝커브가 다른 Javascript 컴파일 언어들(Dart, CoffeeScript 등)에 비해 비교적 완만하다.
  - 자바스크립트 코드 마이그레이션에 드는 비용이 적다.

- 정적 타입
  - 컴파일 단계에서 오류 확인이 가능하다.
  - 코드의 가독성을 높이며, 디버깅을 손쉽게 할 수 있다.

- 지원 및 커뮤니티
  - TypeScript는 공식적으로 Microsoft 의 지원을 받는다.
    - 타입스크립트는 약 2-3달을 기준으로 마이너 버전이 업데이트 되고 있다.
  - [Friends of TypeScript](https://www.typescriptlang.org/community/friends.html)에서 타입스크립트를 사용하고 있는 세계 기업들을 확인 할 수 있다.
  - Angular2 는 TypeScript를 정식으로 채택했고, 많은 제안들이 커뮤니티에 계속되고 있다.
  - IDE와 같은 도구에 타입정보 제공을 통해 코드어시스트, 타입체크, 리팩토링 등을 지원받을 수 있다.

<p style="text-align:center;"><img :src="$withBase('/ts-introduction/google-trends-typescript.png')" alt="google_trends_typescript" /></p>

> [출처 : Google Trends 지난 5년간 TypeScript 관심도](https://trends.google.co.kr/trends/explore?date=today%205-y&q=Typescript)
