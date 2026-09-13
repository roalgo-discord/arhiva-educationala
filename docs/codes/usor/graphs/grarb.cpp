#include <fstream>
#include <vector>

using namespace std;

vector<vector<int>> graf;
vector<bool> vizitat;

void dfs(int nod) {
    vizitat[nod] = true;
    for (auto vecin : graf[nod]) {
        if (!vizitat[vecin]) {
            dfs(vecin);
        }
    }
}

int main() {
    ifstream fin("grarb.in");
    ofstream fout("grarb.out");

    int noduri, muchii;
    fin >> noduri >> muchii;

    graf.resize(noduri + 1);
    vizitat.resize(noduri + 1, false);

    for (int i = 0; i < muchii; i++) {
        int a, b;
        fin >> a >> b;
        graf[a].push_back(b);
        graf[b].push_back(a);
    }

    int componente_conexe = 0;
    for (int i = 1; i <= noduri; i++) {
        if (!vizitat[i]) {
            dfs(i);
            componente_conexe++;
        }
    }

    int muchii_de_eliminat = muchii - noduri + componente_conexe;
    int muchii_de_adaugat = componente_conexe - 1;

    fout << muchii_de_eliminat << '\n' << muchii_de_adaugat << '\n';
    return 0;
}