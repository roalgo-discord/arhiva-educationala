int x = 0;
int y = 5;

// 1. x != 0 == 0 != 0  == false
// 2. y == 0 == 5 == 0  == false
//
// 3. false or false    == false
//
// => (x != 0) or (y == 0) == false

cout << (x != 0) or (y == 0);  // 0

// 1. x + y > 10 == 0 + 5 > 10 == false
// 2. x - y < 0 == 0 - 5 < 0   == true
//
// 3. not (x - y < 0)          == !true == false
//
// 4. false or false           == false
//
// => (x + y > 10) or !(x - y < 0) == false

cout << (x + y > 10) or not(x - y < 0);  // 0

// 1. x == 1 == 0 == 1      == false
// 2. y == 10 == 5 == 10    == false
//
// 3. false || false        == false
//
// => (x == 1) || (y == 10) == false

cout << (x == 1) || (y == 10);  // 0

// 1. x < 0 == 0 < 0        == false
// 2. y > 10 == 5 > 10      == false
//
// 3. !(x < 0) == !false    == true
// 4. !(y > 10) == !false   == true
//
// 5. true || true          == true
//
// => !(x < 0) || !(y > 10) == true

cout << !(x < 0) || !(y > 10);  // 1