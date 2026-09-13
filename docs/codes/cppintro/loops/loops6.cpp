#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int x = 1;
    while (x <= n) {
        cout << x * 2 << " ";
        x++;
    }
    return 0;
}