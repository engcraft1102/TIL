# Static

```python
STATIC_URL = '/static/'
# DIRS는 이 경로에 있는 파일도 찾아보라는 것
STATICFILES_DIRS = [
    BASE_DIR / 'crud' / 'static'
]
# 어떠한 경우에도 하나인, 이곳으로 자료를 모으라는 의미
STATIC_ROOT = BASE_DIR / 'static'
```

### static images도 templates와 같다.

static/<app_name>/images 하위에 넣어 두고,

{% load static %} 으로 불러올 수 있다.

가져다 쓰는건 아래와 같이 하면 된다.

```
<img src="{% static 'articles/images/GoodbyeSimpson.gif' %}" alt="">
```

### static 자료들을 root/static 하위로 모두 모으는 명령어

```
python manage.py collectstatic
```

# Media : Upload image

Pillow를 install하게 된다.

models.py에 아래를 추가한다.

blank=True는 필드가 폼(입력 양식)에서 빈 채로 저장되는 것을 허용한다.

```
image = models.ImageField(blank=True)
```

이렇게만 해서는 업로드를 하지 못한다.

1. detail 페이지에서 보이도록 설정

2. image일 경우 form에서 enctype="multipart/form-data" 옵션을 주어야 한다.

3. views.py에서 모델을 저장할 때 옵션을 살짝 바꿔 줘야 한다.

   ```
   form = ArticleForm(request.POST, request.FILES)
   ```


그러나 이렇게 한다고 저장이 되는가? 되긴 되지만 경로가 잘못되었다.

MEDIA_ROOT, MEDIA_URL을 설정해 줘야 한다.

그리고 urlpatterns에 경로를 **추가**해줄거임.

```
# 이렇게 두줄을 추가로 import하고,
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('articles/', include('articles.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

upload는 어떻게 할 것인가?

models.py에서 upload_to를 사용해 path를 정해 주자.