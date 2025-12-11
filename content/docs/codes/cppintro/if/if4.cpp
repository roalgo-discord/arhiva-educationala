int a = 1;
int b = 3;

// 1. a < 1 == 1 < 1 == false
// 2. b > 3 == 3 > 3 == false
// 3. false && false == false
//
// => (a < 1) && (b > 3) == false

cout << (a < 1) && (b > 3);  // 0

// 1. b < 5 == 3 < 5   == true
// 2. a > -4 == 1 > -4 == true
//
// 3. not (b < 5)      == false
// 4. not (a > -4)     == false
//
// 5. false && false   == false
//
// => not (b < 5) and not (a > -4) == false

cout << not(b < 5) and not(a > -4);  // 0

// 1. b >= 3 == 3 >= 3   == true
// 2. a > 4  == 1 > 4    == false
//
// 3. !(a > 4) == !false == true
//
// 4. true && true       == true
//
// => (b >= 3) && !(a > 4) == true

cout << (b >= 3) && !(a > 4);  // 1