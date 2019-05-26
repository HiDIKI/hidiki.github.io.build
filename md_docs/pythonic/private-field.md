---
customauthor:
  - name: Hidekuma
---

# * 파이썬 비공개 필드
<Author/>

이름에서 예상할 수 있듯이, 정의 된 클래스내에서만 접근이 가능한 속성이다. 서브클래스에서도 부모클래스의 비공개 필드에 접근하지 못한다. 

## 컴파일러의 비공개 속성 컨트롤
파이썬 컴파일러가 비공개 속성을 정의하는 방법은 비교적 간단하다. 
```python
class MyTestObject(object):
    def __init__(self):
        self.public_value = 10
        self.__private_value = 1

test = MyTestObject()
print(test.__dict__)

>>>
{'public_value': 10, '_MyTestObject.__private_value': 1}
```
상기 코드와 같이, `__private_value`에 접근하는 코드를 발견하면 `_{class_name}__{private_field}`로 변환한다.

따라서 우리가 비공개 속성에 직접 접근할 때 보는 에러는 단순히 컴파일러가 변경한 속성의 이름을 찾지 못해 발생한다. 이 규칙을 이해하면 사실 우리는 마음만 먹으면 언제든지 객체내부를 조작하고, 비공개 속성에 접근할 수 있다.

### 보호 속성 /  비공개 속성
파이썬에선 보호 속성과 비공개 속성을 다음과 같은 규칙(**속성앞에 언더스코어 개수**)으로 정의한다.
- `_protected_value` = 보호
- `__private_value` = 비공개
- `public_value` = 공개

## 비공개 속성을 엄격하게 강제하지 않은 이유
> "We are consenting adults." (우리 모두 성인이라는 사실에 동의한다)

인용문에서 알 수 있듯이, 파이썬 프로그래머들은 폐쇄로 얻는 디메리트보다 개방으로 얻는 메리트가 더 크다고 믿는다. 또한, 이로써 파생되는 무분별한 객체에의 내부접근과 그에 따른 위험을 최소화하기 위해, [파이썬 스타일 가이드](/pythonic/pep8)를 따르는 것이 매우 중요해지는 이유이다.

주로 파이써닉하게 사용하는 방법은, 보호속성을 사용하여 비공개속성처럼 접근을 강제로 제어하지 말고 보호 필드를 문서화(docstring)하여, 클래스 사용에 필요한 지침을 제공하는 것이 중요하다.

### docstring 
```python
class MyTestObject(object):
    def __init__(self):
        """
        <docsting example>
        1. init에서 초기화 되는 보호 속성이다.
        2. 문자열이 아닌 int로 정의되어야 한다.
        3. 객체로 할당되고 나서는 immutable해야한다.
        """
        self.public_value = 10
        self.__private_value = 1
        self._protect_value = 100

test = MyTestObject()
```
