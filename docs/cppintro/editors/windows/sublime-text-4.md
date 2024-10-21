---
title: "Sublime Text 4 (Windows)"
hide:
  - navigation
  - toc
---

## Instalare

Procesul de instalare este unul foarte simplu:

1.  Descarcă installerul de Sublime Text 4:

    [Link direct :material-download:](https://www.sublimetext.com/download_thanks?target=win-x64){ .md-button .md-button--primary }

2.  După ce s-a descărcat, rulează installerul (care ar trebui să fie numit
    `sublime_text_build_{versiune}_x64_setup.exe`) și urmărește pașii de pe
    ecran.

Alternativ, poți descărca varianta portabilă de aici. Ea este utilă de pildă la
școală, unde nu ai drepturi de administrator pentru a putea instala Sublime Text
4 în mod normal.

[Descarcă arhiva .zip :material-download:](https://download.sublimetext.com/sublime_text_build_4180_x64.zip){ .md-button .md-button--primary }

## Configurare și utilizare

Ca orice editor de text, Sublime Text 4 nu vine implicit cu suport de C++, însă
putem să configurăm editorul folosind pachetele pe care le avem la dispoziție.
Pachetele se găsesc prin Package Control. Pentru a instala suportul de pachete,
apăsăm ++ctrl+shift+p++ (Tools > Command Palette) și tastăm "ipc" (Install
Package Control) și apăsăm ++enter++. Dacă apare un pop-up care zice "Package
Control was successfully installed", atunci s-a instalat cu succes.

Command Palette ne va fi de folos în majoritatea timpului nostru pe ST4, deci
este bine să te obișnuiești cu el. Din Command Palette, tastăm "pip" (Package Control: Install Package) și apăsăm Enter. Avem nevoie de următoarele pachete:

1. **SideBarEnhancements**, care adaugă mai multe opțiuni pentru manipularea
   fișierelor din bara laterală (vizibilă cu ++ctrl+k++, ++ctrl+b++). În esență,
   face bara laterală să fie mult mai utilă;
2. **LSP**, care transformă ST4 într-un editor mult mai avansat. Interfațează
   între diverse servere pentru a putea oferi autocompletare, redenumirea
   simbolurilor etc. De acolo, instalăm și **LSP-clangd**, care oferă suport
   pentru serverul `clangd`;
3. **BracketHighlighter**, care are scopul de a evidenția perechile de paranteze
   (`()`, `[]`, `<>`, `{}`);
4. **Terminus**, care oferă un terminal real în ST4;
5. **A File Icon**, care oferă icoane mai bune. Este ceva mai mult estetic;
6. **SublimeLinter**, care oferă suport pentru _linting_. Ce înseamnă asta,
   mai pe larg, este că pachetul acesta îți permite să vezi erorile și
   avertizările de la compilator și îți verifică sintaxa. Pentru C++, mai
   trebuie să instalăm
   și **SublimeLinter-contrib-clang**, **SublimeLinter-contrib-clang-tidy** și **SublimeLinter-contrib-cppcheck**;
7. **CMakeBuilder**, pentru a putea compila și rula codul mai ușor;
8. **CppFastOlympicCoding**, care este făcut pentru a optimiza ST4 pentru concursuri
   și olimpiade. Este opțional, însă îl recomand pe viitor.

Acum că avem toate aceste pachete, să le configurăm.

Pentru `clangd`, `clang-tidy`, `cmake` și `clang-format`, dacă ai instalat
compilatorul MinGW cum am indicat în
[articolul trecut](../../compilers/windows/mingw64.md) și _nu_ ai exclus LLVM,
nu trebuie să faci nimic pentru a instala aceste programe. Pentru `cppcheck`, alege
installerul [de pe această pagină](http://cppcheck.net/) și urmărește
instrucțiunile de pe ecran.

Pentru a configura `clangd`, mergem la Preferences > Package Settings > LSP >
Servers > LSP-clangd (sau Preferences: LSP-clangd settings din Command
Palette). Se va deschide o nouă fereastră împărțită în două. Pe partea stângă
se află toate configurările pe care le avem la dispoziție, iar pe partea
dreaptă se află configurarea utilizatorului, adică setările pe care vrem să
le aplicăm. Eu folosesc aceste setări:
```json
{
   "initializationOptions": {
      "clangd.compile-commands-dir": "build",
      "clangd.background-index": true,
      "clangd.clang-tidy": true,
      "clangd.completion-style": "detailed",
      "clangd.function-arg-placeholders": true,
      "clangd.header-insertion": "iwyu",
      "clangd.header-insertion-decorators": true,
      "clangd.malloc-trim": true,
   }
}
```

Mai trebuie să configurăm și plugin-ul LSP. Pentru acest lucru, mergem la Preferences: LSP settings din Command Palette.
```json
{
   "lsp_format_on_save": true,
}
```

Urmează să configurăm și formatarea codului. După părerea mea, stilul implicit
pe care îl are `clangd` mai mult încurcă. Pentru a schimba stilul, putem lăsa
un fișier în fiecare proiect pe care îl avem numit `.clang-format`
(numit exact așa!). Stilul arhivei (și un stil pe care îl recomand, de altfel) este acesta:
```yaml
---
BasedOnStyle: Google
AccessModifierOffset: -4
AlignArrayOfStructures: Left
AlignOperands: AlignAfterOperator
AllowShortBlocksOnASingleLine: Empty
AllowShortIfStatementsOnASingleLine: AllIfsAndElse
AllowShortLoopsOnASingleLine: false
BreakBeforeBinaryOperators: NonAssignment
IndentCaseLabels: false
IndentPPDirectives: BeforeHash
IndentWidth: 4
InsertBraces: true
PointerAlignment: Right
QualifierAlignment: Left
SortIncludes: CaseInsensitive
TabWidth: 4
```

!!! warning "Atenție"
    `clang-format` trebuie să fie cel puțin la versiunea 15. Poți vedea acest lucru cu `clang-format --version` într-un terminal. Dacă ai instalat compilatorul de pe Winlibs, el se află curent la versiunea 18, deci este totul în regulă.

Ca să funcționeze optim, avem nevoie să facem un proiect CMake. Din fericire,
este un proces simplu. Avem nevoie doar de două fișiere într-un folder:
`main.cpp` (unde vei scrie codul) și `CMakeLists.txt` (numele trebuie să fie
exact acesta!).

Ca să te duci la un folder, du-te la File > Open Folder. Dacă nu l-ai creat deja, acum ar fi momentul. Apasă ++ctrl+n++ pentru a crea un fișier și copiază următorul conținut (eu schimb doar `PROJECT_NAME` să reflecte proiectul curent/problema curentă):
```cmake
cmake_minimum_required(VERSION 3.10..3.99)

set(PROJECT_NAME "problema_interesanta")

project(${PROJECT_NAME}
   VERSION 0.1.0
   LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_executable(${PROJECT_NAME} main.cpp)

set_target_properties(${PROJECT_NAME} PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin"
)
```

!!! warning "Atenție"
    `PROJECT_NAME` nu poate să conțină spații. Înlocuiește-le cu bară jos (`_`) ca în exemplu sau `-`.

Salvează-l în `CMakeLists.txt` (trebuie să fie exact acest nume!).

Adaugă asta în `main.cpp`:
```cpp
#include <iostream>

int main() {
    std::cout << "Hello, world!" << std::endl;
    return 0;
}
```

Din Command Palette, execută "CMakeBuilder: Configure". Dacă apare ceva în
josul ecranului care are un mesaj similar cu:
```
-- Configuring done
-- Generating done
-- Build files have been written to: ...
[Finished in 64ms]
```
atunci procesul a reușit.

Acum te poți duce pe `main.cpp` și să rulezi "LSP: Enable Language Server
Globally" (sau In Project) din Command Palette și selectează clangd. Dacă
totul merge cum trebuie, ar trebui ca `iostream` să fie subliniat și în bara
de status (cea de jos) să scrie `clangd`.

Pentru a rula proiectul, apasă pe ++ctrl+shift+b++ și alege opțiunea "Default: Run - ..." (unde ... este numele proiectului (ales la `PROJECT_NAME`)). După asta, apasă ++enter++ (nu avem argumente) și, dacă totul a mers în regulă, vei vedea un ecran similar cu acesta:

```
[ 50%] Building CXX object CMakeFiles/testspatii.dir/main.cpp.o
[100%] Linking CXX executable bin/problema_interesanta
[100%] Built target problema_interesanta
Hello, world!
process is terminated with return code 0.
```

Prima linie poate să difere.

În momentul de față, ai o experiență acceptabilă și poți să continui mai
departe, însă o să îmbunătățim experiența și mai mult.

Deschide Preferences: Settings din Command Palette. Aici se află preferințele
globale ale utilizatorului, și acestea sunt cele care ne interesează
momentan. Tot ce vom scrie se va afla între acolade, la fel ca la celelalte
setări.

1. Vom schimba mărimea fontului, deoarece ea este prea mică în mod normal:
   ```json
   "font_size": 12,
   ```
2. Așa cum putem schimba mărimea fontului, putem schimba și fontul în sine.
   Recomand Cascadia Code/Mono sau Consolas, deși poți găsi alte fonturi care
   îți plac pe internet:
   ```json
   "font_face": "Cascadia Code",
   ```
3. Cel mai probabil nu vei trăi în Sublime Text 4 pentru totdeauna, deci va
   trebui să schimbi tabul sau fereastra. Setarea `save_on_focus_lost` salvează
   fișierul automat, ca să nu pierzi progresul în cazul în care închizi din greșeală
   editorul:
   ```json
   "save_on_focus_lost": true,
   ```
4. Setarea `highlight_line` va evidenția linia curentă, ceea ce poate fi util dacă nu vezi
   unde ai cursorul:
   ```json
   "highlight_line": true,
   ```
5. Implicit, totul este cam îngrămădit, așa că putem lăsa editorul să respire puțin:
   ```json
   "line_padding_bottom": 4,
   "line_padding_top": 4,
   ```
   Evident, poți ajusta dacă ți se pare prea mult, însă consider că 4 este o setare adecvată.
6. ST4 arată destul de modern, însă putem să îmbunătățim tema și mai mult.
   Pentru interfață, prefer să îl țin pe Adaptive, deoarece se integrează mai
   bine cu bara de meniu și cu restul interfeței:
   ```json
   "theme": "Adaptive.sublime-theme",
   ```

   Pentru editor, aici este o decizie personală și au avut loc bătălii
   seculare (bine, nu la fel de mari ca la Vim vs Emacs), așa că vom instala
   pachetul Colorsublime, pentru a vedea în timp real cum va arăta interfața.
   Acesta are și un site (https://colorsublime.github.io) unde poți vedea
   aceste teme în timp real. După ce ai instalat pachetul, rulează
   Colorsublime: Install Theme din Command Palette și derulează prin zecile
   de teme pe care le ai la dispoziție.
7. Următoarele setări au de-a face cu spațiile albe:
   ```json
   "translate_tabs_to_spaces": true,
   "trim_trailing_white_space_on_save": "all",
   ```
8. Pentru a avea în vedere limita de 80 caractere setată la secțiunea de formatare,
   putem adăuga următoarea setare:
   ```json
   "rulers": [80],
   ```

În final, configurarea ta ar trebui să arate similar cu asta:
```json
{
   "font_size": 12,
   "font_face": "Cascadia Code",
   "save_on_focus_lost": true,
   "highlight_line": true,
   "line_padding_bottom": 4,
   "line_padding_top": 4,
   "theme": "Adaptive.sublime-theme",
   "color_scheme": "Packages/Colorsublime - Themes/Tomorrow_Night.tmTheme",
   "translate_tabs_to_spaces": true,
   "trim_trailing_white_space_on_save": "all",
   "rulers": [80],
}
```

<!-- TODO: add shortcuts -->

Asta este tot cu configurarea. Poți acum să mergi către următorul articol:

[Mergi la introducere](./../../intro.md){ .md-button .md-button--primary }