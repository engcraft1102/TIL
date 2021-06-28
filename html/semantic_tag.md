# Semantic Tag

- clearly describes its meaning to both the browser and the developer

## 의미론적 요소를 담은 태그의 등장

시맨틱 태그 이전에는 <div> 태그에 id 속성을 이용한 구분을 했었는데 개발자에 따라 다르므로 불편함이 있었다.

시맨틱 태그는

- 개발자 및 사용자 뿐만 아니라 검색엔진 등에 의미있는 정보의 그룹을 태그로 표현한다.
- Non semantic으로는 div, span 등이 있다.
- h1 ~ h6, table 태그들도 시맨틱 태그로 볼 수 있다.
- 검색엔진최적화 (SEO)를 위해 메타태그, 시맨틱 태그 등을 통한 마크업을 효과적으로 할 수 있다.

> reference : w3c

- article
- aside
- details
- figcaption
- figure
- footer
- header
- main
- mark
- nav
- section
- summary
- time

### article

독립적이고 그 자체가 하나의 정보인 컨텐츠를 특정한다.

말 그대로 기사이다. 그 자체로 의미가 있어야 하며, 웹 사이트에 독립적으로 배포할 수 있는 내용이어야 한다.

- 포럼 게시물
- 블로그 포스팅
- 신문 기사

```html
<article>
<h2>Google Chrome</h2>
<p>Google Chrome is a web browser developed by Google, released in 2008. Chrome is the world's most popular web browser today!</p>
</article>
```

### aside

사이드에 위치한 공간이며 메인 컨텐츠와 관련성이 적다.
```html
<aside>
<h4>Epcot Center</h4>
<p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
</aside>
```

### footer

문서 전체나 섹션의 푸터

보통 다음의 요소들을 포함한다.

- 저자 정보
- 저작권 정보
- 연락처
- 사이트맵
- 맨 위로 링크 (to top)
- 관련 문서

```html
<footer>
  <p>Author: Joonwon Choi</p>
  <p><a href="mailto:engcraft1102@gmail.com">engcraft1102@gmail.com</a></p>
</footer>
```

### header

문서 전체나 섹션의 헤더 (머릿말 부분)

소개글 또는 탐색 링크들을 포함한다.

> 탐색 링크 : navbar에서 홈 / 자유게시판 / Q&A 등으로 이동하는 링크를 뜻함

```html
<header>
    <h1>What Does WWF Do?</h1>
    <p>WWF's mission:</p>
  </header>
```

###  nav

탐색 링크의 집합을 정의한다. 네비게이션.

> 우측으로 30px, CSS 페이지입니다.

```html
<nav>
  <a href="/html/">HTML</a> |
  <a href="/css/">CSS</a> |
  <a href="/js/">JavaScript</a> |
  <a href="/jquery/">jQuery</a>
</nav>
```

### section

문서, 페이지, 사이트 안에서 독립적으로 구분되는 영역

컨텐츠를 그룹화하며, 보통 머릿말을 포함한다.

```html
<section>
<h1>WWF</h1>
<p>The World Wide Fund for Nature (WWF) is an international organization working on issues regarding the conservation, research and restoration of the environment, formerly named the World Wildlife Fund. WWF was founded in 1961.</p>
</section>

<section>
<h1>WWF's Panda symbol</h1>
<p>The Panda has become the symbol of WWF. The well-known panda logo of WWF originated from a panda named Chi Chi that was transferred from the Beijing Zoo to the London Zoo in the same year of the establishment of WWF.</p>
</section>
```

### figure / figcaption

figure는 그림, 도표, 사진, 코드블럭과 같은 요소를 특정한다.

figcaption은 figure의 요소들을 정의하는 속 태그이다.

```html
<figure>
  <img src="pic_trulli.jpg" alt="Trulli">
  <figcaption>Fig1. - Trulli, Puglia, Italy.</figcaption>
</figure>
```