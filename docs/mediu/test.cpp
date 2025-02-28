const unsigned long long catalan(int n) {
    unsigned long long res = 1;

    for (int i = 1; i <= n; ++i) {
        res *= 2 * (2 * i - 1);
        res /= (i + 1);
    }

    return res;
}