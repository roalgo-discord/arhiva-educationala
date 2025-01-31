---
tags:
    - OJI
    - clasa IX
---

# Soluția problemei Santinele (OJI 2024, clasa a IX-a)

!!! example "Cunoștințe necesare"
    - [Introducere în Metoda Greedy](../../../../usor/greedy.md)

**Autor soluție**: Cristian Frâncu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/2502/).

Subtask 1: Santinela trebuie amplasată în primele $K + 1$ înălțimi. Fie $h_i$ cel mai din dreapta maxim din primele $K +1$ înălțimi. Atunci, $i$ este cea mai din dreapta poziție în care putem plasa santinela. Dacă am plasa-o într-o poziție $j$ mai la dreapta, atunci $h_j < h_i$, deci santinela nu va acoperi $h_i$. Vom calcula numărul maxim de înălțimi ce pot fi vegheate pornind spre dreapta de la poziția $i$ până ce dăm de o înălțime strict mai mare, fie depășim poziția $2 \cdot K + 1$. Complexitate: $O(K)$ timp, $O(1)$ memorie.

Subtask 2: Fie $H$ maximul dintre înălțimi. Avem două situații:

- $h_{N/2} = H$ sau $h_{N/2+1} = H$. Avem nevoie de o singură santinelă ce poate fi amplasată la una din acele poziții și va veghea tot muntele.
- $h_{N/2} \neq H$ și $h_{N/2+1} \neq H$. Avem nevoie de două santinele, una pentru primele $K + 1$ înălțimi și una pentru ultimele $K$. Cele două santinele vor fi amplasate în maximele zonelor vegheate de ele. Complexitate: $O(N)$ timp, $O(1)$ memorie.

Subtask 3: Înălțimile fiind strict crescătoare putem plasa santinele pe pozițiile $K + 1$, $2 \cdot K + 2$, $3 \cdot K + 3$, etc. Numărul minim de santinele este $N/(K + 1)$ dacă $N$ se divide cu $K + 1$, sau $N/(K +1)+1$ în caz contrar. Expresia C/C++ ce calculează acest număr este $(N +K)/(K +1)$. Complexitate: $O(1)$ timp și memorie.

Subtask 4: Acest subtask este similar cu cel anterior. Vom calcula maximul. Să presupunem că se află pe poziția $i$. Împărțim logic șirul în două subșiruri: elementele de la 1 la $i$ (inclusiv) și cele de la $i$ la $N$ (inclusiv). Pentru fiecare din subșiruri este necesar să amplasăm un număr de santinele calculabil cu formula anterioară. Pentru primul subșir numărul de santinele este $(i + K)/(K +1)$. Pentru al doilea subșir numărul de santinele este $(N -i +1+ K)/(K +1)$ care este totuna cu (N - i)/(K + 1). Suma acestor expresii este numărul total de santinele necesar, cu o ajustare: santinela plasată în poziția $i$ este comună ambelor subșiruri, deci vom scădea 1
din expresia finală. Numărul minim de santinele este $(i + K)/(K + 1) + (N - i)/(K + 1) - 1$. Complexitate: $O(N)$ timp, $O(1)$ memorie.

Subtask 5: Vom construi un vector v[] încercând să folosim cât mai puține santinele pentru a veghea muntele până la $h_i$. Pentru aceasta vom încerca să plasăm o santinelă pe fiecare $h_i$, variind $i$ de la 1 la $N$. Pentru o poziție $i$ vom parcurge înălțimile la stânga și la dreapta pentru a determina limitele $st$ și $dr$ până unde veghează santinela plasată pe înălțimea $hi$. Apoi vom testa ce se întâmplă dacă plasăm santinela la această poziție: știm că pozițiile până la $st - 1$ sunt deja vegheate și știm că avem nevoie de $v[st - 1]$ santinele. Vom parcurge pozițiile de la $st$ la $dr$ și ne vom întreba dacă nu cumva numărul de santinele necesare la acele poziții $j$ se poate îmbunătăți cu santinela curentă. Cu alte cuvinte dacă $v[j] > v[st - 1] + 1$, actualizăm $v[j]$ la $v[st - 1] + 1$. La final vom afișa $v[N]$. Complexitate: $O(N \cdot K)$ timp și $O(N)$ memorie.

