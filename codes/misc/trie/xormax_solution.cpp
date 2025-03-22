#include <iostream>
#include <vector>

using namespace std;
const int N = 2e5 + 1;

vector<vector<int>> trie(1, vector<int>(2, -1));

int n, v[N], xp[N];

int find(int nr) {
    int root = 0;
    int ans = 0;
    for (int bit = 31; bit >= 0; bit--) {
        bool b = (nr & (1 << bit));
        if (trie[root][!b] == -1) {
            if (trie[root][b] == -1) {
                return ans;
            } else {
                root = trie[root][b];
            }
        } else {
            ans += (1 << bit);
            root = trie[root][!b];
        }
    }
    return ans;
}

void insert(int nr) {
    int root = 0;
    for (int bit = 31; bit >= 0; bit--) {
        bool b = (nr & (1 << bit));
        if (trie[root][b] == -1) {
            trie[root][b] = trie.size();
            trie.emplace_back(2, -1);
        }
        root = trie[root][b];
    }
}

int main() {
    cin.tie(0)->sync_with_stdio(0);
    cin >> n;

    for (int i = 1; i <= n; i++) {
        cin >> v[i];
        xp[i] = xp[i - 1] ^ v[i];
    }

    int ans = 0;
    insert(0);

    for (int i = 1; i <= n; i++) {
        int res = find(xp[i]);
        ans = max(ans, res);
        insert(xp[i]);
    }

    cout << ans;
}
