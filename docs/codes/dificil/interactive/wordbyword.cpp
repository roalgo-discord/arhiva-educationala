#include <string>

#include "word-by-word.h"

char lit[5];

std::string solve() {
    int i, j, n, m;
    std::string a, b, ans = "?????";
    char ch;
    n = 0;
    for (i = 0; i < 5; i++) {
        a = "";
        for (j = 0; j < 5; j++) {
            ch = 5 * i + j + 'a';
            a += ch;
        }
        b = guess(a);
        for (j = 0; j < 5; j++) {
            if (b[j] != 'W') {
                ch = 5 * i + j + 'a';
                lit[n++] = ch;
            }
        }
    }
    if (n < 5) {
        lit[n++] = 'z';
    }
    m = std::min(n, 4);
    for (i = 0; i < m; i++) {
        a = "";
        for (j = 0; j < 5; j++) {
            a += lit[i];
        }
        b = guess(a);
        for (j = 0; j < 5; j++) {
            if (b[j] == 'G') {
                ans[j] = lit[i];
            }
        }
    }
    if (n == 5) {
        for (i = 0; i < 5; i++) {
            if (ans[i] == '?') {
                ans[i] = lit[4];
            }
        }
    }
    return ans;
}