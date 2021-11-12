# 주요 OAuth 2.0 Endpoints

## state

- `Recommended 애플리케이션이 권한 부여 요청과 권한 부여 서버의 응답 사이의 상태를 유지하기 위해 사용하는 문자열 값을 지정합니다. `

  - XSRF 공격으로부터 방어하기 위한 인자입니다. 랜덤한 string 값을 애플리케이션에서 보내고, 인증 서버는 다시 이 값을 반환합니다. 만약 두 값이 다르다면? 다른 누군가가 request를 초기화했다는 뜻! 제 3자의 개입이 있었다는 증거가 됩니다.

- 파이썬의 `hashlib` 라이브러리를 사용해 `state: sha256 해시 객체`를 생성해서 사용했습니다.

  ```python
  import hashlib, os
  # Hash value for protect from xsrf attack
  state = hashlib.sha256(os.urandom(1024)).hexdigest()
  ```

  - `digest() hexdigest()`: 공급된 데이터의 연결에 대한 요약(digest) 요청

로그인 함수와 콜백 함수 양쪽에서 찍었을 때, 정상적인 요청이라면 아래와 같은 결과가 나타납니다. 로그인도 정상적으로 진행됩니다.

- `로그인 state :  2aff8f7fd202c62f3dab9a71f3d49750b51238e15c628a587b6aa4593ffe323a`

- `콜백 state :  2aff8f7fd202c62f3dab9a71f3d49750b51238e15c628a587b6aa4593ffe323a`

### references

[Stackoverflow](https://stackoverflow.com/questions/26132066/what-is-the-purpose-of-the-state-parameter-in-oauth-authorization-request)

[Hashlib docs](https://docs.python.org/ko/3.10/library/hashlib.html)

