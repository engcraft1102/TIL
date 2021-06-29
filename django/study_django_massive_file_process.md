# django_massive_file_process

https://www.slideshare.net/Byungwook/4-61487454

https://towardsdatascience.com/system-design-analysis-of-google-drive-ca3408f22ed3

장고는 2.5mb보다 작은 파일은 기본적으로 캐싱해서 사용한다.

그러나 넘어가게 되면 업로드된 내용을 임시 파일 저장소에 저장하게 되는데, 그것을 사용할 수 있도록 upload handler를 설정해 주어야 한다.

**UploadedFile.chunks(chunk_size=None)**

chunk 방식으로 나누어서 저장한다

**면접 답변 Tip**

chunk가 뭔지 '진짜' 알아야 한다.