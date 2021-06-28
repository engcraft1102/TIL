# [BOJ_Python] 1707. 이분 그래프

풀다 풀다 안풀려서 검색해서 들어오신 분이라면 아래의 두 가지를 생각해 보시길 바란다.

```python
1. 서로 연결되지 않은 이분 그래프들이 여러 개 들어왔을 경우를 생각해 보았는지
2. 인접 행렬을 사용했는지
```

메모리 초과를 여러 번 낸 문제다. 메모리 초과가 난 이유는 정점의 개수 V의 범위가 20000까지 늘어나기 때문이라고 생각된다. **인접 행렬**을 사용해 풀려고 했었기 때문이다..ㅠㅠ

인접 행렬을 사용하면 만약 정점이 2만 개 주어졌을 때, 2차원 배열이 20,000 * 20,000...

### 풀이과정

DFS로 탐색하면서 정점에 색이 칠해져 있지 않은 경우 색을 칠해주고, 이미 칠해져 있는 경우 같은 색이면 break 해줬다.

인접 행렬과 더불어 이 문제를 계속 틀렸던 또 하나의 이유는 1에서만 탐색을 시작했기 때문이다. 모든 정점이 연결되어 있는 것이 아니기에 for문으로 모든 정점에 대한 이분 그래프의 참/거짓 유무를 판별해야 한다.

## DFS Stack

```python
# 메모리 초과 해결은 인접 리스트로
from sys import stdin

def dfs(v):
    stack = [v]
    visited[v] = 7 # 칠해야되니까 7... 시작점을 칠하고 출발

    while stack:
        top = stack.pop()
        # 인접 리스트에서
        for i in adj[top]:
            if not visited[i]:
                stack.append(i)
                visited[i] = visited[top] * -1
            elif visited[i] == visited[top]:
                return False
    return True

K = int(stdin.readline())

for tc in range(K):
    V, E = map(int, stdin.readline().split())
    edges = [list(map(int, stdin.readline().split())) for x in range(E)]
    # 이 문제를 인접 행렬로 풀려고 했기 때문에 에러가 난 것. 인접 리스트로 바꿔 보자.
    # adj = [[0]*(V+1) for x in range(V+1)]
    adj = [[] for x in range(V+1)]
    # visited: 방문 체크 겸 색깔 체크 리스트
    visited = [0] * (V + 1)
    res = 'YES'

    for i,j in edges:
        adj[i].append(j)
        adj[j].append(i)

    # 정점 1에서만 DFS 하는게 아니라 모든 정점에서 DFS를 해줘야 한다!
    for i in range(1, V+1):
        if not visited[i]: # 아직 방문하지 않았다면
            if not dfs(i):
                res = 'NO'
                break
    print(res)

```
