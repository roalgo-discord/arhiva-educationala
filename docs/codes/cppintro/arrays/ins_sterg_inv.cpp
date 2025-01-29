// --8<-- [start:inserare]
for (int i = n; i >= k; i--) {
    v[i + 1] = v[i];
}

v[k] = x;

n++;  // (1)
// --8<-- [end:inserare]

// --8<-- [start:inserare_warning]
for (int i = k; i <= n; i++) {
    v[i + 1] = v[i];
}

v[k] = x;

n++; 
// --8<-- [end:inserare_warning]

// --8<-- [start:stergere]
for (int i = k; i < n; i++) {
    v[i] = v[i + 1];
}

n--; // (1)
// --8<-- [end:stergere]

// --8<-- [start:stergere_warning]
for (int i = n; i > k; i--) {
    v[i - 1] = v[i];
}

n--; 
// --8<-- [end:stergere_warning]

// --8<-- [start:inversare]
for (int i = 1; i <= n / 2; i++) {
    int x = v[i];         // (1)
    v[i] = v[n - i + 1];  // (2)
    v[n - i + 1] = x;     // (3)
}
// --8<-- [end:inversare]