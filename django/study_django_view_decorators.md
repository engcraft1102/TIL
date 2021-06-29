# Django View decorators

- decorator(데코레이터)
  - 어떤 함수에 기능을 추가하고 싶을 때, 해당 함수를 수정하지 않고 기능을 연장해주는 함수
  - django는 다양한 기능을 지원하기 위해 view 함수에 적용 할 수 있는 여러 데코레이터를 제공
- Allowed HTTP methods
  - 요청 메서드에 따라 view 함수에 대한 엑세스를 제한
  - 요청이 조건을 충족시키지 못하면 HttpResponseNotAllowed를 리턴
  - require_http_methods(), require_GET(), require_POST(), require_safe()

require_safe : GET or HEAD

이제 detail을 get으로 접근하면 405를 띄운다.

```
403 Forbidden
- 클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않다. token이 없어서 그럼.
404 Not Found 
- 서버는 요청받은 리소스를 찾을 수 없다. page가 없을 때. url이 제대로 되지 않았을 때
405 Method Not Allowd
- 요청한 메소드는 서버에서 알고 있지만 제거되었고 사용할 수 없다.
```



