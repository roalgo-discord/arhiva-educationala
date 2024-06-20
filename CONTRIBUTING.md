# Contribuire

Îți mulțumim că ați ales să contribui la Arhiva Educațională RoAlgo!

## Cum poți contribui?

1. Începe prin a face un fork la acest repository și clonează-l local.
2. Mută-te către ramura de develop. Pentru a face acest lucru:

   ```
   git checkout -b develop
   ```
   
3. Creează o ramură nouă pentru fiecare schimbare sau fiecare capitol nou pe
   care dorești să o faci. Numele ramurilor sunt **în limba engleză** și sunt de
   forma `tip/nume-aici`. De pildă, pentru un capitol nou:

   ```
   git checkout -b chap/modular-arithmetic
   ```

   și pentru o funcționalite nouă legată de website:

   ```
   git checkout -b feat/theme-change
   ```

4. După ce ți-ai terminat schimbările, dă commit, utilizând mesaje **în limba
   engleză** conform specificațiilor [Conventional
   Commits](https://www.conventionalcommits.org/en/v1.0.0/). Niște exemple pot
   fi:

   ```
   git commit -m "docs: finish the FFT article" 
   git commit -m "feat(theme): change the color scheme"
   git commit -m "style(aint): reformat aint.cpp"
   ```
   
   Dacă este nevoie, adaugă mai multe detalii în corpul commit-ului:

   ```
   feat(theme): change the color scheme

   I've changed the colors from red to black, because it's been proven to 
   increase viewer retention and make them calmer.
   ```

   După `:` trebuie să fie un verb la timpul prezent, ca și cum ar fi un "this
   will" înainte de mesaj.
5. Creează un pull request pe GitHub.

## Procesul de revizuire

Toate contribuțiile vor trece printr-un proces de revizuire înainte de a fi
integrate în proiectul principal. Un membru al echipei RoAlgo va verifica
modificările propuse și va oferi feedback sau va cere clarificări dacă este
necesar. Vom încerca să răspundem cât mai repede posibil, dar vă rugăm să aveți
răbdare, deoarece procesul de revizuire poate dura.

## Stil de cod

Pentru a asigura uniformitate în cod și pentru a reduce mentenanța, codurile
sursă C++ din acest cod sursă vor respecta, pe cât posibil, [stilul
Google](https://google.github.io/styleguide/cppguide.html). Acest repo a fost
configurat pentru a respecta acest stil. De aceea, recomandăm ca, dacă ai cod
sursă ce va fi inclus în capitol, să fie formatat într-un fișier extern înainte
de a fi inclus.

## Politica privind comportamentul

Comunitatea RoAlgo se angajează să ofere un mediu prietenos, sigur și primitor
pentru toți, indiferent de experiență, sex, identitate și expresie de gen,
orientare sexuală, dizabilitate, aspect fizic, dimensiune corporală, rasă,
etnie, vârstă, religie sau naționalitate. Ne așteptăm ca toți contribuitorii să
respecte [Codul de conduită](./CODE_OF_CONDUCT.md) în toate interacțiunile lor
în cadrul proiectului.

Dacă aveți întrebări sau aveți nevoie de ajutor, nu ezitați să contactați un
membru al echipei sau să postați pe serverul nostru de Discord.
