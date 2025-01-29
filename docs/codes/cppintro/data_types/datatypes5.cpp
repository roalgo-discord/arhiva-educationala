#include <algorithm>  // Pentru std::reverse
#include <iostream>
#include <string>  // Pentru std::string

// Citire
std::istream &operator>>(std::istream &in, __int128 &num) {
    num = 0;

    std::string s;
    in >> s;

    if (s.empty()) {
        return in;
    }

    bool neg = (s[0] == '-');
    int start = (neg ? 1 : 0);

    for (int i = start; i < s.size(); ++i) {
        num = num * 10 + (s[i] - '0');
    }

    if (neg) {
        num = -num;
    }

    return in;
}

// Afișare
std::ostream &operator<<(std::ostream &out, __int128 num) {
    if (num == 0) {
        out << "0";
        return out;
    }

    bool neg = (num < 0);
    if (neg) {
        num = -num;
    }

    std::string s;
    while (num > 0) {
        s.push_back('0' + num % 10);
        num /= 10;
    }

    if (neg) {
        s.push_back('-');
    }

    std::reverse(s.begin(), s.end());
    out << s;
    return out;
}