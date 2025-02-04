#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int numar_evenimente;
    cin >> numar_evenimente;

    vector<pair<int, int>> evenimente(numar_evenimente);

    for (auto& eveniment : evenimente) {
        cin >> eveniment.second >> eveniment.first;
    }

    sort(evenimente.begin(), evenimente.end());

    int numar_maxim_evenimente = 0;
    int timp_ultim_eveniment = 0;

    for (const auto& eveniment : evenimente) {
        if (eveniment.second >= timp_ultim_eveniment) {
            ++numar_maxim_evenimente;
            timp_ultim_eveniment = eveniment.first;
        }
    }

    cout << numar_maxim_evenimente << '\n';
    return 0;
}