---
customauthor:
  - name: Hidekuma
    email: d.hidekuma@gmail.com
---
# * STS에 lombok 설치하기
<Author/>
스프링 스타터에 롬복 라이브러리를 추가하여도, 실제로 롬복의 어너테이션이 동작하지 않을 경우가 있는데, 이유는 IDE에 있다. STS의 마켓 플레이스를 뒤져봐도 찾아 볼 수 없을 것이다.
## lombok
자바 프로젝트에서 이젠 필수적인 라이브러리이며, `Getter`, `Setter`등과 같은 로봇처럼 반복적이던 작업을 해소시켜주었다. 

### 사용 시 주의사항
- [참고링크](http://kwonnam.pe.kr/wiki/java/lombok/pitfall)

## STS에 lombok 설치순서 (MacOS)
1. Lombok 설치. [다운로드 링크](https://projectlombok.org/download.html)
2. 실행하기.
```bash
$ cd {다운로드 경로}
$ java -jar lombok.jar
```
3. 해당 에러는 `IDE`경로를 못찾는 에러로 무시해도 된다.
<img :src="$withBase('/sts-with-lombok/lombok-error.png')" alt="lombok-error">
4. <kbd>Specify location...</kbd> 을 클릭하여, `sts.ini`경로를 지정한다.
<img :src="$withBase('/sts-with-lombok/lombok-installer.png')" alt="lombok-installer">
5. 경로 지정 후,<kbd>Install / Update</kbd> 클릭. `Mac`의 경우, `Application > SpringToolSuite4 > Eclipse > STS.ini`에 있다.
<img :src="$withBase('/sts-with-lombok/sts-ini-path.png')" alt="sts-ini-path">
