#include <iostream>
#include <vector>

using namespace std;

const int MOD = 1000000007;

int main() {
    int n, m;
    cin >> n >> m;

    vector<vector<char>> grid(n + 1, vector<char>(m + 1));
    vector<vector<int>> dp(n + 1, vector<int>(m + 1));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> grid[i][j];
        }
    }

    dp[1][1] = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (grid[i][j] != '#') {
                dp[i][j] += dp[i - 1][j] + dp[i][j - 1];
                if (dp[i][j] >= MOD) {
                    dp[i][j] -= MOD;
                }
            }
        }
    }

    cout << dp[n][m] << '\n';
    return 0;
}