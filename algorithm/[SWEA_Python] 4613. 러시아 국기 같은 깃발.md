# [SWEA_Python] 4613. 러시아 국기 같은 깃발

러시아 국기는 세 가지의 색으로 구성되어 있고, 맨 위와 맨 아래는 고정이다.

세 부분으로 나누어 가장 적은 노동으로 각각의 색으로 칠하는 문제인 것이다.

국기의 구분선을 이리저리 '조합' 해 가면서 최소의 변환값을 찾으면 된다.

즉, 순열 or 조합을 사용하면 된다. 그리고 전체를 탐색하는 반복문으로도 풀 수 있다.

## Permutation (순열) 을 사용한 풀이

순열 DFS를 재귀로 돌리면서 index들의 중간합을 체크하는 방식을 사용한다.

이 풀이에서 selected에 저장되는 값은 세 부분으로 나뉘어진 행의 수이다.

따라서 selected의 총합이 N(데이터의 행의 수)와 같을 때 변환값을 탐색, 갱신한다.

```python
def perm(idx, cur_sum):
    global res

    # 중간합이 주어진 N보다 커진다면 break해 주어야 한다.
    # 여기를 체크해 주지 않으면, 아래에서 경계선을 설정해 주는 부분에서 index error가 발생할 수 있다.
    # 전체 행의 길이보다 index의 중간합이 커졌다 == 경계선이 주어진 데이터의 범위를 넘어간다
    if N < cur_sum:
        return
    if idx == 3: # selected 배열이 꽉 찼으므로 탐색을 끝내야 한다
        # 효율화) 그런데 그냥 중간합이 N과 같은 경우에만 아래의 색깔 탐색을 수행하도록 하면 더 효율적이다.
        # 이 효율화를 수행하지 않으면 1794ms, 효율화하면 307ms가 걸린다.
        if cur_sum == N:
            # print(selected) # 경계선의 위치 체크
            a = selected[0] # 첫번째 경계선
            b = a + selected[1] # 두번째 경계선

            cnt = 0

            # 하얀색으로 색칠하는 부분
            # 여기서 flag[i] : 문자열 ex) WWBWB
            for i in range(a):
                for j in flag[i]:
                    if j != 'W':
                        cnt += 1
            # 파란색 부분
            for i in range(a, b):
                for j in flag[i]:
                    if j != 'B':
                        cnt += 1

            # 빨간색 부분
            for i in range(b, N):
                for j in flag[i]:
                    if j != 'R':
                        cnt += 1

            if cnt < res:
                res = cnt
        return

    # 중복 순열 DFS
    for i in range(1, N-1):
        selected[idx] = i
        perm(idx+1, cur_sum+i) # 인덱스 + 1로 재귀에 들어간다

T = int(input())

for tc in range(1, T+1):
    N, M = map(int, input().split()) # N행 M열 , 최대 50행 50열
    flag = [list(input()) for x in range(N)]
    res = 2147483647
    selected = [0] * 3

    # 앞은 idx, 뒤는 idx들의 중간합
    perm(0, 0)

    print('#{} {}'.format(tc, res))
```

## Combination (조합) 을 사용한 풀이

