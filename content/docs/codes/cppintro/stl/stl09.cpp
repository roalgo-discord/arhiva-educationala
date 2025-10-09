pair<int, int> pr = make_pair(5, 8);

cout << pr.first << '\n';   // 5
cout << pr.second << '\n';  // 8

pair<int, int> p2 = {10, 12};
cout << p2.first << '\n';   // 10
cout << p2.second << '\n';  // 12

pair<pair<int, int>, pair<int, int>> p = {
    {2, 4},
    {1, 3}
};
cout << p.first.first << '\n';    // 2
cout << p.first.second << '\n';   // 4
cout << p.second.first << '\n';   // 1
cout << p.second.second << '\n';  // 3