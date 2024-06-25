**Autor:** Teodor Ștefan Manolea

Dacă citiți acest document înseamnă că vă interesează să aflați informații
introductive despre programarea dinamică.

# Introducere

Ca să începem lecția vă voi adresa următoarea întrebare: „Ce **înseamnă**
programarea dinamică?”

Ei bine, ne vom folosi de o **analogie** ca să ne fie mai ușor să înțelegem:

Haide să plecăm de la un sistem de referință ideal, să zicem că avem o mașină
Dacia Solenza. Ei bine, când ne gândim la ea, care ne sunt primele proprietăți,
pe care le are în comun cu orice altă mașină, care ne vin în cap? Păi, o mașină
are un motor, hai să zicem că mașina noastră are 200 cai putere. Ce mai are o
mașină? O greutate, să zicem că mașina noastră are 2 tone. Ei bine, aceste
proprietăți, noi o să le numim parametri. Acum, acești parametrii, grupați
împreună, formează o stare, parametrii purtând numele de „Parametrii de stare”.
Acum hai să presupunem că-i schimbăm motorul mașinii într-unul de la Ferrari,
care să zicem că are 150 cai putere, această schimbare o putem numi o tranziție,
așa cum o să-i și spunem de acum încolo.

Aceste stării și tranziții stau la baza gândirii dinamice, care reprezintă
defapt programarea dinamică. Acum că avem o analogie de bază, putem să ajungem
la o „formula” de bază a programării dinamice. Ea se va enunța astfel:

<figure markdown="span">
    ![Exemplu de tranziție](../images/introducere-dp/imagine-stari.png){ width="50%" }
    <figcaption>Exemplu de tranziție</figcaption>
</figure>

Traducerea este următoarea:

- "S1" = Starea 1 (reprezintă valorile stării inițiale)

- "→" = Tranziția (reprezintă funcția care va aplica niște instrucțiuni bazate
  pe valorile parametrilor din S1 și va transmite rezultatul în S2)

- "S2" = Starea 2 (reprezintă valorile stării finale, care rezultă din tranziție)

Din această formula putem ajunge la concluzia că, băbește spunând, programarea
dinamică este „programarea pe stării”, care are la bază un mod de gândire. La
programarea dinamică i se mai spune și „DP”, fiind un termen standard vom începe
să-l utilizăm și noi în documentul prezent!

## Clasificare

Având acum noțiunile teoretice de bază asupra modului de gândire parcurse, aș
vrea să vă definesc niște moduri de clasificare a programării dinamice, după
modul de a fi scrise, după modul de abordare a lor, după modul în care tranziția
transmite informația de la o stare la alta și respectiv după ramura tipurilor de
probleme a cărora aparțin ele.

### Tipuri de scriere

- Recursiv (Utilizează recursivitatea standard)

- Iterativ (Utilizează complete search)

<figure markdown="span">
    ![Comparație între scrierea recursivă și iterativă](../images/introducere-dp/tabel-comparatii-recursiv-iterativ.png){ width="50%" }
    <figcaption>Pentru un participant la competiții de informatică este esențial să știe cum se scrie în ambele forme!</figcaption>
</figure>

### Modalități de abordare

1. Top-Down DP:

    * Această formă de DP pleacă de la starea finală a problemei, ea utilizând
    stările anterioare, până la starea inițială pe care o cunoaștem, pentru
    a-și construi parametrii ei.
    
    * De obicei această formă de DP este scrisă utilizând recursivitatea

2. Bottom-Up DP:
    * Această formă de DP pleacă de la starea inițială a problemei, ea
    construind parametrii stărilor următoare care la rândul lor vor face asta
    până ce ajungem la construirea parametrilor stării finale.
    * De obicei această formă de DP este scrisă utilizând Complete Search-ul

### Modalități de tranziție

- Pull-DP: Această formă de tranziție are la bază „tragerea” informației
  necesare pentru formarea parametrilor stării curente din starea anterioară.
- Push-DP: Această formă de tranziție are la bază „împingerea” informației
  necesare pentru formarea stării următoarea din starea curentă

### Ramuri ale DP-ului

