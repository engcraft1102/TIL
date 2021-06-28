# [BOJ_Python] 17298. 오큰수

'스택으로 풀 수 있는 꽤 어려운 문제' 라길래 풀어 보았다.

```python
from sys import stdin

N = int(stdin.readline())
data = list(map(int, stdin.readline().split()))

stack = [data[-1]]
result = [-1]

# 뒤에서 두번째부터
for i in range(len(data)-2, -1, -1):
    if stack:
        # 스택의 top이 탐색하는 데이터보다 크다면 == 오큰수가 있음
        if data[i] < stack[-1]:
            result.append(stack[-1])
            # 우선 스택에 집어넣는다
            stack.append(data[i])
        # 스택의 top보다 탐색하는 데이터가 크다면
        else:
            # 스택의 top을 하나씩 빼다가
            while stack:
                # 오큰수가 있음을 발견하면 break
                if data[i] < stack[-1]:
                    break
                stack.pop()
            # 스택이 다 비었다면 == 오큰수가 없음
            if stack:
                result.append(stack[-1])
            # 오큰수가 잇음
            else:
                result.append(-1)
            # 마지막으로 데이터를 스택에 추가
            stack.append(data[i])
    else:
        result.append(-1)

print(*result[::-1]) # unpacking 사용
```