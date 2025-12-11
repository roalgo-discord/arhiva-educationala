#include <fstream>

std::ifstream cin("partit.in");
std::ofstream cout("partit.out");

int c, n, v[10002];
long long k, dp[10002];

void solve(int n, long long k) {
    if (n == 0) {
        return;
    }
    long long sum = 0;
    for (int i = 1; i <= n; ++i) {
        if (sum + dp[n - i] < k) {
            sum = sum + dp[n - i];
        } else {
            cout << i << " ";
            solve(n - i, k - sum);
            break;
        }
    }
}
int main() {
    cin >> c >> n;
    dp[0] = 1;
    for (int i = 1; i <= 10000; ++i) {
        if (i >= 61) {
            dp[i] = (1LL << 60);
        } else {
            dp[i] = (1LL << (i - 1));
        }
    }
    if (c == 1) {
        cin >> k;
        solve(n, k);
    } else {
        int x = 0;
        int n2 = n;
        while (n2) {
            int nr;
            cin >> nr;
            v[++x] = nr;
            n2 = n2 - nr;
        }
        long long ord = 1;
        for (int i = 1; i <= x; ++i) {
            for (int j = 1; j < v[i]; ++j) {
                ord = ord + dp[n - j];
            }
            n -= v[i];
        }
        cout << ord << '\n';
    }
    return 0;
}
