queue<int> q;
q.push(2);
q.push(4);

while (!q.empty()) {
    // Accesăm vârful cozii cu front()
    int val = q.front();
    q.pop();

    cout << val << " ";
}
cout << '\n';

// Se va afișa 2 4