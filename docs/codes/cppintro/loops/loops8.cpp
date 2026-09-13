#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int x = 1;
    do {
        cout << x * 2 << " ";
        x++;
    } while (x <= n);
    return 0;
}