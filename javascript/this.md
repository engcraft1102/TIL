# this

자바스크립트의 함수는 호출될 때, 매개변수로 전달되는 인자값 이외에 arguments 객체와 `this`를 암묵적으로 전달받는다.

```js
function square(n) {
    console.log(arguments) // Arguments [2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    console.log(this) // Window {0: global, 1: global, window: Window, self: Window, document: document, name: "", location: Location, …}
    
    return n * n;
}

square(2);
```

## 함수 호출 방식과 this 바인딩

자바스크립트의 경우 함수 호출 방식에 의해 `this`에 바인딩할 어떤 객체가 동적으로 결정된다. 

다시 말해, 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, `함수를 호출할 때 함수가 어떻게 호출되었는지에 따라` this에 바인딩할 객체가 동적으로 결정된다.

함수의 호출 방식은 다양하다

```js
var foo = function () {
    console.dir(this);
}

// 1.함수 호출
foo(); // window
// window.foo();

// 2.메소드 호출
var obj = {foo: foo};
obj.foo();

// 3.생성자 함수 호출
var instance = new foo(); // instance

// 4.apply/call/bind 호출
var bar = {name : 'bar'}
foo.call(bar);   // bar
foo.apply(bar);  // bar
foo.bind(bar)(); // bar
```