Subtask 6: Soluția 1

La subtaskul 1 am arătat că cea mai la dreapta poziție pe care putem plasa prima santinelă este poziția celui mai din dreapta maxim din primele $K + 1$ înălțimi. Aceasta ne duce la un algoritm tip Greedy: găsim $h_i$, ultimul maxim din primele $K + 1$ și plasăm prima santinela pe poziția $i$. Apoi verificăm spre dreapta santinelei până unde veghează ea. Fie $h_j$ prima înălțime care nu este vegheată de prima santinelă. Rezultă că avem, acum, un nou subșir, format din înălțimile $h_j, h_{j+1}, h_{j+2}, \dots, h_N$. Acest subșir trebuie vegheat în întregime, folosind cât mai puține santinele. Avem, deci, o problema identică cu cea originală, dar cu un șir mai mic. Vom relua, deci, calculul, până ce întregul munte este vegheat. Complexitate: O(N) ca timp și memorie.

Subtask 6: Soluția 2

Să presupunem că amplasăm câte o santinelă pe fiecare înălțime. Fiecare din santinele va avea câte un interval stânga-dreapta pe care îl va veghea. Problema ne cere să selectăm un număr minim de intervale care să acopere indicii de la 1 până la $N$. Aceasta este o problemă cunoscută, care se rezolvă prin parcurgerea intervalelor în ordinea crescătoare a deschiderii intervalului. La fiecare pas vom selecta intervalul care începe în zonă acoperită și se termină cât mai departe spre dreapta. Capetele intervalelor sunt indici între 1 și $N$. Un interval $[i, j]$ poate fi stocat într-un vector în care setăm $sfarsit[i] = j$. Dacă avem mai multe intervale ce încep în același punct $i$ îl păstrăm pe cel care are $j$ maxim. În acest fel nu avem nevoie să sortăm intervalele.

Rămâne să stabilim cum determinăm acele intervale. Pentru aceasta vom folosi altă problemă cunoscută: pentru fiecare indice $i$ din vectorul de înălțimi dorim să calculăm primul element la stânga strict mai mare decât $h_i$. Acesta va fi capătul stânga al intervalului, dacă el se află la distanță mai mică sau egală cu $K$. În caz contrar vom seta $i - K$ drept capătul stânga al intervalului. Pentru a rezolva găsirea maximelor vom ne vom folosi de faptul că avem deja calculat răspunsul pentru indicii anteriori. Pentru $i$ ne vom întreba dacă $h_{i-1} > h_i$. Dacă da, am găsit raspunsul, dacă nu, vom avansa pe indicele primului maxim la stânga al lui $h_{i-1}$. Vom continua așa până găsim maximul dorit. Vom proceda similar și pentru primul maxim la dreapta. Complexitate: $O(N)$ atât ca timp cât și ca memorie.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
const int NMAX = 1e5;
using namespace std;
ifstream fin("santinele.in");
ofstream fout("santinele.out");
int arr[2 * NMAX + 5], task, n, k;
int get_next(int idx) {
    int maxi = INT_MIN, poz = 0;
    for (int i = idx; i <= min(n + 1, idx + k); i++) {
        if (arr[i] >= maxi)
            maxi = arr[i], poz = i;
    }
    for (int j = poz + 1; j <= min(n + 1, poz + k); j++) {
        if (arr[j] > arr[poz])
            return j - 1;
    }
    return poz + k;
}
signed main() {
    fin >> task >> n >> k;
    for (int i = 1; i <= n; i++)
        fin >> arr[i];
    if (task == 1)
        fout << get_next(1);
    else {
        int pos = 1, cnt = 0;
        while (pos <= n) {
            pos = get_next(pos) + 1;
            cnt++;
        }
        fout << cnt;
    }
    return 0;
}
```