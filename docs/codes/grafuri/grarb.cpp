#include <fstream>
#include <vector>

using namespace std;

ifstream cin("grarb.in");
ofstream cout("grarb.out");

int n, m, nr = 0;
vector<vector<int> > v;
vector<int> viz;

void dfs(int nod)
{
    viz[nod] = 1;
    for(int i = 0; i < (int) v[nod].size(); i++)
    {
        int nxt = v[nod][i];
        if(!viz[nxt])
            dfs(nxt);
    }
}
int main()
{
    cin >> n >> m;
    v.resize(n+1);
    viz.resize(n+1);
    
    for(int i = 1; i <= m; i++)
    {
        int a, b;
        cin >> a >> b;
        v[a].push_back(b);
        v[b].push_back(a);
    }
    
    for(int i = 1; i <= n; i++)
        if(!viz[i])
        {
            dfs(i);
            nr++;
        }
    
    cout << m + nr - 1 - (n - 1) << '\n' << nr - 1 << '\n';
    return 0;
}