void sum_cif(int numar, int &suma) {
    suma = 0;

    while (numar > 0) {
        suma += numar % 10;
        numar /= 10;
    }
}