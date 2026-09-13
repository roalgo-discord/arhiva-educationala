set<int> s;

s.insert(1);   // [1]
s.insert(14);  // [1, 14]
s.insert(9);   // [1, 9, 14]
s.insert(2);   // [1, 2, 9, 14]

cout << *s.upper_bound(7) << '\n';  // 9
cout << *s.upper_bound(9) << '\n';  // 14

cout << *s.lower_bound(5) << '\n';  // 9
cout << *s.lower_bound(9) << '\n';  // 9

cout << *s.begin() << '\n';   // 1
cout << *s.rbegin() << '\n';  // 14

auto it = s.end();
cout << *(--it) << '\n';  // 14

s.erase(s.upper_bound(6));  // [1, 2, 14]

for (auto it = s.begin(); it != s.end(); it++) {
    cout << *it << '\n';  // 1, 2, 14
}

for (auto it = s.rbegin(); it != s.rend(); it++) {
    cout << *it << '\n';  // 14, 2, 1
}