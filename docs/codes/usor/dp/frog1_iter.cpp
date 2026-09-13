#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> v(n + 1);
    vector<int> dp(n + 1);

    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }

    for (int i = 2; i <= n; i++) {
        if (i == 2) {
            dp[i] = abs(v[i] - v[i - 1]);
        } else {
            dp[i] = min(dp[i - 1] + abs(v[i] - v[i - 1]),
                        dp[i - 2] + abs(v[i] - v[i - 2]));
        }
    }

    cout << dp[n] << '\n';
    return 0;
}