---
customauthor:
  - name: Hidekuma
---
# * 이터레이터의 특별한 특징
<Author/>
## 소진성
> 제너레이터가 반환한 이터레이터는 호출 되면, `StopItreration Exception`을 일으킨 후 데이터가 소진된다.
### 예시1
제너레이터를 생성하는 함수이며, 리턴받은 이터레이터를 리스트로 만든다(순회시킨다).
```python
def generated_data():
    for i in range(10):
        yield i
result = generated_data()

print(result) # 제너레이터 생성확인
print(list(result)) # 제너레이터 첫번째 순회 - 이터레이터 순회 (StopIteation)

>>>
<generator object generated_data at 0x102402be0>
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```
여기서 한번 더 호출해본다.
```python
print(list(result)) # 제너레이터의 두번째 순회 - 이터레이터 이미 소진

>>>
[] # 빈 list
```
제너레이터의 반환 값에 아무런 결과도 생성되지 않는다. 이런 특징을 일회성(소진성)이라고 한다. 이러한 소진성을 해결하기 위해서는 제너레이터에서 반환한 이터레이터를 새로운 변수에 할당하여, 복사해야한다.

### 예시2
**예시1**과 같은 코드이나 결과값을 복사하였다.
```python
def generated_data():
    for i in range(10):
        yield i
result = generated_data()

result_copy = list(result)
print(result_copy)
print(result_copy)

>>>
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```
코드가 잘 동작하지만, 이렇게 하는 방법은 처음부터 리스트를 만드는 것과 퍼포먼스 적으로 큰 기대를 할 수 없다. 특히, 입력받은 데이터가 크다면 더욱이 문제이다.

## 이터레이터 프로토콜
> `Iterator protocol`은 `for`문과 같은 파이썬 표현식이 콘텐츠(컨테이너 타입)를 탐색방법이다.

예를 들어, 파이썬이 `for`문을 해석할 때, 결과적으로는 입력값의 `__iter__`를 호출한다. 좀 더 자세한 흐름은 다음과 같다.
1. `for x in x_list` 해석시작
2. `iter(x_list)` 내장함수 실행
3. `x_list.__iter__` 호출
4. `__iter__`는 이터레이터 객체를 반환

따라서 `for`문의 입력값에 이터레이터가 아닌 데이터 타입을 넣게 되면, 우리는 종종 다음과 같은 에러를 마주하게 된다.
```python
TypeError: 'int' object is not iterable
```
::: tip for 문의 원리
즉, 우리가 자주 사용하는 for 문의 원리는 __iter__에게서 반환된 이터레이터가 StopItreration Exception이 일어날때 까지 이터레이터의 next()를 계속 호출한다.
:::

## 이터러블(iterable:순회기능) 구현
**예시2**를 단점을 해결하고자 기능을 다음과 같이 컨테이너 타입으로 구현한다.
```python
class generator_data(object):
    def __init__(self, length):
        self.length = length
    def __iter__(self):
        for i in range(self.length):
            yield i

gen_data = generator_data(10)

print(gen_data)
print(list(gen_data)) # 첫번째 호출 - __iter__가 호출되어 새로운 이터레이터 반환
print(list(gen_data)) # 두번째 호출 - 상기 동일
>>>

<__main__.generator_data object at 0x10c973c50>
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```
해당 코드로 우리가 원하는 결과를 얻을 수 있었다. 코드가 정상적으로 동작하는 이유는, 각각의 순회 과정에서 이터레이터는 독립적으로 동작(새로운 이터레이터 객체가 반환)하기 때문이다.
::: tip 컨테이너 타입과 이터레이터 타입
- iter내장 함수에 이터레이터를 넘기면 이터레이터 자체를 반환
    - 소진된 이터레이터가 들어오면 소진된 채로 반환
- iter내장 함수에 컨테이너 타입을 넘기면 매번 새로운 이터레이터를 생성해서 반환
:::
