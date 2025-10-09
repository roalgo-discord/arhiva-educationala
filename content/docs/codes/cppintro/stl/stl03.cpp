// Următoarele operații sunt liniare.

// * `grid` va avea 5 linii și 8 coloane
grid.resize(5, vector<int>(8));
// * Redimensionăm vectorul să aibă 7 valori, toate -3
v2.resize(7, -3);
// * Redimensionăm vectorul să aibă 5 elemente
v.resize(5);

// Următoarele operații se fac în timp constant.

// * Adăugarea elementului x de la final
v.push_back(x);
// * Eliminarea elementului de la final
v.pop_back();

// Următoarele operații sunt liniare.

// * Inserăm 6 la poziția 2
v.insert(v.begin() + 2, 6);
// * Inserăm 9 de 5 ori începând de la poziția 3
v.insert(v.begin() + 3, 5, 9);
// * Ștergem valoarea de pe poziția 4
v.erase(v.begin() + 4);
// * Ștergem valorile de la poziția 2 la poziția 4
v.erase(v.begin() + 2, v.begin() + 5);