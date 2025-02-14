#include <fstream>
#include <iostream>

using namespace std;

ifstream fin("tai.in");
ofstream fout("tai.out");

bool este_prim(int n) {
    if (n < 2) {
        return false;
    }
    int a = 2;
    while (a * a <= n) {
        if (n % a == 0) {
            return false;
        }
        a++;
    }
    return true;
}

int main() {
    int c, n, x;
    fin >> c >> n;

    if (c == 1) {
        int vmax = 0;
        for (int i = 1; i <= n; i++) {
            fin >> x;
            if (este_prim(x)) {
                if (x > vmax) {
                    vmax = x;
                }
            }
        }
        fout << vmax;
    }
    else if (c == 2) {
        int vmax = 0;
        for (int i = 1; i <= n; i++) {
            fin >> x;
            int cif = 1, aux = 1;
            int j = 1;
            while (aux > 0) {
                cif = x % (j * 10);
                aux = x / (j * 10);
                if (aux > 0) {
                    if (este_prim(cif)) {
                        if (cif > vmax) {
                            vmax = cif;
                        }
                    }
                    if (este_prim(aux)) {
                        if (aux > vmax) {
                            vmax = aux;
                        }
                    }
                }
                j *= 10;
            }
        }
        fout << vmax;
    }
    else {
        int vmax = 0;
        for (int i = 1; i <= n; i++) {
            fin >> x;
            for (int a = 10; a <= x; a *= 10) {
                for (int b = a * 10; b <= x; b *= 10) {
                    int st = x % a;
                    int mij = (x % b) / a;
                    int dr = x / b;
                    if (este_prim(st)) {
                        if (vmax < st) {
                            vmax = st;
                        }
                    }
                    if (este_prim(mij)) {
                        if (vmax < mij) {
                            vmax = mij;
                        }
                    }
                    if (este_prim(dr)) {
                        if (vmax < dr) {
                            vmax = dr;
                        }
                    }
                }
            }
        }
        fout << vmax;
    }

    return 0;
}