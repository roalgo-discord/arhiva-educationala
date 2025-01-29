#include <bits/stdc++.h>
using namespace std;
const int mod = 1e9 + 7, N = 3e5 + 1;
struct Mint
{
    int val;
    Mint(int x = 0)
    {
        val = x % mod;
    }
    Mint(long long x)
    {
        val = x % mod;
    }
    Mint operator+(Mint oth)
    {
        return val + oth.val;
    }
    Mint operator*(Mint oth)
    {
        return 1LL * val * oth.val;
    }
    Mint operator-(Mint oth)
    {
        return val - oth.val + mod;
    }
    Mint fp(Mint a, long long n){
        Mint p = 1;
        while(n){
            if(n & 1){
                p = p * a;
            }
            a = a * a;
            n /= 2;
        }
        return p;
    }
    Mint operator/(Mint oth){
        Mint invers = fp(oth, mod - 2);
        return 1LL * val * invers.val;
    }
    friend ostream& operator << (ostream& os, const Mint& lol){
        os << lol.val;
        return os;
    }
};

int n, m, k;
vector<Mint> dp(N);
vector<int> x(N), depth(N), cnt1(N);
vector<vector<int>> trie(1, vector<int>(26,-1));
vector<bool> cnt(1);
Mint spm = 0;
Mint fp(Mint a, int n){
	Mint p = 1;
	while(n){
		if(n & 1) p = a * p;
		a = a * a;
		n /= 2;
	}
	return p;
}

void insert(string a){
    int root = 0;
    for(int i = 0; i < a.size(); i++){
        if(trie[root][a[i]-'a'] == -1){
            trie[root][a[i]-'a'] = trie.size();
            trie.push_back(vector<int>(26, -1));
            cnt.push_back(0);
        }
        root = trie[root][a[i]-'a'];
    }
    cnt[root]=1;
}
void dfs(int node, int lenx, int len){
    if(lenx == len){
        return;
    }
    if(cnt[node]){
        spm = spm + fp(k, lenx - len);
        return;
    }
    for(int i = 0; i < 26; i++){
        if(trie[node][i] != -1){
            dfs(trie[node][i], lenx, len + 1);
        }
    }
}
void dfs1(int node, int len){
    depth[len]++;
    if(cnt[node]){
        cnt1[len]++;
        return;
    }
    for(int i = 0; i < 26; i++){
        if(trie[node][i] != -1){
            dfs1(trie[node][i], len+1);
        }
    }
}
int main(){
	cin.tie(0)->sync_with_stdio(0);
	cin >> n >> m >> k;
	for(int i = 1; i <= n; i++){
		string a;
		cin >> a;
		insert(a);
	}
	for(int i = 1; i <= m; i++){
		cin >> x[i];
	}
	sort(x.begin() + 1, x.begin() + 1 + m);
	dp[1] = fp(k, x[1]);
	Mint sm = 0;
	dfs(0, x[1], 0);
    dfs1(0, 0);
    dp[1] = dp[1] - depth[x[1]];
    dp[1] = dp[1] - spm;
	for(int i = 2; i <= m; i++){
		dp[i] = dp[i - 1] * fp(k, x[i]);
		sm = sm * fp(k, x[i]-x[i-1]);
		sm = sm + fp(k, x[i]-x[i-1]);
		// for(int j = i - 1; j >= 1; j--){
		// 	dp[i] = dp[i] - dp[i-1]*fp(k, x[i]-x[j]);
		// }
		dp[i] = dp[i] - dp[i-1]*sm;
        spm = spm * fp(k, x[i]-x[i-1]);
        for(int j = x[i-1]; j < x[i]; j++){
            spm = spm + fp(k, x[i] - j) * cnt1[j];
        }
        dp[i] = dp[i] - dp[i-1]*depth[x[i]];
        dp[i] = dp[i] - dp[i-1]*spm;
		//dfs(0, x[i], 0, dp[i], dp[i - 1]);
	}
	cout << dp[m];
}
