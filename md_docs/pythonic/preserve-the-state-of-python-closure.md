---
customauthor:
  - name: Hidekuma
---
# * 상태보존 클로저 
<Author/>

## 예시 1. 함수형태
딕셔너리 타입의 `before`에 튜플로 구성 된 `loop`데이터를 순회하면서, 해당 `value`를 합산하고 새로운 값이 추가 될때마다 `print`를 찍는 함수이다. 클로저가 읽어지는 순서에 대해 잘 모른다면, [해당 문서](/pythonic/closure)를 참고할 것.

::: tip defaultdict
해당 자료구조는 찾을 수 없는 키에 접근할 때마다 호출될 함수를 후크(hook)으로 받는다.
:::

```python
from collections import defaultdict

# 기본 데이터
before = {'A': 3, 'C': 4, 'D': 5}
# loop를 돌 데이터
loop = [
    ('A', 1),
    ('B', 3),
    ('E', 6)
]

def preserve_state(before, loop):
    count_num = 0 # 상태를 보존시킬 데이터

    def added_count():
        nonlocal count_num # 상태보존 클로저
        count_num += 1
        print('-- Added new value %d --' % (count_num))
        return 0

    after = defaultdict(added_count, before)
    for k, v in loop:
        after[k] += v

    return after, count_num

print('BEFORE: ', before)
after, count_num = preserve_state(before, loop)
print('AFTER: ', dict(after))
print('ADDED COUNT: ', count_num)

>>>
BEFORE:  {'A': 3, 'C': 4, 'D': 5}
-- Added new value 1 --
-- Added new value 2 --
AFTER:  {'A': 4, 'C': 4, 'D': 5, 'B': 3, 'E': 6}
ADDED COUNT:  2
```
새롭게 추가되는 데이터는 B와 E이므로 Added new value가 2번 프린팅되어 기대하는 결과를 도출하였다.
::: warning nonlocal
nonlocal은 특정 변수 이름에 할당할 때, 스코프탐색이 일어나야 함을 나타낸다. 특히, 전역 변수의 오염을 피하기 위해서(치명적인 오류로 발전할 수있음) 모듈 수준까지의 스코프까지는 탐색할 수 없다.
:::

## 예시 2. 클래스 형태
보존할 상태를 캡슐화하는 작은 클래스를 정의하는 방식
```python
from collections import defaultdict

before = {'A': 3, 'C': 4, 'D': 5}
loop = [
    ('A', 1),
    ('B', 3),
    ('E', 6)
]

class PreserveState(object):
    def __init__(self):
        self.count_num = 0

    def added_count(self):
        self.count_num += 1
        print('-- Added new value %d --' % (self.count_num))
        return 0


preserve_state = PreserveState()
after = defaultdict(preserve_state.added_count, before)
for k, v in loop:
    after[k] += v

assert preserve_state.count_num == 2

>>>
-- Added new value 1 --
-- Added new value 2 --
```
헬퍼클래스를 이용하는 편이 앞서 말한, 함수형태의 클로저보다 명확하다. 그러나 실제로 해당 함수가 사용되는 예를 보기 전까지 클래스가 어떤식으로 동작하는 유추하기 어렵다. 

이런 상황에서 우리는 `__call__` 메서드를 이용한다. 해당 메서드는 객체를 함수처럼 호출할 수 있게 만들어 준다.

## 예시 3. `__call__` 메서드
해당 메서드는 코드를 처음보는 사람에게 클래스의 주요 로직을 담고있는 `entry point`로 안내하는 역할은 하기 때문에, 해당 클래스가 상태보존을 위함이라는 힌트를 제공한다.
```python
from collections import defaultdict

before = {'A': 3, 'C': 4, 'D': 5}
loop = [
    ('A', 1),
    ('B', 3),
    ('E', 6)
]

class PreserveState(object):
    def __init__(self):
        self.count_num = 0

    def __call__(self): # <--  __call__로만 바꿔주었다.
        self.count_num += 1
        print('-- Added new value %d --' % (self.count_num))
        return 0


preserve_state = PreserveState()
after = defaultdict(preserve_state, before) # <-- 호출 시에 따로 함수를 호출하지 않고, 객체 자신을 넣어주면 된다.
for k, v in loop:
    after[k] += v

assert preserve_state.count_num == 2
print(dict(after))
```
사용성적인 면에서도 **예시2** 보다 간단한 인터페이스를 제공한다. 상황에 맞게 알맞은 방법을 채택하여 구현하면 된다.
