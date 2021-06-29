# dumpdata

DB 관리를 더미 데이터로 할 때 사용하는 방법. sqlite로 관리하면 충돌이 나기 때문에 그렇다.

django-admin 대신 python manage.py를 사용

```shell
python manage.py dumpdata (--indent) movies.movie > movies.json
```

그리고 이 movies.json은 fixtures 폴더 하위에 넣어야 한다.

그리고 받는 입장에서는 loaddata를 쓴다

```shell
python manage.py loaddata movies/movies.json
```



## Flow

1. 선언 (models.py)
2. 구조 번역(makemmigrations)
3. migrate
4. dump (dumpdata / loaddata)