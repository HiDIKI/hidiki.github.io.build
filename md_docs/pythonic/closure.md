---
customauthor:
  - name: Hidekuma
    email: d.hidekuma@gmail.com
---
# * 클로저와 변수 스코프에 상호작용
<Author/>
## 클로저(Closure)란?
> 클로저란, 자신이 정의된 스코프(scope:유효범위)에 있는 변수를 참조하는 함수다. 하기 예제 코드를 보면, `change_core`함수가 `change`함수의 `left`인수에 바로 접근하고 있는데, 바로 클로저 덕분에 접근이 가능한 것이다.

### 예제1
들어온 인수 위치를 바꿔 출력하는 함수

```python
def change(left, right):
    def change_core(in_right):
        return in_right, left
    rtn = change_core(right)
    print(rtn)

change(1, 2)

>>>
(2, 1)
```
::: danger
상기 코드는 이해를 돕기위한 예제일 뿐,  해당 기능은 이렇게 작성하면 안된다.
:::

### 예제2
들어온 인수 위치를 바꾸고, 그 실행여부를 참/거짓으로 출력하는 함수
```python
def change(left, right):
    changed = False
    def change_core(in_right):
        changed = True
        return in_right, left
    rtn = change_core(right)
    print(rtn)
    print(changed)

change(1, 2) # 결과를 예상해보자.
```
대부분 아래와 같이 예상할 것이다.

```python
>>>
(2, 1)
True
```
하지만 실제로 실행시켜보면, 출력은 다음과 같다.
```python
>>>
(2, 1)
False
```
인수의 위치를 바꿔 출력하는 함수의 기능은 동작하였으나, 그 실행여부를 `False`로 출력하고있다. 어째서 일까?

## 스코프 탐색 순서
> 파이썬 인터프리터는 변수의 참조를 진행할 때, 다음과 같은 순서로 유효범위를 탐색한다. 1~4번까지의 스코프에서 변수를 찾지 못하면, `NameError`가 발생한다.
1. 현재 함수의 스코프
2. 현재 함수를 감싸는 스코프
3. 현재 함수가 쓰여진 코드, 모듈 스코프(전역 스코프)
4. 내장 함수 스코프(내장 스코프)

즉, <U>현재 스코프부터 시작해서 부모급으로 탐색</U>을 해나가기 때문에, **예제2**의 코드 결과가 설명이 된다. 이 때, `change_core`함수 안에서 `changed`변수는 새로운 변수로 할당된다. **예제3**을 보면 이해가 쉽다.
### 예제3
예제2와 같은 코드이나, `change_core`함수안에서 `changed`변수출력을 추가하였다.
```python
def change(left, right):
    changed = False # scope: change
    def change_core(in_right):
        changed = True # scope: change_core
        print(changed)
        return in_right, left
    rtn = change_core(right)
    print(rtn)
    print(changed)

change(1, 2)

>>>
True
(2, 1)
False
```
많은 사람들이 잘 혼동하는 문제이다. 물론 이와 같은 결과는 파이썬 설계자의 의도이며, 함수의 지역변수가 모듈의 전역변수를 오염시키는 것을 방지해준다. 해당 부분은 파이썬 코딩에 있어, 이해가 꼭 필요하며 매우 중요하다.
