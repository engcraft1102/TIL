# [BOJ_Python] 2667. 단지 번호 붙이기

## DFS + stack (1)

상하좌우로 탐색했을 때 이동이 가능하다면 해당 좌표를 stack에 추가한 뒤,

**그 좌표에 해당하는 stack의 top으로 바로 이동해서** 탐색을 해야 한다.

break를 하나 넣는 것을 깜빡해서 계속 이상한 곳으로 탐색하고 있었다 ㅠㅠ

```python
N = int(input())
arr = [list(map(int, input())) for x in range(N)]

delta = [(0, 1), (0, -1), (1, 0), (-1,0)]
res = []

def dfs(r,c):
    global res
    visited = [[0] * N for x in range(N)]
    cnt = 1
    stack = [(r,c)]
    visited[r][c] = 1

    while stack:
        top = stack[-1]
        cr = top[0]
        cc = top[1]
        for dr,dc in delta:
            nr = cr + dr
            nc = cc + dc
            if 0 <= nr < N and 0 <= nc < N and arr[nr][nc] == 1 and visited[nr][nc] == 0:
                stack.append((nr,nc))
                arr[nr][nc] = 0
                visited[nr][nc] = 1
                cnt += 1
                break # 아!!!!!! 이거 하나 안넣어서 경로 찾은 뒤에 즉시 그 경로로 이동하질 않았다 ㅠㅠㅠ
        else:
            stack.pop()

    res.append(cnt)

for i in range(N):
    for j in range(N):
        if arr[i][j]:
            dfs(i,j)

print(len(res))
for i in sorted(res):
    print(i)
```

## DFS + Stack (2)

pop()을 사용해 바로바로 빼버리면서 탐색하는 방법도 있다.

그래프에서 이 방법을 사용할 경우, 위의 방식과 탐색 방향이 약간 다를 수 있다.

하지만 미리미리 pop을 해서 그런지 실행속도는 70ms 더 빨랐다.

```python
N = int(input())
arr = [list(map(int, input())) for x in range(N)]

delta = [(0, 1), (0, -1), (1, 0), (-1,0)]
res = []

def dfs(r,c):
    global res
    visited = [[0] * N for x in range(N)]
    cnt = 1
    stack = [(r,c)]
    visited[r][c] = 1
    
    while stack:
        top = stack.pop()
        cr = top[0]
        cc = top[1]
        for dr,dc in delta:
            nr = cr + dr
            nc = cc + dc
            if 0 <= nr < N and 0 <= nc < N and arr[nr][nc] == 1 and visited[nr][nc] == 0:
                stack.append((nr,nc))
                arr[nr][nc] = 0
                visited[nr][nc] = 1
                cnt += 1

    res.append(cnt)

for i in range(N):
    for j in range(N):
        if arr[i][j]:
            dfs(i,j)

print(len(res))
for i in sorted(res):
    print(i)
```

## BFS

```python
from collections import deque
N = int(input())
arr = [list(map(int, input())) for x in range(N)]
delta = [(0, 1), (0, -1), (1, 0), (-1,0)]

def bfs(r,c):
    global res
    visited = [[False] * N for _ in range(N)]
    visited[r][c] = True

    queue = deque([(r, c)])
    cnt = 1

    while queue:
        cr, cc = queue.popleft()

        for dr, dc in delta:
            nr = cr + dr
            nc = cc + dc
            if 0 <= nr < N and 0 <= nc < N and arr[nr][nc] == 1 and visited[nr][nc] == False:
                arr[nr][nc] = 0
                queue.append((nr, nc))
                visited[cr][cc] = True
                cnt += 1

    res.append(cnt)
    return

res = []

for i in range(N):
    for j in range(N):
        if arr[i][j]:
            bfs(i,j)

print(len(res))
for i in sorted(res):
    print(i)
```

