stack<int> s;
s.push(5);
s.push(8);

while (!s.empty()) {
    // Accesăm vârful cozii cu top()
    int val = s.top();
    s.pop();

    cout << val << " ";
}
cout << '\n';

// Se va afișa 8 5