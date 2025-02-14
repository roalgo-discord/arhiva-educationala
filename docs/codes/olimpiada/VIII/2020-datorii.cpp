#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream cin("datorii.in");
    ofstream cout("datorii.out");

    int cer, n, i, j, sum;
    string line, corp1, corp2, num;

    cin >> cer >> n;
    getline(cin, line);
    map<string, long long> corp, sd, sp;
    for (i = 1; i <= n; i++) {
        getline(cin, line);

        j = 0;
        corp1 = "";
        while (line[j] != '>') {
            corp1.push_back(line[j]);
            j++;
        }
        corp1.pop_back();

        j += 2;
        corp2 = "";
        while (j < line.size()) {
            corp2.push_back(line[j]);
            j++;
        }

        num = "";
        while (isdigit(corp2.back())) {
            num.push_back(corp2.back());
            corp2.pop_back();
        }
        corp2.pop_back();

        reverse(num.begin(), num.end());
        sum = stoi(num);

        corp[corp1]++;
        corp[corp2]++;
        sd[corp1] += sum;
        sp[corp2] += sum;
    }
    if (cer == 1) {
        cout << corp.size() << "\n";
    } 
	else {
        for (auto e : corp) {
            cout << e.first << " " << sd[e.first] << " " << sp[e.first] << "\n";
        }
    }
    return 0;
}