---
title: "TextMate"
hide:
  - navigation
  - toc
---

## Instalare

  Procesul de instalare este unul foarte simplu:

  1.  Descarcă [TextMate](https://macromates.com/) de pe site-ul oficial. (imaginea de mai jos te redirecționează către site.)

      <figure markdown="span">
      [![](./textmate/textmate-browser-dark.png#only-dark){ loading=lazy width=65%}](https://api.textmate.org/downloads/release?os=10.12)
      [![](./textmate/textmate-browser-light.png#only-light){ loading=lazy width=65%}](https://api.textmate.org/downloads/release?os=10.12)
      </figure>

  2.  După ce s-a descărcat, deschide tbz respectiv e. g. `TextMate_2.0.23-tbz`,
      mută `TextMate` din folderul extras în Applications.

      Aplicația va fi disponibilă în Launchpad și Spotlight ++cmd++ + ++space++ .

  Alternativ, poți instala `TextMate` printr-un package manager cum ar fi Homebrew sau MacPorts.

## Configurare și utilizare
TextMate, ca (aproape) orice editor de text, oferă suport nativ pentru C++. Acest lucru ne permite să rulăm direct, folosind shortcuturi, fără a fi necesar să ne complicăm cu un buildsystem extern, precum CMake sau Makefiles etc.

Extensiile in TextMate, sunt organizate sub formă de Bundles. Dacă doriți să instalați extensii, mergeți pur și simplu in TextMate - Settings ++cmd+grave++ și apoi pe fila Bundle selecteaza extensia..

<figure markdown="span">
![](./textmate/textmate-settings-light.png#only-light){ loading=lazy }
![](./textmate/textmate-settings-dark.png#only-dark){ loading=lazy }
</figure>

<figure markdown="span">
![](./textmate/textmate-bundle-light.png#only-light){ loading=lazy }
![](./textmate/textmate-bundle-dark.png#only-dark){ loading=lazy }
</figure>

Acum vom face un fișier de C++ pentru a putea continua. Creează un
fișier nou, fie din File > New, fie folosind scurtătura ++cmd+n++. Îl
salvăm imediat undeva (++cmd+s++), locația nu este importantă pe moment. Numele
fișierului trebuie să se termine cu `.cpp` la final, să-i zicem `main.cpp`.
Imediat ce ai salvat, O să vezi că TextMate a recunoscut fișierul
nostru gol ca unul de C++. Adaugă aceste linii în
fișier si salveaza-l ++cmd+s++:
```cpp title="main.cpp"
#include <iostream>

int main() {
    std::cout << "Hello from TextMate!" << std::endl;
    return 0;
}
```

Acum, dacă rulăm programul, fie prin opțiunea Bundles - C - Run, sau direct cu ++cmd+r++, vom obține următorul output.

<figure markdown="span">
![](./textmate/textmate-run-light.png#only-light){ loading=lazy }
![](./textmate/textmate-run-dark.png#only-dark){ loading=lazy }
</figure>

<!-- Shortcuturi-->

Asta este tot cu configurarea. Poți acum să mergi către următorul articol:

[Mergi la introducere](./../../intro.md){ .md-button .md-button--primary }
