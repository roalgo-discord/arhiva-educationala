#include <fstream>
using namespace std;

int mat[105][105];

int main() {
    ifstream cin("foto.in");
    ofstream cout("foto.out");

    int cer, n, m, lin, col, cnt, ans, num, cer2;
    cin >> cer >> n >> m;

    for (lin = 1; lin <= n; lin++) {
        for (col = 1; col <= m; col++) {
            cin >> mat[lin][col];
        }
    }

    ans = num = cer2 = 0;
    for (lin = 1; lin <= n; lin++) {
        cnt = 0;
        for (col = 1; col <= m; col++) {
            if (!mat[lin][col]) {
                cnt++;
            } else {
                cnt = 0;
            }

            ans = max(ans, cnt);
        }
    }

    for (lin = 1; lin <= n; lin++) {
        for (col = 1; col <= m; col++) {
            if (mat[lin][col]) {
                if (mat[lin - 1][col - 1] == 0 && mat[lin - 1][col + 1] == 0
                    && mat[lin - 1][col] == 0) {
                    num++;
                }
                cer2 = max(cer2, (mat[lin][col] +=
                                  (mat[lin - 1][col - 1] + mat[lin - 1][col + 1]
                                   + mat[lin - 1][col])));
            }
        }
    }
    if (cer == 1) {
        cout << ans;
    } else {
        cout << num << " " << cer2 << "\n";
    }
    return 0;
}