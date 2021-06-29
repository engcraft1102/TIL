## [Django] ModelForm과 Form의 사용 차이

`UserCreationForm은 ModelForm이라서 request.POST 하나만 인자로 받습니다. 반면 AuthenticationForm은 Form이라서 form = AuthenticationForm(request, request.POST)의 형태로 받습니다.`

1. AuthenticationForm을 Form으로 받는 것은 UserCreationForm이 ModelForm을 사용하는 것과 무슨 차이가 있기 때문인지 궁금합니다. 둘 모두 method를 검사하고, POST로 정보를 받아오고, 후에 유효성도 검사하는 등 차이가 무엇인지 잘 모르겠습니다.

   ```
   ModelForm과 Form의 차이는 Model에 대한 정보를 필요로 하느냐 하지 않느냐의 차이이다.
   
   ModelForm은 class Meta에 model을 넣어서 정보를 끌어 오는 것이다.
   
   그럼 AuthenticationForm의 역할이 무엇인가? username과 password가 옳은지만 판단한다. 모델에 대한 정보가 필요하지 않은 것이다.
   ```

   

2. 위의 질문에 대해 찾아보다가 장고 깃허브에서 AuthenticationForm 함수`django.contrib.auth.forms - AuthenticationForm` 에서 초기화 함수를 살펴봤습니다. 여기서 request 를 받는 이유는 서브 클래스들에서 커스텀해서 사용할 경우를 위해서라고 나와 있는데,  UserChangeForm만 해도 커스텀해서 사용합니다.

```python
def __init__(self, request=None, *args, **kwargs):
        """
        The 'request' parameter is set for custom auth use by subclasses.
        The form data comes in via the standard 'data' kwarg.
        """
        self.request = request
        self.user_cache = None
```

```
AuthenticationForm에서 인증을 체크하는 것은 authenticate 메소드에서 username과 password를 사용해 이루어진다.
굳이 Model 정보가 필요 없이, username과 password 정보만 필요하기 때문에 장고 공식 문서에서 Form을 사용하는 것이다. 그리고 authenticate 함수 자체도 복잡하다.
request.POST에는 POST 방식으로 보낸 정보만 들어 있다. 따라서 단순히 text 형태로 보낸 데이터 말고도 Files 등의 데이터를 받거나, 인증 절차를 조금 더 복잡하게 하고 싶을 경우에는 요청 정보가 모두 들어 있는 request가 필요하기 때문에  
```

### UserChangeForm은 왜 ModelForm인가

바꿀 것이 많아서 model을 쓴다. default는 form이라고 생각하고, Model에 대한 정보가 필요하고, 모델이 가지고 있는 각종 field들이 필요하다면 ModelForm을 쓴다고 생각하자.



3. 지금까지의 수업 내용에서 Form을 사용할 경우에는 유효성 검사 후 cleaned_data를 사용하고, model에 연관되지 않는 데이터를 추가로 받을 수 있다고 했는데, 혹시 인증 폼은 POST method로 값을 받아오는 동시에 추가로 데이터를 넣는 등의 커스텀을 하는 경우가 많아서 Form을 사용한 것일까요?

- 그런 것 같다. 인증과 관련된 정보를 따로 받아서 작업하는 경우가 많은 듯 하다.

### 인증 과정에서 비밀번호를 체크하는 법

비밀번호를 raw_password 데이터로 받은 뒤, 해시화한다.

그리고 서버에 해시화되어 저장되어 있는 암호와 비교한 뒤, 같은지 비교한다.