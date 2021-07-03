# JavaScript Async와 Await

[toc]

## async & await는 뭐임?

JS의 비동기 처리 패턴 중 가장 최근에 나온 문법이다. 기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 읽기 좋은 코드를 작성하기에 좋은 문법!

### 개발자에게 읽기 좋은 코드가 뭔데?

```js
var user = {
  id: 1,
  name: 'Josh'
};
if (user.id === 1) {
  console.log(user.name); // Josh
}
```

이렇게 위에서 아래로 한줄한줄 차근차근 읽으면서 사고하는게 편하다. 왜냐면 이렇게 배웠으니까.

### 그래서 읽기 좋은 코드와 async & await가 무슨 상관임?

```js
var user = fetchUser('domain.com/users/1');
if (user.id === 1) {
  console.log(user.name);
}
```

`fetchUser`라는 메서드를 호출하면 앞에서 봤던 코드처럼 사용자 객체를 반환한다고 해보자. 그리고 여기서 `fetchUser` 메서드가 서버에서 사용자 정보를 가져오는 HTTP 통신 코드라고 가정한다면 위 코드는 async & await 문법이 적용된 형태라고 보면 된다.

## async 함수

function 앞에 `async`를 붙이면 해당 함수는 항상 프로미스를 반환한다. 프로미스가 아닌 값을 반환하더라도 이행 상태의 프로미스(resolved promise)로 값을 감싸 이행된 프로미스가 반환되도록 한다.

```js
async function f() {
  return 1;
}

f().then(alert); // 1
```

명시적으로 프로미스를 반환하는 것도 가능한데, 결과는 동일하다.

```js
async function f() {
    return Promise.resolve(1);
}

f().then(alert);
```

또 다른 키워드 `await`라는 아주 `awesome`한 친구를 살펴보자.

## await

`await` 문법은 다음과 같다.

```js
// await는 async 함수 안에서만 동작합니다.
let value = await promise;
```

자바스크립트는 `await` 키워드를 만나면 프로미스가 처리(settled)될 때까지 기다린다.

1초 후 이행되는 프로미스를 예시로 사용하여 await가 어떻게 동작하는지 살펴보자.

```js
async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('완료!'), 1000)
    });
    let result = await promise;
    console.log(result);
}
f();
```

`await`는 말 그대로 프로미스가 처리될 때까지 함수 실행을 기다리게 만든다. 프로미스가 처리되면 그 결과와 함께 실행이 재기된다. 프로미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트 실행, 이벤트 처리)을 할 수 있기 대문에, CPU 리소스가 낭비되지 않는다.

`await`는 `promise.then`보다 좀 더 세련되게 프로미스의 result 값을 얻게 해 주는 문법이다. 가독성도 좋다.

### await는 최상위 레벨 코드에서 작동하지 않는다.

await는 아래와 같은 상황에서 동작하지 않는다.

