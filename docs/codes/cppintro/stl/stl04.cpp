// Afișări și prelucrări

// Afișăm vals[3], al patrulea element
cout << vals[3] << '\n';
// Afișăm dimensiunea vectorului (7)
cout << v2.size() << '\n';

vals[1] = -9;

// Afișăm vectorul vals
for (int i = 0; i < (int)vals.size(); i++) {
    cout << vals[i] << " ";
}

// Afișăm vectorul vals folosind iteratori
for (auto it = vals.begin(); it != vals.end(); ++it) {
    cout << *it << " ";
}

// Afișăm vectorul vals folosind auto
for (auto nr : vals) {
    cout << nr << " ";
}