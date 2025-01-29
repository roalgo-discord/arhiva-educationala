#include <fstream>
#include <vector>

using namespace std;

ifstream fin("grarb.in");
ofstream fout("grarb.out");

vector<vector<int>> adj;
vector<bool> visited;

void dfs(int nod) {
    visited[nod] = true;
    for (int next : adj[nod]) {
        if (!visited[next]) dfs(next);
    }
}

int main() {
    int n, m, nr = 0;

    fin >> n >> m;

    adj.resize(n);
    visited.resize(n, false);

    for (int i = 1; i <= m; i++) {
        int a, b;
        fin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    for (int i = 0; i < n; i++)
        if (!visited[i]) {
            dfs(i);
            nr++;
        }

    // Numărul de muchii ce trebuiesc șterse
    fout << m + nr - 1 - (n - 1) << '\n';
    // Numărul de componente conectate
    fout << nr - 1 << '\n';
    return 0;
}