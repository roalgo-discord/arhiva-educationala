**Autor**: Traian Mihai Danciu

# Noțiuni introductive

Stiva este ca un teanc de obiecte. Ea are $4$ operații principale:

1. *push(value)*: Adaugă *value* pe vârful stivei.
2. *top()*: Spune care este valoarea de pe vârful stivei.
3. *pop()*: Scoate elementul de pe vârful stivei.
4. *empty()*: Spune dacă stiva este goală.

!!! info "Observație"
    Valorile vor fi returnate după regula *LIFO*, adică *last in, first out*.

# Problema [stack](https://kilonova.ro/problems/2001)

Această problemă ne cere să implementăm exact operațiile descrise mai sus.
[Acesta](https://kilonova.ro/pastes/Z565qzCucYNl) este link-ul la implementare.

## Stiva din STL

Stiva poate fi implementată și cu funcțiile din STL. Pentru mai multe detalii,
vedeți [implementarea](https://kilonova.ro/pastes/BkG7Wrt8wQ83) și
[cppreference](https://en.cppreference.com/w/cpp/container/stack).

# Problema [stack_max_min](https://kilonova.ro/problems/2107)

Problema ne dă un șir de numere și 4 întrebări pentru câte o poziție:
1. Cel mai apropiat indice la stânga, unde elementul este mai mare decât poziția din întrebare.
2. Cel mai apropiat indice la stânga, unde elementul este mai mic decât poziția din întrebare.
3. Cel mai apropiat indice la dreapta, unde elementul este mai mare decât poziția din întrebare.
4. Cel mai apropiat indice la dreapta, unde elementul este mai mic decât poziția din întrebare.

Vom precalcula, pentru fiecare element, răspunsul la fiecare tip de întrebare. Aici vom descrie algoritmul doar pentru primul tip, deoarece celelalte se rezolvă analog.

Vom parcurge vectorul de la stânga la dreapta, iar pe o stivă vom reține indicii cu elemente mai mici sau egale cu elementul curent. Cu alte cuvinte, pentru fiecare element, scoatem de pe stivă toate elementele mai mici sau egale cu el. Dacă stiva este goală, atunci răspunsul este $-1$, altfel este indicele elementului de pe vârful stivei. Apoi, îl adăugăm pe el însuși în stivă.

Observație:
Pe stivă vom reține indici, nu valori.

Vom face o simulare a acestui algoritm, folosindu-ne de exemplul din problemă, $v = [1 \ 2 \ 3 \ 6 \ 4 \ 5 \ 3 \ 2 \ 1 \ 10]$. Ca în problemă, vectorul va fi indexat de la $0$.
1. Suntem la indicele 0, $stiva = []$. Răspunsul va fi -1.
2. Suntem la indicele 1, $stiva = [0]$, dar îl scoatem, iar apoi $stiva = []$. Răspunsul va fi -1.
3. Suntem la indicele 2, $stiva = [1]$, dar îl scoatem, iar apoi $stiva = []$. Răspunsul va fi -1.
4. Suntem la indicele 3, $stiva = [2]$, dar îl scoatem, iar apoi $stiva = []$. Răspunsul va fi -1.
5. Suntem la indicele 4, $stiva = [3]$. Răspunsul va fi 3.
6. Suntem la indicele 5, $stiva = [3 \ 4]$, dar îl scoatem pe 4. Răspunsul va fi 3.
7. Suntem la indicele 6, $stiva = [3 \ 5]$. Răspunsul va fi 5.
8. Suntem la indicele 7, $stiva = [3 \ 5 \ 6]$. Răspunsul va fi 6.
9. Suntem la indicele 8, $stiva = [3 \ 5 \ 6 \ 7]$. Răspunsul va fi 7.
10. Suntem la indicele 9, $stiva = [3 \ 5 \ 6 \ 7 \ 8]$, dar le scoatem pe toate, iar apoi $stiva = []$. Răspunsul va fi -1.

Această rezolvare are complexitatea $\mathcal{O}(N)$, pentru că fiecare element va fi pus pe stivă și scos, deci se vor face maxim 2 operații pentru fiecare.

Detaliii de implementare: vom reține o matrice $raspuns[tip - 1][i]$ care va reprezenta răspunsul la o întrebare de tipul $tip \ i$. De asemenea, vom folosi o santinelă, care va fi o valoare care va fi mereu mai mică (sau mai mare, în funcție de caz) decât orice valoare din vector. Pentru mai multe detalii, vezi implementarea.

[Link](https://kilonova.ro/pastes/Potqb8YgrC4o) implementare

# Probleme rezolvate

## Problema [skyline](https://kilonova.ro/problems/2114)

Implementarea se află [aici](https://kilonova.ro/pastes/jw6H8y2ETlRb).

## Problema [Maximum Rectangle](https://kilonova.ro/problems/2113)

Implementarea se află [aici](https://kilonova.ro/pastes/iOJhQznjP1Ek).

## Problema [unific - OJI 2013 VII](https://kilonova.ro/problems/835)

Implementarea se află [aici](https://www.youtube.com/watch?v=dQw4w9WgXcQ).

## Problema [swap - ONI 2013 Baraj Juniori](https://kilonova.ro/problems/1076)

Implementarea se află [aici](https://www.youtube.com/watch?v=dQw4w9WgXcQ).

## Problema [Ehab and Prefix MEXs - Codeforces Round 649](https://codeforces.com/contest/1364/problem/C)

Implementarea se află [aici](https://www.youtube.com/watch?v=dQw4w9WgXcQ).

# Probleme suplimentare

- [Maximum Building I - CSES](https://cses.fi/problemset/task/1147) (Este aceeași problemă ca *Maximum Rectangle*)
- [inundație - ONI 2022 VI](https://kilonova.ro/problems/1593) (Cerințele 2 și 3 pot fi rezolvate folosind o stivă, necesită și căutare binară).
- [fuziune - ONI 2023 Baraj Juniori](https://kilonova.ro/problems/554) (Problemă asemănătoare cu *unific*, dar necesită lucru cu numere mari și numere prime)
- [șiruri - ONI 2022 VI](https://kilonova.ro/submissions/62356) (Altă problemă asemănătoare cu *unific*)
- [tower - Shumen 2016 Juniori](https://www.nerdarena.ro/problema/tower) (Nu vă speriați că este de la Shumen, problema este doar o aplicație la *stack_max_min*)
- [maxp - ONI 2013 VIII](https://kilonova.ro/problems/836) (O altă aplicație la problema *stack_max_min*)
- [CF 1905C](https://codeforces.com/contest/1905/problem/C) (Problemă a cărei rezolvare se folosește de tehnica de la *stack_max_min*)
- [CF 1905D](https://codeforces.com/contest/1905/problem/D) (Problemă a cărei rezolvare se folosește de tehnica de la *stack_max_min*)
- [CF 1909C](https://codeforces.com/contest/1909/problem/C) (Problemă care are o rezolvare cu tehnica de la *stack_max_min*)
- [reactii - ONI 2009 X](https://kilonova.ro/problems/1325) (Problemă asemănătoare cu *unific*)
- [dag - ONI 2019 Baraj Seniori](https://kilonova.ro/problems/410) (Problemă care se folosește de tehnica de la *stack_max_min*)
- [leftmax - OJI 2020 X](https://kilonova.ro/problems/929) (Problemă care se folosește de tehinca de la *stack_max_min*)

# Bibliografie și lectură suplimentară

- [Un video despre stivă, pentru a vă ajuta să înțelegeți mai bine acest concept.](https://www.youtube.com/watch?v=I37kGX-nZEI)
- [Un video despre analiza amortizată, vă va ajuta să înțelegeți mai bine rezolvarea problemei *stack_max_min* și de ce are complexitatea $\mathcal{O}(N)$](https://www.youtube.com/watch?v=T7W5E-5mljc)
- [Algopedia - Stive](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_2_-_26_sep_2019#Stive)
- [Algopedia - Analiza amortizată, mai multe detalii despre problema *stack_max_min*](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_11_-_21_nov_2019#Lec%C8%9Bie_-_analiz%C4%83_amortizat%C4%83)
- [Articolul de pe USACO despre stivă](https://usaco.guide/gold/stacks?lang=cpp)
