#include <iostream>
#include <vector>

using namespace std;
const int N = 2e5 + 1;

int n;
vector<int> v(N), ans(N);
vector<int> xr1(N), xr2(N);

vector<vector<int>> trie1(1, vector<int>(2, -1)), trie2(1, vector<int>(2, -1));

vector<int> maxim1(N), maxim2(N);

void insert(vector<vector<int>> &trie, int nr) {
    int root = 0;
    for (int i = 30; i >= 0; i--) {
        bool bit = (nr & (1 << i));
        if (trie[root][bit] == -1) {
            trie[root][bit] = trie.size();
            trie.push_back(vector<int>(2, -1));
        }
        root = trie[root][bit];
    }
}

int get_max(vector<vector<int>> &trie, int nr) {
    int ans = 0;
    int root = 0;
    for (int i = 30; i >= 0; i--) {
        bool bit = (nr & (1 << i));
        if (trie[root][!bit] != -1) {
            ans += (1 << i);
            root = trie[root][!bit];
        } else if (trie[root][bit] != -1) {
            root = trie[root][bit];
        }
    }
    return ans;
}

int main() {
    cin >> n;
    int xr = 0;
    for (int i = 1; i < n; i++) {
        cin >> v[i];
        xr1[i] = xr1[i - 1] ^ v[i];
    }
    for (int i = n - 1; i >= 1; i--) {
        xr2[i] = xr2[i + 1] ^ v[i];
    }

    maxim1[1] = 0;
    maxim2[n] = 0;
    insert(trie1, xr2[1]);
    for (int i = 2; i <= n; i++) {
        maxim1[i] = get_max(trie1, xr2[i]);
        insert(trie1, xr2[i]);
    }
    insert(trie2, xr1[n - 1]);
    for (int i = n - 2; i >= 0; i--) {
        maxim2[i] = get_max(trie2, xr1[i]);
        insert(trie2, xr1[i]);
    }

    for (int i = 1; i <= n; i++) {
        if (max(maxim1[i], maxim2[i - 1]) == n - 1) {
            int xr1 = 0, xr2 = 0;
            vector<int> fr(2 * n + 1);
            fr[0] = 1;
            ans[i] = 0;
            for (int j = i - 1; j >= 1; j--) {
                ans[j] = v[j] ^ ans[j + 1];
                xr1 ^= v[j];
                fr[ans[j]]++;
                if (fr[ans[j]] >= 2) {
                    break;
                }
            }
            for (int j = i; j < n; j++) {
                ans[j + 1] = v[j] ^ xr2;
                xr2 ^= v[j];
                fr[ans[j + 1]]++;
                if (fr[ans[j + 1]] >= 2) {
                    break;
                }
            }
            int ok = 1;
            for (int j = 0; j < n; j++) {
                if (fr[j] != 1) {
                    ok = 0;
                    break;
                }
            }
            if (1) {
                for (int j = 1; j <= n; j++) {
                    cout << ans[j] << " ";
                }
                return 0;
            }
        }
    }
}
