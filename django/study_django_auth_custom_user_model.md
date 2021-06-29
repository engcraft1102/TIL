# Django Auth - Custom UserModel

## Substituting a custom User model (커스텀 유저 모델로 대체하기)

- 일부 프로젝트에서는 built-in User model이 제공하는 인증 요구사항이 적저랗지 않을 수 있음

새 술은 새 부대에, 새로운 프로젝트에는 커스텀 유저 모델 사용이 권장된다.

User와 관련된 application의 models.py에 AbstractUser를 상속받아 클래스를 생성한 뒤,

settings.py에 AUTH_USER_MODEL을 선언해 두면 된다.

- django는 custom model을 참조하는 AUTH_USER_MODEL 설정을 제공하여 기본 user model을 오버라이딩 할 수 있도록 함

**주의!!**

`첫번째 makemigrations를 하기 전, 즉 db를 만들기 전에 무조건!! 먼저 커스텀해야 한다.`

### AUTH_USER_MODEL

- User를 나타내는데 사용하는 모델
- 기본값은 auth.User
- 주의 사항
  - 프로젝트가 진행되는 동안 변경할 수 없음 (엄청난 노력 필요)
  - 프로젝트 시작 시 설정하기 위한 것이며, 참조하는 모델은 첫번째 마이그레이션에서 사용할 수 있어야 함

**AbstractBaseUser & AbstractUser**

- AbstractBaseUser
  - 기본적으로 pw와 last_login만 제공
  - 자유도가 높지만 다른 필드를 다 작성해야 해서 번거로움
- AbstractUser
  - 관리자 권한과 암께 완전한 기능을 갖춘 사용자 모델을 구현하는 기본 클래스

### 처음으로 커스텀한 뒤에

signup을 해 보면 아래의 에러를 만날 것이다.

```
AttributeError at /accounts/signup/
Manager isn't available; 'auth.User' has been swapped for 'accounts.User'
```

django github 자체에 Meta 

전체적인 User가 사용하는 모델은 auth.User인데, Manager가 accounts.User로 바뀌었기 때문이다.

docs를 보면 아래의 form들은 기본 클래스인 User에 tied 되어 있기 때문에 재정의 해줘야 한다.

- UserCreationForm
- UserChangeForm

즉, 현재 CustomUserCreationForm 단계에서 걸린 것이다. 

CustomUserChangeModel에서 model을 User로 직접참조하지 않고, get_user_model로 활성화된 User Model을 참조하게 시켰던 것을 기억하는가? 이렇게 했었던 이유를 이제 알았다.

Django 쪽에서, 제발 User를 직접참조 하지 말라고 하는 이유가 이것이다.

## 1:N with User

### Referencing the User model (유저 모델 참조하기)

- `settings.AUTH_USER_MODEL` - 문자열 'accounts.User'
  - 유저 모델에 대한 외래 키 또는 M:N 관계를 정의할 때 사용
  - 즉, models.py에서 유저 모델을 참조할 때에 '만' 사용
  - 모델 단계에서는 앱을 구동시키는 도중 get_user_model()로 객체를 리턴할 수 없는 상황이 있기 때문에 문자열을 사용해서 외래 키를 지정하는 것이다.
- `get_user_model()` User 객체
  - django는 User 모델을 직접 참조하는 대신 get_user model()을 사용하여 사용자 모델을 참조하라고 권장
  - 현재 활성화(active)된 유저 모델(지정된 커스템 유저 모델, 없을 경우 User) 리턴
  - 즉, models.py가 아닌 모든 곳에서 유저 모델을 참조할 때 사용

## Foreign Key

인자 : 참조할 모델, 데이터 무결성을 위한 on_delete 옵션

외래키는 테이블에 만들어 질 때, 변수명을 바탕으로 만들어진다.

변수명_id의 규칙으로 만들어진다.