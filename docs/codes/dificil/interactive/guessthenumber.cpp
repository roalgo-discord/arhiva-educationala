#include <iostream>
 
int main () {
    int low = 1;
    int high = 1000000;
    int tgt = 0;
    for (int pw = 19; pw >= 0; pw--) {
        int guess = low + (1 << pw);
        if (guess > 1000000) {
            continue;
        }
        std::cout << guess << std::endl; // interogam numarul curent
        std::string s;
        std::cin >> s;
        if (s[0] == '<') { // daca este mai mic, stim valoarea maxima
            high = guess - 1;
        }
        else { // altfel, stim valoarea minima
            low = guess;
        }
    }
    std::cout << "! " << low << std::endl;
    return 0;
}
