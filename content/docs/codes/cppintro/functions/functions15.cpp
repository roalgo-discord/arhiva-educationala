int cifmin(int numar) {
    if (numar < 10) {
        return numar;
    }

    int ultima_cifra = numar % 10;
    int min_rest = cifmin(numar / 10);

    if (ultima_cifra < min_rest) {
        return ultima_cifra;
    } else {
        return min_rest;
    }
}