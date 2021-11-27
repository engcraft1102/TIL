# Overloading, Overriding

[TOC]

## 오버로딩 (Overloading)

`같은 메소드 명에 파라미터의 수가 다르거나 타입이 다른 경우`

C언어에서는 함수명이 고유해야 합니다. 즉 하나의 함수가 하나의 기능을 해야 하는데, Java에서는 하나의 메소드 명으로 여러 개의 기능을 구현하는 방법이 있습니다. 이것이 오버로딩입니다.

`Overload 과적하다` 라는 뜻 그대로, 같은 이름을 가진 원래의 메소드에 파라미터를 추가하거나 변경하여 사용합니다. 특징을 명료하게 정리하면 아래와 같습니다.

1. MUST 파라미터가 바뀌어야 한다. (개수이든, 타입이든)
2. CAN 리턴 타입을 바꿀 수 있다.
3. CAN `접근 제어자 public, default, protected, private`를 바꿀 수 있다.

즉, 파라미터가 어떻게든 달라야 한다는 것입니다.

접근 제어자/리턴 값 중 하나만 다르게 지정해서는 오버로드가 불가능합니다.

### 오버로딩 예시

```java
public int calc(int d1, int d2) {
    return d1 + d2;
}
// overloading
private int calc(int d1, int d2, int d3) {
    return d1 + d2 + d2;
}
protected double calc(double f1, double f2) {
    return f1 + f2;
}

```

### 잘못된 오버로딩

```java
public int calc(int a, int b, int c) {}
// 매개변수가 완전히 같다면...
public String calc(int e, int f, int g) {}
// 에러 발생 :
// method calc(int, int, int) is already defined 
```

### 오버로딩을 사용하는 이유

**비슷한 기능을 하는 메소드를 하나의 함수명으로 선언할 수 있다.**

`printStream 클래스의 println()`이라는 메소드가 바로 오버로드의 대표적인 예시입니다. `println`의 인자로 어떤 데이터 타입을 넣어도 잘 출력이 되죠?

만약 `println`가 오버로딩되어 처리되지 않았다면, `printlnBoolean, printlnChar, printlnString...`등, 동일한 기능을 수행하는 다른 이름의 함수를 일일이 선언해야 하고, 기억해야 할 것입니다.

## 오버라이딩 (Overriding)

오버라이딩은 부모 클래스를 상속해서 메소드를 `변경 또는 재정의` 해서 사용하는 것입니다. 특징은 아래와 같습니다.

1. MUST 파라미터의 타입과 개수가 같아야 한다.

### 오버라이딩 예시

```java
class Person {
    void say() {
        System.out.println('나는 사람이다');
    }
}
class Adult extends Person {
    @Override
    protected void say() {
        System.out.println('나는 어른이다');
    }
}
class Child extends Person {
    @Override
    void say() {
        System.out.println('나는 아이다');
    }
}

public class Overrider {
    public static void main(String[] args) {
        Person person = new Person();
        Adult adult = new Adult();
        Child child = new Child();
    }
}
// 결과
나는 사람이다
나는 어른이다
나는 아이다
```

위와 같은 것이 오버라이딩입니다. 부모 클래스의 `say()` 메소드를 재정의해서 사용하고 있음을 볼 수 있습니다.

### 오버라이딩의 접근제어자

오버로딩이 모든 접근 제어자를 사용할 수 있는 것과 달리, 오버라이딩은 규칙이 있습니다.

1. 자식 클래스에서 오버라이딩하는 메소드의 접근 제어자는 부모 클래스보다 더 좁게 설정할 수 없다.
   1. 위에서 부모 클래스인 `Person`의 say 메소드의 접근제어자는 default로 설정되어 있습니다. 따라서 자식 클래스들은 default, protected, public 이 세 개의 접근 제어자만 사용할 수 있습니다.
   2. 예를 들어 부모 클래스의 접근 제어자가 public 일 때, 자식 클래스가 private인 경우에는 접근 권한이 축소된 경우라서 컴파일 시에 에러가 발생합니다.
2. 예외 (Exception)는 부모 클래스의 메소드보다 많이 선언할 수 없다.
   1. 부모 클래스보다 더 큰 범위의 예외를 throws 할 수 없습니다.
3. static 메소드를 인스턴스의 메소드로, 또는 그 반대로 바꿀 수 없다.
   1. 부모 클래스의 static 메소드를 자식에서 같은 이름으로 정의할 수 있지만, 이는 재정의가 아니라 같은 이름의 static 메소드를 새로 정의하는 것입니다.

### @Override는 무엇인가?

어노테이션(Annotation)으로, 일반적인 주석과 다르게 이게 오버라이딩 메소드임을 검증하는 기능을 합니다. 코드상으로 문제가 있어서 오버라이딩이 제대로 실행되지 않았다면 컴파일 시에 오류를 출력합니다. 오버라이드 어노테이션을 적재적소에 사용하면 실수를 방지할 수 있겠습니다.

## References

- https://hyoje420.tistory.com/14
- https://gmlwjd9405.github.io/2018/08/09/java-overloading-vs-overriding.html