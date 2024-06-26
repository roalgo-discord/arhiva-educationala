#include <iostream>
#include <vector>

using namespace std;

vector<vector<int>> adj;
vector<bool> visited;

void dfs(int node) {
    visited[node] = true;

	for (int next : adj[node]) {
		if (!visited[next]) {
			dfs(next);
		}
	}
}

int main() {
	int n, m;
    cin >> n >> m;

    adj.resize(n + 1);
    visited.resize(n + 1, false);

    for (int i = 0; i < m; ++i) {
        int a, b;
        cin >> a >> b;

        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    int cc = 0;
    for (int i = 1; i <= n; ++i) {
        if (!visited[i]) {
            ++cc;
            dfs(i);
        }
    }

    cout << cc << '\n';
    return 0;
}
