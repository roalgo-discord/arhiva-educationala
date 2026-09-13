// Declararea matricii cu 3 linii și 2 coloane
vector<vector<int>> grid(3, vector<int>(2));

// Declararea cubului
vector<vector<vector<int>>> cube;

// Declarăm n linii
vector<vector<int>> grid2(n);

// Matrice triunghiulară
for (int i = 0; i < n; i++) {
    grid2.resize(i + 1);
}