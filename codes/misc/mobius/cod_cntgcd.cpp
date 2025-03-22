long long f(long long n) {
    // cout << n << '\n';
    if (n <= (int)1e6) {
        return sum_phi[n];  // phi(1) + phi(2) + ... + phi(n)
    }
    if (dp[n]) {
        return dp[n];
        // am calculat deja rezultatul pt n
    }
    long long ans = 1LL * (1LL * n * (n + 1)) / 2;
    for (int i = 2, dr; i <= n; i = dr + 1) {
        dr = (n / (n / i));
        if (dr > n) {
            break;
        }
        ans -= (dr - i + 1) * f(n / i);
    }
    dp[n] = ans;
    return ans;
}