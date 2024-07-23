**Autor**: Ștefan-Iulian Alecu

Bine ai venit!

Înainte de a ne îmbarca în această aventură, trebuie să fim pregătiți de drum.
Programarea se face cu degetul pe tastatura, nu prin citit cod, așadar o să
înveți cum să îți configurezi un editor/IDE.

Există două tipuri de editoare folosite pentru a scrie cod (nu doar în C++):

<div class="grid cards" markdown>

- :octicons-file-code-24:{ .lg .middle } **Editoare de text**

    ---

    Un editor de text este un program simplu folosit pentru scrierea și editarea
    codului sursă C++. Exemple de astfel de editoare includ Vim, Emacs,
    Notepad++, Geany, Kate, Sublime Text, și Visual Studio Code, printre altele.
    Acestea sunt ideale pentru editarea de fișiere de cod C++ simple, oferind
    funcționalități de bază precum evidențierea sintaxei și completarea
    automată.

    Editoarele de text consumă mai puțină memorie decât un IDE, însă trebuie să
    fie configurate pentru a putea suporta C++ la un nivel satisfăcător.

- :octicons-device-desktop-24:{ .lg .middle } **IDE**

    ---

    Un mediu de dezvoltare integrat (IDE) pentru C++ este un software complex
    care oferă dezvoltatorilor un set complet de instrumente pentru scrierea,
    compilarea, testarea și depanarea codului C++. Exemple de IDE-uri pentru C++
    includ Visual Studio, Xcode, Dev-C++, NetBeans, și Code::Blocks. Acestea
    includ funcționalități avansate precum depanare interactivă, integrare cu
    sisteme de control al versiunilor, instrumente de profilare și optimizare a
    codului, și multe alte instrumente care facilitează dezvoltarea de aplicații
    complexe în C++.

    Pe scurt, un IDE este un editor de text mult mai puternic și cu mai multe
    facilități pentru a dezvolta cod C++. Din această pricină, ele consumă mai
    multă memorie și mai mult spațiu, însă oferă toate uneltele necesare.

</div>

Prima dată, ce sistem de operare folosești?

<div class="grid cards" markdown>

