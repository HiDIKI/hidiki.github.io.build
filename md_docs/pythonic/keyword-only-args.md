---
customauthor:
  - name: Hidekuma
---
# * 키워드 전용인수
<Author/>
파이썬 뿐만아니라 많은 언어에서 우리는 당연한듯 자주 사용하는 부분일 것이다. 키워드 인수를 통해 우리는 함수의 명료성을 강조할 수 있다.

## 위치 인수만을 이용한 함수
```python
def say(msg, delimiter, user):
  print('{user} say {delimiter} {msg}'.format(msg=msg, delimiter=delimiter, user=user))

say('test', ':', 'unknown')
say('test', ':', 'hidekuma')

>>>
unknown say : test
hidekuma say : test
```
크게 어렵지 않게 이해할 수 있는 코드이다. 문제는 위치인수 모두 `str` 타입을 받기 때문에, 인수의 위치를 혼동하기 쉽다는 것이다.
이 때문에 함수의 내용이 복잡해지면 복잡해질 수록, 찾기 어려운 버그가 쉽게 발생할 수있다. 해당 코드의 가독성을 높여보자.

## 키워드 인수를 이용한 함수
```python
def say(msg, delimiter, user='unknown'):
  print('{user} say {delimiter} {msg}'.format(msg=msg, delimiter=delimiter, user=user))
  
say('test', ':') # 디폴트 값을 사용하여 호출 
say('test', ':', 'wabi') # 키워드 인수이나 위치 인수로 명시하여 호출 --> 명료성 면에서 큰 메리트가 없음.
say('test', ':', user='hidekuma') # 키워드 인수를 명시하여 호출

>>>
unknown say : test
wabi say : test
hidekuma say : test
```
아주 익숙한 형태의 함수일 것이다. 하지만 문제는 있다. 상기 예시처럼 키워드 인수가 선택적으로 사용되기 때문에, 여전히 위치 인수 방식으로 사용될 수 있다는 것이다.
즉, 호출부에서 키워드 인수로 호출 의도를 명확하게 드러내지 않고는 위에서 언급했던 명료성에 큰 메리트가 없다는 것이다.

복잡한 함수를 작성하면 할 수록, 호출하는 쪽에서 의도를 명확하게 드러내도록 함수 작성단에서 강제성을 부여하는 것이 좋다.

## 키워드 전용인수를 이용한 함수 (Python3)
파이썬 3에서는 `Keyword-only argument`로 함수 호출 시, **키워드 인수**로만 넘길 수 있게 강제성을 부여할 수 있다.
```python
def say(msg, delimiter, *, user='unknown'): # <-- 위치 인수와 키워드 인수 사이에 *로 구분한다.
  # ...                                  

say('test', ':', 'hidekuma') # 키워드 인수이나 위치 인수로 명시하여 호출 시

>>>
TypeError: say() takes 2 positional arguments but 3 were given 
```
이제 해당 코드는 위치 인수로는 동작하지 않으며, 키워드 인수로만 기대한 결과를 얻을 수 있다.

## 키워드 전용인수를 이용한 함수 (Python2)
상기 설명한 키워드 전용 인수는 `python2`에서는 존재하지 않는다. 하지만, 다음과 같은 방법으로 어느정도 흉내 낼 수 있다.
```python
def say(msg, delimiter, **kwargs):
  user = kwargs.pop('user', 'unknown')
  if kwargs:
    raise TypeError('Unexpected **kwargs: %r' % kwargs)
    
print('{user} say {delimiter} {msg}'.format(msg=msg, delimiter=delimiter, user=user))
  
say('test', ':')
say('test', ':', 'wabi')
say('test', ':', user='hidekuma')

>>>
unknown say : test 
TypeError: say() takes 2 positional arguments but 3 were given 
hidekuma say : test 
```
