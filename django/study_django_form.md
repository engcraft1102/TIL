# Form

[TOC]

## Django의 2가지 HTML input 요소 표현 방법

### 1. Form fields

input에 대한 유효성 검사 로직을 처리하며 템플릿에서 직접 사용됨

### 2. Widgets

웹 페이지의 HTML input element 표현, 렌더링 및 제출(submitted)된 원시 데이터 추출을 처리

### form-control

form을 나타낼 때 필수적인 속성

# ModelForm Class

- model을 통해 Form Class를 만들 수 있는 Helper

- 일반 Form Class와 완전히 같은 방식(객체 생성)으로 View에서 사용 가능

- Meta Class in ModelForm
  - Model의 정보를 작성하는 곳
  - 해당 model에 정의한 field 정보를 Form에 적용하기 위함

```python
from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        # 모든 정보를 한줄로 가져올 수 있음
        fields = '__all__'
```

### is_valid()

유효한 데이터인지 검사하는 메서드

Integer Type인데 Text로 들어오거나, max length를 초과한 길이의 Char가 들어오는 것과 같은 경우를 배제한다.

```python
if request.method == 'POST':
        form = ArticleForm(request.POST) # 모델폼에 클라이언트가 넘긴 정보를 넣어줌
        if form.is_valid(): # 유효성 검사를 통과한다면
```

뭐, modelform 클래스를 사용해서 아래와 같이 input form을 만든다면 잘못된 인풋이 들어올 확률이 희박하겠지만.

```html
{{ form.as_p }}
{{ form.as_ul }}
{{ form.as_table }}
```

