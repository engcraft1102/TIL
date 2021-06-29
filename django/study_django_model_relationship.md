# Django model relationship

[TOC]



related = django-live/06

## 참조 - Comment 데이터 생성

- article

comment의 foreign key Field로 인해, comment.content만 지정하고 save()하려고 하면 안된다.

article_id, 외래키의 pk를 지정해 줘야 하기 때문이다. 장고에서는 comment.article_pk = article.pk가 아니라,

comment.article = article과 같이 넣어 버리면 된다.

```shell
# 1
article = Article.objects.get(pk=1)
comment.article = article

comment.save()
# 2
comment = Comment(content='댓글2', article=article)
comment.save()
```

## 역참조

- comment_set
- django에서는 역참조시 모델이름_set 형식의 manager를 생성

```shell
article = Article.objects.get(pk=1)
article.comment_set.all()
Out[2]: <QuerySet [<Comment: 댓글1>, <Comment: 댓글2>]>
```

### ForeignKey's Arguments - related_name

- django가 기본적으로 만들어 주는 _set manager(역참조 manager)를 변경할 이름 설정
- 1:N 관계에서는 거의 사용하지 않지만 M:N 관계에서는 반드시 사용해야 하는 상황이 발생

```python
class Comment(models.Model):
    article = models.ForeignKey(
        Article, 
        on_delete=models.CASCADE,
        related_name='comments'
    )
```

위와 같이 변경하면, article.comments.all()로 역참조가 가능해지게 된다.

### Comment Create

**views.py**

```python
@require_POST
def comments_create(request, pk):
    article = get_object_or_404(Article, pk=pk)
    comment_form = CommentForm(request.POST)
    if comment_form.is_valid():
        comment = comment_form.save(commit=False)
        comment.article = article
        comment.save()
        return redirect('articles:detail', article.pk)
    context = {
        'comment_form': comment_form,
        'article': article,
    }
    return render(request, 'articles/detail.html', context)
```

