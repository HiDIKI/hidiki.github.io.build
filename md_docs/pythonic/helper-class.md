# * dict와 tuple보다 class를 사용해야 할 때
<Author name='Hidekuma' />

## 손 쉬운 사용은 코드를 취약하게 한다
dict는 객체의 수명이 지속되는 동안 예측불가능한 식별자들을 관리하는 용도로 아주 좋다.

### 예시 1. 아이템을 드랍하는 몬스터
예를 들어, 다음 코드를 봐보자. 몬스터 별 드랍되는 아이템을 쉽게 지정하고 그 결과를 볼 수있다.
```python
import random

class Monsters(object):
    def __init__(self):
        self._list = {}

    def add_monster(self, name):
        self._list[name] = []

    def set_drop(self, name, item):
        self._list[name].append(item)

    def drop(self, name):
        return random.choice(self._list[name])

monsters = Monsters()
monsters.add_monster('hidekuma')
monsters.set_drop('hidekuma', 'sword')
monsters.set_drop('hidekuma', 'shield')

print(monsters.drop('hidekuma'))

>>>
sword
```

### 예시 2. 아이템을 드랍하는 속성을 가진 몬스터
만약 몬스터가 추후에 더 많은 property(ex: HP, MP, 경험치 등)을 가진다고 가정하고, 드랍하는 아이템을 하나의 속성으로 간주하여, 다시 만들어보자.
```python
import random

class Monsters2(object):
    def __init__(self):
        self._list = {}

    def add_monster(self, name):
        self._list[name] = {}

    def set_drop(self, name, item):
        monster = self._list[name]
        drops = monster.setdefault('drops', [])
        drops.append(item)

    def drop(self, name):
        return random.choice(self._list[name]['drops'])

monsters = Monsters2()
monsters.add_monster('hidekuma')
monsters.set_drop('hidekuma', 'spear')
monsters.set_drop('hidekuma', 'sword')
monsters.set_drop('hidekuma', 'shield')

print(monsters.drop('hidekuma'))

>>>
shield
```
아직까진 충분히 직관적이다.

### 예시 3. 속성을 가진 아이템을 드랍하는 속성을 가진 몬스터
가장 안쪽 딕셔너리에 아이템과 파워 그리고 랭크를 담은 tuple을 맵핑하였다.
```python
import random

class Monsters3(object):
    def __init__(self):
        self._list = {}

    def add_monster(self, name):
        self._list[name] = {}

    def set_drop(self, name, item, rank, power):
        monster = self._list[name]
        drops = monster.setdefault('drops', [])
        drops.append((item, rank, power))

    def drop(self, name):
        return random.choice(self._list[name]['drops'])

monsters = Monsters3()
monsters.add_monster('hidekuma')
monsters.set_drop('hidekuma', 'C', 'spear', 10)
monsters.set_drop('hidekuma', 'B', 'sword', 12)
monsters.set_drop('hidekuma', 'A', 'shield', 17)

print(monsters.drop('hidekuma'))

>>>
('A', 'shield', 17)
```
이제 호출 시에도 처음에 비해 위치 인수들이 많아졌고, 점점 복잡해지기 시작하였다. 처음에는 단순히 몬스터의 드랍 아이템을 나타내기 위한 딕셔너리 였지만, 추후에 속성과 기능이 추가 될 수록 유지보수의 늪에 빠지게 될 것이다.

지금처럼 계층이 한 단계가 넘는 중첩은 피하는 것이 바람직하며, 캡슐화한 인터페이스를 제공하기 위해서 이런 상황에선 즉시 클래스로 옮겨가야한다.

## 두 단계 이상의 계층 구조는 클래스로 구현하자
먼저 아이템에는 공격력 외에도 공격 속도, 추가 버프들이 붙여질 가능성이 매우크다. 따라서, 튜플의 아이템이 두 개가 넘어갈 가능성이 매우 큰데, 이런 요구에 정확히 부합하는 것이 바로 `namedtuple`이다.

### Immutable data class
namedtuple은 위치 인수나 키워드 인수로 생성가능하다.
```python
import collections

Item = collections.namedtuple('Item', ('rank', 'name', 'power'))
```
::: warning collections.namedtuple
- namedtuple은 키워드 인수로 생성가능 하나, 기본값을 설정할 수 없다. 따라서 데이터의 선택적인 속성이 많아지면 다루기 힘들어진다.
- namedtuple은 여전히 숫자로 된 인덱스와 이터레이터 방법으로 순회가능하나, 상황에 따라선 의도와 다르게 사용될 수도 있기 때문에 사용에 항상 주의한다.
:::

### 예시 4. 클래스 리팩토링
코드는 이전보다 길어졌지만, 호출부가 훨씬 이해하기 쉽고 예제도 명확하다.
```python
import random
import collections

Item = collections.namedtuple('Item', ('rank', 'name', 'power'))

class Drops(object):
    def __init__(self):
        self._items = []

    def set_drop(self, rank, item, power):
        self._items.append(Item(rank, item, power))

    def drop(self):
        if self._items:
            return random.choice(self._items)
        else:
            raise NotImplementedError

class Monster(object):
    def __init__(self, name):
        self._name = name
        self._drops = Drops()

    def __str__(self):
        return self._name

    def drops(self):
        return self._drops

    def drop(self):
        return self._drops.drop()

class Monsters(object):
    def __init__(self):
        self._list = {}

    def monster(self, name):
        if name not in self._list:
            self._list[name] = Monster(name)
        return self._list[name]

monsters = Monsters()
hidekuma = monsters.monster('hidekuma')
drops = hidekuma.drops()
drops.set_drop('A', 'sword', 17)

print(hidekuma)
print(hidekuma.drop())

>>>
hidekuma
Item(rank='A', name='sword', power=17)
```

## 요약
- 중첩된 딕셔너리나 긴 튜플은 멀리하자

