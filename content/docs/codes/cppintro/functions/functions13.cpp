void f(int x) {
    if (x) {
        if (x % 3 == 0) {
            cout << 3;
            f(x / 3);
        } else {
            f(x / 3);
            cout << x % 3;
        }
    }
}