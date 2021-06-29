# Callback

## 비동기 처리? 그게 뭔가요?

자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미합니다.

## 비동기 처리의 첫 번째 사례

비동기 처리의 가장 흔한 사례는 제이쿼리의 ajax입니다. 제이쿼리로 실제 웹 서비스를 개발할 때 ajax 통신을 빼놓을 수가 없습니다. 보통 화면에 표시할 이미지나 데이터를 서버에서 불러와 표시해야 하는데 이때 ajax 통신으로 해당 데이터를 서버로부터 가져올 수 있기 때문입니다.

```javascript
function getData() {
    var tableData;
    $.get('https://domain.com/products/1', function(response) {
        tableData = response;
    });
    return tableData;
}
console.log(getData()); // undefined
```

여기서 `$.get`이 ajax 통신을 하는 부분입니다. url에다가 HTTP GET 요청을 날려 1번 상품 정보를 요청하는 삘이 오죠.

그렇게 서버에서 받아온 데이터는 response 인자에 담깁니다. 그리고 tableData에 저장합니다. 그런데 왜 결과는 undefined로 찍힐까요?

그 이유는 **비동기로 받아오기 때문입니다!** 데이터를 받아올 때까지 기다려주지 않고 다음 코드인 return tableData를 실행했기 때문입니다.

**이렇게 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것이 비동기 처리입니다.** 자바스크립트에서 비동기 처리가 필요한 이유를 생각해보면, 화면에서 서버로 데이터를 요청했을 때 서버가 언제 그 요청에 답해줄지 모르는데 마냥 실행하지 않고 기다릴 수는 없기 때문입니다.

## 비동기 처리의 두 번째 사례

또 다른 비동기 처리 사례는 setTimeout()입니다. setTimeout()은 Web API의 한 종류입니다. 코드를 바로 실행하지 않고 지정한 시간만큼 기다렸다가 로직을 실행합니다.

```javascript
// #1
console.log('Hello');
// #2
setTimeout(function() {
	console.log('Bye');
}, 3000);
// #3
console.log('Hello Again');
```

비동기 처리에 대한 이해가 없는 상태에서 위 코드를 보면 아마 다음과 같은 결과값이 나올 거라고 생각할 겁니다.

- ‘Hello’ 출력
- 3초 있다가 ‘Bye’ 출력
- ‘Hello Again’ 출력

그런데 실제 결과 값은 아래와 같이 나오죠.

- ‘Hello’ 출력
- ‘Hello Again’ 출력
- 3초 있다가 ‘Bye’ 출력

setTimeout() 역시 비동기 방식으로 실행되기 때문에 3초를 기다렸다가 다음 코드를 수행하는 것이 아니라 일단 setTimeout()을 실행하고 나서 바로 다음 코드인 `console.log('Hello Again');`으로 넘어갔습니다. 따라서, ‘Hello’, ‘Hello Again’를 먼저 출력하고 3초가 지나면 ‘Bye’가 출력됩니다.

## 콜백 함수로 비동기 처리 방식의 문제점 해결하기

이러한 문제들을 어떻게 해결할 수 있을까요? 바로 콜백(Callback) 함수를 이용하는 것입니다. 앞에서 살펴본 ajax 통신 코드를 콜백 함수로 개선해보겠습니다.

```javascript
function getData(callbackFunc) {
	$.get('https://domain.com/products/1', function(response) {
		callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
	});
}

getData(function(tableData) {
	console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

## 비유로 이해하는 콜백 함수 동작 방식

콜백 함수의 동작 방식은 일종의 식당 자리 예약과 같습니다. 일반적으로 맛집을 가면 사람이 많아 자리가 없습니다. 그래서 대기자 명단에 이름을 쓰고 기다리죠. 그리고 전화가 옵니다. 이 전화를 받는 시점이 콜백 함수가 호출되는 시점과 같습니다.

자리가 났을 때만 연락이 오기 때문에 미리 가서 기다릴 필요도 없고, 직접 식당 안에 들어가서 자리가 비어 있는지 확인할 필요도 없습니다. 자리가 준비된 시점, 즉 데이터가 준비된 시점에서만 원하는 동작을 수행할 수 있습니다.

## 콜백 지옥

콜백 지옥은 뭐 아실 겁니다.

```javascript
$.get('url', function(response) {
	parseValue(response, function(id) {
		auth(id, function(result) {
			display(result, function(text) {
				console.log(text);
			});
		});
	});
});
```

웹 서비스를 개발하다 보면 서버에서 데이터를 받아와 화면에 표시하기까지 인코딩, 사용자 인증 등을 처리해야 하는 경우가 있습니다. 만약 이 모든 과정을 비동기로 처리해야 한다고 하면 위와 같이 콜백 안에 콜백을 계속 무는 형식으로 코딩하게 됩니다. 가독성이 매우 구리죠.

## 콜백 지옥을 해결하는 방법

일반적으로 콜백 지옥을 해결하는 방법에는 Promise나 Async를 사용하는 방법이 있습니다. 만약 코딩 패턴으로만 해결하려면 이렇게...

```javascript
function parseValueDone(id) {
	auth(id, authDone);
}
function authDone(result) {
	display(result, displayDone);
}
function displayDone(text) {
	console.log(text);
}
$.get('url', function(response) {
	parseValue(response, parseValueDone);
});
```