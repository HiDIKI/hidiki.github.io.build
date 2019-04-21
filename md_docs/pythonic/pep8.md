---
customauthor:
  - name: Hidekuma
    email: d.hidekuma@gmail.com
---
# * PEP 8 스타일 가이드
<Author/>
> [파이썬 개선 제안서(Python Enhancement Proposal) #8](https://www.python.org/dev/peps/pep-0008/)

간단하게 파이썬 코드 스타일 가이드라고 생각하면 된다.

## 기대할 수 있는 효과
1. 일관성 있는 스타일은 유지보수를 용이하게 한다.
2. 가독성이 높아진다.
3. 다른 커뮤니티에 속한 다른 프로그래머와도 협업이 용이하다.

## 꼭 알아두면 좋을 포인트
### 1. 스페이스
- 스페이스(탭X)로 들여쓰기
- 문법적으로 의미 있는 들여쓰기는 스페이스 4개
- 한 줄의 길이 79자 이하
- 함수와 클래스는 빈 줄 2개로, 메서드는 1개로 구분
- 변수 할당 앞뒤에 스페이스 하나만 사용

### 2. 네이밍
- 함수, 변수, 속성은 `lowercase_underscore`
- protected는 `_leading_underscore`
- private는 `__double_leading_underscore`
- 클래스와 예외는 `CapitalizedWord`
- 상수는 `ALL_CAPS`

### 3. 표현식 / 문장
```python
"""
< import의 순서 >
1. 표준 라이브러리 모듈
2. 서드파티 모듈
3. 그 외 커스텀모듈
4. 이 하위는 알파벳 순
"""
# 1. import는 항상 파일의 맨 위에
import os

# 2. import는 명시적으로
from bar import foo # OK
from . import foo # OK
import foo # X

# 3. 긍정표현식의 부정보다는 비교부정
if a is not b # OK
if not a is b # X

# 4. [] 와 '' 등의 빈 값은 파이썬에서 암시적으로 False
if not somelist # OK
if len(somelist) == 0 # X

# 5. if, for 와 같은 문은 여러 줄로 나눠 명료하게
for i in range(5):
  print(i)

```

### 4. 도구
- pylint
- autopep8
```bash
$ pip install pylint autopep8
```
