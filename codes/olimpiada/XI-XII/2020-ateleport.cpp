#include <fstream>
#include <set>
#include <vector>

#define fi first
#define se second

int n, m, p, l, k;

int dp[10002][12][12];
bool viz[10002][12][12];

std::vector<std::pair<int, int> > v[10002];

void djk() {
    std::set<std::pair<std::pair<int, int>, std::pair<int, int> > > s;
    viz[1][0][0] = 1;
    s.insert({
        {0, 1},
        {0, 0}
    });
    while (!s.empty()) {
        std::pair<std::pair<int, int>, std::pair<int, int> > state = *s.begin();
        s.erase(state);
        int cost = state.fi.fi;
        int node = state.fi.se;
        int used = state.se.fi;
        int lft = state.se.se;
        if (lft) {
            for (int i = 0; i < (int)v[node].size(); ++i) {
                int nxt = v[node][i].fi;
                std::pair<std::pair<int, int>, std::pair<int, int> > newstate =
                    {
                        {cost, nxt    },
                        {used, lft - 1}
                };
                if (!viz[nxt][used][lft - 1]) {
                    viz[nxt][used][lft - 1] = 1;
                    dp[nxt][used][lft - 1] = cost;
                    s.insert(newstate);
                } else if (cost < dp[nxt][used][lft - 1]) {
                    newstate.fi.fi = dp[nxt][used][lft - 1];
                    s.erase(newstate);

                    dp[nxt][used][lft - 1] = cost;
                    newstate.fi.fi = dp[nxt][used][lft - 1];

                    s.insert(newstate);
                }
            }
        }
        if (l && used + 1 <= k) {
            for (int i = 0; i < (int)v[node].size(); ++i) {
                int nxt = v[node][i].fi;
                std::pair<std::pair<int, int>, std::pair<int, int> > newstate =
                    {
                        {cost + p, nxt  },
                        {used + 1, l - 1}
                };
                if (!viz[nxt][used + 1][l - 1]) {
                    viz[nxt][used + 1][l - 1] = 1;
                    dp[nxt][used + 1][l - 1] = cost + p;
                    s.insert(newstate);
                } else if (cost + p < dp[nxt][used + 1][l - 1]) {
                    newstate.fi.fi = dp[nxt][used + 1][l - 1];
                    s.erase(newstate);

                    dp[nxt][used + 1][l - 1] = cost + p;
                    newstate.fi.fi = dp[nxt][used + 1][l - 1];

                    s.insert(newstate);
                }
            }
        }
        for (int i = 0; i < (int)v[node].size(); ++i) {
            int nxt = v[node][i].fi;
            int adcost = v[node][i].se;
            std::pair<std::pair<int, int>, std::pair<int, int> > newstate = {
                {cost + adcost, nxt},
                {used,          0  }
            };
            if (!viz[nxt][used][0]) {
                viz[nxt][used][0] = 1;
                dp[nxt][used][0] = cost + adcost;
                s.insert(newstate);
            } else if (cost + adcost < dp[nxt][used][0]) {
                newstate.fi.fi = dp[nxt][used][0];
                s.erase(newstate);

                dp[nxt][used][0] = cost + adcost;
                newstate.fi.fi = dp[nxt][used][0];

                s.insert(newstate);
            }
        }
    }
}
int main() {
    std::ifstream cin("ateleport.in");
    std::ofstream cout("ateleport.out");
    cin >> n >> m >> p >> l >> k;
    for (int i = 1; i <= m; ++i) {
        int x, y, t;
        cin >> x >> y >> t;
        v[x].push_back({y, t});
        v[y].push_back({x, t});
    }
    djk();
    int minans = (1 << 30);
    for (int i = 0; i <= k; ++i) {
        for (int j = 0; j <= l; ++j) {
            if (viz[n][i][j]) {
                minans = std::min(minans, dp[n][i][j]);
            }
        }
    }
    cout << minans << '\n';
    return 0;
}
