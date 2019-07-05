# * uvloop
<Author name='Hidekuma' />
uvloop는 asyncio의 이벤트 루프 대체재로,  asyncio를 더 빠르게 만들고,  nodejs, gevent 및 다른 python 프레임워크와 비교해봐도, 2배이상의 퍼포먼스를 보여준다.

::: tip
python3.5 부터 파이썬 표준 라이브러리에 추가된 asyncio는 비동기 I/O 프레임워크이다.
:::

## asyncio & uvloop
asnycio는 네트워크 전송, 프로토콜 및 스트림 추상화 컬렉션과 이벤트 루프 기능이 있으며, 이벤트 루프는 asyncio의 핵심이다. asyncio의 주요기능들은 다음과 같다.
- 스케줄링에 의한 호출
- 네트워크를 통한 데이터 전송
- DNS 쿼리수행
- OS 신호 핸들링
- 서버와 커넥션을 만드는 편리한 추상화
- 비동기적 서브프로세스
 
uvloop는 asyncio의 내장 이벤트 루프를 대체하며 설치방법 다음과 같다.
```bash
pip install uvloop
```
asyncio 코드에 uvloop를 접목하면 다음과 같다.
```python
import asyncio, uvloop
asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
```
해당 코드는 `asyncio.get_event_loop()`를 호출하면, uvloop의 인스턴스를 리턴하게 만든다.

## 아키텍처 
uvloop는 [libuv](http://libuv.org/)를 기반으로 Cython으로 작성되었다.
libuv는 nodejs에서 사용하는 고성능 멀티 플랫폼 비동기 I / O 라이브러리이며, 빠르고 안정적이다. nodej가 인기를 얻고 널리 보급된 이유가 libuv 덕분이라고 해도 과언이 아니다.

## 벤치마크
### TCP 벤치마크
- 공통조건
    - Intel Xeon CPU E5-1620 v2 @ 3.70GHz
    - Ubuntu Linux
    - 1, 10, 100 KiB 크기의 메시지
    - 동시성수준: 10
    - 러닝타임 : 30s
- asyncio, uvloop
    - Python 3.5
- Go
    - GOMAXPROCS = 1
    - `net.Conn.Read/Write` 호출
- nodejs
    - No cluster
    - v4.2.6

### TCP 벤치마크 결과
<img :src="$withBase('/uvloop/tcp-perf.png')" alt="tcp performance">

### HTTP 벤치마크
- 조건
    - 동시성수준: 300
    - 러닝타임: 30s

### HTTP 벤치마크 결과
<img :src="$withBase('/uvloop/http-perf.png')" alt="http performance">

고성능 HTTP파서의 도움을 받는 asyncio는 동일한 HTTP파서를 이용하는 nodejs보다 빠르다. 심지어 uvloop를 탑재할 경우, nodejs의 약 2배,  Go와 비슷한 수준의 퍼포먼스를 보여주며 서비스 품질은 매우 우수하다고 할 수 있다.

httptools 기반 서버는 다른 구현과 달리 라우팅 로직을 포함하지 않아 매우 미흡하나, 해당 벤치 마크는 효율적으로 구현 된 프로토콜로 uvloop가 얼마나 빠를 수 있는지 보여주고 있다. 해당 <U>벤치마크에 영감을 받아 탄생한 Python 웹프레임워크가 바로 **Sanic**</U>이다.

::: tip aiohttp
aiohttp는 비동기 HTTP 서버를 asyncio를 사용하여 구현할 때 가장 많이 사용되는 프레임워크이나, HTTP parser때문에 성능 병목 현상이 발생하였다. 해당 부분을 처리하기 위해, Nginx 용으로 개발 된 nodejs HTTP 파서 C 라이브러리인 httptools를 이용하였다.
:::

## 레퍼런스
- [uvloop: Blazing fast Python networking](https://magic.io/blog/uvloop-blazing-fast-python-networking/)
