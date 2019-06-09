---
customauthor:
  - name: Hidekuma
---
# * 커스텀 컨테이너의 바람직한 생성법
<Author/>

## 컨테이너란?
파이썬 클래스는 일종의 컨테이너로, 속성과 기능을 함께 캡슐화함으로써 데이터를 담고 있는 객체를 뜻한다. 파이썬 내장 컨테이너 타입으로는 리스트, 튜플, 세트 딕셔너리 등이 있다.

### 예시1. 컨테이너 상속 - 리스트
list의 표준기능을 전부 구현하면서, 중첩되는 아이템의 갯수를 카운팅하는 커스텀 기능을 가진 커스텀 컨테이너 예시이다.
```python
class CustomList(list):
    def __init__(self, initialize):
        super().__init__(initialize)
    
    def summary(self):
        rtn = {}
        for item in self:
            rtn.setdefault(item, 0)
            rtn[item] += 1
        return rtn

clist = CustomList(['a', 'b', 'c', 'd', 'a', 'b'])
summary = clist.summary()

#  --- list 표준기능 --- 
print(len(clist))
clist.pop() 
print(repr(clist))
clist.append('d')
print(repr(clist))

# --- list 커스텀 기능 ---
print(clist.summary())

>>>
6
['a', 'b', 'c', 'd', 'a']
['a', 'b', 'c', 'd', 'a', 'd']
{'a': 2, 'b': 2, 'c': 1, 'd': 1} # <-- 커스텀 기능
```

### 예시2. 컨테이너 생성 - 리스트 시퀀스 시맨틱을 가진 비선형 자료구조의 예
비선형 자료구조인 Binary Tree 에 list나 tuple 같은 시퀀스 시맨틱을 제공하고 싶다고 하자.

```python
class BinaryNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right
        
class IndexableNode(BinaryNode):
    def _search(self, count, index):
        # ...
        # 비선형 트리를 선형으로 직렬화했을 때의 인덱스 찾기
		# (found, count) 반환

    def __getitem__(self, index):
        found, _ = self._search(0, index)
        if not found:
            raise IndexError("Index out of range")
        return found.value

tree = IndexableNode(
	10,
	left=IndexableNode(
			5,
			left=IndexableNode(2),
			right=IndexableNode(6, right=IndexableNode(7))
	),
	right=IndexableNode(15, left=IndexableNode(11))
)

print('LRR =', tree.left.right.right.value)
print('Index 0 =', tree[0])
print('Index 1 =', tree[1])
print('11 in the tree?', 11 in tree)
print('17 in the tree?', 17 in tree)
print('Tree is', list(tree))

>>>
LRR = 7
Index 0 = 2
Index 1 = 5
11 in the tree? True
17 in the tree? False
Tree is [2, 5, 6, 7, 10, 11, 15]
```
트리는 비선형 자료구조임에도 탐색은 물론이고 list처럼 인덱스로 접근할 수도 있다. 바로 `__getitem__` 내장함수를 구현한 것이 포인트다. 만약 `len(tree)`과 같은 기능을 구현 하려면, `__len__`이란 내장함수를 구현하면 좀 더 시퀀스 시맨틱한 자료구조로 만들어낼 수 있다.

::: tip Sequence 
시퀀스는 순서라는 의미로 프로그래밍에서 해석된다. 즉 순서가 있는 데이터의 모임이라고 보면 되며, 리스트는 수학적으로는 유한수열(finite sequence)을 프로그래밍적으로 표현한 것이다.
:::

## 바람직한 커스텀 컨테이너의 생성방법
커스텀 컨테이너를 생성하는 예시에 대해 다뤄봤는데, 매번 새로운 컨테이너를 정의할 때마다, 매번 같은 기능을 구현하거나 기대하는 기능을 정의하는 일은 보기보다 어렵고 까다롭다. 파이썬에서는 이런 어려움을 피하기 위해 내장 `collections.abc`를 이용한다.

### collections.abc
각 컨테이너 타입에 필요한 일반적인 메서드를 모두 제공하는 추상 기반 클래스들을 정의하고, 필수로 정의해야할 메서드들을 알려준다.

```python
from collections.abc import Sequence

class BadType(Sequence):
    pass

bad = badType()

>>>
TypeError: Can't instantiate abstract class BadType with abstract methods __getitem__, __len__
```

앞서 예시에서 거론된 `__getitem__`, `__len__`을 구현해야 함을 알려준다.

```python
...

class SequenceNode(IndexableNode):
    def __len__(self):
        _, count = self._search(0, None)
        return count

class GoodType(SequenceNode, Sequence):
    pass

good = GoodType()
```
이렇게 구현한 클래스는 앞서 만든 클래스들과 다르게 `index()`나 `count()` 같은 부가적인 메소드를 해당 추상 클래스가 모두 제공해준다.
`Set`이나 `MutableMapping`처럼 파이썬의 관례에 맞춰 구현해야 하는 메서드가 많은 복잡한 자료구조를 구현할 때, 이런 추상 클래스를 사용하면 얻는 메리트가 더 커진다.
