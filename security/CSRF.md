# CSRF(Cross Site Request Forgery) 란?

## 개요

![CSRF Example](CSRF.assets/csrf-cross-site-request-forgery.png)

사이트 간 공격 위조(CSRF, XSRF)는 사용자가 자신의 의지와 무관하게 공격자가 의도한 행위(수정, 삭제, 등록 등)를 특정 웹사이트에 요청하게 하는 공격을 말합니다.

유명 경매 사이트인 옥션에서 발생한 개인정보 유출 사건에서 사용된 공격 방식 중 하나입니다.

XSS가 사용자가 특정 웹사이트를 신용하는 점을 노린 것이라면, CSRF는 특정 웹 사이트가 사용자의 브라우저를 신용하는 상태를 노린 것입니다. 일단 사용자가 웹사이트에 로그인한 상태에서 CSRF 공격 코드가 삽입된 페이지를 열면 웹사이트는 `음... 인증된 사용자군. 이건 공격 명령이 아니겠지?` 하면서 당하게 됩니다.

## 공격 방법

옥션의 경우를 예로 들어 보겠습니다. 

1. 옥션 관리자가 로그인하여 관리 권한을 가진 후 악성 메일을 조회합니다.
2. 해커는 옥션의 주소 패턴을 파악한 상태입니다. 메일에는 `<img src="http://auction.com/changeUserAcoount?id=admin&password=admin" width="0" height="0">` 이런 정보가 숨겨져 있습니다. 이미지 크기가 0이기 때문에 메일에는 전혀 보이지 않습니다.
3. 관리자가 이메일을 연 순간, URL이 열립니다.
4. 관리자 계정의 id와 password가 모두 admin인 상태로 변경되어 버립니다.
5. 해커는 자유롭게 

## 방어 방법

### Referrer 검증

request header에 있는 요청의 referrer 속성을 검증하여 차단합니다.

같은 도메인이 아닌 경우 차단하는 것인데, `Paros, Zap, fiddler`같은 프로그램으로 조작이 가능한 부분이기 때문에 권장되지 않는 방법입니다.

### CSRF Token, CAPTCHA

패스워드 변경 같은 민감한 정보를 다룰 때에는 세션에 임의의 난수(토큰)를 발급하거나 CAPTCHA를 이용해서, 토큰이나 CAPTCHA 인증 코드가 없는 상황이라면 사용자가 의도한 동작이 아니라고 간주하고 서버 단에서 차단하는 방법이 있습니다.

### GET/POST의 구분

form 태그를 사용할 시 GET 방식을 지양하고 POST 방식을 쓰도록 하는 것은 기본이라고 할 수 있습니다. GET 요청으로 데이터를 넘기면 주소 패턴이 그대로 노출되게 되니까요.

## References

- [위키피디아](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%ED%8A%B8_%EA%B0%84_%EC%9A%94%EC%B2%AD_%EC%9C%84%EC%A1%B0)
- https://sj602.github.io/2018/07/14/what-is-CSRF/