- :material-microsoft-windows:{ .lg .middle } **Windows**

    ---

    Dacă folosești Windows 10 sau 11, atunci aceasta este secțiunea ta.

    [:octicons-arrow-right-24: Vezi instrucțiuni](#windows)

<!-- macOS -->

<!-- Linux -->

<!-- BSD -->

</div>

## Windows

Înainte de a instala un editor/IDE, avem nevoie de un compilator. Există
următoarele opțiuni:

<div class="grid cards" markdown>

- :material-microsoft-windows:{ .lg .middle } **MSVC**

    ---

    MSVC (Microsoft Visual C++) este un compilator proprietar făcut de Microsoft
    și este parte din IDE-ul Visual Studio.

    [:octicons-arrow-right-24: Vezi instrucțiuni pentru Visual Studio](#visual-studio-2022)

- :material-sheep:{ .lg .middle } **GCC (MinGW)**

    ---

    GCC (GNU Compiler Collection) este o suită de compilatoare libere și
    gratuite creat de către Proiectul GNU și FSF (Free Software Foundation). Cel
    mai folosit compilator din această suită este GCC (GNU C Compiler) și G++
    (GNU C++ Compiler).

    Pe Windows, cea mai ușoară metodă de a instala compilatorul GCC este
    folosind MinGW-w64.

    [:octicons-arrow-right-24: Vezi instrucțiuni pentru MinGW](#gcc-mingw-w64)

</div>

<h3 id="gcc-mingw-w64">Compilatorul GCC (MinGW-64)</h3>

[Proiectul MinGW-w64](https://www.mingw-w64.org/) este continuarea proiectului
MinGW (Minimalist GNU for Windows), făcut ca să suporte compilatorul GCC pe
Windows, cu suport pentru 64 de biți (ceea ce este cel mai probabil ce folosești
acum). Acest compilator poate fi folosit inclusiv pe Linux pentru a compila
binare pentru Windows.

Pentru a instala MinGW-w64, avem următorii pași:

1. Deschide pagina <https://winlibs.com/>. Această pagină oferă binare
   executabile pre-compilate pentru GCC și optimizate pentru a crea executabile
   native pe Windows.

    [Deschide pagina :material-open-in-new:](https://winlibs.com/){ .md-button .md-button--primary }

2. Dă scroll până când o să vezi versiunile de GCC. Alegem varianta cu UCRT
   (Universal C Runtime) pentru că este făcută de la zero pentru Windows 10 și
   11 și este gândită să aibă suport mai bun pentru standardul de C și C++.

3. Dintre lista de opțiuni pe care o ai pentru UCRT runtime, ne interesează
   ultima versiune (la data scrierii, versiunea este GCC 14.1.0).

4. Selectează din prima opțiune (cea care scrie POSIX threads) fie Win64 (dacă
   ai un sistem pe 64 de biți, care este cam orice calculator lansat în ultimul
   deceniu și jumătate), fie Win32, în formatul tău de preferință (7-Zip are
   nevoie de programul cu același nume, dar are executabile mai mici, în timp ce
   Zip poate fi deschis din Explorer). La data scrierii, asta este arhiva
   potrivită:

    [Descarcă GCC 14.1.0 :material-download:](https://github.com/brechtsanders/winlibs_mingw/releases/download/14.1.0posix-18.1.8-12.0.0-ucrt-r3/winlibs-x86_64-posix-seh-gcc-14.1.0-llvm-18.1.8-mingw-w64ucrt-12.0.0-r3.zip){ .md-button .md-button--primary }

    <figure markdown="span">
    ![Imagine care arată prima opțiune de la Release versions, UCRT runtime](./images/misc/mingw64.png){ loading=lazy }
    </figure>

5. După ce s-a terminat de descărcat arhiva, deschide-o și extrage directorul
`mingw64` într-un loc ușor accesibil (de preferință în `C:\`). Ține minte
această locație! O să mă refer la această locație în text ca `$MINGW` (de pildă,
dacă ai dezarhivat în `C:\`, atunci `$MINGW = C:\mingw64`). O să ia ceva timp să
se dezarhiveze tot, deoarece are peste 1GB. Indiferent unde s-a dezarhivat,
conținutul directorului `$MINGW` ar trebui să arate astfel:

    <figure markdown="span">

    ![O fereastră de Explorer care arată conținutul directorului dezarhivat. Conține directoarele bin, include, lib, libexec, share, x86_64-w64-mingw32 și fișierul version_info.txt.](./images/misc/mingw64-dir-light.png#only-light){ loading=lazy }

    ![O fereastră de Explorer care arată conținutul directorului dezarhivat. Conține directoarele bin, include, lib, libexec, share, x86_64-w64-mingw32 și fișierul version_info.txt.](./images/misc/mingw64-dir-dark.png#only-dark){ loading=lazy }

    </figure>

6. Acum avem un compilator de C++ în sistem. Pentru a-l face disponibil global,
   trebuie să adăugăm în calea sistemului ca să poată recunoaște executabilele.
   Pentru acest lucru:

    1. Apasă ++win+r++ și scrie `sysdm.cpl` și apasă OK. Dacă totul a fost cu
       succes, o să vezi o fereastră de genul:

       <figure markdown="span">
       ![O fereastră numită "Proprietăți sistem"](./images/misc/prop-sistem.png){ loading=lazy }
       </figure>
    2. Navighează către tab-ul Complex și apasă pe ultimul buton (Environment
       variables sau Variabile de mediu):

       <figure markdown="span">
       ![Tab-ul Complex, care conține butonul Variabile de mediu](./images/misc/tab-complex.png){ loading=lazy }
       </figure>
    3. Apasă dublu clic pe variabila `Path` de la secțiunea cu variabile de
       utilizator (partea de sus).

       ![Listă de variabile de mediu](./images/misc/path-1.png){ loading=lazy; width="49%" }
       ![Listă de căi la variabila de sistem Path](./images/misc/path-2.png){ loading=lazy; width="49%" }

    4. Apasă pe "Navigare..." (atenție, fără să ai vreo cale selectată deja,
       apasă oriunde într-un spațiu gol din listă) și caută calea `$MINGW\bin`
       (unde `$MINGW` e locul unde ai instalat MinGW). În cazul meu, calea va fi
       `C:\mingw64\bin`. Dacă totul a decurs cum trebuie, ar trebui să fie o
       cale în plus în listă:

        <figure markdown="span">
        ![Listă de căi la variabila de sistem Path, cu calea noastră în plus](./images/misc/path-3.png){ loading=lazy }
        </figure>
    5. Apasă OK până când se închid toate ferestrele.

7. Pentru a face sistemul să recunoască noile noastre executabile,
   deconectează-te și conectează-te înapoi la utilizatorul curent. Felicitări!

Acum că avem un compilator, ce fel de editor dorești?

<div class="grid cards" markdown>

- :octicons-file-code-24:{ .lg .middle } **Vreau un editor de text**

    ---

    [:octicons-arrow-right-24: Vezi opțiunile](#optiuni-editoare-windows)

- :octicons-device-desktop-24:{ .lg .middle } **Vreau un IDE**

    ---

    [:octicons-arrow-right-24: Vezi opțiunile](#optiuni-ide-windows)

</div>

<h3 id="optiuni-editoare-windows">Opțiuni pentru editoare de text</h3>

La capitolul editoare de text, există multe opțiuni. Totuși, dorim următoarele
calități de la un editor de text pentru C++:

- Syntax highlighting (evidențierea sintaxei), pentru a putea distinge ușor
  cuvintele cheie și a putea citi codul mai ușor;
- Completare automată (și sugestii) pentru a putea completa rapid și
  eficient codul;
- Indentare automată (și formatare), pentru a păstra un stil
  consistent;
- Funcții de căutare și înlocuire;
- Numărarea liniilor și coloanelor;
- Suport pentru extensii;
- Să fie ușor de folosit și să consume puține resurse.

Următoarele editoare îndeplinesc criteriile de mai sus:

<div class="grid cards" markdown>

- **Visual Studio Code**

    ---

    Visual Studio Code este un editor de cod gratuit și open-source, dezvoltat
    de Microsoft. Este extrem de popular datorită integrării sale cu multe
    instrumente de dezvoltare și suportului pentru extensii, oferind o
    experiență de codare puternică și flexibilă.

    [:octicons-arrow-right-24: Instalare și configurare](#visual-studio-code)

- **Sublime Text 4**

    ---

    Sublime Text 4 este un editor de text rapid și versatil, cunoscut pentru
    interfața sa curată și performanța excelentă. Este ideal pentru dezvoltatori
    datorită funcțiilor avansate precum evidențierea sintaxei și completarea
    automată, alături de un sistem robust de plugin-uri.

     [:octicons-arrow-right-24: Instalare și configurare](#sublime-text-4)

- **Notepad++**

    ---

    Notepad++ este un editor de text gratuit și open-source, renumit pentru
    viteza și ușurința sa de utilizare. Oferă evidențierea sintaxei pentru o
    gamă largă de limbaje de programare și suport pentru plugin-uri, fiind o
    alegere excelentă pentru dezvoltatorii care au nevoie de un editor eficient
    și ușor de folosit.

     [:octicons-arrow-right-24: Instalare și configurare](#notepad)

</div>

!!! note "Notă"

    În afară de aceste editoare, mai există și altele, precum Netbeans și eternele
    Vim/Neovim și Emacs. Deși autorul le folosește pe ultimele două (Emacs
    îndeosebi), procesul de a le configura este mai anevoios și nu sunt cele mai
    bune pe Windows și sunt în afara scopului acestui articol introductiv. De
    asemenea, există Kate și Geany, ambele cu suport bun pentru C++ și alternative
    solide pentru Notepad++, pe care autorul le recomandă.

<h3 id="optiuni-ide-windows">Opțiuni pentru IDE</h3>

La capitolul IDE-uri, nu avem așa de multe opțiuni, pentru că un IDE este
fundamental mai complex. Totuși, cele mai bune opțiuni sunt:

<div class="grid cards" markdown>

- **Visual Studio**

    ---

    Visual Studio este un mediu de dezvoltare integrat (IDE) puternic și
    extensibil, dezvoltat de Microsoft. Acesta suportă o gamă largă de limbaje
    de programare și tehnologii, fiind folosit pe scară largă pentru dezvoltarea
    aplicațiilor desktop, web și mobile. Printre caracteristicile sale se numără
    un editor de cod avansat, debuger integrat, suport pentru controlul
    versiunilor și multe altele. Rulează doar pe Windows.

    [:octicons-arrow-right-24: Instalare și configurare](#visual-studio-2022)

- **Code::Blocks**

    ---

    Code::Blocks este un IDE gratuit și open-source, dedicat dezvoltării de
    aplicații în limbajul C și C++. Este cunoscut pentru flexibilitatea sa,
    fiind extensibil prin plugin-uri și suportând diverse compilatoare.
    Interfața sa prietenoasă și ușurința de utilizare îl fac o alegere populară
    printre programatorii C/C++. În plus, acesta este editorul implicit pentru
    olimpiadă. Rulează pe Windows, macOS, Linux, FreeBSD și OpenBSD.

    [:octicons-arrow-right-24: Instalare și configurare](#codeblocks)

- **Qt Creator**

    ---

    Qt Creator este un IDE cross-platform dezvoltat de Qt Company, perfect
    pentru dezvoltarea în C++. Acesta oferă integrare completă cu Qt Framework,
    un designer vizual pentru interfețe grafice și suport pentru sistemele de
    build CMake și QMake. Qt Creator vine cu instrumente avansate de navigare și
    refactorizare a codului, un debugger integrat și instrumente de profilare
    pentru identificarea și rezolvarea problemelor de performanță. De asemenea,
    este foarte flexibil și poate fi extins prin plugin-uri, făcându-l potrivit
    pentru diverse nevoi ale dezvoltatorilor. Rulează pe Windows, macOS, Linux,
    FreeBSD, OpenBSD și NetBSD.

    [:octicons-arrow-right-24: Instalare și configurare](#qt-creator)

- **CLion**

    ---

    CLion este un IDE dezvoltat de JetBrains, specializat în dezvoltarea de
    aplicații în C și C++. Acesta oferă o gamă largă de funcționalități
    avansate, cum ar fi refactorizarea codului, navigarea inteligentă și
    suportul pentru CMake. CLion include un debugger integrat și instrumente de
    analiză a codului care ajută la menținerea unui cod curat și eficient. Este
    apreciat pentru productivitatea pe care o oferă dezvoltatorilor, datorită
    instrumentelor sale avansate și integrării cu diverse sisteme de control al
    versiunilor. Rulează pe Windows, macOS și Linux.

    [:octicons-arrow-right-24: Instalare și configurare](#clion)

</div>

!!! warning "Atenție"

    CLion, spre deosebire de celelalte opțiuni, nu este gratis. Totuși, dacă
    ești eligibil, poți avea un cont de student ceea ce îți oferă acces la
    CLion, precum și la alte produse marca JetBrains.

## Editoare și IDE-uri

### Editoare de text

#### Visual Studio Code

Pentru a instala Visual Studio Code (abreviat VSC):

=== "Windows"

    1. Descarcă Visual Studio Code. Aici este un link direct:

        [Descarcă Visual Studio Code :material-download:](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user){ .md-button .md-button--primary }
    2. Rulează installer-ul și urmează instrucțiunile. Recomand să bifezi toate
       opțiunile de Select Additional Tasks. Este totul doar Next, Next, Next...

    Felicitări! Ai instalat Visual Studio Code. Acum să învățăm să-l configurăm pentru C++.

=== "Linux"

    Depinde de distribuția pe care o ai instalată. Pentru cele mai noi 
    instrucțiuni, recomand să citești următoarea pagină oficială:

    [Mergi către pagină :material-open-in-new:](https://code.visualstudio.com/docs/setup/linux ){ .md-button .md-button--primary }
    
=== "macOS"

    1. Descarcă Visual Studio Code. Aici este un link direct:

        [Descarcă Visual Studio Code :material-download:](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal){ .md-button .md-button--primary }
    2. Dă dublu click pe arhiva .zip pentru a decomprima fișierul.
    3. Odată ce s-a terminat, mută aplicația "Visual Studio Code" în "Aplicații",
        ca orice altă aplicație.

    Felicitări! Ai instalat Visual Studio Code. Acum să învățăm să-l configurăm
    pentru C++.

Înainte de a continua, părțile principale ale interfeței sunt:

- Editorul, unde deschizi și schimbi fișiere sursă (și nu numai). Aici îți vei
  petrece majoritatea timpului. Poți avea mai mult de un fișier deschis.
- Bara laterală (sidebar) arată fișierele și directoarele cu care lucrezi. Poate
  fi ascunsă pentru a vedea mai mult din cod.
- Bara de status, care se află în partea de jos, și arată informații precum
  linia și coloana pe care te afli, tipul de fișier, numărul de erori ș.a.m.d.
- Panel-uri, care sunt arii care apar pentru sarcini specifice precum căutare,
  inspectarea erorilor, gestionarea extensiilor ș.a.m.d.

Implicit nu vine cu suport integrat pentru C++. Totuși, Visual Studio Code are o
gamă largă de extensii (pe care le putem accesa folosind butonul de extensii
(arată ca patru cuburi dintre care unul este desprins, dar poate fi accesat și
cu scurtăturile ++shift+cmd+x++ (macOS) sau ++ctrl+shift+x++ (restul
platformelor). De acolo, caută "C/C++ Extension Pack" și apasă pe prima extensie
de la Microsoft (nu este greu să o recunoști).

Acum să facem un fișier de C++ pentru a putea continua procesul. Creează un
fișier nou, fie din File > New Text File, fie din scurtăturile ++cmd+n++ (macOS)
sau ++ctrl+n++ (restul). Îl salvăm imediat undeva (++cmd+s++ sau ++ctrl+s++),
locația nu este importantă pe moment. Numele fișierului trebuie să se termine cu
`.cpp` la final, să-i zicem `main.cpp`. Imediat ce ai salvat, O să vezi că
Visual Studio Code a recunoscut fișierul nostru gol ca unul de C++ și a activat
extensia pe care tocmai am instalat-o. Dacă îți cere într-un pop-up să te duci
la o versiune de pre-release a extensiei de C++, refuză.

Apasă ++shift+cmd+p++ (macOS) sau ++ctrl+shift+p++ pentru a activa Command
Palette (o să folosești asta foarte des). Scrie "Intellisense" și selectează
opțiunea "C/C++: Select IntelliSense Configuration...". Alege g++. În cazul în
care ești pe Windows și ai instalat și Visual Studio 2022, o să ai opțiunea de
cl.exe. Dacă nu ai instalat GCC cu MinGW, este bună și această opțiunea, deși ar
fi bine să ai g++ în schimb.

Ca să testezi dacă a mers, scrie `#include <ios`. Dacă îți oferă sugestii precum
`ios`, `iostream` și `iso646.h`, atunci este funcțional.

Creează un director gol într-un loc pe care îl știi și apoi navighează până la
el folosind File > Open Folder. Dacă ai un popup cu "Do you trust the authors of
the files in this folder?", apasă "Yes, I trust the authors" (pentru că tu ești
autorul, logic). Poți opțional să bifezi să aibă încredere și în fișierele din
directorul părinte. Apoi poți crea un nou fișier pe care să-l numești tot
`main.cpp`, ca data trecută. Adaugă aceste linii în fișier:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello from VSCode!" << std::endl;
    return 0;
}
```

Interfața ta ar trebui să arate similar cu asta:
<figure markdown="span">
![](./images/vscode/vscode-1.png){ loading=lazy }
</figure>

Apoi poți să rulezi fișierul astfel:

1. Du-te la butonul de debug din tab bar (este un triunghi cu un gândac) și
    extinde-l. Din lista aceea, selectează Run C/C++ code. Așa ar trebui să
    arate:

    <figure markdown="span">
    ![](./images/vscode/vscode-2.png){ loading=lazy }
    </figure>

2. Selectează de acolo "C/C++: g++.exe build and debug active file", ca să
    poată compila folosind G++. Este posibil să vezi și opțiuni cu Clang sau
    cl.exe, dar poți să le ignori. Dacă îți cere extensia de CMake Tools ceva
    legat de vizibilitate, dă-i Do not show again, nu îți este relevantă ție
    acum.

3. Dacă totul a mers cum trebuie, ar trebui să vezi undeva jos în terminal
    mesajul "Hello from VSCode!".

Metoda pe care o folosesc eu când folosesc Visual Studio Code este următoarea:

1. Când ai instalat extensia, ți-a instalat și suport pentru CMake. Pentru a
    crea un proiect de CMake, du-te în Command Palette prin ++shift+cmd+p++ sau
    ++ctrl+shift+p++ și apoi scrie "CMake: Quick Start" și selectează acea
    opțiune;

2. Scrie numele proiectului tău. De obicei este la fel ca numele problemei pe
    care o faci, dar poate fi orice. Nu trebuie să conțină spații (doar linii
    sau bară jos).

    <figure markdown="span">
    ![](./images/vscode/vscode-3.png){ loading=lazy }
    </figure>

3. Aici te pune să alegi limbajul în care va fi proiectul. Cum este o
    introducere în C++, noi vom alege C++, firește.

    <figure markdown="span">
    ![](./images/vscode/vscode-4.png){ loading=lazy }
    </figure>

4. Noi dorim să avem un executabil, deci vom alege opțiunea corespunzătoare.

    <figure markdown="span">
    ![](./images/vscode/vscode-5.png){ loading=lazy }
    </figure>

5. Niciuna din aceste opțiuni (CPack sau CTest) nu ne este relevantă, deci nu
    alegem niciuna și trecem mai departe.

    <figure markdown="span">
    ![](./images/vscode/vscode-6.png){ loading=lazy }
    </figure>

6. Alegem fișierele pe care dorim să le avem în target. În cele mai multe
    cazuri, va fi doar un singur fișier, probabil numit `main.cpp`. Este
    important să existe acest fișier _înainte_ de a folosi Quick Start.

    <figure markdown="span">
    ![](./images/vscode/vscode-7.png){ loading=lazy }
    </figure>

7. În această fază trebuie să configurăm un preset. În acest caz, este un
    preset de configurare, care îi zice lui CMake cum să configureze proiectul
    nostru. Printre altele, dictează generatorul, fișierul de toolchain (care
    detectează efectiv care este compilatorul și face disponibile toate
    fișierele antet) și locul unde se va da build. Apasă ++enter++.

    <figure markdown="span">
    ![](./images/vscode/vscode-8.png){ loading=lazy }
    </figure>

8. Cea mai simplă opțiune de a crea un preset de configurare este de la
    compilator, deci vom selecta "Create from Compilers".

    <figure markdown="span">
    ![](./images/vscode/vscode-9.png){ loading=lazy }
    </figure>

9. Aici selectăm kit-ul nostru. În esență, un kit este un compilator. Alegem
    GCC (sau Visual Studio 17 2022 x64, dacă ai instalat Visual Studio 2022
    înainte).

    <figure markdown="span">
    ![](./images/vscode/vscode-10.png){ loading=lazy }
    </figure>

10. Acest preset are nevoie de un nume, îl putem numi simplu GCC (sau MSVC, dacă
    ai ales VS).

    <figure markdown="span">
    ![](./images/vscode/vscode-11.png){ loading=lazy }
    </figure>

Cel mai important fișier este `CMakeLists.txt`. El arată așa în momentul de
față:

```cmake
cmake_minimum_required(VERSION 3.5.0)
project(cppintro VERSION 0.1.0 LANGUAGES C CXX)

add_executable(cppintro main.cpp)
```

Mai trebuie să adăugăm unele chestii. Un CMakeLists.txt adecvat arată astfel:

```cmake
cmake_minimum_required(VERSION 3.27)
project(cppintro VERSION 0.1.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(${PROJECT_NAME} main.cpp)

if (MSVC)
    target_compile_options(${PROJECT_NAME} PUBLIC /W4 /WX)
    target_compile_options(${PROJECT_NAME} PRIVATE $<$<CONFIG:Debug>:/Od /Zi> $<$<CONFIG:Release>:/O2>)
    target_link_options(${PROJECT_NAME} PRIVATE $<$<CONFIG:Debug>:/DEBUG> $<$<CONFIG:Release>:/DEBUG:NONE>)
else()
    target_compile_options(${PROJECT_NAME} PUBLIC -Wall -Wextra -Wpedantic -Wfloat-conversion)
    target_compile_options(${PROJECT_NAME} PRIVATE $<$<CONFIG:Debug>:-O0 -g> $<$<CONFIG:Release>:-O3>)
endif()
```

În esență, ce face acest CMakeLists.txt nou este că setează standardul la C++20
și îl face obligatoriu, și adaugă mai multe flag-uri pentru a afișa mai multe
avertizări (ne ajută să găsim erori mai devreme) și a scoate optimizările în
momentul în care depanăm codul.

Acum că avem toate astea, apasă ++shift+f5++ și bucură-te de executabil.

Aici sunt mai multe scurtături și concepte utile care te pot ajuta în a
configura editorul:

1. Poți să îți schimbi tema folosind "Preferences: Color Theme" din Command
   Palette sau folosind ++ctrl+k++ ++ctrl+t++ (sau ++cmd+k++ ++cmd+t++). De
   asemenea, poți găsi alte teme interesante ca extensii.
2. Pentru a accesa setările, folosește fie ++ctrl+comma++ (++cmd+comma++), fie
   "Preferences: Open Settings (UI)" din Command Palette. Unele setări necesită
   configurare care nu se poate face din interfață, deci avem nevoie să
   modificăm un fișier JSON. Pentru acest lucru, avem în partea de sus o icoană
   cu o foaie de hârtie și o săgeată. Alternativ, poți ajunge în același loc din
   Command Palette, dacă scrii "Preferences: Open User Settings (JSON)".
    <figure markdown="span">
    ![](./images/vscode/vscode-12.png){ loading=lazy }
    </figure>
3. Din setări, poți ajusta fontul. Adaugă fonturile pe care vrei să le ai, în
   ordinea descrescătoare a preferinței. Dacă numele fontului are spațiu,
   trebuie să pui între ghilimele. De asemenea, poți modifica și mărimea
   fontului, în funcție de preferințe.
4. Recomand să activezi funcția de auto-save. Aceasta îți salvează automat
   codul. Setează-l pe afterDelay.
5. Pentru a ascunde bara laterală, apasă ++ctrl+b++ (sau ++cmd+b++). Pentru a o
   aduce înapoi, apasă aceeași scurtătură. Poate fi util în cazul în care
   lucrezi pe jumătate din ecran sau dacă vrei să ai mai mult loc.
6. Poți apăsa ++f11++ pentru a face editorul să fie fullscreen. Un efect
   secundar este că dispare bara de meniu, dar este în regulă. Pentru a ieși din
   modul fullscreen, apasă din nou ++f11++.
7. Uneori, și modul fullscreen are prea multe distrageri. Poți activa modul Zen
   cu ++ctrl+k++ (sau ++cmd+k++) și apoi ++z++ pentru a ascunde tot în afară de
   editor.
8. Poți să împarți editorul în două folosind fie butonul dedicat din bara de
   tab-uri (arată ca un pătrat împărțit în două), fie cu ++ctrl+backslash++ (sau
   ++cmd+backslash++). Alternativ, poți trage un fișier în editor și vei avea o
   indicație vizuală.
9. Pentru a ne asigura că avem un stil consistent, putem lăsa Visual Studio Code
   să formateze codul. Pentru acest lucru, putem apăsa ++shift+alt+f++ pe
   Windows, ++cmd+option+f++ pe macOS și ++ctrl+shift+i++ pe Linux. Dacă nu
   ești sigur de scurtătura pe platforma ta, poți căuta "Format Document" din
   Command Palette.
10. Uneori, ai nevoie să cauți un șir într-un fișier. Pentru acest lucru, apasă
   ++ctrl+f++ (++cmd+f++) (sau ++ctrl+shift+f++/++shift+cmd+f++ pentru a căuta
   în toate fișierele). Dacă în loc de ++f++ apeși ++h++ în combinațiile
   respective, poți să și înlocuiești text.
11. La capitolul de căutat fișiere, dacă apeși ++ctrl+p++ (++cmd+p++), poți să
    cauți numele unui fișier. Dacă adaugi `:`, poți să sari la o linie anume în
    fișierul curent (de pildă, în cazul unei erori de la compilator) sau la un
    simbol anume cu `@` (dacă trebuie să ajungi la o variabilă sau la o funcție
    anume).
12. Deseori vei avea nevoie să modifici în mai multe locuri simultan. Visual
    Studio Code are suport nativ pentru mai multe cursoare. Pentru a crea mai
    multe cursoare, apasă ++ctrl+alt+up++ (sau ++ctrl+alt+down++).
13. Pentru a selecta cuvântul curent, apasă ++ctrl+d++ (sau ++cmd+d++). Poți să
    apeși de mai multe ori pentru a găsi mai multe apariții.

!!! tip "Sfat"

    Sunt atâtea setări pe care le poți modifica și atâtea extensii pe
    care să le poți instala, însă recomand să înveți mai multe scurtături pentru
    acțiuni pe care le faci în mod comun. Dacă folosești mai mult tastatura,
    devii mai eficient pentru că nu este nevoie să îți muți mâna spre mouse. 

[Mergi la introducere](./intro.md){ .md-button }

#### Notepad++

Pentru a instala Notepad++:

1. Mergem pe site-ul oficial la secțiunea de Downloads:

    [Deschide pagina :material-open-in-new:](https://notepad-plus-plus.org/downloads/){.md-button .md-button--primary }

2. Alegem ultima versiune (la momentul scrierii, Notepad++ 8.6.9). Aici este
   link direct către installerul de 64 de biți:

    [Descarcă Notepad++ 8.6.9 :material-download:](https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.6.9/npp.8.6.9.Installer.x64.exe){ .md-button .md-button--primary }

3. Rulează installerul. Procesul de instalare este simplu și setările
   implicite sunt de ajuns pentru toată lumea, deci poți da Next în
   continuare până când se termină procesul.

Acum vremea să-l configurăm, pentru că nu ne este prea utilizabil în acest
moment.

1. Fontul implicit, Courier New... nu este prea bun. Pentru a schimba fontul,
   mergem la Setări și apoi la Configurator de stiluri. De acolo, putem modifica
   orice legat de tema curentă. Notepad++ are mai multe teme din care poți
   alege, așa că poți experimenta cu asta. Selectează tema Default
   (stylers.xml), și la stil font alege fontul Cascadia Mono sau Consolas (sau
   alt font monospațiat, dacă ai alte preferințe). Poți crește mărimea fontului
   (eu țin la 12, consider că 10 este o mărime prea mică). După ce ai făcut
   aceste lucruri, bifează Activare globală font și Activare globală mărime
   font. Fă același setări pentru tema DarkModeDefault (sau ce altă temă dorești
   să ai).
2. Acum vom vedea setările din Setări > Preferințe. Un prim lucru pe care îl
   putem face este să avem niște icoane mai moderne. Selectează din Generale
   opțiunea UI fluent umplut: mic (deși poți experimenta cu icoanele).
3. Ca să nu fim orbiți, mergi la Modul întunecat și alege fie Modul întunecat,
   fie Urmarea ferestrelor, care ajustează modul în funcție de setările globale
   din Windows. Poți să personalizezi și culoarea temei, dar "Negru" arată cel
   mai bine, după părerea mea.
4. Implicit, Notepad++ indentează folosind tab-uri. Pentru a schimba acest
   comportament, mergem la Limbaje și alegem Indentează folosind: Caracter(e)
   spațiu. Recomand indentare cu 4 spații (setarea implicită), însă alte valori
   comune includ 2, 3 și 8 (nu recomand ultima opțiune). Atâta timp cât este o
   valoare peste 1, este în regulă.
5. Acum ajustăm autocompletarea (rudimentară în Notepad++, dar există cel
   puțin). Implicit oferă sugestii pentru funcții și cuvinte. Recomand să bifezi
   tot ce se află la autoinserare (fiecare grup de paranteze și ghilimele)
   pentru că în marea majoritate a cazurilor le vei găsi în perechi și
   economisește ceva timp.

După toate aceste schimbări, editorul ar trebui să arate astfel:

<figure markdown="span">
![Fereastra de Notepad++ cu temă întunecată și un fișier C++](./images/notepadpp/npp-1.png){ loading=lazy }
</figure>

În acest moment, Notepad++ este doar un editor simplu și nu este potrivit
programării în C++, deci mai trebuie să facem configurări. Trebuie să instalăm
niște _module_ înainte. Pentru asta, mergem la Module > Administrare module. De
acolo, selectăm următoarele module:

- AutoSave, pentru a salva automat fișierele;
- BracketsCheck, pentru a verifica dacă am balansat acoladele sau parantezele
  (riscul ar trebui să fie minimizat de autocompletarea parantezelor, dar nu se
  știe);
- CodeAlignment, în caz că vrei să aliniezi codul după semnele de egal
  (opțional, dar drăguț de avut);
- Comment Toggler și CommentWrap pentru comentarii, face lucrul cu acestea mai
  ușor;
- ComparePlus, folosit pentru a compara două fișiere (mai puternic decât să tot
  schimbi între tab-uri pentru a vedea diferența dintre două fișiere);
- Discord Rich Presence, dacă simți nevoia să te lauzi pe Discord că ai
  Notepad++ (nu știu de ce ai face asta);
- MenuIcons, dacă vrei să ai icoane și în meniuri (opțional, dar recomandat);
- **Cel mai important modul**, NppExec, care ne permite să executăm script-uri
  fără să părăsim Notepad++. Cu asta vom compila și executa C++;
- Pentru cei care doresc, există NppOpenAI, ca să-l conectezi la ChatGPT;

După ce ai selectat acele module, apasă butonul de Instalare (dacă totuși ieși
accidental, selecția va rămâne). Notepad++ se va închide pentru a-și putea
instala modulele. Acum pentru a configura fiecare modul. Fiecare setare se află
în Module, sub numele fiecărui modul.

1. Pentru AutoSave, selectăm Notepad++ loses focus (în caz că dai ++alt+tab++)
   și At timed intervals every 10 minutes. Poți configura ultima opțiune să fie
   cât de des vrei tu. Este la alegerea ta dacă vrei să se autosalveze și când
   schimbi tab-ul (File tab changes) sau când închizi programul (Notepad++
   exists).
2. Pentru CodeAlignment, cea mai utilă scurtătură este ++ctrl+shift+equal++,
   care te lasă să aliniezi selecția după ce vrei tu (de obicei o vei folosi
   pentru egaluri sau virgule);
3. Pentru Comment Toggler, poți folosi scurtătura ++ctrl+q++ pentru a comenta
   sau decomenta selecția curentă. Poți explora ce face Comment Wrap și chiar să
   adaugi propriile tale scurtături pentru fiecare funcționalitate;
4. Cel mai complicat pas va fi la NppExec, pentru că acesta va compila
   propriu-zis codul nostru. Du-te la Module > NppExec > Execute NppExec Script
   (alternativ, ++f6++, scurtătură pe care o vei folosi mult) și scrie
   următoarea comandă (voi explica fiecare pas imediat):

    ```batch
    npp_save
    g++ -std=c++20 -O2 "$(FULL_CURRENT_PATH)" -o "$(CURRENT_DIRECTORY)\$(NAME_PART).exe"
    cmd /c start cmd /c "$(CURRENT_DIRECTORY)\$(NAME_PART).exe & pause"
    ```

    1. Prima linie salvează fișierul curent;
    2. A doua linie folosește g++, pe care l-am instalat la secțiunea cu GCC
       (MinGW). Compilează folosind standardul C++20 și optimizat pentru
       performanță. Ia fișierul curent (`calea/catre/nume.cpp`) și creează un
       executabil numit `nume.exe` în directorul curent.
    3. A treia linie pur și simplu pornește un terminal extern, ca să putem
       interacționa cu programul. Din păcate, Windows Defender scanează
       executabilul nostru, deci va îngheța timp de câteva secunde. Poți adăuga
       o excepție din Windows Defender (ca să nu faci 100 de directoare pentru
       fiecare proiect, adaugă tot într-un director și adaugă-l pe ăla ca
       excepție).

    Acum tot ce trebuie să faci este să apeși Save și dă-i numele C++. După
    aceea, poți să apeși secvența ++f6+enter++ ca să compilezi și rulezi codul.

Ai tot ce trebuie pentru a putea compila C++. Nu este o experiență la fel de
bună ca pe alte editoare, dar este suficient.

Legat de proiecte, nu prea ai propriu-zis conceptul ăsta, așa că doar creezi un
fișier cu extensia `.cpp`, eventual și alte fișiere de care ai nevoie, și
compilezi direct.

[Mergi la introducere](./intro.md){ .md-button }

#### Sublime Text 4

<!-- #### BBEdit -->

<!-- Add more... or maybe...? -->

### IDE-uri

#### Visual Studio 2022

Pentru a instala:

1. Descarcă executabilul de setup de aici (Visual Studio 2022 Community, este
   varianta gratuită și arhisuficientă pentru nevoile tale):
   
    [Descarcă Visual Studio 2022 Community :material-download:](https://c2rsetup.officeapps.live.com/c2r/downloadVS.aspx?sku=community&channel=Release&version=VS2022&source=VSLandingPage){ .md-button .md-button--primary }

2. Rulează executabilul. La prima fereastră cu titlul Visual Studio Installer,
   apasă pe butonul Continue. După ce se descarcă installer-ul oficial, o să ai
   o fereastră similară cu asta:

    <figure markdown="span">
    ![Fereastra inițială din installer, unde arată o listă de workload-uri](./images/vs2022/msvc.png){ loading=lazy }
    </figure>

3. Visual Studio 2022 are conceptul de _workload_. Fiecare workload este
   specializat pe un anumit domeniu sau limbaj și instalează un set anume de
   componente. Majoritatea workload-urilor sunt țintate către cei pe C#, însă pe
   noi ne interesează workload-ul **Desktop development with C++**. Așa ar
   trebui să arate fereastra ta după ce ai selectat opțiunea asta:

    <figure markdown="span">
    ![Fereastra inițială din installer, unde este selectată opțiunea "Desktop development with C++"](./images/vs2022/msvc-1.png){ loading=lazy }
    </figure>

4. Apasă butonul de install și așteaptă să se instaleze. După cum se poate vedea
   în ultima poză, este destul de mare Visual Studio. Totuși, după ce se termină
   de instalat, se deschide singur. La această fereastră, ori te poți loga cu
   contul de GitHub sau Microsoft, ori poți să dai skip, nu e necesar să ai un
   cont pentru a putea folosi Visual Studio.

    <figure markdown="span"> ![](./images/vs2022/msvc-2.png){ loading=lazy }
    </figure>

5. La următoarea fereastră, poți să lași setările implicite sau să schimbi tema.
   Tot ce mai rămâne să faci este să apeși pe "Start Visual Studio" și să
   aștepți puțin în timp ce se configurează. Dacă tot procesul a mers cum
   trebuie, se va deschide această fereastră:

    <figure markdown="span">
    ![](./images/vs2022/msvc-3.png){ loading=lazy }
    </figure>

Felicitări! Ai instalat Visual Studio 2022. Acum vremea să îl configurăm și
folosim.

Pentru a crea un proiect C++, facem următorii pași:

1. La fereastra de mai sus (care apare în momentul în care deschizi Visual
   Studio 2022), apasă pe "Create a new project".
2. O să fii întâmpinat de mai multe șabloane pe care le poți folosi:

    <figure markdown="span">
    ![](./images/vs2022/msvc-4.png){ loading=lazy }
    </figure>

3. Avem două șabloane care ni-s utile:
    1. Console App, care gestionează proiectul folosind MSBuild și este specific
       Visual Studio;
    2. CMake Project, care poate rula pe mai multe platforme (oriunde este
       suportat CMake, inclusiv Linux și *BSD) și nu este limitat de Visual
       Studio.

    Dacă nu ai nevoie să editezi proiectul și cu alte editoare/IDE-uri sau pe
    alte platforme, Console App este suficient, așa că asta vom folosi și noi
    acum. Dă dublu click pe Console App (sau selectează-l, apoi apasă Next).

4. Ajungem la această fereastră:

    <figure markdown="span">
    ![](./images/vs2022/msvc-5.png){ loading=lazy }
    </figure>

    În primul rând, avem numele proiectului.

    !!! tip "Sfat"

        Fă numele proiectului sugestiv, chiar numele problemei la care lucrezi
        acum, pentru că nu este prea drăguț să umpli printr-o mare de proiecte
        care încep cu ConsoleApplication.

    Apoi avem locația acestuia. Calea implicită este `$USER\source\repos`, dar
    poți să-l pui undeva separat (recomand acest lucru). După locație avem
    numele soluției. O soluție este un container pentru unul sau mai multe
    proiecte. Poți selecta și dacă vrei să fie soluția și proiectul în același
    director (caz în care numele proiectului este același cu cel al soluției).

    !!! warning "Atenție"

        Nu există soluții dacă alegi șablonul cu CMake. Există moduri prin
        care poți emula acest lucru, dar cea mai simplă cale (fără integrarea
        de care ai parte cu Console App) este să pui în directoare separate
        (de fapt, asta face și o soluție).

    !!! tip "Sfat"

        Nu este obligatoriu, însă dacă lucrezi de pe un site (e.g. Kilonova)
        sau faci probleme de la un concurs, recomand să le grupezi într-o
        soluție. Zece soluții sunt mult mai ușor de gestionat decât 40 de
        proiecte, dacă este nevoie să cauți pe viitor rezolvările la o
        problemă.

    De dragul exemplului, voi numi proiectul "ConsoleApplication1" sub locația
    implicită și pun proiectul în același loc cu soluția. Dacă totul a mers cum
    trebuie, vei vedea o fereastră similară cu asta:

    <figure markdown="span">
    ![](./images/vs2022/msvc-6.png){ loading=lazy }
    </figure>

Poți acum să apeși ++ctrl+f5++ (Start without Debugging) și vei vedea că rulează
programul și afișează Hello World. Asta înseamnă și că ai compilatorul MSVC
funcțional.

!!! tip "Sfat"

    Obișnuiește-te cu această scurtătură (++ctrl+f5++), o să o folosești
    _foarte des_. În timp, uită-te prin meniuri și învață niște scurtături
    comune pentru acțiunile pe care le faci cele mai des, așa vei deveni
    mai rapid și mai fluid la a folosi Visual Studio. [Vezi această
    pagină](https://visualstudio.microsoft.com/keyboard-shortcuts.pdf)
    care este cheatsheet de la Microsoft cu cele mai comune scurtături
    specifice VS. Scurtăturile generale gen ++ctrl+c++, ++ctrl+v++,
    ++ctrl+s++ etc. le poți găsi și din VS și sunt în mare parte general
    valabile.

Acum, timpul pentru niște chestii pe care le poți face ca să îmbunătățești
performanța (VS este un program mare și ia multă
memorie, deci poate fi uneori încet):

1. Visual Studio deschide automat fișierele care au fost deschise în vechea
   sesiune. Din această pricină, o soluție poate lua mai mult să se deschidă,
   pentru că toate fișierele sunt analizate în paralel. Pentru a dezactiva acest
   comportament:

    1. Apasă în meniu pe Tools, apoi Options (ultima din dropdown, cea cu o
       rotiță zimțată);
    2. Du-te la Projects and Solutions, apoi la General și dezactivează "Reopen
       documents on solution load". În final, ar trebui să arate similar cu
       asta:

        <figure markdown="span">
        ![](./images/vs2022/msvc-7.png){ loading=lazy }
        </figure>

    În schimb, putem să ne folosim de ce se află la Edit > Go To. Aici se află
    toate opțiunile:

    <figure markdown="span">
    ![](./images/vs2022/msvc-9.png){ loading=lazy }
    </figure>

    Cea mai importantă din ele este ++ctrl+t++ care funcționează ca un Go To
    generalizat. Pentru fișiere recente avem ++ctrl+1++, ++ctrl+r++, și pentru
    fișiere în general avem ++ctrl+shift+t++. Ocazional folosesc și ++ctrl+1++,
    ++ctrl+s++ ca să caut un simbol (o funcție, o variabilă etc.), ceea ce se
    poate dovedi util la fișiere mari.

2. Dacă instalezi extensii, acestea sunt activate când este nevoie. Problema la
   această abordare este că dacă ai una sau mai multe extensii care rulează
   imediat la pornire, atunci programul se va încetini. Poți folosi Help >
   Visual Studio Performance Manager pentru a inspecta de ce VS este încet.
3. Visual Studio își ajustează efectele bazat pe performanța clientului, însă
   acest lucru de cele mai multe ori încetinește tot. Pentru a rezolva acest
   lucru, mergem la Tools > Options și apoi la Environment > General. Opțiunea
   pe care vrem să o dezactivăm se cheamă "Automatically adjust visual
   experience based on client performance", împreună cu "Enable rich client
   visual experience". Ultima opțiune, cea cu accelerarea hardware, trebuie să
   rămână activă, pentru a nu randa software Visual Studio (excepție fiind dacă
   ai un calculator cu o placă video _foarte_ slabă sau dacă ești pe mașină
   virtuală). După ce ai terminat, fereastra trebuie să fie similară cu asta:

    <figure markdown="span">
    ![](./images/vs2022/msvc-8.png){ loading=lazy }
    </figure>

4. Windows Defender rulează constant în fundal pentru a ne proteja de viruși.
   Totuși, asta impactează negativ performanța pentru că scanează toate
   directoarele din sistem, inclusiv cele ale lui Visual Studio și cele ale
   proiectelor noastre. Pentru acest lucru, trebuie să facem excepții. Am creat
   un script de PowerShell care să automatizeze acest proces. Acesta poate fi
   descărcat de aici:

    [Descarcă script :material-download:](./codes/ImproveVS2022.ps1){ .md-button .md-button--primary }

    <details><summary>Scriptul complet (salvat în ImproveVS2022.ps1)</summary>
    ```powershell
    if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator"))
    {
        Write-Host "Ruleaza acest script ca Administrator." -ForegroundColor Red
        exit
    }

    $userPath = $env:USERPROFILE
    $appdataLocal = "$userPath\AppData\Local"
    $appdataRoaming = "$userPath\AppData\Roaming"
    $programData = "C:\ProgramData"
    $programFiles = "C:\Program Files"
    $programFilesX86 = "$programFiles (x86)"

    $pathExclusions = @(
        'C:\Windows\Microsoft.NET',
        'C:\Windows\assembly',
        "$userPath\.dotnet",
        "$userPath\.librarymanager",
        "$appdataLocal\Microsoft\VisualStudio",
        "$appdataLocal\Microsoft\VisualStudio Services",
        "$appdataLocal\GitCredentialManager",
        "$appdataLocal\GitHubVisualStudio",
        "$appdataLocal\Microsoft\dotnet",
        "$appdataLocal\Microsoft\VSApplicationInsights",
        "$appdataLocal\Microsoft\VSCommon",
        "$appdataLocal\Temp\VSFeedbackIntelliCodeLogs",
        "$appdataRoaming\Microsoft\VisualStudio",
        "$appdataRoaming\NuGet",
        "$appdataRoaming\Visual Studio Setup",
        "$appdataRoaming\vstelemetry",
        "$programData\Microsoft\VisualStudio",
        "$programData\Microsoft\NetFramework",
        "$programData\Microsoft Visual Studio",
        "$programFiles\Microsoft Visual Studio",
        "$programFiles\dotnet",
        "$programFiles\Microsoft SDKs",
        "$programFiles\Microsoft SQL Server",
        "$programFiles\IIS",
        "$programFiles\IIS Express",
        "$programFilesX86\Microsoft Visual Studio",
        "$programFilesX86\dotnet",
        "$programFilesX86\Microsoft SDKs",
        "$programFilesX86\Microsoft SQL Server",
        "$programFilesX86\IIS",
        "$programFilesX86\IIS Express"
    )

    $processExclusions = @(
        'ServiceHub.SettingsHost.exe',
        'ServiceHub.IdentityHost.exe',
        'ServiceHub.VSDetouredHost.exe',
        'ServiceHub.Host.CLR.x86.exe',
        'Microsoft.ServiceHub.Controller.exe',
        'PerfWatson2.exe',
        'sqlwriter.exe'
    )

    Write-Host "Acest script va crea excluderi pentru Windows Defender pentru folderele și procesele comune ale Visual Studio 2022."
    Write-Host ""
    $projectsFolder = Read-Host "Care este calea către folderul proiectelor tale? (exemplu: $userPath\source\repos)"

    if (-not (Test-Path $projectsFolder))
    {
        Write-Host "Calea specificată pentru folderul proiectelor nu există. Ieșire din script." -ForegroundColor Red
        exit
    }

    Write-Host ""
    Write-Host "Adăugare excludere cale: $projectsFolder"
    Add-MpPreference -ExclusionPath $projectsFolder

    foreach ($exclusion in $pathExclusions)
    {
        Write-Host "Adăugare excludere cale: $exclusion"
        try
        {
            Add-MpPreference -ExclusionPath $exclusion
        }
        catch
        {
            Write-Host "Nu s-a reușit adăugarea excluderii pentru calea: $exclusion - $_" -ForegroundColor Yellow
        }
    }

    foreach ($exclusion in $processExclusions)
    {
        Write-Host "Adăugare excludere proces: $exclusion"
        try
        {
            Add-MpPreference -ExclusionProcess $exclusion
        }
        catch
        {
            Write-Host "Nu s-a reușit adăugarea excluderii pentru procesul: $exclusion - $_" -ForegroundColor Yellow
        }
    }

    Write-Host ""
    Write-Host "Excluderile tale:"
    $prefs = Get-MpPreference

    Write-Host "Căile excluse:"
    $prefs.ExclusionPath
    Write-Host ""

    Write-Host "Procesele excluse:"
    $prefs.ExclusionProcess

    ```
    </details>

    Pentru a-l folosi, trebuie făcuți următorii pași (presupun că ai descărcat
    scriptul în `C:\Users\<nume>\Downloads` (adică în folderul de Descărcări)):

    1. Deschide o fereastră de PowerShell ca administrator. Pentru a face acest
       lucru, fie poți apăsa incantația ++win+x++, ++a++ și apoi ++enter++, fie
       poți să cauți Windows Powershell (sau doar Terminal, dacă ești pe Windows
       11) în meniu, apoi selectezi Executare ca administrator.

    2. Navighează până la calea unde ai descărcat cu `cd C:\Users\<cale>`. În
       cazul meu, va fi `cd C:\Users\RoAlgo\Downloads`.

    3. Scrie `.\ImproveVS2022.ps1` (presupunând că așa ai numit fișierul).

    4. Trebuie doar să furnizezi calea unde îți stochezi proiectele de obicei.
       Dacă ești cu setările implicite, atunci poți scrie exact ce îți zice
       exemplul (adică `C:\Users\<nume>\source\repos`). Dacă nu există calea,
       atunci programul iese.

    5. Apeși ++enter++ și aștepți să își facă treabă (termină repede).

Asta este tot cu configurarea. Poți acum să mergi către următorul articol:

[Mergi la introducere](./intro.md){ .md-button }

#### Xcode

#### Code::Blocks

#### Qt Creator

#### CLion