```python
# 순열로 구할 수도 있지만, 터지지 않는 조합으로 구하는 방법
# 253ms로 가장 빨랐다
def comb(idx, cnt, selected):
    global res

    if cnt == 2: # 두번 짤랐음
        # 만약 여기서 0,1이 나온다면
        total_cnt = 0
        # 0번째 index (첫 번째 행)은 하얀색, 1번째 index (두 번째 행)은 파란색, 그 아래는 모두 빨간색이라는 의미다.
        # index로 들어와있기 때문에 계산하기 위해 구분선마다 + 1을 해 준다.
        first_line = selected[0] + 1 # 첫 번째 구분선
        second_line = selected[1] + 1 # 두 번째 구분선

        # 하얀색
        for i in range(first_line):
            for j in flag[i]:
                if j != 'W':
                    total_cnt += 1

        # 파란색
        for i in range(first_line, second_line):
            for j in flag[i]:
                if j != 'B':
                    total_cnt += 1

        # 빨간색
        for i in range(second_line, N):
            for j in flag[i]:
                if j != 'R':
                    total_cnt += 1

        if res > total_cnt:
            res = total_cnt

        return

    # 만약 idx가 마지막 행이라면, Red Color가 보장되지 않으므로 return
    # ex) 첫 번째 구분선의 idx가 2일 경우, idx+1을 하면 3이 되어 맨 아랫줄의 빨간 부분을 보장할 수 없으므로 바로 return
    if idx == N-1:
        return

    # 현재 idx를 cnt(구분선의 index) 로 지정한 뒤, 구분선을 한개 지정했음을 반영하기 위해 cnt + 1을 해 준 뒤 재귀를 들어간다.
    selected[cnt] = idx
    comb(idx+1, cnt+1, selected)
    # idx만 올리고, cnt를 올리지 않고 재귀를 들어간다.
    # 이렇게 하여, 만약 N이 4일 경우 [0,1] 을 첫 번째 구분선으로 지정할 수 있게 된다.
    comb(idx+1, cnt, selected)

T = int(input())

for tc in range(1, T+1):
    N, M = map(int, input().split()) # N행 M열 , 최대 50행 50열
    flag = [list(input()) for x in range(N)]
    res = 2147483647
    selected = [None, None]

    # 앞은 idx, 뒤는 idx들의 중간합
    comb(0, 0, selected)

    print('#{} {}'.format(tc, res))
```

## 반복문을 사용한 풀이1 - 브루트 포스

DFS를 사용하지 않고 맨 처음에 풀었던 코드이다.

```python
T = int(input())

for tc in range(1, T+1):
    N, M = map(int, input().split()) # N행 M열 , 최대 50행 50열
    arr = [list(input()) for x in range(N)]
    end = len(arr)
    min_val = 2147483647

    w_count = 0
    for w in range(end-2):
        for i in range(M):
            if arr[w][i] != 'W':
                w_count += 1

        b_count = 0
        for b in range(w+1, end-1):
            for j in range(M):
                if arr[b][j] != 'B':
                    b_count += 1

            # 마지막을 무조건 끝까지 red로 칠해야 한다.
            # 따라서 blue 이후 모든 곳을 red로 칠한 뒤, tmp를 계산해 줘야 한다.
            # w_count, b_count의 경우와 약간 다르다.
            r_count = 0
            for r in range(b+1, end):
                for k in range(M):
                    if arr[r][k] != 'R':
                        r_count += 1

            tmp = w_count + b_count + r_count
            if min_val > tmp:
                min_val = tmp

    print('#{} {}'.format(tc, min_val))
```

## 반복문을 사용한 풀이 2 - 누적합

신선한 풀이여서 기록해 놓는다.

색의 수를 미리 행 별로 계산해 두고, 나중에 반복문을 돌리면서 계산하는 방법이다.

예를 들어 두 번째 행까지 하얀색으로 칠했다면, 

그 다음 파란색을 칠하는 범위를 구하는 반복문을 순회하면서 하얀색으로 칠한 범위까지의 index에 칠해져 있던 파란색 값을 빼 주는 방식으로 중복되는 색을 배제해 준다.

```python
# 누적합 풀이
T = int(input())

for tc in range(1, T+1):
    N, M = map(int, input().split()) # N행 M열 , 최대 50행 50열
    flag = [input() for x in range(N)]

    res = 214748364

    W = [0] * N
    B = [0] * N
    R = [0] * N

    # 나와 다른 색깔의 개수를 카운트
    for i in range(N):
        for j in range(M):
            if flag[i][j] != 'W':
                W[i] += 1
            if flag[i][j] != 'B':
                B[i] += 1
            if flag[i][j] != 'R':
                R[i] += 1

    # 누적합
    for i in range(1, N):
        W[i] += W[i-1]
        B[i] += B[i-1]
        R[i] += R[i-1]

    # 각각의 색별로 한 줄 이상씩은 확보해야 하니까
    for i in range(N-2):
        for j in range(i+1, N-1):
            w_cnt = W[i]
            b_cnt = B[j] - B[i] # i층 까지는 흰색을 칠해 두었으니까
            r_cnt = R[N-1] - R[j]

            if ans > w_cnt + b_cnt + r_cnt:
                ans = w_cnt + b_cnt + r_cnt
```

