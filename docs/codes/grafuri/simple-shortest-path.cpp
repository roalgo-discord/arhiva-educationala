#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int n, m, s;

vector<vector<int> > graf;
queue<int> q;
vector<int> ans;

int main()
{
    cin >> n >> m >> s;
    graf.resize(n+1);
    ans.resize(n+1);
    for(int i = 1; i <= m; i++)
    {
        int a, b;
        cin >> a >> b;
        graf[a].push_back(b);
        graf[b].push_back(a);
    }
    for(int i = 1; i <= n; i++)
        ans[i] = -1;
    ans[s] = 0;
    
    q.push(s);
    while(!q.empty())
    {
        int nod = q.front();
        q.pop();
        for(auto x : graf[nod])
        {
            if(ans[x] == -1)
            {
                ans[x] = ans[nod] + 1;
                q.push(x);
            }
        }
    }
    
    for(int i = 1; i <= n; i++)
        cout << ans[i] << " ";
    cout << '\n';
    
    return 0;
}
