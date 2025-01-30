---
tags:
    - OJI
    - clasa V
    - timp
---

# Soluția problemei cartele (OJI 2019, clasa a V-a)

**Autor soluție**: Traian Mihai Danciu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/907/). 

## Cerința 1

Cât timp parcurgem evenimentele, menținem doi contori pentru numărul de băieți, respectiv numărul de fete din școală la momentul respectiv, și îi actualizăm corespunzător evenimentului citit.

## Cerința 2

Menținem aceiași doi contori de la cerința 1.

Observația importantă este că, dacă la un moment dat numărul de fete este egal cu numărul de băieți, după următorul eveniment aceste două numere nu vor mai fi egale. Așa că vom menține și încă două variabile, care să ne spună dacă la evenimentul precedent numărul de băieți este egal cu numărul de fete, respectiv timpul (în secunde) al ultimului eveniment de acest fel. 

## Cerința 3

Menținem aceiași doi contori ca la cerința 1 și încă două variabile care ne vor spune dacă la ultimul eveniment am avut un număr impar de băieți și pentru cât timp a fost acest număr de băieți impar. Când numărul de băieți devine par, timpul se resetează la 0 și variabila cealaltă va fi setată la fals.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>

using namespace std;

ifstream fin("cartele.in");
ofstream fout("cartele.out");

int main()
{
    int n, i, h, m, s, baieti = 0, fete = 0, ps, maxim = 0, cs, aux = 0;
    short cerinta;
    bool bine = false;
    char g, c;
    fin>>cerinta>>n;
    
    if (cerinta == 1) {
        for (i = 0; i < n; i++) {
            fin>>g>>c>>h>>m>>s;
            
            if (g == 'b') {
                if (c == 'i') {
                    baieti++;
                }
                else {
                    baieti--;
                }
            }
            else {
                if (c == 'i') {
                    fete++;
                }
                else {
                    fete--;
                }
            }
        }
        
        fout<<baieti<<' '<<fete;
    }
    else if (cerinta == 2) {
        for (i = 0; i < n; i++) {
            fin>>g>>c>>h>>m>>s;
            
            if (g == 'b') {
                if (c == 'i') {
                    baieti++;
                }
                else {
                    baieti--;
                }
            }
            else {
                if (c == 'i') {
                    fete++;
                }
                else {
                    fete--;
                }
            }
            
            if (bine) {
                bine = false;
                cs = s+60*m+60*60*h;
                maxim += cs-ps;
            }
            
            if (baieti == fete && baieti != 0) {
                bine = true;
                ps = s+60*m+60*60*h;
            }
        }
        
        fout<<maxim;
    }
    else {
        for (i = 0; i < n; i++) {
            fin>>g>>c>>h>>m>>s;
            
            if (g == 'b') {
                if (c == 'i') {
                    baieti++;
                }
                else {
                    baieti--;
                }
            }
            else {
                if (c == 'i') {
                    fete++;
                }
                else {
                    fete--;
                }
            }
            
            if (bine) {
                cs = s+60*m+60*60*h;
                
                if (baieti%2 != 1) {
                    maxim = max(maxim, cs-ps+aux);
                }
            }
            
            if (baieti%2) {
                if (bine) {
                    aux += cs-ps;
                }
                else {
                    aux = 0;
                }
                
                bine = true;
                ps = s+60*m+60*60*h;
            }
            else {
                bine = false;
            }
        }
        
        fout<<maxim;
    }
    
    return 0;
}
```