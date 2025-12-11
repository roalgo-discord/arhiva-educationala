// Declararea vectorului
vector<int> v;

// Inițializăm un vector cu 6 valori
vector<int> vals = {1, 4, 0, 1, 3, 5};

// Inițializăm un vector cu 12 valori, toate 0
vector<int> v2(12);

vector<int> copie = v2;
if (v2 == copie) {
    cout << "Egal\n";
} else {
    cout << "Inegal\n";
}