# var, const, let JavaScript 변수

[TOC]

## Dynamic Typed Language

C언오와 Java와 같은 Static Typed Language에서는 변수를 선언할 때 int나 char 같은 자료형과 함께 선언한다. 하지만 Python이나 JavaScript는 Dynamic Typed Language로 선언시 타입을 명시하지 않는다. 파이썬의 경우 변수명만 선언하는 매우 간단한 방식이지만 JS는 변수명앞에 변수임을 알려주는 var를 붙였다.

## 변수의 범위 (Variable Scope)

변수는 선언과 함께 해당 변수를 참조할 수 있는 공간적 영역을 가지게 된다. JS에서 변수는 함수 범위(function-scoped)와 전역 범위(global-scoped), 블록 범위(block-scoped) 중 하나를 갖게 된다.

## var (function-scoped)

```javascript
// var가 변수를 function-scoped로 정의하기 때문에 for문이 끝난 후 i의 출력이 정상적으로 된다.
// var가 hoisting 되었기 대문이다.

for (var j=0; j<10; j++) {
    console.log('j', j)
}
console.log('after loob j is ', j) // after loop j is 10

// 아래의 경우에는 에러가 발생한다.
function counter () {
for(var i=0; i<10; i++) {
console.log('i', i)
}
}
counter()
console.log('after loop i is', i) // ReferenceError: i is not defined
```

`IIFE(immediately-invoked function expression)` 으로도 function-scoped를 확인할 수 있다.

- 괄호 `()`, Grouping Operator로 둘러싸인 익명함수와 즉시 실행 함수를 생성하는 괄호로 이루어져 있다.
- IIFE는 정의되자마자 즉시 실행되는 js function을 말한다.

```javascript
(function() {
// var로 선언한 변수 i는 여기까지만 hoisting됩니다.
for(var i=0; i<10; i++) {
console.log('i', i)
}
})()
console.log('after loop i is', i) // ReferenceError: i is not defined
```

하지만 여기서 var를 명시해주지 않는다면 global variable로 인식해 hoisting 한다.

```javascript
// hoisting으로 var i가 global variable로 선언된 것처럼 보임
(function() {
for(i=0; i<10; i++) {
console.log('i', i)
}
})()
console.log('after loop i is', i) // after loop i is 10
```

IIFE는 자체로 쓰이는 함수로 그 안에서 선언한 변수가 global variable이 된다는 것은 적절치 않다.

이를 막기 위해 `use strict`를 사용할 수 있다.

```javascript
// iife_use_strict_var.js
(function() {
'use strict'
for(i=0; i<10; i++) {
console.log('i', i)
}
})()
console.log('after loop i is', i) // ReferenceError: i is not defined
```

하지만 코드가 더 복잡해진다.

문제는 또 있다.

```javascript
// problem_var.js
// 이미 만들어진 변수이름으로 재선언했는데 아무런 문제가 발생하지 않는다.
var a = 'test'
var a = 'test2' // 이미 만들어진 변수 이름을 재선언해도 문제가 일어나지 않습니다.
c = 'test' // hoisting으로 인해 정의되지 않았을 것 같은 변수에 값을 대입해도 ReferenceError가 나지 않습니다.
var c
```

그리고 이러한 문제들을 해결하기 위해 const와 let이 등장했다.

## const, let (block-scoped)

const와 let은 ES2015(ES6)에서 추가된 문법이다. const와 let은 둘 다 변수의 재선언이 불가하다.

둘의 차이점은 const는 immutable, 즉 불변하지만 let은 mutable하다.

```javascript
// let.js
let a = 'test'
let a = 'test2' // Uncaught SyntaxError: Identifier 'a' has already been declared
a = 'test3' // 변수 값의 변경이 가능합니다.
// const.js
const b = 'test'
const b = 'test2' // Uncaught SyntaxError: Identifier 'a' has already been declared
b = 'test3' // Uncaught TypeError:Assignment to constant variable.
```

추가적으로, let, const도 hoisting이 일어나긴 한다! (????)

다만 var가 function-scoped로 hoisting 된 반면, const와 let은 block-scoped 단위로 hoisting 된다.

또한 const와 let은 `TDZ(Temporal Dead Zone)`에 의해 제약을 받아 변수가 초기화되기 전에 접근하려 하면, var처럼 undefined를 반환하지 않고 `ReferenceError`를 발생시켜서 코드를 예측 가능하고 잠재적인 버그를 쉽게 찾아낼 수 있도록 한다.

