#include <iostream>
#include <string>

using namespace std;

int main() {
    string str = "roalgo este cel mai bun server din romania";

    size_t first = str.find('e');         // 7
    size_t last = str.find_last_of('e');  // 28

    if (first != string::npos) {
        cout << first << '\n';
    }

    if (last != string::npos) {
        cout << last << '\n';
    }

    return 0;
}