int suma = 0;

void sum_cif(int numar) {
    suma = 0;

    while (numar > 0) {
        suma += numar % 10;
        numar /= 10;
    }
}