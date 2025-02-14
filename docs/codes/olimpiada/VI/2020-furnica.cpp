#include <fstream>
using namespace std;
ifstream fin("furnica.in");
ofstream fout("furnica.out");
long long c, n, lun, f, rez, sum, l, lmax, cnt, k;
int main() {
    fin >> c >> n;
    if (c == 1) {
        while (n--) {
            fin >> lun >> f;
            if (rez < f) {
                sum += 5 * (f - rez);
                sum += 3 * lun;
                rez = f;
            } 
            else if (rez > f) {
                    sum += 2 * (rez - f);
                    sum += 3 * lun;
                    rez = f;
                } 
            else if (rez == f) {
                sum += 3 * lun;
            }
        }
        fout << sum + rez * 2;
    } 
    else if (c == 2) {
        while (n--) {
            fin >> lun >> f;
            if (rez > f) {
                if (l > lmax) lmax = l;
                l = 0;
                l += lun;
                rez = f;
            } 
            else if (rez == f) {
                    l += lun;
                } 
            else if (rez < f) {
                l += lun;
                l += (f - rez);
                rez = f;
            }
        }
        if (l > lmax) 
            lmax = l;
        fout << lmax;
    } 
    else {
        fin >> k;
        for (int i = 1; i <= n; ++i) {
            fin >> lun >> f;
            if (rez < f) 
                sum += 5 * (f - rez);
            if (rez > f) 
                sum += 2 * (rez - f);
            if (sum >= k && rez > f) {
                fout << i - 1;
                return 0;
            }
            sum += 3 * lun;
            if (sum >= k) {
                fout << i;
                return 0;
            }
            rez = f;
        }
        fout << n;
    }
    return 0;
}