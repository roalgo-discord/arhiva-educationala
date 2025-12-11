long long sum_div(int numar) {
    long long suma = 0;
    for (int divizor = 1; divizor * divizor <= numar; divizor++) {
        if (numar % divizor == 0) {
            suma += divizor;

            if (divizor * divizor != numar) {
                suma += numar / divizor;
            }
        }
    }
    return suma;
}