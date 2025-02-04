#include <iostream>
#include <algorithm>

using namespace std;

int main()
{
	int t;
	cin >> t;
	
	for(int i = 1; i <= t; i++)
	{
		string s;
		cin >> s;
		
		string s2 = s;
		reverse(s2.begin(), s2.end());
		
		if(s == s2)
			cout << "DA" << '\n';
		else
			cout << "NU" << '\n';
	}
	return 0;
}

