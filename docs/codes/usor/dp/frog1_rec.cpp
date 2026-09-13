#include <iostream>
#include <vector>

using namespace std;

int solve(int poz, const vector<int> &v, vector<int> &dp) {
    // Cazuri de baza
    if (poz == 1) {
        return 0;
    }

    if (poz == 2) {
        return abs(v[2] - v[1]);
    }

    // Evitarea calculelor redundante
    if (dp[poz] != -1) {
        return dp[poz];
    }

    dp[poz] = min(solve(poz - 1, v, dp) + abs(v[poz - 1] - v[poz]),
                  solve(poz - 2, v, dp) + abs(v[poz - 2] - v[poz]));
    return dp[poz];
}

int main() {
    int n;
    cin >> n;

    vector<int> v(n + 1);
    vector<int> dp(n + 1, -1);

    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }

    cout << solve(n, v, dp) << '\n';
    return 0;
}