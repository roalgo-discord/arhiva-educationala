#include <bits/stdc++.h>
using namespace std;
const int mod = 3e6 + 17, N = 1e6 + 2;
ifstream fin("tupleco.in");
ofstream fout("tupleco.out");
#define cin fin
#define cout fout
struct Mint {
    int val;
    Mint(int x = 0) { val = x % mod; }
    Mint(long long x) { val = x % mod; }
    Mint operator+(Mint oth) { return val + oth.val; }
    Mint operator*(Mint oth) { return 1LL * val * oth.val; }
    Mint operator-(Mint oth) { return val - oth.val + mod; }
    Mint fp(Mint a, long long n) {
        Mint p = 1;
        while (n) {
            if (n & 1) {
                p = p * a;
            }
            a = a * a;
            n /= 2;
        }
        return p;
    }
    Mint operator/(Mint oth) {
        Mint invers = fp(oth, mod - 2);
        return 1LL * val * invers.val;
    }
    friend ostream &operator<<(ostream &os, const Mint &lol) {
        os << lol.val;
        return os;
    }
};
vector<Mint> f(mod), invf(mod), inv(mod);
Mint C(int n, int k) {
    if (n < 0 || k < 0 || n < k) {
        return 0;
    }
    if (n >= mod) {
        return C(n / mod, k / mod) * C(n % mod, k % mod);
    }
    return f[n] * invf[n - k] * invf[k];
}
int n, k;
unordered_map<int, Mint> mp;
Mint fr(int n) {
    if (mp[n].val) {
        return mp[n];
    }
    int dr = 2;
    Mint total = C(n + k - 1, k);
    while (dr <= n) {
        int ptr = n / (n / dr);
        int lt = n / dr;
        total = total - (fr(lt) * (ptr - dr + 1));
        dr = ptr + 1;
    }
    mp[n] = total;
    return total;
}
int main() {
    f[0] = f[1] = inv[0] = inv[1] = invf[1] = invf[0] = 1;
    for (int i = 2; i < mod; i++) {
        f[i] = f[i - 1] * i;
        inv[i] = inv[mod % i] * (mod - mod / i);
        invf[i] = invf[i - 1] * inv[i];
    }

    cin >> k >> n;
    cout << fr(n);
}
