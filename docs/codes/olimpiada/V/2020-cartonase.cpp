#include <fstream>
using namespace std;

ifstream fin("cartonase.in");
ofstream fout("cartonase.out");

int c, n, i, lp, rp, l, r, cnt, lg, lgmax;

int main() {
    fin >> c >> n;

    if (c == 1) {
        fin >> lp >> rp;
        for (i = 2; i <= n; i++) {
            fin >> l >> r;
            if (l == rp) {
                cnt++;
            }
            lp = l, rp = r;
        }
        fout << cnt << '\n';
    } 
    else if (c == 2) {
        fin >> lp >> rp;
        lg = 1;
        for (i = 2; i <= n; i++) {
            fin >> l >> r;
            if (l == rp) {
                lg++;
                if (lg > lgmax) {
                    lgmax = lg;
                }
            } 
            else {
                lg = 1;
            }
            lp = l, rp = r;
        }
        fout << lgmax << '\n';
    } 
    else {
        fin >> lp >> rp;
        lg = 1;
        for (i = 2; i <= n; i++) {
            fin >> l >> r;
            if (l == rp) {
                lg++;
                if (lg > lgmax) {
                    lgmax = lg;
                    cnt = 1;
                } 
                else if (lg == lgmax) {
                    cnt++;
                }
            } 
            else {
                lg = 1;
            }
            lp = l, rp = r;
        }
        fout << cnt << '\n';
    }
    return 0;
}