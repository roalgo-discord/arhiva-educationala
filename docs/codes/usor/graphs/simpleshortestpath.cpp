#include <iostream>
#include <queue>
#include <vector>

using namespace std;

int main() {
    int noduri, muchii, nod_start;
    cin >> noduri >> muchii >> nod_start;

    vector<vector<int>> graf(noduri);
    vector<int> distante(noduri, -1);
    queue<int> q;

    for (int i = 0; i < muchii; i++) {
        int a, b;
        cin >> a >> b;
        graf[a].push_back(b);
        graf[b].push_back(a);
    }

    distante[nod_start] = 0;
    q.push(nod_start);

    while (!q.empty()) {
        int nod_curent = q.front();
        q.pop();

        for (auto vecin : graf[nod_curent]) {
            if (distante[vecin] == -1) {
                distante[vecin] = distante[nod_curent] + 1;
                q.push(vecin);
            }
        }
    }

    for (const auto& distanta : distante) {
        cout << distanta << " ";
    }

    cout << '\n';

    return 0;
}