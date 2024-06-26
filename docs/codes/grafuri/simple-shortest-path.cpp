#include <iostream>
#include <queue>
#include <vector>

using namespace std;

int main() {
    int n, m, s;
    cin >> n >> m >> s;

    vector<vector<int>> graf(n);
    vector<int> ans(n, -1);
    queue<int> q;

    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        graf[a].push_back(b);
        graf[b].push_back(a);
    }

    ans[s] = 0;
    q.push(s);

    while (!q.empty()) {
        int nod = q.front();
        q.pop();

        for (auto x : graf[nod]) {
            if (ans[x] == -1) {
                ans[x] = ans[nod] + 1;
                q.push(x);
            }
        }
    }

    for (const auto& x : ans) {
        cout << x << " ";
    }

    cout << '\n';

    return 0;
}