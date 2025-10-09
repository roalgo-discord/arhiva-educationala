#include <fstream>

using namespace std;
ifstream fin("sumtri1.in");
ofstream fout("sumtri1.out");

const int MAX_N = 101;

using matrixB = bool[MAX_N][MAX_N];
using matrixI = int[MAX_N][MAX_N];

matrixB change;
matrixI triunghi, dp;

int n;
int ans;

int solve(const int lin, const int col) {
    if (dp[lin][col] != 0) {
        return dp[lin][col];
    }
    if (lin > n) {
        return 0;
    }

    const int left = solve(lin + 1, col);
    const int right = solve(lin + 1, col + 1);

    if (left < right) {
        dp[lin][col] = triunghi[lin][col] + left;
        change[lin][col] = false;
    } else {
        dp[lin][col] = triunghi[lin][col] + right;
        change[lin][col] = true;
    }
    return dp[lin][col];
}

int main() {
    fin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            fin >> triunghi[i][j];
        }
    }

    fout << solve(1, 1) << '\n';

    for (int l = 1, c = 1; l <= n; l++) {
        fout << triunghi[l][c] << ' ';
        if (change[l][c]) {
            c++;
        }
    }
    return 0;
}