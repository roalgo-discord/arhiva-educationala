// --8<-- [start:rotire_stanga]
void rotireLaStanga(int arr[], int n, int k) {
    int temp[k];

    // Păstrăm primele k elemente
    for (int i = 0; i < k; ++i) {
        temp[i] = arr[i];
    }

    // Mutăm elementele spre stânga
    for (int i = 0; i < n - k; ++i) {
        arr[i] = arr[i + k];
    }

    // Plasăm elementele păstrate la sfârșit
    for (int i = 0; i < k; ++i) {
        arr[n - k + i] = temp[i];
    }
}
// --8<-- [end:rotire_stanga]

// --8<-- [start:rotire_dreapta]
void rotireLaDreapta(int arr[], int n, int k) {
    int temp[k];

    // Păstrăm ultimele k elemente
    for (int i = 0; i < k; ++i) {
        temp[i] = arr[n - k + i];
    }

    // Mutăm elementele spre dreapta
    for (int i = n - 1; i >= k; --i) {
        arr[i] = arr[i - k];
    }

    // Plasăm elementele păstrate la început
    for (int i = 0; i < k; ++i) {
        arr[i] = temp[i];
    }
}
// --8<-- [end:rotire_dreapta]

// --8<-- [start:rotire]
void rotire(int arr[], int n, bool laStanga = true, int k = 1) {
    k = k % n;

    // Dacă k = 0 (k este multiplu de n), nu facem nimic.
    if (k == 0) {
        return;
    }

    int temp[k];
    if (laStanga) {
        rotireLaStanga(arr, n, k);
    } else {
        rotireLaDreapta(arr, n, k);
    }
}
// --8<-- [end:rotire]