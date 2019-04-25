---
customauthor:
  - name: taekbari
---

# * Atomic Design  
<Author/>

* 모든 물질(고체, 액체, 기체, 단순체, 복합체 등)이 원자로 구성되어 있고 그 원자 단위들은 서로 결합하여 분자를 형성, 
차례로 더 복잡한 유기체로 결합하여 우주의 모든 물질을 창조한다는 것을 기본으로 하는 디자인 시스템 방법론이다.  
* 인터페이스도 작은 컴포넌트로 구성되어 있고 인터페이스 전체를 기본 빌딩 블록으로 나누고나서 작업을 진행한다.  

## Atomic Design Level

아토믹 디자인은 아래와 같이 5개의 구분된 단계가 있다.  
* Atoms (원자)  
* Molecules (분자)  
* Organisms (유기체)  
* Templates  
* Pages  

### Atoms  

원자는 물질의 기본 빌딩 블록이다. 웹 인터페이스에 적용되며 원자는 폼의 텍스트 레이블, 인풋필드 혹은 버튼과 같은 HTML의 태그이다.  
원자에는 컬러, 폰트 그리고 애니메이션과 같은 인터페이스에서 보이지 않는 추상적인 요소가 포함되기도 한다.  

```HTML
<label for="id">SEARCH THE SITE</label>
<input type="text" placeholder="ENTER KEYWORD" />
<button type="button">SEARCH</button>
```  

### Molecules  

분자는 함께 결합된 원자 그룹이며 화합물의 가장 작은 기본 단위이다. 분자들은 그 자체의 특성을 가지고 있으며 디자인 시스템의 중추 역할을 한다.  

예를 들면, 폼의 텍스트 레이블, 인풋필드 혹은 버튼들같이 각 개별 요소들 자체만으로는 그다지 유용하지 않지만 폼(form)으로 구성되어 결합하면 실제로 뭔가 할 수 있다.  
```HTML  
<form>
    <label for="id">SEARCH THE SITE</label>
    <input type="text" placeholder="ENTER KEYWORD" />
    <button type="button">SEARCH</button>
</form>
```  
> 원자에서 분자를 만드는 것은 "한 가지만 하고 그거 하나만 잘해라"는 사고방식 권함.  

### Organisms  

분자는 우리가 작업할 수 있는 빌딩 블록을 제공하고 있어서 분자들을 결합하여 유기체를 형성할 수 있다. 유기체는 비교적 복잡하며 인터페이스에서 구분된 영역을 형성하는 서로 결합되어 있는 분자 그룹이다.  

```HTML  
<header>
    <logo-molecule></logo-molecule>
    <nav-molecule></nav-molecule>
    <search-molecule></search-molecule>
</header>
```  
> 컴포넌트가 독립적(standalone)이고, 기동성(portable) 있고, 재사용(reusable) 가능하게 재작해야함.  

### Templates  

템플릿 파일은 주로 페이지를 구성하기 위해 서로 꿰매어진 유기체 그룹으로 구성되며 이 부분에서 디자인을 확인하고 레이아웃이 실제로 구동하는지 볼 수 있다.  
템플릿은 처음에 HTML 와이어 프레임으로 시작하지만 시간이 지나 최종 산출물이 되는 시점이 오면 완성도가 높아진다.  

### Pages  

페이지는 템플릿의 특정 인스턴스이다. 플로이스 홀더 콘텐츠가 실제 대표 콘텐츠로 대체되어 사용자가 보는 디자인을 정확/구체적으로 구현한다.  

### 패턴 랩(Pattern Lab)  

[Pattern Lab](https://patternlab.io/) 은 아토믹 디자인 시스템을 실제로 만들기 위해 만들어진 툴이다.

#### Reference  

[Atomic Design(https://brunch.co.kr/@ultra0034/63)](https://brunch.co.kr/@ultra0034/63)