```js
// 최상위 레벨 코드에선 문법 에러가 발생함
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

하지만 익명 async 함수로 코드를 감싸면 최상위 레벨 코드에도 사용할 수 있기는 하다.

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

### await는 `thenable` 객체를 받는다. (아직 잘 모르겠음. 추가 필요...)

promise.then처럼 await에도 thenable 객체(then 메서드가 있는 호출 가능한 객체)를 사용할 수 있다.

thenable 객체는 서드파티 객체가 프로미스가 아니지만 프로미스와 호환 가능한 객체를 제공할 수 있다는 점에서 생긴 기능이다. 서드파티에서 받은 객체가 `then`을 지원하면 이 객체를 await와 함께 사용할 수 있다.

## async await 맛보기

앞에서 살펴본 코드를 감싸보자.

```js
function logName() {
  var user = fetchUser('domain.com/users/1');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```

여기서 async await를 적용하면?

```js
async function logName() {
    var user = await fetchUser('domain.com/users/1');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```

이게 왜 편하냐면, 콜백으로 비동기 코드를 작성하는 것에 비해 훨씬 보기 편하기 때문이다. 콜백으로 써 볼까?

```js
function lobName(callback) {
    fetchUser('url', function(user) {
        if (user.id === 1) {
			callback(user)
	    }
    })
}
// 
logName(function(user) {
    console.log(user)
})
```

## async await 기본 문법

이제 async await의 기본 문법을 알아보자.

```js
async function FUNCION_NAME() {
    await ASYNCRONOUS_METHOD_NAME();
}
```

먼저 함수 앞에 `async` 예약어를 붙인다. 그리고 나서 함수의 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 `await`를 붙인다. 여기서 주의할 것은, 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 await가 의도한 대로 동작한다.

일반적으로 `await`의 대상이 되는 비동기 처리 코드는 Axios 등 프로미스를 반환하는 API 호출 함수이다.

## async await 간단 예제

```js
function fetchItems() {
    return new Promise(function(resolve, reject) {
        var items = [1,2,3];
	    resolve(items);
    });
}

async function logItems() {
    var resultItems = await fetchItems();
    console.log(resultItems)
}
```

## async await 예외 처리

예외 처리 방법은 바로 `try catch`다. 프로미스에서 `catch()`를 사용했듯 async에서는 `catch {}`를 사용하면 된다.

프로미스가 거부되면 마치 `throw` 문을 작성한 것처럼 에러가 던져진다.

```js
async function f() {
    await Promise.reject(new Error("errrrr"));
}
```

위 코드는 아래와 동일하다.

```js
async function f() {
  throw new Error("에러 발생!");
}
```

실제 상황에는 프로미스가 거부되기 전에 시간이 지체되는 경우가 있다. 이런 경우엔 await가 에러를 던지기 전에 지연이 발생하는 경우가 있다. 그런데 문법 제약 때문에 async 함수 바깥의 최상위 레벨 코드에서는 await를 사용할 수 없다. 그렇기 때문에 관행처럼 then, catch를 추가해 최종 결과나 처리되지 못한 에러를 다룬다.

그러니 catch로 잡아주자.

```js
async function f() {
    try {
        let res = await fetch('wrong url');
    } catch(err) {
        alert(err)
    }
}

f();
```

이렇게 잡기도 한다.

```js
async function f() {
    let res = await fetch('wrong');
}

f().catch(alert)
```

### 여러 개의 프로미스 처리 with Promise.all

여러 개의 프로미스가 모두 처리되길 기다려야 하는 상황이라면 이렇게 하면 된다.

```js
let result = await Promise.all([
    fetch(url1),
    fetch(url2),
    ...
])
```



## 요약

fucntion 앞에 async 키워드를 추가하면 두 가지 효과가 있다.

1. 함수는 언제나 프로미스를 반환한다.
2. 함수 안에서 `await`를 사용할 수 있다.

프로미스 앞에 `await` 키워드를 붙이면 자바스크립트는 프로미스가 처리될 때까지 대기한다. 처리가 완료되면 조건에 따라 아래와 같은 동작들이 이어진다.

1. 에러 발생 - 예외 생성 (throw error와 동일함)
2. 에러 미발생 - 프로미스의 result 값 반환

# 과제

## async와 await를 사용하여 코드 변경하기

```js
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```

위의 것을 바꿔보자.

```js
async function loadJson(url) {
    let response = await fetch(url);
    
    if (response.status == 200) {
        return response.json();
    }
    throw new Error(response.status);
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```

## 다시 던지기 예시 재작성하기

```js
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

// 유효한 사용자를 찾을 때까지 반복해서 username을 물어봄
function demoGithubUser() {
  let name = prompt("GitHub username을 입력하세요.", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`이름: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("일치하는 사용자가 없습니다. 다시 입력해 주세요.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

고치기!

```js
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
    let response = await fetch(url);
    
    if (response.status == 200) {
        return response.json();
    }
    throw new HttpError(response);
}

async function demoGithubUser() {
    let user;
    while (true) {
        let name = prompt("Enter Github username", "gomyo");
        try {
            user = await loadJson(`https://api.github.com/users/${name}`)            
            break;
        } catch(err) {
            if (err instanceof HttpError && err.response.status == 404) {
                // 얼럿 창이 뜬 이후에 반복문은 계속 돕니다.
                alert("일치하는 사용자가 없습니다. 다시 입력해 주세요.");
            } else {
                // 알 수 없는 에러는 다시 던져집니다.
                throw err;
            }
        }
    }
	alert(`이름: ${user.name}.`);
    return user;
}
demoGithubUser();
```



## async가 아닌 함수에서 async 함수 호출하기

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...코드...
  // async wait()를 호출하고 그 결과인 10을 얻을 때까지 기다리려면 어떻게 해야 할까요?
  // f는 일반 함수이기 때문에 여기선 'await'를 사용할 수 없다는 점에 주의하세요!
    
  // 요렇게
  wait().then(result => console.log(result));
}
```

