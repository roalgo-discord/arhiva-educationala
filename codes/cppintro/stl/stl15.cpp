map<int, int> mp;

mp[2] = 5;
mp[4] = 6;

cout << mp[2] << '\n';  // 2
cout << mp[3] << '\n';  // 0

// Notă: it este de tipul map<int,int>::iterator.
// Nimeni nu vrea să scrie asta, așa că este mai comun să
// se scrie cu auto.

// Se va afișa:
//
//   2 5
//   3 0
//   4 6

for (auto it = mp.begin(); it != mp.end(); it++) {
    cout << it->first << " " << it->second << '\n';
}
mp.erase(3);

mp.clear();

mp[3] = 4;
mp[3] = 5;
mp[6] = 1;

for (auto it : mp) {
    cout << it.first << " " << it.second << '\n';
}

if (mp.find(10) != mp.end()) {
    cout << "Cheia 10 este in map\n";
} else {
    cout << "Cheia 10 nu este in map\n";
}