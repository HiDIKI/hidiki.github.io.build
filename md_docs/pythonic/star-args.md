---
customauthor:
  - name: Hidekuma
---
# * 가변 위치 인수
<Author/>
## 선택적 위치 인수
관례적으로 `*args` 혹은 `star args`라고 한다. 해당 위치 인수를 통해 함수 호출을 명확히 할 수 있다.  다음 [예시1](#예시1)을 봐보자. 호출 단에서 몇 가지 문제점이 보여질 것이다.

### 예시1
```python
def printt(inputs):
    prt = 'Nope' 
    if inputs:
        prt = ' '.join(str(x) for x in inputs)
    print(prt)

printt(['args', 'must', 'be', 'included'])
printt([]) # 굳이 빈 리스트를 넣어줘야 한다.
printt() # 에러발생.

>>>
args must be included
Nope
TypeError: printt() takes exactly 1 argument (0 given)
```
해당 코드같은 경우 굳이 프린트 할 데이터가 없다 해도 빈 리스트를 넣어주지 않으면, 마지막처럼 에러가 난다. 해당 코드를 선택적 위치 인수로 이용해보면 다음과 같다.

### 예시2
```python
def printt(*inputs): # <-- * 을 인수 앞에 붙여줌.
    prt = 'Nope' 
    if inputs:
        prt = ' '.join(str(x) for x in inputs)
    print(prt)

printt('args', 'must', 'be', 'included')
printt() # 에러발생 안함.

>>>
args must be included
Nope
```
`*`를 인수에 붙인 것 말고는 함수 본문을 수정할 필요 없고, 인수는 선택적으로 넘겨주면서 함수 호출부가 깔끔해졌다. 혹시나 여기서 <U>굳이 리스트를 인수로 넣어주고 싶다면</U> 방법은 있다.
```python
input_list = ['args', 'must', 'be', 'included']
printt(*input_list) # <-- 이렇게 알려준다.

>>>
args must be included
```
하지만, 상기 코드에서 input_list가 제너레이터였다면 어떨까.

### 예시3
제너레이터 생성법을 모른다면, [해당 문서](/pythonic/generator.html#제너레이터)를 참고한다.
```python
input_gen = (x for x in range(10))

print(input_gen)
printt(*input_gen)

>>>
<generator object <genexpr> at 0x107f06a50>
0 1 2 3 4 5 6 7 8 9
```
제너레이터 또한 문제없이 동작은 하지만, 미리 선언된 [예시2](#예시2)의 리스트와 달리, 해당 코드는 제너레이터로부터 생성된 모든 값을 튜플로 담으므로 메모리 점유율이 급격하게 상승할 수 있는 문제점이 있다. 따라서, `*args`를 받는 함수는 인수 리스트가 어느 정도 적정선이라는 점에서 적합한 방법이다.
::: tip 제너레이터에 * 가 의미하는 것은?
제너레이터가 소진 될 때까지 순회함을 의미한다. 결과는 튜플로 담긴다.
:::
