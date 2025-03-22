#include <fstream>
#include <vector>

const int mod = 1000000007;

int n, d, dst[102], leaves[102];
std::vector<int> v[102];
long long dp[10002], cntleaves[10002];

void dfs(int parent, int node, int lvl) {
    dst[lvl]++;
    bool leaf = 1;
    if (node == 1) {
        leaf = 0;
    }
    for (int i = 0; i < (int)v[node].size(); ++i) {
        int vecin = v[node][i];
        if (vecin == parent) {
            continue;
        }
        dfs(node, vecin, lvl + 1);
        leaf = 0;
    }
    if (leaf) {
        leaves[lvl]++;
    }
}

int main() {
    std::ifstream cin("tairos.in");
    std::ofstream cout("tairos.out");

    cin >> n >> d;
    for (int i = 1; i < n; ++i) {
        int a, b;
        cin >> a >> b;
        v[a].push_back(b);
        v[b].push_back(a);
    }
    dfs(0, 1, 0);
    for (int i = 0; i < n; ++i) {
        dp[i] = dst[i];
        cntleaves[i] = leaves[i];
    }
    for (int i = 0; i <= d; ++i) {
        if (!cntleaves[i]) {
            continue;
        }
        for (int j = i + 1; j <= std::min(d, i + n); ++j) {
            dp[j] = (dp[j] + 1LL * cntleaves[i] * dst[j - i]) % mod;
            cntleaves[j] =
                (cntleaves[j] + 1LL * cntleaves[i] * leaves[j - i]) % mod;
        }
    }
    cout << dp[d] << '\n';
    return 0;
}