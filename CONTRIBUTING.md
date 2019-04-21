# H!DIKI와 함께하기
## ⏳ 흐름
> `FORKING` -> `COMMIT` -> `PULL REQUEST` -> `REVIEW` -> `MERGE REQUEST` -> `DEPLOY TO hidiki.github.io`
- `hidiki.github.io.build` = 빌드 저장소
- `hidiki.github.io` = 배포 저장소
- [참고링크: 깃 헙으로 협업하기](https://andamiro25.tistory.com/193)

## 🎯 H!DIKI의 목적 및 목표
> 각기 다른 언어, 환경, 기술을 경험하고 있는 우리의 지식이 한데 모인다면? H!DIKI는 완성된다.
- 목표는 그 누구도 아닌 개발자 본인을 위한 `Daily commit`이다.
- 뇌는 플래시 메모리, 좋은 정보는 기록하자!
- 시작은 자신를 위해, 나아가서는 모두를 위해.

## 📖 H!DIKI 조직 규칙
> 다소 깐깐하게 운영하게 운영되지만, 좋은 정보를 공유하기 위함이다.
1. 해당 `git` 저장소에 `PR`하는 것은 <U>오거나이제이션 피플이 아니여도 가능</U>하다.
2. 목표가 `Daily commit`인 만큼 해당 조직에 속해 있기 위한 가장 기본적인 룰은 **Minimum 주 3회 PR(Posting)** 이다.
3. 2에 대한 목표치를 <U>Monthly로 체크하여 오거나이제이션의 종속여부를 판단</U>한다.
4. 해당 조직의 방향성에 의문을 갖는다면, 자진해서 탈퇴가 가능하다.
5. 단순히 잔디심기 커밋은 하지 않는다. 분명 도움이 되고, 공유되야 마땅한 정보를 배포한다.
6. 자신의 포스팅은 개인블로그에도 복붙수준으로 공유하여도 되나, 그 외의 포스팅에 관해서는 글쓴이에게 동의를 얻는다.
7. 해당 리포지터리를 `Watch`해서 자신의 이슈, PR을 지속관찰한다.
8. 리뷰어는 누구든지 될 수 있다.

---

## 📮 Git 커밋 메세지 규칙
> 훌륭한 커밋터가 되자
1. 제목과 본문을 빈 행처리
2. 제목 행을 영문기준 50자로 제한
3. 제목 행 첫 글자는 대문자
4. 제목 행 끝에 마침표(`.`)는 생략
5. 본문을 영문기준 72자 단위로 개행
6. 본문 내용은 리스트 형식으로 작성
7. 제목만으로도 모든 설명이 끝날경우 본문생략

### 예시
```git
Added|Deleted|Modified|Updated|Created something titie

- let's get it
- make some noise for me
```

### 참고링크
- https://meetup.toast.com/posts/106

---

## ✅ PR 체크리스트
- [x] 작성하는 문서는 markdown 형식이여야한다.
  - [<vuepress-필독>](https://v1.vuepress.vuejs.org/guide/markdown.html#header-anchors)
  - 이미지 사용 시, 이미지 경로는 `md_docs` > `.vuepress` > `vuepress` > `{title}` 하위. [<관련내용>](https://github.com/HiDIKI/hidiki.github.io.build/pull/10)
- [x] 문서의 h1(`#`)태그, 즉 타이틀은 `* `로 시작한다.
- [x] 모든 문서에는 `#`(타이틀)이 존재해야 한다.
- [x] 문서의 경로는 `md_docs > {category:language} > {title:path}.md`이다.
- [x] 작성이 완료되면, `md_docs > .vuepress > config.js`의 `sidebar`영역에 연결 주소를 넣어준다
  - 단, 연결주소에 `md`확장자는 생략한다.
- [x] `PR`전에 로컬 개발환경에서 정상동작하는지 확인한다.
- [x] 글 내용은 `합니다`가 아닌 `한다`체여야 한다.
- [x] 가독성을 위해 문서의 헤드태그(`#`)은 가능하면(`###`)까지 사용한다.
- [x] 블로그가 아닌 위키라는 관점에서 보다 객관적인 수준의 포스팅을 진행한다.
  - 필자의 생각은 이러하다 (x)
  - ~ 한 것 같다(x)

---

## 🚧 부가기능
### 글쓴이 넣기
`md`파일 최상단에 해당 부분삽입 후 제목 태그에 아래에 `<Author/>`컴포넌트 삽입.
```md
---
customauthor:
  - name: Hidekuma
    email: d.hidekuma@gmail.com
---
# 제목 타이틀 밑에다가 아래 태그 삽입
<Author/>
```

## 🚥 이슈컨트롤 - 자동종료
> Github에는 커밋 메시지에 특정한 단어를 사용해 자동으로 이슈를 종료시키는 편리한 기능이 탑재되어있다. 이 예약어는 커밋 메시지 안의 어느 위치에서나 사용 가능.

### 예시
```
keywords #이슈번호
Resolved #1 modified something!
```

### keywords
- 개발이슈
  - close
  - closes
  - closed
- 버그픽스 / 핫픽스
  - fix
  - fixes
  - fixed
- 문의나 요청사항에 대응
  - resolve
  - resolves
  - resolved

### Tip
- 브랜치를 {developer}-{keyword}-{issue number} 로 하는 것이 좋다고 함.
```
hidekuma-close-1
```

---

## 💞 참여자의 메리트
- 목표치를 충족하면 오거나이제이션의 일원이 된다.
  - `github`프로필 하단에 뜬다. 간지난다.
- 각자의 전문지식이 한 곳으로 모임으로써 우리는 단기간에 습득할 수 있는 정보의 양이 많아진다.
  - 뭔가 번들러가 `dist`를 만드는 느낌이랄까? 개꿀띠다.
- 어짜피 해당 저장소를 포크할 것이기 때문에, 자신의 깃헙에도 잔디를 심을 수 있다.(사실 이건 안중요하지만)
- 해당 위키가 목적에 다가갈수록 우리는 네임드가 된다.

### 먼저 시작한 히데쿠마의 감상문 및 팁
- 분명 쉽지 않지만, 의미있고 도움이된다.
- 처음에는 무언가 의무감에 컴퓨터 앞에 앉았지만, 결국엔 시간가는 줄 모르고 공부하는 자신을 마주하게 될 것이다.
- 오늘 내가 아무리 생각해도 커밋할 내용이 없다면 개발서적을 살펴보자.
- 이미 읽은 책이라도 새롭게 느껴지는 파트, 내용이 있을 것이다. 이것 또한 기록의 한 부분이다.

---

## 🌳 개발환경
> yarn v1.15.2
```bash
git clone https://github.com/HiDIKI/hidiki.github.io.build.git
yarn # 패키지 인스톨
yarn dev # check localhost:8080
```
## 🚀 배포
> 배포는 보통 저녁 11시 ~ 12시 사이에 진행된다.
