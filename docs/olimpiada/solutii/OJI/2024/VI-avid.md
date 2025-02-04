---
tags:
    - OJI
    - clasa VI
---

# Soluția problemei Avid (OJI 2024, clasa a VI-a)

!!! example "Cunoștințe necesare"
    - [Divizibilitatea](../../../../usor/divisibility.md)
    - [Ciurul lui Eratostene](../../../../usor/sieve.md)

**Autor soluție**: Giulian Buzatu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/2514/).

Cerința 1: Pentru 12 puncte, se citesc numerele din fișierul de intrare într-un vector și numărăm câte triplete respectă condiția din enunț. Vom calcula cel mai mare divizor comun al fiecărui triplet de valori de pe poziții consecutive, după care vom calcula numărul de divizori al acestuia, iar dacă este mai mic sau egal cu $p$, vom incrementa răspunsul. Vom folosi algoritmul lui Euclid prin împărțiri repetate și descompunerea în factori primi până la radical. Complexitatea este: $O(n(\log \max\{a_i\} + \sqrt{\max\{a_i\}})) = O(n\sqrt{\max\{a_i\}}).$

Pentru restul de 17 puncte, vom folosi același procedeu pentru a calcula numărul de triplete, dar vom calcula mai eficient numărul de divizori. Vom precalcula numerele prime până la $5\,000\,000 \approx 2\,236$, folosind ciurul lui Eratostene. Astfel, când vom face descompunerea în factori primi până la radicalul numărului nostru, vom folosi doar numerele prime. Complexitatea este: $O(n\sqrt{\max\{a_i\}} + \sqrt{\max\{a_i\}} \log \log \sqrt{\max\{a_i\}}).$

Observăm că, deși complexitatea este similară, algoritmul este mult mai rapid în practică.

Cerința 2: Pentru 29 de puncte, se citesc numerele din fișierul de intrare într-un vector. Parcurgem vectorul și verificăm dacă tripletul care se termină pe poziția curentă respectă condiția din enunț, folosind algoritmul lui Euclid prin împărțiri repetate și descompunerea în factori primi până la radical. În caz afirmativ, incrementăm lungimea secvenței curente. Altfel, se încearcă actualizarea maximului, doar dacă lungimea curentă este cel puțin 3, și după se resetează lungimea secvenței curente la valoarea 2. La finalul parcurgerii se va mai încerca o dată actualizarea maximului, cu aceeași condiție ca mai sus, deoarece este posibil ca secvența curentă să fie maximală. Complexitatea este: $O(n(\log \max\{a_i\} + \sqrt{\max\{a_i\}})) = O(n\sqrt{\max\{a_i\}}).$

Pentru restul de 42 de puncte, se procedează similar, dar vom calcula mai eficient numărul de divizori, folosind modul descris în cel de-al doilea paragraf de la descrierea cerinței 1. Complexitatea este: $O(n\sqrt{\max\{a_i\}} + \sqrt{\max\{a_i\}} \log \log \sqrt{\max\{a_i\}}).$ Observăm că, deși complexitatea este similară, algoritmul este mult mai rapid în practică.

Observații:

1. Pentru ambele cerințe putem să rezolvăm problema fără a reține datele citite într-un vector. Totuși, pentru simplitate și pentru că limita de memorie este generoasă, nu este nevoie să facem acest lucru.

2. Descompunerea în factori primi a lui $n$ (mergând până la $\sqrt{n}$) este folosită pentru determinarea numărului său de divizori astfel: $n = p_1^{e_1} \cdot p_2^{e_2} \cdot \ldots \cdot p_k^{e_k},$ atunci numărul $n$ are $(e_1 + 1)(e_2 + 1) \cdots (e_k + 1)$ divizori, conform regulii produsului.

3. Pentru soluția fără ciur, numărul de divizori al lui $n$ poate fi calculat în $O(\sqrt{n})$ și fără formula precedentă. Este suficient să parcurgem divizorii lui $n$ cuprinși între 1 și $\sqrt{n}$. De fiecare dată când găsim un divizor $d$, deducem că și $\frac{n}{d}$ este un divizor al lui $n$, așa că adunăm 2 la rezultat. Singura excepție constă în cazul în care $d = \frac{n}{d}$, când se adună doar 1.

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int c, n, p, v[5000002];
int cntdiv[5000002];

int cmmdc(int a, int b) {
    while (b > 0) {
        int c = a%b;
        a = b;
        b = c;
    }
    return a; 
}
int main() {
    ifstream cin("avid.in");
    ofstream cout("avid.out");
    
    for (int i = 1; i <= 5000000; i++) {
        for (int j = i; j <= 5000000; j += i) {
            cntdiv[j]++;
        }
    }
            
    cin >> c;
    cin >> n >> p;
    
    int cnt = 0, strk = 0, maxstrk = 0;
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }
    
    for (int i = 2; i < n; i++) {
        int x = cmmdc(v[i-1], cmmdc(v[i], v[i+1]));
        if (cntdiv[x] <= p) {
            cnt++;
            strk++;
            if (strk >= maxstrk) {
                maxstrk = strk;
            }
        }
        else
            strk = 0;
    }
    if (c == 1) {
        cout << cnt << '\n';
    }
    else {
        cout << maxstrk+2 << '\n';
    }
    return 0;
}
```