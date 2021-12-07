# Execution Context

scope, hoisting, closure와 같은 개념을 이해하기 위한 기초, 실행 컨텍스트에 대해 알아보겠습니다.

아래와 같은 순서로 진행하겠습니다.

## 1. Record로 JS 호이스팅 이해하기

실행 컨텍스트에는 `Record, Outer`라는 개념이 존재합니다.

`Record`는 정확히 `Environment Record`, `Outer`는 `Environment Reference - 바깥(Lexical Environment)을 가리킴`를 의미합니다.

호이스팅이 일어나는 이유는 `생성 단계 Creation Phase`에 자바스크립트 엔진이 먼저 전체 코드를 스캔하면서 변수 같은 정보를 실행컨텍스트 어딘가에 미리 기록해놓기 때문입니다. 이때 기록해 놓는 곳이 바로 Record, 정확히는 `Environment Record(식별자와 식별자에 바인딩된 값을 기록)`입니다.

### Variable Hoisting



### Function Hoisting

함수 선언문의 경우, JS 엔진이 함수의 선언과 동시에 완성된 함수 객체를 생성해서 환경 레코드에 기록해 둡니다.

## 2. Outer로 JS 스코프체이닝 이해하기

`식별자 결정 Identifier Resolution`

## 3. Execution Context 정리

코드를 실행하는데 필요한 환경을 제공하는 객체. 코드를 실행할 때 식별자 결정을 더욱 효율적으로 하기 위한 수단

