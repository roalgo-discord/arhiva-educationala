#include <iostream>
#include <vector> 

using namespace std;

const int NMAX = 1000000;

int q, prime[NMAX + 1];

vector<vector<int> > divisors, prime_divisors;

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    divisors.resize(NMAX + 1);
    prime_divisors.resize(NMAX + 1);

    for(int i = 1; i <= NMAX; i++)
        for(int j = i; j <= NMAX; j += i)
            divisors[j].push_back(i);
        
    prime[1] = 1;
    for(int i = 2; i <= NMAX; i++)
        if(prime[i] == 0)
            for(int j = i; j <= NMAX; j += i)
            {
                prime_divisors[j].push_back(i);
                if(j != i)
                    prime[j] = 1;
            }
        
    cin >> q;
    
    for(int i = 1; i <= q; i++)
    {
        int type, value;
        cin >> type >> value;
        if(type == 1)
            cout << (prime[value] == 0 ? "Prime" : "Composite") << '\n';
        if(type == 2)
        {
            for(int j = 0; j < (int) prime_divisors[value].size(); j++)
                cout << prime_divisors[value][j] << " ";
            cout << '\n';
        }
        if(type == 3)
        {
            for(int j = 0; j < (int) divisors[value].size(); j++)
                cout << divisors[value][j] << " ";
            cout << '\n';
        }
    }
    return 0;
}
