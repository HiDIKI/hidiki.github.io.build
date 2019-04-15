# * None을 반환하지 않기
## None을 반환할 경우
나누기 함수를 작성해보자.
```python
def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError: # --> 0으로 나누려고 할 때(부모가 0), 에러가 발생한다.
        return None

result = divide(x, y)
if not result: # --> None은 파이썬에서 false로 간주되기 때문.
    print('잘못된 입력')
```
상기 코드는 치명적인 오류가 있다. 만약 분자가 0일 경우(예시: 0 / 7 = 0 ), 해당 `divide`함수는 0을 리턴할 것이며, 정확한 계산이지만 파이썬에서는 `{}`,`''`, `0`, `None`을 `false`로 간주하기 때문에 저 if문을 타버릴 것이다.

물론 상기 코드를 다음과 같이 개선하면 문제는 없다.
```python
if result is None:
    print('잘못된 입력')
```
하지만, **잘못된 입력**을 알리기 위해 `None`을 반환하는 경우! <U>즉, 특별한 의미를 나타내려고 `None`을 반환하는 경우</U>는 맨 위 코드와 같이 조건식에서 `False`로 평가되기 때문에, 오류를 일으키기 쉽다.

## return None 보다는 raise error
예외를 발생시켜, 호출하는 코드에서 예외를 적절히 컨트롤 할 수 있게끔 한다.
```python
def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError as e:
        raise ValueError('잘못된 입력') from e

x, y = 10, 9
try:
    result = divide(x, y)
except ValueError:
    print('잘못된 입력')
else:
    print('정상!')

>>>
정상!
```


