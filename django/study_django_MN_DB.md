# ManyToManyField

[TOC]

related: django-live/08

## 병원 진료 시스템 구상

- 병원에 내원한는 환자와 의사의 관계를 DB로 구성해 보기

doctor1을 부모 테이블로 가지는 patient1가 doctor2를 방문하고 싶어졌을 때, 바꾸는 것이 안되므로 새로운 patient3 객체를 생성해야 한다.

두명의 의사에게 방문하고 싶다면 어떻게 해야 할까?

```shell
patient4 = Patient.objects.create(name='harry', doctor=doctor1, doctor2)
```

안된다.

### 중개 모델 (Reservation)

M : N 관계의 방문을 위해서는 중개 모델(Reservation) 이 필요하게 된다.

```python
class Reservation(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.doctor_id}번 의사의 {self.patient_id}번 환자'
```

그런데 번거롭다. 바로 참조는 안될까?

### ManyToManyField

```python
class Patient(models.Model):
    name = models.TextField()
    doctors = models.ManyToManyField(Doctor)

    def __str__(self):
        return f'{self.pk}번 환자 {self.name}'
```

mtm 필드 칼럼을 만들면, DB에 hospital_patient_doctors 칼럼이 만들어진다.

이제 patient.doctors.all()이 가능하며 doctors에 추가하기 위해서는 patient1.doctors.add(doctor1)이 가능하다.

환자1이 의사1에게 방문예약을 했다는 의미가 된다.

그럼 의사가 환자를 조회하는건 무엇인가? 1:N역참조가 된다.

###  Read

`doctor.patient_set.all()`로 조회하면 된다. 

### Create

관계 추가는 환자와 동일하다. 매니저만 다르고 메소드는 같음

`doctor1.patient_set.add(patient2)`

### Delete

`doctor1.patient_set.remove(patient2)`

### 부모테이블 모델 매니저 이름변경

related_name

`doctors = models.ManyToManyField(Doctor, related_name='patients')`

## Related manager

- 1:N 또는 M:N 관련 컨텍스트에서 사용되는 매니저

- methods
  - 같은 이름의 메서드여도 각 관계에 따라 다르게 동작
  - 1:N에서는 target 모델 객체만 사용 가능 (src=자식, target= 부모)
  - add, create, remove, clear, set
    - add
      - 지정된 객체를 관련 객체 집합에 추가
      - 중복은 안됨
    - remove
      - 지정된 모델 객체 제거

- target model이 src model을 참조할 때 사용할 manager name
- ForeignKey의 related_name과 동일
- source model(instance)
  - 관계 필드를 가진 모델
- target model (instance)
  - source model이 관계 필드를 통해 참조하는 모델



### through

- django는 다대다 관계를 관리하는 중개 테이블을 자동으로 생성함
- 하지만 중개 테이블을 직접 지정하려면 thtrough 옵션을 사용하여 명명이 가능하다
- 일반적으로 추가 데이터를 다대다 관계와 연결하려는 경우 (extra data with a many-to-many relationship)에 사용

### 그런데 왜 User에 MtoM 필드를 지정하지는 않는 것일까?

어차피 똑같다면 User에 지정해도 되지 않는가? M:N일때는 되지만, 1:N의 경우까지 고려하면 안된다.

### exists

```python
if article.like_users.filter(pk=request.user.pk).exists():

# like_users 전체를 탐색해야 함
if request.user in article.like_users.all():
```

쿼리셋이 if문으로 평가가 될 때 (즉, DB로 쿼리가 날아갈 때에) 장고는 쿼리셋을 캐시 메모리에 저장한다.

저장을 해 두고, 같은 쿼리가 날아오면 그 쿼리를 재사용한다.

따라서 쿼리 셋이 많이 크다면 느려지게 되는데, exists는 평가를 할 때에 캐시 메모리를 사용하지 않기 때문이다. 필요한 정보만 딱 조회한다. 전체 조회가 필요하지 않은 경우라면 exist가 더 유용하다.

user라는 변수는 context로 넘기지 않는게 좋다.

## Follow

### Symmetrical

```python
from django.db import models

class Person(models.Model):
    friends = models.ManyToManyField('self')
```

- 위처럼 동일한 모델을 가리키는 정의의 경우 Person 클래스에 person_set 매니저를 추가하지 않음
- 대신 대칭적(symmetrical)이라고 간주하며, source 인스턴스가 target 인스턴스를 참조하면 target 인스턴스도 source 인스턴스를 참조하게 됨. 즉, 한쪽에서 참조하면 레코드가 하나 더 생김
- self와의 M:N관계에서 대칭을 원하지 않는 경우 symmetrical을 `False`로 설정
- Follow와 같이 유저간에 정보를 교환할 때에 사용

**팔로우는 대칭이 되면 안된다. 팔로우와 팔로워는 다른게 당연!**

