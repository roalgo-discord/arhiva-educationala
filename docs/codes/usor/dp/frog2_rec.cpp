#include <iostream>
#include <vector>

using namespace std;

int solve(int poz, int diff, const vector<int> &v, vector<int> &dp) {
    if (poz == 1) {
        return 0;
    }

    if (dp[poz] != -1) {
        return dp[poz];
    }

    dp[poz] = (1 << 30);  // 2^30
    for (int i = 1; i <= diff; i++) {
        if (poz - i >= 1) {
            dp[poz] = min(dp[poz], solve(poz - i, diff, v, dp)
                                       + abs(v[poz] - v[poz - i]));
        }
    }
    return dp[poz];
}

int main() {
    int n, k;
    cin >> n >> k;

    vector<int> v(n + 1);
    vector<int> dp(n + 1, -1);

    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }

    cout << solve(n, k, v, dp) << '\n';
    return 0;
}