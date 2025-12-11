#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

int solve(const int poz, const vector<vector<int>> &v, vector<vector<int>> &dp,
          const int activ) {
    if (poz == 1) {
        return v[poz][activ];
    }
    if (dp[poz][activ] != -1) {
        return dp[poz][activ];
    }

    dp[poz][activ] = 0;
    for (int i = 0; i < 3; i++) {
        if (i != activ) {
            dp[poz][activ] = max(dp[poz][activ], solve(poz - 1, v, dp, i));
        }
    }

    dp[poz][activ] += v[poz][activ];
    return dp[poz][activ];
}

int main() {
    int n;
    cin >> n;

    vector<vector<int>> v(n + 1, vector<int>(3));
    vector<vector<int>> dp(n + 1, vector<int>(3, -1));

    for (int i = 1; i <= n; i++) {
        cin >> v[i][0] >> v[i][1] >> v[i][2];
    }

    cout << max({solve(n, v, dp, 0), solve(n, v, dp, 1), solve(n, v, dp, 2)})
         << '\n';
    return 0;
}