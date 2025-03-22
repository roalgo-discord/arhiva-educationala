#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    // Vector cu n elemente
    int v[n + 1];

    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }

    for (int i = 1; i <= n; i++) {
        if (v[i] % v[n] == 0) {
            cout << v[i] << " ";
        }
    }

    return 0;
}