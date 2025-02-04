#include <bits/stdc++.h>
using namespace std;
const int N = 1e7 + 1, mod = 3000017;
int n, k;
ifstream fin("tupleco.in");
ofstream fout("tupleco.out");
#define cin fin
#define cout fout
long long C(int n, int k, vector<long long> &f, vector<long long> &invf)
{
    return (1ULL * f[n] * (1ULL * invf[k] * invf[n - k] % mod) % mod) % mod;
}
int main()
{
    cin.tie(0)->sync_with_stdio(0);
    cin >> k >> n;
    vector<long long> f(n + k + 1), inv(n + k + 1), invf(n + k + 1);
    vector<short> mobius(n + 1);
    f[0] = f[1] = inv[0] = inv[1] = invf[0] = invf[1] = 1;
    for (int i = 2; i <= n + k; i++)
    {
        f[i] = (1ULL * f[i - 1] * i) % mod;
        inv[i] = (1ULL * inv[mod % i] * (mod - mod / i)) % mod;
        invf[i] = (1ULL * invf[i - 1] * inv[i]) % mod;
    }

    mobius[1] = 1;
    for (int i = 1; i <= n; i++)
    {
        if (mobius[i])
        {
            for (int j = i + i; j <= n; j += i)
            {
                mobius[j] -= mobius[i];
            }
        }
    }
    long long ans = 0;
    for (int d = 1; d <= n; d++)
    {
        int lt = n / d;
        long long plt = C(lt + k - 1, k, f, invf);
        if (mobius[d] == -1)
        {
            ans = (1ULL * ans + mod - plt) % mod;
        }
        else if (mobius[d] == 1)
        {
            ans = (1ULL * ans + plt) % mod;
        }
        // cout << plt << " ";
    }
    cout << ans;
}