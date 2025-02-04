#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    cin >> n;

    vector<vector<int>> dp(2, vector<int>(3));

    for (int i = 1; i <= n; i++) {
        int a, b, c;
        cin >> a >> b >> c;
        
        if (i == 1) {
            dp[0][0] = a;
            dp[0][1] = b;
            dp[0][2] = c;
        } else {
            dp[1][0] = max(dp[0][1], dp[0][2]) + a;
            dp[1][1] = max(dp[0][0], dp[0][2]) + b;
            dp[1][2] = max(dp[0][0], dp[0][1]) + c;

            swap(dp[0], dp[1]);
            fill(dp[1].begin(), dp[1].end(), 0);
        }
    }

    cout << max({dp[0][0], dp[0][1], dp[0][2]}) << '\n';
    return 0;
}