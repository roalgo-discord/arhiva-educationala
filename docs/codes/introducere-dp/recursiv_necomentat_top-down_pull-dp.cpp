#include <iostream>
#include <vector>
#define MAXIM_SUMA_MONEZI 100000
using namespace std;
int N,S;
int dp[MAXIM_SUMA_MONEZI + 1];
void solve(const int suma, const int nr_monede_utilizate,
           const vector<int>& coins) {
    if(suma == 0) {
        return;
    }
    for(int coin : coins) {
        if(suma - coin >= 0) {
            if(dp[suma - coin] == 0) {
                dp[suma - coin] = nr_monede_utilizate + 1;
            } else {
                dp[suma - coin] = min(dp[suma - coin], nr_monede_utilizate + 1);
            }
            solve(suma - coin, nr_monede_utilizate + 1, coins);
        }
    }
}
int main() {
    cin>>N>>S;
    vector<int> coins(N, 0);
    for(int i = 0; i < N; i++) {
        cin>>coins[i];
    }
    solve(S, 0, coins);
    cout<<dp[0];
    return 0;
}
