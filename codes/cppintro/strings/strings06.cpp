// --8<-- [start:read]
string s;
getline(cin, s);
cout << s << '\n';
// --8<-- [end:read]

// --8<-- [start:idk]
string s = "abacaba";
s[0] = 'c';

cout << s.size() << '\n';  // 7

s[6] = '\0';  // caracterul nul

// abacab 7
// (nu se schimba mărimea)
cout << s << " " << s.size() << '\n';
// --8<-- [end:idk]

// --8<-- [start:concat]
string s = "roalgo";
string t = "top";
s += t;     // roalgotop
s = s + t;  // roalgotoptop
// --8<-- [end:concat]

// --8<-- [start:loops]
string s;
for (int i = 1; i <= 1000000; i++) {  // O(n)
    s += 'a';
}

string t;
for (int i = 1; i <= 1000000; i++) {  // O(n^2)
    t = t + 'a';
}
// --8<-- [end:loops]