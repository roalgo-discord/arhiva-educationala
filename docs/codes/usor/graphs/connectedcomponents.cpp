#include <iostream>
#include <vector>

using namespace std;

vector<vector<int>> graf;
vector<bool> vizitat;

void dfs(int nod) {
    vizitat[nod] = true;

    for (int vecin : graf[nod]) {
        if (!vizitat[vecin]) {
            dfs(vecin);
        }
    }
}

int main() {
    int noduri, muchii;
    cin >> noduri >> muchii;

    graf.resize(noduri + 1);
    vizitat.resize(noduri + 1, false);

    for (int i = 0; i < muchii; ++i) {
        int a, b;
        cin >> a >> b;

        graf[a].push_back(b);
        graf[b].push_back(a);
    }

    int componente_conexe = 0;
    for (int nod = 1; nod <= noduri; ++nod) {
        if (!vizitat[nod]) {
            ++componente_conexe;
            dfs(nod);
        }
    }

    cout << componente_conexe << '\n';
    return 0;
}