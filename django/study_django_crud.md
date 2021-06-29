# Django_CRUD

[TOC]

## CREATE

### 1. 인스턴스를 생성하는 방법

```
article = Article()
article.title = ''
article.content = ''
article.save()
```

### 2. 인스턴스를 생성할때 값까지 동시에 넣기

```shell
article = Article(title='', content='')
article.save()
```

### 3. Create()

알아서 save()까지 되고, 리턴값이 존재한다.

```shell
Article.objects.create(title='', content='')
```

## READ

쉘이 시작되면 이전의 인스턴스들은 다 날아간다.

### 1. all() : Methods that return new querysets

### 2. get()

```shell
Article.objects.get(pk=1)
```

- 객체가 없으면 DoesNotExist 에러 발생
- 객체가 여러개일 경우 MultipleObjectsReturned 에러 발생
- 위와 같은 특징을 가지기 때문에 unique 혹은 NOT NULL 특징을 가진 pk같은 겨웅에만 사용

### 3. filter()

- 지정된 매개변수와 일치하는 모든 개체를 쿼리셋으로 리턴.

### # Field lookups

- 조회 시 특정 조건을 적용시키기 위해 사용
- QuerySet Method(get, filter, exclude)에 대한 키워드 인수로 사용됨

```shell
# django가 content에 포함된 모든 인스턴스 리턴
Article.objects.filter(content__contains='django')
# pk가 1보다 크거
Article.objects.filter(pk__gt=1)
```