**code**

```python
def profile(request, username):
    person = get_object_or_404(get_user_model(), username=username)
    context = {
        'person': person,
    }
    return render(request, 'accounts/profile.html', context)

@require_POST
def follow(request, user_pk):
    if request.user.is_authenticated:
        User = get_user_model()
        you = get_object_or_404(User, pk=user_pk)
        me = request.user
        # 나 자신은 팔로우할수 없음
        if you != me:
            # follow 신청
            if you.followers.filter(pk=me.pk).exists():
            # if request.user in person.followers.all():
                you.followers.remove(me)
            else:
                you.followers.add(me)
        return redirect('accounts:profile', you.username)
    return redirect('accounts:login')
```

## QuerySet's are Lazy

실제 쿼리셋을 만드는 작업에는 DB 작업이 포함되지 않음

```python
q = Entry.objects.filter(headline__startswith="What")
q = q.filter(pub_date__lte=datetime.date.today())
q = q.exclude(body_text__icontains="food")
print(q)
```

즉, 위 세개가 이루어지는동안 DB는 아무 일도 하지 않는다.

orm과 db의 관계에서, 쿼리셋 만드는 자체는 평가를 보내지 않는다.

위의 예제에서는 print(q)에서 평가가 된다. (이 때, hit the database, assess, query)

즉, 평가는?

- 쿼리를 DB로 날린다.
- 쿼리셋을 캐시로 만든다.

필터를 계속해서 쌓아 나가도 (chain) 그때마다 쿼리를 날리지 않기 때문에 

`q = Entry.objects.filter(headline__startswith="What").filter().filter()` 가 가능하다.

```python
# Iteration
# 쿼리셋은 반복 가능하며 처음 반복할 때 데이터베이스 쿼리를 실행(평가)
for e in Entry.objects.all():
	print(e.headline)
	
# bool
if Entry.objects.filter(title__'text'):
    pass

# 나쁜 예

`That means the same database query will be executed twice, effectively doubling your database load. Also, there’s a possibility the two lists may not include the same database records, because an Entry may have been added or deleted in the split second between the two requests.`

print([e.headline for e in Entry.objects.all()]) #평가
print([e.pub_date for e in Entry.objects.all()]) #평가

# 좋은 예
queryset = Entry.objects.all()
>>> print([p.headline for p in queryset]) # Evaluate the query set.
>>> print([p.pub_date for p in queryset]) # Re-use the cache from the 

# 캐시되지 않는 경우
queryset = Entry.objects.all()
>>> print(queryset[5]) # Queries the database
>>> print(queryset[5]) # Queries the database again

# 캐시되지 않는 경우를 방지하고 싶을 때
queryset = Entry.objects.all()
>>> [entry for entry in queryset] # Queries the database (전체 쿼리셋을 평가 시켜버림)
>>> print(queryset[5]) # Uses cache
>>> print(queryset[5]) # Uses cache
```

### 평가 이후

- 쿼리셋의 내장 캐시에 저장된다.
  - 같은 쿼리를 쓴다면 이미 평가된 내장 캐시의 쿼리를 사용할 수 있게 된다.

### likes 코드를 예시에 반영해보자

**Code**

```python
@require_POST
def likes(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user.is_authenticated:
        if article.like_users.filter(pk=request.user.pk).exists():
            article.like_users.remove(request.user)
        else:
            # 좋아요 누름
            article.like_users.add(request.user)
        return redirect('articles:index')
    return redirect('accounts:login')
```

**Before**

```python
like_set = article.like_users.filter(pk=request.user.pk)
if like_set: #평가
    # 쿼리셋의 전체 결과가 필요하지 않은 상황임에도 
    # ORM은 전체 평가를 했다.
    article.like_users.remove(request.user)
```

**After 1** 

```python
# exists() 쿼리셋 캐시를 만들지 않으면서 특정 레코드가 있는지 검사
if like_set.exists():
    # DB에서 가져온 레코드가 없다면
    # 메모리를 절약할 수 있다.
    article.like_users.remove(request.user)
```

**After 2**

```python
# 만약 IF 문 안에 반복문이 있다면?

# if에서 평가 후 캐싱
if like_set:
    # 순회할때는 위에서
    for user in like_set:
        print(user.username)
```

**After 3**

```python
# 만약 쿼리셋 자체가 너무너무 크다면?
# Iterator()
# 데이터를 작은 덩어리로 쪼개서 가져오고, 이미 사용한 레코드는 메모리에서 지운다.
# 전체 레코드의 일부씩만 DB에서 가져오므로 메모리를 절약한다.
if like_set:
    for user in like_set.iterator():
      	pass
# 그런데 쿼리셋이 너무 크다면 if 평가 자체가 버거우므로 exists 사용
if like_set.exists():
    for user in like_set.iterator():
```

