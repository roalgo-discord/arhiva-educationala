string s;
for (int i = 1; i <= 1000000; i++) {  // O(n)
    s += 'a';
}
string t;
for (int i = 1; i <= 1000000; i++) {  // O(n^2)
    t = t + 'a';
}