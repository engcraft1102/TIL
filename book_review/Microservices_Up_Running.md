# 처음 시작하는 마이크로서비스

## 책을 읽기 전에 👀

스타트업, 대기업을 가리지 않고 다양한 조직에서 마이크로서비스 아키텍처를 적용하고 있습니다. 자연히 관련 생태계도 커지고, 개발 쪽을 공부한다면 당연히 알고 있어야 하게 되었습니다.

DevOps 엔지니어라는 말이 생소하지 않은 지금입니다. 본인이 다루지 않더라도 개발업계 전반에서 널리 사용하는 기술인 만큼, 깊게 알아보고 싶어서 이 책을 골랐습니다.

<img src="https://blog.kakaocdn.net/dn/Z2b65/btrfsd6nuTb/rIdnfd5P0q7sO7oMNFwyr1/img.jpg" alt="img" style="zoom:50%;" />

그럼 모놀리식 아키텍처와 비교되곤 하는 마이크로서비스 아키텍처란 무엇일까요? 책을 읽기 전에 먼저 찾아보았습니다.

### 모놀리식 vs 마이크로서비스

![img](https://blog.kakaocdn.net/dn/bTGN3s/btrfrdLDhEo/hecFRRDxOYhoFExC5K7770/img.jpg)

#### 모놀리식

- 장점
  - 단일 코드 베이스로 서비스의 환경이 복잡하지 않다.
  - end-to-end 테스트가 용이하다
    - end-to-end(E2E) 테스트: 개발물을 사용자 관점에서 테스트 하는 방법. 텍스트가 제대로 출력되는지, 버튼을 클릭하면 올바르게 동작을 수행하는지 등을 테스트한다.
- 단점
  - 한 프로젝트의 덩치가 너무 커져서 어플리케이션 구동, 빌드, 배포 시간이 길어진다.
  - 작은 수정사항을 반영하더라도 전체를 다시 빌드하고 배포해야 한다.
  - 유지보수가 힘들다.
  - 전체적으로 이어져 있기 때문에 기능별로 알맞는 기술, 언어, 프레임워크를 선택하기가 까다롭다.
  - 일부의 오류가 전체에 영향을 미친다.

#### 마이크로서비스

- 장점
  - 작업을 서비스 단위로 나누어 할 수 있어 개발자가 해당 부분을 온전히 이해할 수 있다.
  - 수정사항에 연관된 서비스만 빠르게 빌드, 배포가 가능하다.
  - 해당 기능에 적절한 기술, 언어, 프레임워크를 선택할 수 있다.
  - 일부의 오류가 전체에 영향을 미치지 않는다.
- 단점
  - 관리가 힘들다. 작은 서비스 여러개로 분산되어 있기에 모니터링이 힘들다.
  - 서로를 호출하여 전체 서비스가 이루어지는 방식이기 대문에 모놀리식 아키텍처보다 개발이 까다롭다.
  - 마이크로서비스들끼리 계속 통신하다 보니 통신관련 오류가 잦을 수 있다.
  - 테스트가 불편하다. 간단한 E2E 테스트를 위해 여러 개의 마이크로서비스를 구동시켜야 한다.

### 마이크로서비스란 무엇인가?

마이크로서비스의 공식적인 정의는 없지만, 한 세미나에서는 아래와 같이 설명했습니다.



마이크로서비스는 단일 애플리케이션을 작은 규모의 서비스 조합으로 나눠 개발하는 방식이다. 각 서비스는 자체 프로세스로 실행되며 가벼운 메커니즘으로 통신한다. 비즈니스 기능을 중심으로 구축되며 완전 자동화된 배포 기계를 통해 독립적으로 배포할 수 있다.



반면 **Microservice Architecture(O'Reilly, 2016)**에서는 다음과 같이 정의합니다.



마이크로서비스는 제한된 범위의 독립적으로 배포 가능한 구성 요소이며 메시지 기반 통신으로 상호 운용성을 지원한다. 마이크로서비스 아키텍처는 높은 수준으로 자동화된 엔지니어링 스타일이며 기능별 마이크로서비스로 구성된 진화할 수 있는 소프트웨어 시스템이다.



그 외에도 다양한 정의가 있습니다. 대체로 유사하지만 각 정의마다 강조하는 부분이 조금씩 다르며, 따라서 교과서적인 마이크로서비스 시스템을 잘 구축했는지에 대한 판단은 어렵습니다.

이 책에서 소개하는 **마이크로서비스**라는 기술의 이름은 다음과 같은 세 가지 일반적인 설계 특성이 있는 소프트웨어 아키텍처 스타일을 의미합니다.

1. 애플리케이션 아키텍처는 주로 네트워크에서 호출할 수 있는 **서비스**로 구성된다.
2. 서비스의 크기(또는 경계)는 중요한 설계 요소다. 설계 요소는 런타임, 설계 시간, 사람을 포함한다.
3. 목표를 달성하기 위해 소프트웨어 시스템, 조직, 일하는 방식을 전체적으로 최적화한다.

### 실습으로 MSA 입문하기

비대면으로 협업하는 경우도 많고, git과 같은 형상관리 도구가 일반화됨에 따라 개발자들은 각자가 담당하는 서비스를 온전히 파악하고 다른 서비스와 소통하는 역량이 중요해지고 있습니다.

개인적으로도 AWS와 Docker를 프로젝트에 적용해 보며 MSA의 장점을 느꼈습니다. 다만 MSA가 제공하는 이점을 얻으려면 많은 선행 작업이 필요합니다. **Docker**를 사용한다면 배포 모델은 무엇으로 하고, 개발과 릴리즈의 주기는 어떻게 할 것인지 등, 다양한 복잡성 때문에 MSA의 설계는 어렵습니다. 기능을 컴포넌트화해서 구현하다 보면 '이게 후에 기술 부채가 되지 않을까?' '이렇게 구조를 짜면 나중에 더 불편해져서 갈아엎게 되지는 않으려나' 걱정하는 것처럼, 광범위하게 퍼져 있는 기술에 대한 지식과 적용을 직접 하나하나 실습하면서 정리하는 것은 쉽지 않은 일입니다. 이 문제를 어떻게 해결할 수 있을까요?

그런 면에서 어디서 들어본 것들을 종합선물 실습세트의 교보재로 사용하는 이 책은 좋은 가이드입니다. 예제의 난이도도 높지 않고, 어렵게만 느껴지는 다양한 기술들을 차근차근 따라하며 입문할 수 있습니다. 새로운 기술을 적용할 때마다 겪게 되는 수많은 시행착오와 예외처리, 오류의 수를 줄이는 방법이 될 것입니다.

볼륨이 제법 크기 때문에 이 글에는 실습 내용이 포함되어 있지 않습니다. 대신 깃허브 Action으로 배포했던 저의 간단한 Vue 프로젝트와, 해당 책의 예제에서 적용해 볼 수 있는 기술에 대해 정리해 두겠습니다.

MSA의 구현이 막막하거나, 아래 기술들을 실제로 사용해 보고 싶으셨던 분께 이 책이 좋은 입문서가 될 것이라고 생각합니다.



### 예제를 실습하기 위해 필요한 기술

- 도커
- 레디스
- MySQL
- 깃허브
- 깃허브 액션
- 테라폼
- AWS
- kubectl
- 헬름
- Argo CD

### 깃허브 액션 실습 repository

[[Github Action - Vue](https://github.com/Gomyo/vue-devops)](https://github.com/Gomyo/vue-devops)



본 글에 대한 오류 지적은 언제나 환영입니다. 읽어주셔서 감사합니다.