#include <iostream>

const int N = 5e3 + 1;

long long cnt[N][N], dp[N][N];
int n, k, p, m;
int v[N];

void dnc(int k, int l, int r, int optl, int optr){
    if(l > r) {
        return;
    }
    int tm = (l + r) / 2;
    std::pair<long long, int> opt(1e18, 0);
    for(int i = optl; i <= std::min(tm - 1, optr); i++){
        opt = std::min(opt, {1LL * dp[k - 1][i] + cnt[i + 1][tm], i});
    }
    dp[k][tm] = opt.first;
    dnc(k, l, tm - 1, optl, opt.second);
    dnc(k, tm + 1, r, opt.second, optr);

}

int main() {
    std::cin.tie(0)->sync_with_stdio(0);
    std::cin >> n >> k >> m;
    
    for(int i = 1; i <= n; i++){
        std::cin >> v[i];
    }
    for(int i = 1; i <= n; i++){
        int fr[30] = {0};
        fr[0] = 1;
        long long sm = 0;
        for(int j = i; j <= n; j++){
            sm += v[j];
            int l = sm % m;
            cnt[i][j] += cnt[i][j - 1];
            for(int f = 0; f < m; f++) {
                cnt[i][j] += f * fr[(l + m - f) % m];
            }
            fr[l]++;
        }
    }
    
    for(int i = 1; i <= n; i++){
        dp[1][i] = cnt[1][i];
    }
    for(int i = 2; i <= k; i++){
        dnc(i, 1, n, 0, n - 1);
    }

    std::cout << dp[k][n] << '\n';
    return 0;
}
