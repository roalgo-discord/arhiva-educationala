cout << 594943 * 204232 << '\n';  // overflow

cout << 1LL * 594943 * 204232 << '\n';  // ok

cout << (long long)594943 * 204232 << '\n';  // ok
cout << 594943LL * 204232 << '\n';           // echivalent

cout << 594943 * (long long)204232 << '\n';  // ok
cout << 594943 * 204232LL << '\n';           // echivalent