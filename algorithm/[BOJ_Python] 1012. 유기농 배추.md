# [BOJ_Python] 1012. 유기농 배추

## DFS Recursion 재귀

검색해 보았더니 재귀 제한을 주어야지 런타임 에러가 나지 않는다고 한다.

sys 모듈의 setrecursionlimit 함수를 사용한다.

```python
import sys
sys.setrecursionlimit(100000)
def dfs_recursion(r,c):
    delta = [(0, 1), (0, -1), (1, 0), (-1,0)]
    visited[r][c] = 1
    farm[r][c] = 0

    for dr, dc in delta:
        nr = r + dr
        nc = c + dc
        if 0 <= nr < M and 0 <= nc < N and not visited[nr][nc] and farm[nr][nc]:
            dfs_recursion(nr, nc)

T = int(input())

for tc in range(T):
    M, N, K = map(int, input().split())
    farm = [[0]*N for x in range(M)] # M행 N열
    visited = [[0]*N for x in range(M)]
    res = 0

    for i in range(K):
        x, y = map(int, input().split())
        farm[x][y] = 1

    for i in range(M):
        for j in range(N):
            if farm[i][j]:
                res += 1
                dfs_recursion(i, j)
    print(res)
```

## DFS + stack (1)

```python
def dfs1(r,c):
    stack = [(r,c)]
    delta = [(0, 1), (0, -1), (1, 0), (-1,0)]
    visited[r][c] = 1
    farm[r][c] = 0

    while stack:
        cr, cc = stack[-1]
        for dr, dc in delta:
            nr = cr + dr
            nc = cc + dc
            if 0 <= nr < M and 0 <= nc < N and not visited[nr][nc] and farm[nr][nc]:
                stack.append((nr, nc))
                visited[nr][nc] = 1
                farm[nr][nc] = 0
                break
        else:
            stack.pop()

T = int(input())

for tc in range(T):
    M, N, K = map(int, input().split())
    farm = [[0]*N for x in range(M)] # M행 N열
    visited = [[0]*N for x in range(M)]
    res = 0

    for i in range(K):
        x, y = map(int, input().split())
        farm[x][y] = 1

    for i in range(M):
        for j in range(N):
            if farm[i][j]:
                res += 1
                dfs2(i, j)
    print(res)
```

## DFS + Stack (2)

```python
def dfs2(r,c):
    stack = [(r,c)]
    delta = [(0, 1), (0, -1), (1, 0), (-1,0)]
    visited[r][c] = 1
    farm[r][c] = 0

    while stack:
        cr, cc = stack.pop()
        for dr, dc in delta:
            nr = cr + dr
            nc = cc + dc
            if 0 <= nr < M and 0 <= nc < N and not visited[nr][nc] and farm[nr][nc]:
                stack.append((nr, nc))
                visited[nr][nc] = 1
                farm[nr][nc] = 0

T = int(input())

for tc in range(T):
    M, N, K = map(int, input().split())
    farm = [[0]*N for x in range(M)] # M행 N열
    visited = [[0]*N for x in range(M)]
    res = 0

    for i in range(K):
        x, y = map(int, input().split())
        farm[x][y] = 1

    for i in range(M):
        for j in range(N):
            if farm[i][j]:
                res += 1
                dfs2(i, j)
    print(res)
```

<img src="[BOJ_Python] 1012. 유기농 배추.assets/1012.PNG" alt="1012" style="zoom:75%;" />