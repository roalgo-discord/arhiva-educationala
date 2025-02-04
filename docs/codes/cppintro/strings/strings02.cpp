// --8<-- [start:isdigit]
cout << isdigit('5') << '\n';  // 1
cout << isdigit('z') << '\n';  // 0
cout << isdigit('Q') << '\n';  // 0
cout << isdigit('.') << '\n';  // 0
// --8<-- [end:isdigit]

// --8<-- [start:isalpha]
cout << isalpha('3') << '\n';  // 0
cout << isalpha('A') << '\n';  // 1
cout << isalpha('a') << '\n';  // 1
cout << isalpha('?') << '\n';  // 0
// --8<-- [end:isalpha]

// --8<-- [start:isalnum]
cout << isalnum('7') << '\n';  // 1
cout << isalnum('z') << '\n';  // 1
cout << isalnum('@') << '\n';  // 0
cout << isalnum('P') << '\n';  // 1
// --8<-- [end:isalnum]

// --8<-- [start:isupper]
cout << isupper('3') << '\n';  // 0
cout << isupper('A') << '\n';  // 1
// --8<-- [end:isupper]

// --8<-- [start:islower]
cout << islower('a') << '\n';  // 1
cout << islower('?') << '\n';  // 0
// --8<-- [end:islower]

// --8<-- [start:toupper]
cout << (char)toupper('a') << '\n';  // A
cout << (char)toupper('A') << '\n';  // A
cout << (char)toupper('3') << '\n';  // 3
cout << (char)toupper('@') << '\n';  // @
// --8<-- [end:toupper]

// --8<-- [start:tolower]
cout << (char)tolower('a') << '\n';  // a
cout << (char)tolower('A') << '\n';  // a
cout << (char)tolower('3') << '\n';  // 3
cout << (char)tolower('@') << '\n';  // @
// --8<-- [end:tolower]