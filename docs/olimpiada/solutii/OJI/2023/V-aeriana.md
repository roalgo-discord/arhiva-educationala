---
tags:
    - OJI
    - clasa V
---

# Soluția problemei Aeriana (OJI 2023, clasa a V-a)

!!! example "Cunoștințe necesare"
    - [Divizibilitatea](https://edu.roalgo.ro/usor/divisibility/)
    - [Prelucrarea cifrelor](https://edu.roalgo.ro/usor/digits-manipulation/)

**Autor soluție**: Ioana Gabor

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/509/).

Pentru cerința $1$, se calculează toate duratele zborurilor, iar pe urmă trebuie afișat maximul dintre acestea. Pentru calculul duratei unui zbor, atât momentul decolării, cât și momentul aterizării „se convertesc în minute”, adică se află, pentru fiecare moment, „distanța în minute” dintre momentul $00:00$ al primei zile și momentul respectiv, presupunând că ambele momente sunt în ziua $1$, cu formula $ \text{total\_minute} = H \cdot 60 + M $.

În cazul în care decolarea și aterizarea au loc în aceeași zi, durata zborului (în minute) este dată de diferența dintre $\text{total\_minute}_2$ și $\text{total\_minute}_1$. În cazul în care decolarea și aterizarea au loc în zile diferite, diferența anterioară ar fi negativă. În acest caz, se adună „încă o zi”, adică $24 \cdot 60$ minute la $\text{total\_minute}_2$, deoarece inițial am presupus că momentul aterizării este în ziua $1$.

Pentru cerința $2$, se verifică pentru fiecare zbor dacă este „zbor special”. În primul rând, primul cod (notat în enunț $A_1$) trebuie să fie un număr prim (deci obligatoriu mai mare sau egal cu $2$). Pentru a căuta mai rapid dacă are alt divizor în afară de $1$ și el însuși, ne folosim de faptul că pentru orice divizor $d$ al lui $A_1$, automat $A_1 / d$ ar fi divizor al lui $A_1$. Astfel căutăm divizori posibili $d$ ai lui $A_1$ pornind cu $d = 2$ și mergând cât timp $d \leq A_1 / d$. Dacă primul cod este prim, se calculează suma cifrelor acestuia și se verifică dacă al doilea cod e divizibil cu suma calculată. În cazul în care un zbor este „special”, se interschimbă $h_1$ cu $h_2$ și $m_1$ cu $m_2$. 

Se calculează duratele zborurilor și maximul dintre acestea, precum în cazul cerinței $1$.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
using namespace std;

int c, n, a, b, h1, m1, h2, m2;

int main() {
    ifstream cin("aeriana.in");
    ofstream cout("aeriana.out");

    cin >> c;
    cin >> n;

    int maxh = 0, maxm = 0;
    for (int i = 1; i <= n; i++) {
        cin >> a >> b >> h1 >> m1 >> h2 >> m2;
        bool prim = 1;
        if (a < 2) {
            prim = 0;
        }
        for (int j = 2; j * j <= a; j++) {
            if (a % j == 0) {
                prim = 0;
            }
        }
        int sc = 0;
        while (a) {
            sc += a % 10;
            a /= 10;
        }
        if (c == 2 && prim == 1 && b % sc == 0) {
            swap(h1, h2);
            swap(m1, m2);
        }
        int timp = h2 * 60 + m2 - h1 * 60 - m1;
        if (timp < 0) {
            timp += 1440;
        }
        if (timp > maxh * 60 + maxm) {
            maxh = timp / 60;
            maxm = timp % 60;
        }
    }

    cout << maxh << " " << maxm << '\n';
    return 0;
}
```