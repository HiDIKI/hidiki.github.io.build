# * Spring Boot (스프링 부트) 시작하기
## 1. IDE 선택하기
### Spring Tool Suite 4(STS)
오픈소스 IDE로 줄여서 `STS`라고도 한다. [다운로드 경로](https://spring.io/tools)
### InteliJ
최강의 툴로 손 꼽히지만, 유료이다.

## 2. 스프링 프로젝트 생성하기
### 직접 생성하기
[Spring initializer](https://start.spring.io/)에서 여러가지 선택된 값과 의존성을 설정하여, 스프링 부트 프로젝트를 생성 및 zip 파일로 다운로드 받을 수 있다.
### IDE에서 생성하기
IDE에서는 상기 링크에서 내려받은 zip을 풀고 build.gradle을 읽어서 프로젝트 정의된 의존성 라이브러리를 추가를 자동화 해준다.

#### STS에서 스프링 부트 프로젝트 생성하기
1. `STS` 실행.
2. 메뉴의 `File > New > Spring Starter Project` 선택.
3. `Service URL`은 기본으로 `https://start.spring.io`를 가르키나, 회사나 개인의 저장소가 있다면 변경.
3. 의존성 정의 후 완료.
    - java 2.x
    - gradle
    - web
    - jpa
    - lombok
    - {database}

::: warning 스프링 부트의 버전
버전에 따라 제공하는 라이브러리 버전이 다르다. 스부트 2.0이 출시된지 약 1년이 지났는데, <U>2019/08/01 부터 스부트 1에 대한 업데이트는 없을 것</U>이라고 하니 다들 2.x대를 선택하는 것이 좋다.
- Spring Boot 1.5 = Spring Framework 4.3 기반
- Spring Boot >= 2.0 = Spring Framework 5.0 기반
:::

## 3. 빌드하기
### MacOS
```bash
$ ./gradlew clean build
```
### Winows
```bash
$ ./gradle.bat clean build
```
::: danger STS에서 lombok을 인식하지 못할 경우
InteliJ의 경우는 플러그인 설치하면 되나,  STS의 경우는 다르다. 해결법은 [해당 링크](/java/sts-with-lombok)를 참고한다.
:::

## 4. jar 파일 실행하기
```bash
$ java -jar ./build/libs/{project-name}-0.0.1-SNAPSHOT.jar
```
::: tip 스부트 배너바꾸기
`./src/main/resources`에 `banner.txt`를 추가하면, 아래와 같이 커스텀이 가능하다.
```bash
$ java -jar ./build/libs/{project-name}-0.0.1-SNAPSHOT.jar
  __   __  ___   ______   _______  ___   _  __   __  __   __  _______
 |  | |  ||   | |      | |       ||   | | ||  | |  ||  |_|  ||   _   |
 |  |_|  ||   | |  _    ||    ___||   |_| ||  | |  ||       ||  |_|  |
 |       ||   | | | |   ||   |___ |      _||  |_|  ||       ||       |
 |       ||   | | |_|   ||    ___||     |_ |       ||       ||       |
 |   _   ||   | |       ||   |___ |    _  ||       || ||_|| ||   _   |
 |__| |__||___| |______| |_______||___| |_||_______||_|   |_||__| |__|

```
:::
