#include <fstream>

int n, v[1002], dp[1002][1002];
bool viz[1002][1002];

int main() {
    std::ifstream f("recyclebin.in");
    std::ofstream g("recyclebin.out");
    f >> n;
    for (int i = 1; i <= n; ++i) {
        f >> v[i];
    }
    int ans = 0;
    for (int i = 0; i <= n; ++i) {
        for (int j = 0; j <= i; ++j) {
            dp[i][j] = std::max(dp[i][j], 0);
            ans = max(ans, dp[i][j]);
            if (i == n) {
                continue;
            }
            if (!viz[i + 1][j]) {
                viz[i + 1][j] = 1;
                dp[i + 1][j] = dp[i][j] + v[i + 1];
            } else {
                if (dp[i][j] + v[i + 1] > dp[i + 1][j]) {
                    dp[i + 1][j] = dp[i][j] + v[i + 1];
                }
            }
            for (int pw = 0; i + (1 << pw) <= n; ++pw) {
                if (j & (1 << pw)) {
                    continue;
                }
                if (!viz[i + (1 << pw)][j + (1 << pw)]) {
                    viz[i + (1 << pw)][j + (1 << pw)] = 1;
                    dp[i + (1 << pw)][j + (1 << pw)] = dp[i][j];
                } else {
                    if (dp[i][j] > dp[i + (1 << pw)][j + (1 << pw)]) {
                        dp[i + (1 << pw)][j + (1 << pw)] = dp[i][j];
                    }
                }
            }
        }
    }
    g << ans << '\n';
    return 0;
}