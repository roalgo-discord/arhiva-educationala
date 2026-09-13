int i = 1;
int j = 1;
int poz = 0;

// Mergem prin tablou până când am parcurs unul din ele.
while (i <= n && j <= m) {
    poz++;

    // Punem în C elementul mai mic dintre A[i] și B[j]
    if (A[i] <= B[j]) {
        C[poz] = A[i];
        i++;
    } else {
        C[poz] = B[j];
        j++;
    }
}

// Dacă mai există elemente în A, adaugă-le în C.
while (i <= n) {
    poz++;
    C[poz] = A[i];
    i++;
}

// Dacă mai există elemente în B, adaugă-le în C.
while (j <= m) {
    poz++;
    C[poz] = B[j];
    j++;
}