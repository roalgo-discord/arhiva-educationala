char c(int n) {
    if (n <= 80) {
        return 'C';
    }
    // Pentru n > 80, funcția nu returnează nimic,
    // deci funcția are undefined behavior în acel
    // domeniu.
}