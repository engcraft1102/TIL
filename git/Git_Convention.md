# Document for Git Flow, Commit

## Git Commit, Pull Request Message Convention

```
# <타입>: <제목>

##### 제목은 최대 50 글자까지만 입력 ############## -> |


# 본문은 위에 작성
######## 본문은 한 줄에 최대 72 글자까지만 입력 ########################### -> |

# (선택사항) 꼬릿말은 아래에 작성: 
	ex)
	Resolves: #이슈 번호
	See also: #이슈 번호, #이슈 번호

# --- COMMIT END ---
# <타입> 리스트
#   feat    : 기능 (새로운 기능)
#   fix     : 버그 (버그 수정)
#   refactor: 리팩토링
#   style   : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)
#   docs    : 문서 (문서 추가, 수정, 삭제)
#   test    : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
#   chore   : 기타 변경사항 (빌드 스크립트 수정 등)
# ------------------
#     제목 첫 글자를 대문자로
#     제목은 명령문으로
#     제목 끝에 마침표(.) 금지
#     제목과 본문을 한 줄 띄워 분리하기
#     본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.
#     본문에 여러줄의 메시지를 작성할 땐 "-"로 구분
# ------------------
```

### 예시

```
feat: 메인 페이지에 무한 스크롤 추가

내용내용내용내용내용내용내용내용내용내용내용
내용내용내용내용내용내용내용내용내용내용내용
내용내용내용내용내용내용내용내용내용내용내용
내용내용내용내용내용내용내용내용내용내용내용

Resolves: #119
```

### Resolves 란?

어떠한 이슈를 해결한 후, 위의 #119와 같이 119번 이슈로 바로 이동할 수 있는 링크를 생성합니다. 

이를 통해 편하게 어떤 Issue에 관련된 커밋/풀 리퀘스트인지 빠르게 파악할 수 있습니다.



### Git log Customizing (Optional)

git log에 --graph 옵션을 적절히 섞은 것입니다. 선택적으로 사용하시면 되겠습니다.

터미널에 아래 명령어를 입력하시면 됩니다.

```
git config --global alias.lg "log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold red)%h%C(reset) : %C(bold green)(%ar)%C(reset) - %C(cyan)<%an>%C(reset)%C(bold yellow)%d%C(reset)%n%n%w(90,1,2)%C(white)%B%C(reset)%n'"
```

## Git Flow

설명이 잘 된, 너무나 유명한 글이 있어서 그냥 첨부합니다. 웬만한 글은 다 읽어 봤는데 이 글이 가장 이해하기 편하네요.

- [우리는 Git-Flow를 사용하고 있어요(우아한형제들 기술브로그)](https://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html)
