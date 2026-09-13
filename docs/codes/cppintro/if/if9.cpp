cout << A || B && C;       // A || (B && C)
cout << A && B || C && D;  // (A && B) || (C && D)
cout << A && B && C || D;  // ((A && B) && C) || D
cout << !A && B || C;      // ((!A) && B) || C