#include <iostream>

int n, k, v[100002];
long long dp[13][100002], segtree[13][400002];

void update(int Number, int Node, int Left, int Right, int Position,
            long long Value) {
    if (Left == Right) {
        segtree[Number][Node] = Value;
        return;
    }
    int mid = (Left + Right) / 2;
    if (Position <= mid) {
        update(Number, Node * 2, Left, mid, Position, Value);
    } else {
        update(Number, Node * 2 + 1, mid + 1, Right, Position, Value);
    }
    segtree[Number][Node] =
        segtree[Number][Node * 2] + segtree[Number][Node * 2 + 1];
}
long long query(int Number, int Node, int Left, int Right, int L, int R) {
    if (L <= Left && Right <= R) {
        return segtree[Number][Node];
    }
    if (Right < L || Left > R) {
        return 0;
    }
    int mid = (Left + Right) / 2;
    return query(Number, Node * 2, Left, mid, L, R)
         + query(Number, Node * 2 + 1, mid + 1, Right, L, R);
}
int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);

    std::cin >> n >> k;
    k++;
    for (int i = 1; i <= n; ++i) {
        std::cin >> v[i];
    }
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= k; ++j) {
            int Z = v[i];
            if (j == 1) {
                dp[1][Z] = 1;
                update(1, 1, 1, n, Z, 1);
            } else {
                if (i != 1) {
                    dp[j][Z] = query(j - 1, 1, 1, n, 1, Z - 1);
                    update(j, 1, 1, n, Z, dp[j][Z]);
                }
            }
        }
    }
    long long sum = 0;
    for (int i = 1; i <= n; ++i) {
        sum += dp[k][i];
    }
    std::cout << sum << '\n';
    return 0;
}
