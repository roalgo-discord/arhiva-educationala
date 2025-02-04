deque<int> d;
d.push_front(4);
d.push_front(5);
d.push_back(7);
d.push_back(8);
d.push_front(3);

// Deque-ul conține 3 5 4 7 8

// Putem accesa valori din poziții oarecare, ca la vector
int x = d[3];

while (!d.empty()) {
    // Accesăm prima valoare
    int val = d.front();
    cout << val << " ";

    // Ștergem prima valoare
    d.pop_front();

    // Dacă mai avem elemente...
    if (d.size() > 0) {
        // Accesăm ultima valoare...
        val = d.back();

        // ...și o ștergem
        d.pop_back();

        cout << val << " ";
    }
}

cout << '\n';
// Afișăm 3 8 5 7 4