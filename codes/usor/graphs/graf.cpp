#include <fstream>
#include <queue>
#include <vector>
using namespace std;

constexpr int MAX_NODURI = 7500;

vector<vector<int>> graf(MAX_NODURI + 1);
vector<int> noduri_comune;
vector<int> distanta_x, distanta_y, frecventa;

void bfs(int nod_start, vector<int>& distanta) {
    queue<int> q;
    q.push(nod_start);
    distanta[nod_start] = 0;

    while (!q.empty()) {
        int nod = q.front();
        q.pop();

        for (auto vecin : graf[nod]) {
            if (distanta[vecin] == -1) {
                distanta[vecin] = distanta[nod] + 1;
                q.push(vecin);
            }
        }
    }
}

int main() {
    distanta_x.reserve(MAX_NODURI + 1);
    distanta_y.reserve(MAX_NODURI + 1);
    frecventa.reserve(MAX_NODURI + 1);

    ifstream fin("graf.in");
    ofstream fout("graf.out");

    int noduri, muchii, nod_x, nod_y;
    fin >> noduri >> muchii >> nod_x >> nod_y;

    while (muchii--) {
        int a, b;
        fin >> a >> b;
        graf[a].push_back(b);
        graf[b].push_back(a);
    }

    distanta_x.resize(noduri + 1, -1);
    distanta_y.resize(noduri + 1, -1);

    bfs(nod_x, distanta_x);
    bfs(nod_y, distanta_y);

    int distanta_totala = distanta_x[nod_y];

    // Lungimea totală a drumului va fi egală cu distanta_x[nod_y].
    for (int nod = 1; nod <= noduri; nod++) {
        if (distanta_x[nod] == -1 || distanta_y[nod] == -1) {
            continue;
        }

        if (distanta_x[nod] + distanta_y[nod] == distanta_totala) {
            frecventa[distanta_x[nod]]++;
        }
    }

    for (int nod = 1; nod <= noduri; nod++) {
        if (distanta_x[nod] == -1 || distanta_y[nod] == -1) {
            continue;
        }

        if (distanta_x[nod] + distanta_y[nod] == distanta_totala
            && frecventa[distanta_x[nod]] == 1) {
            noduri_comune.push_back(nod);
        }
    }

    fout << noduri_comune.size() << '\n';
    for (const auto& nod : noduri_comune) {
        fout << nod << ' ';
    }

    return 0;
}