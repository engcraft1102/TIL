# [BOJ_Python] 2206. 벽 부수고 이동하기

## BFS

처음에는 벽을 부순다는 조건이 있길래 어? DFS로 풀어야 하나? 했고 틀렸다.

바보같은 생각이었던 것이, DFS는 최단 거리임을 보장하지 않기 때문이다.

그래서 bfs를 사용했고 문제에 나와 있는 테스트 케이스는 가볍게 통과했는데, 막상 제출하니 결과는 '틀렸습니다.'

계속 고민하다가 아래의 반례를 넣어 디버깅 해보고서야 문제가 뭔지 알았다.

혹시 이 문제를 틀렸는데 이유를 모르겠다면 아래의 테스트 케이스를 넣어 보길 바란다.

제대로 된 코드라면 9를 출력해야 한다.

```shell
5 5
00000
11101
00000
01111
00010
```

위의 테스트 케이스를 보면 2행 5열의 1에서 아래로 내려온(벽을 한번 부순 상태의) 3행 5열의 0은 이동 거리가 6이고,

3행 4열의 0에서 오른쪽으로 한 칸 이동하는 것 (벽을 아직 부수지 않았음)은 이동 거리가 7이다.

따라서 방문 여부를 체크하는 visited 배열을 한가지만 사용하면 방문 체크가 이미 되어 있기 때문에 3행 4열의 0에서 오른쪽으로 이동한 경우인 **'현재 위치는 3행 5열이고, 아직 벽을 한 번 부술 수 있다' 는 조건이 큐에 들어가지 못하게 된다.**

문제 해결 방법은 의외로 간단하다. visited 배열을 두 개 만들어서 벽을 한번 부순 상태의 visited 배열, 아직 부수지 않은 상태의 visited 배열을 따로 생각하는 것이다! 그래서 3차원 배열을 생성했다.

cw (current Wall) 이라는 변수값을 사용해 큐를 돌렸고, 드디어 통과했다!

```python
from collections import deque

def bfs():
    delta = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    queue = deque([(0,0,1,1)])
    # 벽을 부술 경우, 부수지 않을 경우 각각의 체크를 위해 3차원 배열을 생성해야 한다!!
    # 와 이걸 풀었다!!!
    visited = [[[0] * M for x in range(N)] for x in range(2)]
    # 0이 벽을 부순 경우, 1이 벽을 부수지 않았을 경우의 방문 체크 배열이다.
    visited[1][0][0] = 1

    while queue:
        cr, cc, cd, cw = queue.popleft()

        if (cr, cc) == e:
            return cd

        for dr, dc in delta:
            nr = cr + dr
            nc = cc + dc
            # 인덱스를 벗어나지 않는지 체크하고, cw의 상황에 따라 방문 체크 배열을 다르게 본다!
            if 0 <= nr < N and 0 <= nc < M and not visited[cw][nr][nc]:
                # 벽을 부수면서 갔을 경우
                if cw and arr[nr][nc]:
                    queue.append((nr, nc, cd+1, cw-1))
                    # 이곳이 핵심이다. 여기를 그냥 visited[nr][nc]로 해버리면 
                    # 벽을 부순다, 부수지 않는다 두 가지 경우를 체크하지 못한다!
                    visited[0][nr][nc] = 1  
                # 벽을 부수지 않고 이동할 경우
                elif not arr[nr][nc]:
                    queue.append((nr, nc, cd+1, cw))
                    visited[cw][nr][nc] = 1
    return -1

N, M = map(int, input().split())
arr = [list(map(int, input())) for x in range(N)]
e = (N-1, M-1) # index
cnt = bfs()
print(cnt)
```





