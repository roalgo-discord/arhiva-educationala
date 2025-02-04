#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> numere(n + 1);
    for (int i = 0; i < n; i++) {
        cin >> numere[i];
    }

    sort(numere.begin(), numere.end());

    long long produs_maxim = max(1LL * numere[n - 1] * numere[n - 2], 
                                 1LL * numere[0]     * numere[1]);

    cout << produs_maxim << '\n';
    return 0;
}