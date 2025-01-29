#include <iostream>
#include <vector>

using namespace std;

const int MOD = 1000000007;

int main() {
    int n, m;
    cin >> n >> m;

    vector<int> vals(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> vals[i];
    }

    vector<vector<int>> dp(n + 1, vector<int>(m + 1));

    for (int i = 1; i <= m; i++) {
        if (vals[1] == 0 || vals[1] == i) {
            dp[1][i] = 1;
        }
    }

    for (int i = 2; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (vals[i] && vals[i] != j) {
                continue;
            }
            for (int dif = -1; dif <= 1; dif++) {
                if (j + dif > 0 && j + dif <= m) {
                    dp[i][j] += dp[i - 1][j + dif];
                    if (dp[i][j] >= MOD) {
                        dp[i][j] -= MOD;
                    }
                }
            }
        }
    }

    int ans = 0;
    for (int i = 1; i <= m; i++) {
        ans += dp[n][i];
        if (ans >= MOD) {
            ans -= MOD;
        }
    }

    cout << ans << '\n';
    return 0;
}