# django hashtag

related : django-webex/django_hashtag

###  컨텐츠에서 #로 시작하는 부분을 해시태그로 가져오기

### 해시태그와 게시글은 M : N 관계

- article에 MtoM 필드 만들기

## models.py

```python
class Hashtag(models.Model):
    content = models.TextField(unique=True)

    def __str__(self):
        return self.content

class Article(models.Model):
    hashtags = models.ManyToManyField(Hashtag, blank=True)
```

## views.py

해시태그를 중복 처리할때 어떻게 하는가?

```
# 해시태그 중복을
# if word not in Hashtag.objects.all()로 체크??
# ㄴㄴㄴ
# 생성 혹은 조회로 한다.
# 반환되는 값을 (Object, Boolean)으로
hashtag, created = Hashtag.objects.get_or_create(content=word)
print(hashtag, created)
```

## UPDATE

해시태그를 수정했을 때, clear하면서 remove까지 해 줘야 하는가?

ㄴㄴ. 다른 관계와 엮여 있을 수 있기 때문에 함부로 건드리면 안된다.

## SEARCH

해시태그로 검색하기 위해서는 필터가 필요한데, 적당한 것이 없다. 그렇다면 뭘로 만들어야 할까?

make_filter를 직접 만든 후, load한다.

## 과제

해시태그를 여러개 달면 새로 글을 생성할때 제대로 해시태그가 안생기는데, 이걸 어케 해결할거신가..!