#include <iostream>
#include <vector>

using namespace std;

vector<vector<int>> graf;
vector<int> vizitat, parinte;

int nod_inceput, nod_sfarsit;

void dfs(int parinte_nod, int nod_curent) {
    vizitat[nod_curent] = 1;
    for (int vecin : graf[nod_curent]) {
        if (vecin == parinte_nod) {
            continue;
        }
        if (vizitat[vecin]) {
            nod_inceput = nod_curent;
            nod_sfarsit = vecin;
        } else {
            parinte[vecin] = nod_curent;
            dfs(nod_curent, vecin);
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int noduri, muchii;
    cin >> noduri >> muchii;

    graf.resize(noduri + 1);
    parinte.resize(noduri + 1);
    vizitat.resize(noduri + 1);

    for (int i = 1; i <= muchii; i++) {
        int a, b;
        cin >> a >> b;
        graf[a].push_back(b);
        graf[b].push_back(a);
    }

    for (int nod = 1; nod <= noduri; nod++) {
        if (!vizitat[nod]) {
            dfs(0, nod);
        }
    }

    if (nod_inceput == 0) {
        cout << "IMPOSSIBLE";
        return 0;
    }

    vector<int> ciclu;
    ciclu.push_back(nod_inceput);

    while (nod_sfarsit != nod_inceput) {
        ciclu.push_back(nod_sfarsit);
        nod_sfarsit = parinte[nod_sfarsit];
    }

    ciclu.push_back(nod_inceput);

    cout << ciclu.size() << '\n';

    for (auto nod : ciclu) {
        cout << nod << " ";
    }
    return 0;
}