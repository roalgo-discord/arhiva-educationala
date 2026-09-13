#include <fstream>
#include <queue>
#include <vector>
using namespace std;

constexpr int MAXN = 7500;

vector<vector<int>> graph(MAXN + 1);
vector<int> ans;

void bfs(int startNode, vector<int>& dist) {
    queue<int> q;
    q.push(startNode);
    dist[startNode] = 0;

    while (!q.empty()) {
        int node = q.front();
        q.pop();

        for (auto neighbor : graph[node]) {
            if (dist[neighbor] == -1) {
                dist[neighbor] = dist[node] + 1;
                q.push(neighbor);
            }
        }
    }
}

vector<int> distX, distY, solFreq;

int main() {
    distX.reserve(MAXN + 1);
    distY.reserve(MAXN + 1);
    solFreq.reserve(MAXN + 1);

    ifstream fin("graf.in");
    ofstream fout("graf.out");

    int n, m, x, y;
    fin >> n >> m >> x >> y;

    while (m--) {
        int a, b;
        fin >> a >> b;
        graph[a].push_back(b);
        graph[b].push_back(a);
    }

    distX.resize(n + 1, -1);
    distY.resize(n + 1, -1);
    solFreq.resize(n + 1, 0);

    bfs(x, distX);
    bfs(y, distY);

    int totalDist = distX[y];

    // Lungimea totală a drumului va fi egală cu distX[y].
    for (int i = 1; i <= n; i++) {
        if (distX[i] == -1 || distY[i] == -1) {
            continue;
        }

        if (distX[i] + distY[i] == totalDist + 1) {
            solFreq[distX[i]]++;
        }
    }

    for (int i = 1; i <= n; i++) {
        if (distX[i] == -1 || distY[i] == -1) {
            continue;
        }

        if (distX[i] + distY[i] == totalDist + 1 && solFreq[distX[i]] == 1) {
            ans.push_back(i);
        }
    }

    fout << ans.size() << '\n';
    for (const auto& node : ans) {
        fout << node << ' ';
    }

    return 0;
}