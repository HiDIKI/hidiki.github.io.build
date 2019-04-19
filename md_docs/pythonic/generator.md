# * 리스트 컴프리헨션과 제너레이터
## 리스트 컴프리헨션
### 새로운 리스트 만들기
map과 lambda함수를 통해서 만들기 보단, 다음과 같이 명료하게 나타내며 리스트를 생성한다.
```python
before = [1, 2, 3, 4, 5]
after = [v*2 for v in before] # OK
# after = map(lambda v: v * 2, before) # X -> 동작하나, 파이써닉하지 못함.
print(after)

>>>
[2, 4, 6, 8, 10]
```

### 리스트 컴프리헨션에 조건식 넣기
다음과 같이 조건식 또한 넣을 수 있다.
```python
before = [1, 2, 3, 4, 5]
after = [v*2 for v in before if x % 2 == 0] # 2로 나눠 떨어지는 녀석들만 곱해 담기.
print(after)

>>>
[4, 8]
```
---

## 제너레이터
### 제너레이터로 리스트 컴프리헨션의 문제점을 해결하기
리스트 컴프리헨션의 가장 큰 문제점은 메모리 낭비이다. 새 리스트를 통째로 생성하기 때문에 입력이 많은 프로그램에서는 `Out of memory` 에러를 볼 것이다. 다음 예제 코드는 이전 코드와 동일한 기능을 제너레이터로 표현하였다. 해당 제너레이터 코드는 이터레이터([살펴보기](/pythonic/feature-of-iterator))로 평가되기 때문에 출력이 진행되진 않는다.

```python
before = [1, 2, 3, 4, 5]
# after = [v*2 for v in before] # X ->이미 메모리에 올라가면서 메모리 점유율이 계속 커지고 있는 상황
after_generator = (v*2 for v in before) # 튜플을 담듯 ()에 담아준다.
print(after_generator)

>>>
<generator object <genexpr> at 0xxx123xxx>
```

### 제너레이터로 출력하기
내장 함수를 통해 하나씩 출력이 가능하다. 다양한 종류의 내장함수는 검색해보자.
```python
print(next(after_generator))
print(next(after_generator))

>>>
2
4
```

### 순회가 아닌 리스트로 만들어야 할 경우
for 문이 돌면서 리스트를 만드는 시간 자체에도 메모리 점유되기 때문에, 제너레이터로 한번 만든 후 리스트로 만드는 것이 효과적이다.
```python
# X -> 리스트를 반환하는 방식
def rtn_list(nums): 
  r = [v*2 for v in nums]
  return r

# OK -> 제너레이터를 반환하는 방식
def rtn_generator(nums):
  for v in nums:
    yield v*2
  #r = (v*2 for v in nums) -- 동일함
  return r

before = [1, 2, 3, 4, 5]
after_list = rtn_list(before) # X -> 이미 함수가 동작하는 상황에서부터 메모리가 점유되고 있었음
after_gen = rtn_generator(before) # OK -> 아직 메모리에 안올라기 있음
after_gen = list(after_gen) # OK -> 호출 시에 메모리에 올라감
```
