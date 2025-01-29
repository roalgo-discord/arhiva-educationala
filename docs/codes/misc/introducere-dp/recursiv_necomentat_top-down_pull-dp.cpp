#include <iostream>
#include <vector>

constexpr int MAX_MONEZI = 100000;

using namespace std;

int N, S;
vector<int> dp(MAX_MONEZI + 1);

void solve(const int suma, const int nr_monede, const vector<int>& monezi) {
    if (suma == 0) {
        return;
    }
    
    for (const auto moneda : monezi) {
        if (suma >= moneda) {
            if (dp[suma - moneda] == 0) {
                dp[suma - moneda] = nr_monede + 1;
            } else {
                dp[suma - moneda] = min(dp[suma - moneda], nr_monede + 1);
            }
            solve(suma - moneda, nr_monede + 1, monezi);
        }
    }
}

int main() {
    cin >> N >> S;

    vector<int> monezi(N, 0);

    for (auto& moneda : monezi) {
        cin >> moneda;
    }

    solve(S, 0, monezi);

    cout << dp[0];
    return 0;
}
