#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n, k;
    cin >> n >> k;

    vector<int> v(n + 1);
    vector<int> dp(n + 1, 1 << 30);  // 2 ^ 30

    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }

    for (int i = 2; i <= n; i++) {
        for (int j = 1; j <= k; j++) {
            if (i - j >= 1) {
                dp[i] = min(dp[i], dp[i - j] + abs(v[i] - v[i - j]));
            }
        }
    }

    cout << dp[n] << '\n';
    return 0;
}