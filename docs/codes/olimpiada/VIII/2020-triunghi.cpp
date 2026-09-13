#include <fstream>
using namespace std;

const int MAXN = 1005;
int A[MAXN][MAXN], pre[MAXN][MAXN];

int main() {
    ifstream cin("triunghi.in");
    ofstream cout("triunghi.out");

    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> A[i][j];
        }
    }
    for (int i = 1; i <= n; i++) {
        pre[i][0] = 0;
        for (int j = 1; j <= n; j++) {
            pre[i][j] = pre[i][j - 1] + A[i][j];
        }
    }

    int Q, lin, col, k;
    cin >> Q;
    int maxSum = 0;
    while (Q--) {
        cin >> lin >> col >> k;
        int sumArea = 0;
        if (k > 0) {
            for (int i = 0; i < k; i++) {
                int row = lin + i;
                int right = col + k - 1 - i;
                sumArea += pre[row][right] - pre[row][col - 1];
            }
        } else {
            int k_abs = -k;
            for (int i = 1; i <= k_abs; i++) {
                int row = lin - k_abs + i;
                int left = col - i + 1;
                sumArea += pre[row][col] - pre[row][left - 1];
            }
        }
        if (sumArea > maxSum) {
            maxSum = sumArea;
        }
    }
    cout << maxSum;
    return 0;
}