- Counting DP (programare dinamică de numărare)
- Knapsack DP (programare dinamică bazată pe problema rucsacului)
- Bitmasking DP (programare dinamică bazată pe mascarea biților)
- Tree DP (programare dinamică pentru arbori)

# Probleme clasice

În continuare, o să discutăm despre niște probleme clasice în cadrul dp-ului,
ele făcând parte din ramurile de numărare și a problemei rucsacului.

## Problema monezii

!!! info "Cerință"

    Astăzi, la ora domnului **profesor Tetris**, ți s-a pus următoarea întrebare:
    „Dacă eu îți dau $N$ tipuri de monede, având acces la o infinitate de
    monede $C$ de acele tipuri, află modalitatea optimă de a obține suma $S$”.
    Pe momentul orei tu nu ai știut cum să răspunzi, Însă acum, mai determinat
    ca niciodată, vrei să rezolvi această problem, având în față un document
    educational de 5 stele Micheline. Rezolvă problema!

    Vom defini modalitatea optimă de a obține suma $S$ ca fiind modalitatea prin
    care utilizezi cât mai puține monede per total!

    **Restricții:**

    - $ 1 \leq N \leq 500 $

    - $ 1 \leq S \leq 100000 $

    - $ 1 \leq C_i \leq 2500 $

### Rezolvare

La început, când ați citit această problemă, probabil v-ați gândit la o
rezolvare Greedy (care mai încolo o să vedeți că este Greedy Euristic), prin
care ați fi sortat descrescător șirul de monede și ați fi încercat să utilizați
denominația cea mai mare, care este mai mică ca S, cât timp puteați. După ați fi
continuat cu următoarea denominație cea mai mare care respectă condiția aceasta
pentru suma rămasă ș.a.m.d. Ca să vă dovedesc că nu funcționează această
modalitate, încercați să rezolvați această problemă, utilizând modalitatea
anterior prezentată, având aceste date de intrare ($N$ numărul de monezi, apoi
$S$ suma și apoi cele $N$ monezi):

```
3
31
7 2 15
```

Acum că ați încercat să rezolvați problema într-un mod cunoscut vouă, și ați
văzut că nu îți garantează un răspuns, haideți să vă prezint o soluție corectă!

Pentru această problem, o să vă prezint soluțiile utilizând ambele modalități de
abordare, scriere a sursei și modalități de tranziție.

<!-- De completat explicatie -->

=== "Recursiv"

    ```cpp
    #include <iostream>
    #include <vector>

    constexpr int MAX_MONEZI = 100000;

    using namespace std;

    int N, S;
    vector<int> dp(MAX_MONEZI + 1);

    void solve(const int suma, const int nr_monede, const vector<int>& monezi) {
        if (suma == 0) {
            return;
        }

        for (const auto moneda : monezi) {
            if (suma >= moneda) {
                if (dp[suma - moneda] > nr_monede + 1) {
                    dp[suma - moneda] = nr_monede + 1;
                    solve(suma - moneda, nr_monede + 1, monezi);
                }
            }
        }
    }

    int main() {
        cin >> N >> S;

        vector<int> monezi(N, 0);

        for (auto& moneda : monezi) {
            cin >> moneda;
        }

        solve(S, 0, monezi);

        cout << dp[0];
        return 0;
    }
    ```

=== "Iterativ"

    ```cpp
    #include <iostream>
    #include <vector>

    using namespace std;

    const int MAXIM_SUMA_MONEZI = 100000;

    int N, S;
    int dp[MAXIM_SUMA_MONEZI + 1];

    int main() {
        cin >> N >> S;
        vector<int> coins(N);
        for (int i = 0; i < N; i++) {
            cin >> coins[i];
        }
        for (int i : coins) {
            dp[i] = 1;
        }
        for (int i = 1; i < S; i++) {
            if (dp[i] != 0) {
                for (int coin : coins) {
                    if (i + coin <= S) {
                        if (dp[i + coin] == 0) {
                            dp[i + coin] = dp[i] + 1;
                        } else {
                            dp[i + coin] = min(dp[i + coin], dp[i] + 1);
                        }
                    }
                }
            }
        }
        cout << dp[S];
        return 0;
    }
    ```
