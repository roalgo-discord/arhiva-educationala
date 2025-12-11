#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

const int MAXIM_SUMA_MONEDE = 100000;

int N, S;
vector<int> dp(MAXIM_SUMA_MONEDE + 1);

int main() {
    cin >> N >> S;
    vector<int> coins(N);
    for (int i = 0; i < N; i++) {
        cin >> coins[i];
    }
    for (int i : coins) {
        dp[i] = 1;
    }

    for (int i = 1; i < S; i++) {
        if (dp[i] != 0) {
            for (int coin : coins) {
                if (i + coin <= S) {
                    if (dp[i + coin] == 0) {
                        dp[i + coin] = dp[i] + 1;
                    } else {
                        dp[i + coin] = min(dp[i + coin], dp[i] + 1);
                    }
                }
            }
        }
    }

    cout << dp[S];
    return 0;
}