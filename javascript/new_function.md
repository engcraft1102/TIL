# new Function 문법

함수 표현식과 함수 선언문 이외에 함수를 만드는 방법이 하나 더 있다. 잘 사용하지 않지만, 이 방법 외에는 대안이 없을 때 사용한다.

## 문법

```js
let func = new Function ([arg1, arg2, arg3 ...], functionBody);
```

새로 만들어지는 함수는 인수 `arg1...argN`과 함수 본문 functionBody로 구성된다.

한번 만들어 보자.

```js
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

인수가 없고 함수 본문만 있는 함수를 만들어 보자.

```js
let sayHi = new Function('alert("hi")');

sayHi();
```

기존에 사용하던 방법과 `new Function`을 사용해 함수를 만드는 방법의 가장 큰 차이는 런타임에 받은 문자열을 사용해 함수를 만들 수 있다는 점이다.

함수 표현식과 함수 선언문은 개발자가 직접 스크립트를 작성해야만 함수를 만들 수 있었다.

그러나 `new Function`이라는 문법을 사용하면 어떤 문자열도 함수로 바꿀 수 있다. 서버에서 전달받은 문자열을 이용해 새로운 함수를 만들고 이를 실행하는 것도 가능하다.

```js
let str = ...

let func = new Function(str)
func();
```

서버에서 코드를 받아서 동적으로 코드를 구성해야 하는 아주 특별한 경우, 이 문법을 사용할 수 있다.

## 클로저

함수는 특별한 프로퍼티 `[[Environment]]`에 저장된 정보를 이용해 자기 자신의 위치를 기억한다.

`[[Environment]]`는 함수가 만들어진 렉시컬 환경을 참조한다.

그런데 `new Function`으로 함수를 만들면 함수의 `[[Environment]]` 프로퍼티가 현재 렉시컬 환경이 아닌 전역 렉시컬 환경을 참조하게 된다.

따라서 `new Function`을 이용해 만든 함수는 외부 변수에 접근할 수 없고, 오직 전역 변수에만 접근할 수 있다.

```js
function f() {
    let value = "test";
    let func = new Function('alert(value)');
    return func
}
f()(); // Uncaught ReferenceError: value is not defined
```

value (외부 변수)에 접근하지 못하는 것을 볼 수 있다.

```js
function getFunc() {
  let value = "test";

  let func = function() { alert(value); };

  return func;
}

getFunc()(); // getFunc의 렉시컬 환경에 있는 값 "test"가 출력됩니다.
```

지금 당장은 이걸 왜 쓰는지 와닿지 않을 수 있지만, 실무에선 이 기능이 아주 유용하게 쓰인다.

문자열을 사용해서 함수를 만들어야 한다고 가정해 보자. 스크립트 작성 시점에는 어떻게 함수를 짤지 알수 없어서 기존의 함수 선언 방법은 사용하지 못하는데, 스크립트 실행 시점 즈음엔 함수를 어떻게 짜야 할 지 아이디어가 떠오를 수 있을 것이다. 이때, 서버를 비롯한 외부 출처를 통해 코드를 받아올 수 있다.

## 압축기 (아직 모르는 개념이라 Pass)



## 요약

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

인수를 한꺼번에 모아 전달할 수도 있다.

아래의 세 선언 방식은 모두 동일하다. eval 같구만...

```js
new Function('a', 'b', 'return a + b'); // 기본 문법
new Function('a,b', 'return a + b'); // 쉼표로 구분
new Function('a , b', 'return a + b'); // 쉼표와 공백으로 구분
```

