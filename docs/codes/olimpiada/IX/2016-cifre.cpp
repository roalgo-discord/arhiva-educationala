#include <fstream>

int c[] = {6, 2, 5, 5, 4, 5, 6, 3, 7, 6};  // nr de segmente
int t[] = {2, 7, 2, 3, 3,
           4, 2, 5, 1, 2};  // nr de numere pe care le putem obtine
int mm[] = {1, 5, 1, 2, 2, 3, 1, 2, 0, 0};  // nr de numere mai mari
int cif[25];
char s[25];
unsigned long long p, sol;

int main() {
    std::ifstream cin("cifre.in");
    std::ofstream cout("cifre.out");
    int t1, k = 0, sum = 0, g;
    cin >> t1;
    cin >> s;
    for (k = 0; s[k]; k++) {
        cif[k] = s[k] - '0';
    }
    if (t1 == 1) {
        for (int i = 0; i < k; i++) {
            sum += c[cif[i]];
        }
        cout << sum;
    } else {
        for (int i = 0; i < k; i++) {
            p = 1;
            for (int j = i + 1; j < k; j++) {
                g = cif[j];
                p *= t[g];
            }
            sol += mm[cif[i]] * p;
        }
        cout << sol;
    }
    return 0;
}