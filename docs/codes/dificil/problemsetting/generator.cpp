#include "testlib.h" // biblioteca necesara
#include <iostream>
#include <vector>
#include <map>
 
int main (int argc, char* argv[]) {
    registerGen(argc, argv, 1); 
    int n = atoi(argv[1]); // parametrii in ordinea folositi
    std::cout << n << endl; // pentru a se sari la urmatoarea linie, se foloseste neaparat endl

    std::vector<int> v;
    
    for (int i = 1; i <= n; i++) {
        int x = rnd.next(1, 1000);
        std::cout << x;
        if (i != n) // trebuie avut grija la spatiile suplimentare de la final
            std::cout << " ";
        v.push_back(x);
    }

    std::cout << std::endl;
    std::shuffle(v.begin(), v.end()); // amestecarea elementelor din vector
    println(v); // afisarea unui intreg vector, punandu-se si endl
}