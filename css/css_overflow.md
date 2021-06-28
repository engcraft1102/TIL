# Review

## overflow 속성

![image-20210615005107112](post.assets/image-20210615005107112.png)

위 사진처럼 자신이 정한 범위를 텍스트가 넘어서는 경우, overflow 옵션을 설정해 주어야 한다.

내용의 요소의 크기를 벗어났을 경우를 처리하는 속성이다.

- visible : 박스를 넘어가도 보여줍니다.
- hidden : 박스를 넘어간 부분은 보이지 않습니다.
- scroll : 박스를 넘어가든 넘어가지 않든 스크롤바가 나옵니다.
- auto : 박스를 넘어가지 않으면 스크롤바가 나오지 않고, 박스를 넘어갈 때에는 스크롤바가 나옵니다.
- initial : 기본값으로 설정합니다.
- inherit : 부모 요소의 속성값을 상속받습니다.

auto를 사용했고, 결과는 다음과 같아진다.

![image-20210615005309311](post.assets/image-20210615005309311.png)

## youtube list 하단 고정

[참고 링크](https://alikerock.tistory.com/270)

그냥 flex로 해결
