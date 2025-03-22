#include <iostream>
#include <vector>

using namespace std;

const int MAXIM_SUMA_MONEDE = 100000;

int N, S;
vector<int> dp(MAXIM_SUMA_MONEDE + 1);

void solve(const int suma, const int nr_monede, const vector<int>& monede) {
    if (suma == 0) {
        return;
    }

    for (const auto moneda : monede) {
        if (suma >= moneda) {
            if (dp[suma - moneda] > nr_monede + 1) {
                dp[suma - moneda] = nr_monede + 1;
                solve(suma - moneda, nr_monede + 1, monede);
            }
        }
    }
}

int main() {
    cin >> N >> S;

    vector<int> monede(N, 0);

    for (auto& moneda : monede) {
        cin >> moneda;
    }

    solve(S, 0, monede);

    cout << dp[0];
    return 0;
}