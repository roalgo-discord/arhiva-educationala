#include <iostream>
#include <vector>

using namespace std;

int n, m;
 
vector <vector<int> > v;
bool visited[100002];
int cc;
void dfs(int node)
{
	visited[node] = true;
	for(int i = 0; i < v[node].size(); ++i)
	{
		int nxt = v[node][i];
		if(visited[nxt] == false)
			dfs(nxt);
	}
}
int main()
{
	cin >> n >> m;
	v.resize(n+1);
	for(int i = 1; i <= m; ++i)
	{
		int a, b;
		cin >> a >> b;
		v[a].push_back(b);
		v[b].push_back(a);
	}
	for(int i = 1; i <= n; ++i)
		if(visited[i] == false)
		{
			++cc;
			dfs(i);
		}
	
	cout << cc << '\n';
    return 0;
}
