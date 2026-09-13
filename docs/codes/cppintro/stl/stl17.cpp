priority_queue<int> pq;
pq.push(5);
pq.push(9);
pq.push(1);

while (!pq.empty()) {
    int val = pq.top();
    pq.pop();

    cout << val << " ";
}

// Se va afișa 9 5 1