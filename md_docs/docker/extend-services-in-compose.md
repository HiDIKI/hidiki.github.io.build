# * 멀티플 도커 파일 / Multiple Compose file
## 도커 오버라이드 / Docker override (Default)
도커 컴포즈가 컴포즈 파일을 따로 제시하지 않는 이상, `docker-compose.yml`을 읽는다는 것은 모두다 아는 사실이다. 하지만 실제로 도커 컴포즈는 기본적으로 다음과 같은 순서로 <U>2개의 파일</U>을 읽는다.
1. `docker-compose.yml`
2. `docker-compose.override.yml` (optional)

`docker-compose.override.yml`은 옵셔널이며, 기본적으로는 `docker-compose.yml`에 베이스 설정을 하고, 오버라이드 파일통해서 해당 설정을 덮어쓰거나 생성한다. 주로 개발환경과 디플로이 환경을 구분하기 위해서 사용한다.


### Default의 예시
하기 두개의 컴포즈파일이 동일선상에 있을 경우.

#### 예시파일
- <U>docker-compose.yml</U>
```docker
version: '3'
services:
  basic:
    build:
      context: .
    command: echo 'hello from basic'
```
- <U>docker-compose.override.yml</U>
```docker
version: '3'
services:
  override:
    build:
      context: .
    command: echo 'hello from override'
```

#### 실행결과
`docker-compose.yml`과 `docker-compose.override.yml`이 합쳐진다.
```bash
$ docker-compose config
services:
  basic:
    build:
      context: /Users/hidekuma/Documents/private
    command: echo 'hello from basic'
  override:
    build:
      context: /Users/hidekuma/Documents/private
    command: echo 'hello from override'
version: '3.0'
```

#### 만약 `-f`커맨드 옵션을 사용할 경우
얼핏보면 두 커맨드가  동일하다고 생각할 수 있으나, `-f`옵션을 사용하면, 해당 파일만을 읽기 때문에 `docker-compose.override.yml`은 읽히지 않는다.
```bash
$ docker-compose config # docker-compose.yml + docker-compose.override.yml
$ docker-compose -f docker-compose.yml config # docker-compose.yml
```
---
## 커스텀 도커 오버라이드 / Custom override
기본적으로 도커 컴포즈가 파일을 읽는 방법에 대해 알아봤는데, 그러면 우리는 꼭 오버라이드 할 파일을 `docker-compose.override.yml`로 정의해야 할까? **방법은 있다. 위에서 잠시 거론했던 `-f` 옵션을 사용하면 된다.** 해당 옵션은 도커 컴포즈 파일의 `path`를 정의하는 옵션이다. 해당 옵션은 <U>복수번</U> 사용할 수 있다.
### Custom의 예시
#### 예시파일
- <U>docker-compose.test1.yml</U>
```docker
version: '3'
services:
  test1:
    build:
      context: .
    command: echo 'hello from test1'
```
- <U>docker-compose.test2.yml</U>
```docker
version: '3'
services:
  test2:
    build:
      context: .
    command: echo 'hello from test2'
```
- <U>docker-compose.test3.yml</U>
```docker
version: '3'
services:
  test3:
    build:
      context: .
    command: echo 'hello from test3'
```
#### 실행결과
`-f`옵션을 여러 번 사용하였다. 하단 코드의 결과는`docker-compose.test*.yml`을 모두 오버라이드 한다.
```bash
$ docker-compose -f docker-compose.test1.yml -f docker-compose.test2.yml -f docker-compose.test3.yml config
services:
  test1:
    build:
      context: /Users/hidekuma/Documents/private
    command: echo 'hello from test1'
  test2:
    build:
      context: /Users/hidekuma/Documents/private
    command: echo 'hello from test2'
  test3:
    build:
      context: /Users/hidekuma/Documents/private
    command: echo 'hello from test3'
version: '3.0'
```
