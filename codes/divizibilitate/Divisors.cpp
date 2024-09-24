#include <iostream>
using namespace std;

void tip1(int n)
{
	bool prim = 1;
	if(n == 1)
		prim = 0;
	for(int i = 2; i * i <= n; i++)
		if(n % i == 0)
			prim = 0;
	if(prim)
		cout << "YES" << '\n';
	else
		cout << "NO" << '\n';
}

void tip2(int n)
{
	int nrdiv = 0;
	for(int i = 1; i * i <= n; i++)
		if(n % i == 0)
		{
			nrdiv++;
			if(n / i != i)
				nrdiv++;
		}
	cout << nrdiv << '\n';
}

void tip3(int n)
{
	int nrdivprim = 0;
	for(int i = 2; i * i <= n; i++)
		if(n % i == 0)
		{
			nrdivprim++;
			while(n % i == 0)
				n = n / i;
		}
	if(n > 1)
		nrdivprim++;
	cout << nrdivprim << '\n';
}

void tip4(int n)
{
	for(int i = 2; i * i <= n; i++)
		if(n % i == 0)
		{
			cout << i << " ";
			int cnt = 0;
			while(n % i == 0)
			{
				cnt++;
				n = n / i;
			}
			cout << cnt << '\n';
		}
	if(n > 1)
		cout << n << " " << 1 << '\n';
}

int main()
{
	int t;
	cin >> t;
	
	for(int i = 1; i <= t; i++)
	{
		int tip, n;
		cin >> tip >> n;
		
		// vom apela o alta functie pentru fiecare tip
		if(tip == 1)
			tip1(n);
		if(tip == 2)
			tip2(n);
		if(tip == 3)
			tip3(n);
		if(tip == 4)
			tip4(n);
	}
	
	return 0;
}
