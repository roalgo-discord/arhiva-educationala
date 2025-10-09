int a = 5;
int b = 8;

// 1. a < 5 == 5 < 5 == false
// 2. not false == true
//
// => not (a < 5) == true

cout << not(a < 5);  // 1

// 1. (a == b) == (5 == 8) == false
// 2. !false == true
//
// => !(a == b) == true

cout << !(a == b);  // 1

// 1. în !a, a este transformat în true sau false
//    (0 este false, în rest este true)
// 2. !a == !5 == !true == false
// 3. false este convertit la 0, iar true la 1
// 4. 0 < 1 == true
// 5. not true == false
//
// => not (!a > 1) == false

cout << not(!a < 1);  // 0