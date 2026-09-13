int factorial(int n) {
    // Cazul de bază
    if (n <= 1) {
        return 1;
    }

    // Apel recursiv
    return factorial(n - 1) * n;
}