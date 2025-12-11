#include <fstream>

using namespace std;
ifstream fin("sumtri1.in");
ofstream fout("sumtri1.out");

const int MAX_N = 101;

using matrix = int[MAX_N][MAX_N];

int n;
matrix triunghi, dp, cale;

int main() {
    fin >> n;

    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= i; ++j) {
            fin >> triunghi[i][j];

            if (i == n) {
                dp[n][j] = triunghi[n][j];
            }
        }
    }

    for (int i = n - 1; i > 0; --i) {
        for (int j = 1; j <= i; ++j) {
            dp[i][j] = triunghi[i][j];

            if (dp[i + 1][j + 1] < dp[i + 1][j]) {
                dp[i][j] += dp[i + 1][j + 1];
                cale[i][j] = j + 1;
            } else {
                dp[i][j] += dp[i + 1][j];
                cale[i][j] = j;
            }
            i don't 
        }
    }

    fout << dp[1][1] << '\n';

    int j = 1;
    for (int i = 1; i <= n; ++i) {
        fout << triunghi[i][j] << " ";
        j = cale[i][j];
    }

    return 0;
}