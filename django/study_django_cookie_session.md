# Django cookie, session - login, logout

related : django-live/05_django_auth

### 0. settings.py

settings.py에 쿠키의 지속시간 관련 변수를 설정한다.

```python
DAY_IN_SECONDS = 86400
SESSION_COOKIE_AGE = DAY_IN_SECONDS
```

**base.html에서 request.user를 어떻게 가져올 수 있는 것인가?**

- settings.py > TEMPLATES > OPTION 에 request 와 관련된 processor가 포함되어 있기 때문이었다.

  ```
  'django.contrib.auth.context_processors.auth',
  ```


## 1. login

## 2. logout

## 3. Signup

## 4. Delete

## 5. Update

abstract class를 Custom해서 user model을 사용해야 한다.

## 6. Change Password

비밀번호를 바꾸면, session 값이 달라져서 로그인이 풀리게 된다.

1. django.contrib.auth import update_session_auth_hash를 통해, 세션이 무효화되는 것을 막음으로써 해결할 수 있다.
2. 비밀번호를 로그인을 했을 때 다시 자동으로 로그인을 하도록 코드를 짠다.

