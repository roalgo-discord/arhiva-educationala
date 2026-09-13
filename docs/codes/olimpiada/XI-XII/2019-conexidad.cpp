#include <algorithm>
#include <fstream>
#include <vector>

int n, m, cc[102], nrcc, max_extra = 1, frq[102], ord[102];
bool viz[102], ad[102];

std::vector<std::vector<int>> v, compc;

void dfs(int nod) {
    compc[nrcc].push_back(nod);
    viz[nod] = 1;
    for (int i = 0; i < (int)v[nod].size(); ++i) {
        int vecin = v[nod][i];
        if (!viz[vecin]) {
            dfs(vecin);
        }
    }
}
bool cmp(int a, int b) { return (int)compc[a].size() < (int)compc[b].size(); }

int main() {
    std::ifstream cin("conexidad.in");
    std::ofstream cout("conexidad.out");

    cin >> n >> m;

    v.resize(n + 1);
    compc.resize(n + 1);
    for (int i = 1; i <= m; ++i) {
        int a, b;
        cin >> a >> b;
        v[a].push_back(b);
        v[b].push_back(a);
    }
    for (int i = 1; i <= n; ++i) {
        if (!viz[i]) {
            ++nrcc;
            dfs(i);
        }
    }
    for (int i = 1; i <= nrcc; ++i) {
        ord[i] = i;
    }
    std::vector<std::pair<int, int>> ans;
    std::sort(ord + 1, ord + nrcc + 1, cmp);
    std::vector<int> pos;
    for (int i = nrcc; i >= 1; --i) {
        int z = ord[i];
        if (i == nrcc) {
            for (int j = 0; j < (int)compc[z].size(); ++j) {
                pos.push_back(compc[z][j]);
            }
            continue;
        }
        int mn = 105;
        int el = 0;
        for (int j = 0; j < (int)pos.size(); ++j) {
            if (frq[pos[j]] < mn) {
                mn = frq[pos[j]];
                el = pos[j];
            }
        }
        ans.push_back({el, compc[z][0]});
        frq[el]++, frq[compc[z][0]]++;
        max_extra = std::max(max_extra, std::max(frq[el], frq[compc[z][0]]));
        for (int j = 0; j < (int)compc[z].size(); ++j) {
            pos.push_back(compc[z][j]);
        }
    }
    cout << max_extra << '\n';
    cout << nrcc - 1 << '\n';
    for (int i = 0; i < (int)ans.size(); ++i) {
        cout << ans[i].first << " " << ans[i].second << '\n';
    }
    return 0;
}