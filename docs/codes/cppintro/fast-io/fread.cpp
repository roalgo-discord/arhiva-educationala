#include <cassert>
#include <cstring>
#include <iostream>

const int MOD = 1e9 + 7;
const int BUF_SZ = 1 << 15;

inline namespace Input {
    char buf[BUF_SZ];
    int pos, len;
    char next_char() { // se citeste un caracter
        if (pos == len) {
            pos = 0;
            len = (int)fread(buf, 1, BUF_SZ, stdin);
            if (!len) {
                return EOF;
            }
        }
        return buf[pos++];
    }

    int read_int() { // se citeste un numar intreg, eventual negativ
        int x;
        char ch;
        int sgn = 1;
        while (!isdigit(ch = next_char())) {
            if (ch == '-') {
                sgn *= -1;
            }
        }
        x = ch - '0';
        while (isdigit(ch = next_char())) {
            x = x * 10 + (ch - '0');
        }
        return x * sgn;
    }
}  

inline namespace Output {
    char buf[BUF_SZ];
    int pos;

    void flush_out() {
        fwrite(buf, 1, pos, stdout);
        pos = 0;
    }

    void write_char(char c) { // se afiseaza un caracter
        if (pos == BUF_SZ) {
            flush_out();
        }
        buf[pos++] = c;
    }

    void write_int(int x) { // se afiseaza un numar intreg
        static char num_buf[100];
        if (x < 0) {
            write_char('-');
            x *= -1;
        }
        int len = 0;
        for (; x >= 10; x /= 10) {
            num_buf[len++] = (char)('0' + (x % 10));
        }
        write_char((char)('0' + x));
        while (len) {
            write_char(num_buf[--len]);
        }
        write_char('\n');
    }

    // se da flush la output cand se termina programul
    void init_output() { 
        assert(atexit(flush_out) == 0); 
    }
}  

int main() {
    init_output();
    int M = read_int();
    int N = read_int();
    int ans = 0;
    for (int i = 0; i < N; i++) {
        ans = (ans + read_int()) % MOD;
        if (M == 1) {
            write_int(ans);
        }
    }
    if (M == 0) {
        write_int(ans);
    }
    return 0;
}