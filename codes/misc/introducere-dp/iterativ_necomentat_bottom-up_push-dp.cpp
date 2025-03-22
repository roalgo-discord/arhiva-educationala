#include <iostream>
#include <vector>

using namespace std;

constexpr int MAX_MONEZI = 100000;
constexpr int INF = 0x3f3f3f3f;

int N, S;
vector<int> dp;

int main() {
    cin >> N >> S;
    vector<int> monezi(N);

    for (auto& moneda : monezi) {
        cin >> moneda;
    }

    dp.resize(S + 1);
    for (int i = 1; i <= S; ++i) {
        dp[i] = INF;
    }

    for (int i = 0; i <= S; i++) {
        if (dp[i] != INF) {
            for (int moneda : monezi) {
                if (i + moneda <= S) {
                    dp[i + moneda] = min(dp[i + moneda], dp[i] + 1);
                }
            }
        }
    }

    if (dp[S] == INF) {
        cout << -1;
    } else {
        cout << dp[S];
    }

    return 0;
}
