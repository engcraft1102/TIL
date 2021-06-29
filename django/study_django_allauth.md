# django allauth

installed_app 등을 착챡 추가한다.

settings.py의 url패턴에  allauth.urls로 돌려주는 path를 하나 추가한다.

이후, migrate.

### Google Cloud Platform

새로운 프로젝트 생성하고 api 및 서비스 / OAuth 동의 화면 (외부) 만들기 / 쭉쭉 적을거 적기 - 대시보드로 돌아간 뒤,

사용자 인증 정보에서 OAuth 2.0 클라이언트에, 장고의 ip address를 '승인된 리디렉션 URL'에 넣은 뒤 클라이언트를 추가해 준다. 그러면 클라이언트가 생성되었다고 하며 ID와 PW가 뜨니 따로 저장해 준다.

그럼 이렇게 클라이언트 키랑 시크릿 키를 받아왔으니 장고에 알려줘야 한다.

admin 페이지에서 소셜 로그인 -> 구글, 아이디, 비밀 키를 적는다. 그리고 아무런 사이트나 적어 준다.

이제 구글 로그인이 성공되면 callback 해주게 된다.