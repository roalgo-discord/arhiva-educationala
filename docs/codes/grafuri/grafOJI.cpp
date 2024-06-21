#include <fstream>
#include <vector>
#include <queue>
using namespace std;

const int MAXN = 7500;

int distX[MAXN + 1], distY[MAXN + 1], solFreq[MAXN + 1];

vector<vector<int>> goFromTo(MAXN + 5);
vector<int> ans;
queue<int> q;

void bfs(int nod, int dist[]) 
{
    int first;
    q.push(nod);
    dist[nod] = 1;

    while(!q.empty())
	{
        first = q.front();
        q.pop();

        for(auto travelNod : goFromTo[first]) 
		{
            if(dist[travelNod] == 0)
			{
                dist[travelNod] = dist[first] + 1;
                q.push(travelNod);
            }
        }
    }
}

int main() 
{
    ifstream cin("graf.in");
    ofstream cout("graf.out");

    int n, m, x, y, i, a, b, ansN;
    cin >> n >> m >> x >> y;    
    for(i = 1; i <= m; i++)
	{
        cin >> a >> b;
        goFromTo[a].push_back(b);
        goFromTo[b].push_back(a);
    }

    bfs(x, distX);
    bfs(y, distY);

    for(i = 1; i <= n; i++)
	{
        // lungimea totala a drumului va fi egala cu distX[y];
        if(distX[i] + distY[i] == distX[y] + 1) 
            solFreq[distX[i]]++;
    }

    ansN = 0;
    for(i = 1; i <= n; i++)
        if(distX[i] + distY[i] == distX[y] + 1 && solFreq[distX[i]] == 1)
		{
            ansN++;
            ans.push_back(i);
        }

    cout << ansN << '\n';
    for(i = 0; i < ansN; i++)
        cout << ans[i] << ' ';
    return 0;
}