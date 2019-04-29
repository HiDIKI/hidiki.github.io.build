---
customauthor:
  - name: Tesilio
---
# * AWS Lambda Layer
<Author/>

`AWS Lambda Layer`는 라이브러리, 사용자 지정 런타임 또는 그 외 종속성을 포함하는 ZIP 아카이브이다.  
여러 Lambda 함수에서 공통으로 쓰는 라이브러리 패키지나 모듈이 있다면, `AWS Lambda Layer`로 구성하는 것이 좋다.
그러면 배포 패키지를 작게 유지할 수 있어 개발 및 관리가 용이해진다.  

몇가지 사용 팁을 알아보자.

그전에,
::: tip
- AWS 계정이 있고, Lambda를 사용해봤던 사람을 대상으로 한다.
- Layer를 만드는 방법은 이 포스팅에서 설명하지 않는다. [공식문서](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/configuration-layers.html#configuration-layers-manage)를 참조하자.
:::

---

## 사용하기

AWS 콘솔을 이용하거나 AWS CLI를 이용하여 `zip`으로 압축한 파일을 업로드하면, 해당 `zip`파일은 `/opt` 폴더 하위에 `unzip` 된다.
그럼 Lambda 함수에서 해당 모듈이나 패키지를 불러오려면 어떻게 해야 할까? 절대경로로 불러와도 되지만, 로컬환경이나 개발환경과는 다른 임포트 경로가 될 것이다.  

`NodeJs8.10` 기준으로 모듈을 불러오는 기본 경로(NODE_PATH)는 아래와 같다.
- `/opt/nodejs/node8/node_modules`
- `/opt/nodejs/node_modules`
- `/var/runtime/node_modules`
- `/var/runtime`
- `/var/task`
- `/var/runtime/node_modules`

위에 업로드한 `zip` 파일이 `unzip` 되는 곳이 결국 `/opt` 폴더 하위다. 이건 언어나 런타임과 상관없다. `NodeJs`의 경우엔 `/opt/nodejs/node8/node_modules` 와 `/opt/nodejs/node_modules` 처럼 폴더구조를 변경하여 압축 후 업로드를 하면, 절대경로를 쓰지 않아도 모듈을 임포트 할 수 있다.

## 제한사항
- 하나의 Lambda 함수당 최대 5개의 Layer를 사용가능하다.
- Lambda 함수 및 모든 Layer의 압축되지 않은 총 크기는 250 MB을 초과할 수 없다.
