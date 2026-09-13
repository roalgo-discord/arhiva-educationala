#include <cassert>
#include <iostream>
#include <string>
#include <vector>

#include "testlib.h"

using namespace std;

int n, len;
string s;
int main(int argc, char* argv[]) {
    registerTestlibCmd(argc, argv);
    n = inf.readInt();
    len = ouf.readInt();
    ouf.readEoln();
    s = ouf.readLine();
    if (len > 2 * n) {
        quitf(_wa, "The length is too big");
    }
    if (len != s.size()) {
        quitf(_wa, "Wrong length");
    }
    if (s[0] == '0') {
        quitf(_wa, "The number has leading zeroes");
    }
    int rest = 0;
    for (int i = 0; i < s.size(); ++i) {
        rest = (rest * 10 + (s[i] - '0')) % n;
    }
    if (rest != 0) {
        quitf(_wa, "The number is not a multiple of n");
    }
    quitf(_ok, "The number is good");
    return 0;
}