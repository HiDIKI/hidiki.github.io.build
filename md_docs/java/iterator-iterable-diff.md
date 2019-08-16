---
customauthor:
  - name: Bluemoon
---
# * Iterator, Iterable 차이점
<Author name="Bluemoon" />

`Iterator`, `Iterable`은 자바 컬렉션 인터페이스에서 제공  

---
## Iterable

`Iterable`은 순회할 수 있는 컬렉션을 나타낸다. 이 인터페이스를 상속하게 되면 객체는 `for-each` loop를 사용할 수 있게 해준다.  
(내부적으로 iterator() 메소드를 객체에 호출해서 가능)  
```java
List <String> persons = new ArrayList<>(Arrays.asList("A", "B", "C"));
for (String person: persons) {
    System.out.println(person);
}
```
위의 예제에서 사용된 List는 `Collection` 인터페이스로 찾아 가게되면 아래와 같이 `iterable 인터페이스`를 상속하고 있다.  
```java
public interface Collection<E> extends Iterable<E> {
    ...
```
---
## Iterator
`Iterator` 인터페이스는 다른 객체, 다른 종류의 컬렉션을 순회하게 해줄수 있다. 이 인터페이스를 순회하기 위해서는 `hasNext()` + `next()` 메소드를 사용해야한다.
```java
Iterator <Integer> iterator = Arrays.asList(1, 2, 3, 4, 5).iterator();
while (iterator.hasNext()) {
            System.out.println(iterator.next());
}
```

`Collection` 인터페이스를 보면 Iterator 인터페이스를 메소드를 만들어 사용하고 있는걸 볼 수 있다.
```java
Iterator<E> iterator();
```

for-each loop에서 람다를 사용해서 `Iterable` 안의 `Iterator`로 컨버팅을 할 수 있다.  
```java
for (Integer i: (Iterable<Interger>) () -> iterator) {
    System.out.println(i);
}
```


