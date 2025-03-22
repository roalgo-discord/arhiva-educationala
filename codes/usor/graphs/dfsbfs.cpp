// --8<-- [start:dfs]
vector<vector<int>> graf;

void dfs(int nod, vector<bool>& vizitat) {
    vizitat[nod] = true;

    // Ca exemplu
    cout << nod << ' ';

    for (auto vecin : graf[nod]) {
        if (!vizitat[vecin]) {
            dfs(vecin, vizitat);
        }
    }
}
// --8<-- [end:dfs]

// --8<-- [start:bfs]
vector<vector<int>> graf;
vector<int> distanta;
queue<int> q;

void bfs(int nod_start) {
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
// --8<-- [end:bfs]