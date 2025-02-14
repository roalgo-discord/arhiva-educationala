---
title: "Zed"
hide:
  - navigation
  - toc
---

## Instalare

  Procesul de instalare este unul foarte simplu:

  1.  Descarcă Zed de pe site-ul oficial și selectează arhitectura Mac-ului. (imaginea de mai jos te redirecționează către site.)

      <figure markdown="span">
      [![](./zed/zed-browser-dark.png#only-dark){ loading=lazy width=65%}](https://zed.dev/download)
      [![](./zed/zed-browser-light.png#only-light){ loading=lazy width=65%}](https://zed.dev/download)
      </figure>

  2.  După ce s-a descărcat, deschide DMGul respectiv e. g. `Zed-x86_64.dmg`,
      apoi mută `Zed` în Applications.

      Aplicația va fi disponibilă în Launchpad și Spotlight ++cmd++ + ++space++ .

  Alternativ, poți instala `Zed` printr-un package manager cum ar fi Homebrew sau MacPorts.

## Configurare și utilizare

  Spre deosebire de alte editoare de text, Zed vine implicit cu suport nativ pentru C++ 
  și alte limbaje de programare, precum și cu caracteristici avansate, cum ar fi integrarea AI 
  și suport pentru Git. De asemenea, editorul permite instalarea de plugin-uri. ++cmd+shift+x++

### VIM

  Modul Vim este accesibil prin Command palette ++cmd+shift+p++., doar scrie `tvm` sau `toggle vim mode` și ar trebui să apară `workspace: toggle vim mode`. [Pentru mai multe informații consultă documentația oficială.](https://zed.dev/docs/vim#command-palette)
  <!-- un mini tutorial cum sa folosesti VIM. -->

### AI

  Pentru a utiliza GitHub Copilot, apasă pe :octicons-copilot-96: din panoul de jos
  și apoi pe butonul 'Login'. Vei fi redirecționat către pagina de Autorizare de la Github.
  Autorizeaza Aplicatia iar acum GitHub Copilot ar trebui să funcționeze fără probleme!

  Pentru a utiliza, e.g. DeepSeek, apasă pe :material-star-plus: din panoul
  de jos, apoi :material-dots-vertical: și selectează 'Configure'. Urmează instrucțiunile
  din setări!

<figure markdown="span">
![](./zed/zed-aiconf-light.png#only-light){ loading=lazy width=65%}
![](./zed/zed-aiconf-dark.png#only-dark){ loading=lazy width=65%}
</figure>

  Acum vom crea un director gol în care ulterior vom adăuga fișierele C++ pentru a continua. 
  Apasă pe File - Add Folder to Project, creează un folder nou și denumește-l cum dorești si dupa Open.

  Adaugă aceste linii în fișier și salvează-l ca `main.cpp`, File - Save ++cmd+s++ .

  ```cpp title="main.cpp"
  #include <iostream>

  int main() {
      std::cout << "Hello from Zed!" << std::endl;
      return 0;
  }
  ```

  Rulați un terminal :octicons-terminal-24: ++cmd+j++, executați 
  comanda următoare si acum ar trebui să afișeze `Hello from Zed!`.

  ```bash
  clang++ main.cpp -o main && ./main
  ```

<figure markdown="span">
![](./zed/zed-cod-light.gif#only-light){ loading=lazy width=65%}
![](./zed/zed-cod-dark.gif#only-dark){ loading=lazy width=65%}
</figure>

  Acest editor nu are shortcut-uri pentru Debug și Run, așa cum sunt in IDE-uri/Alte Editoare, ceea ce poate deveni destul de frustrant atunci când trebuie să execuți aceeași comandă din nou și din nou

  Problema asta se poate remedia cu [Task](https://zed.dev/docs/tasks), vom crea un folder numit `.zed` și in directorul curent vom crea un fișier numit `tasks.json` 

```json title=".zed/tasks.json"
[
  {
    "label": "Compile & Run",
    "reveal": "always",
    "command": "clang++ ./main.cpp -o cpptest && ./cpptest" 
  }
]
```
Salveaza-l si acum, dacă apeși ++cmd+shift+r++, va apărea un task numit 'Executare'. 
De asemenea, poți folosi tasks pentru a integra un buildsystem sau GDB, 
dacă dorești. Recomandarea mea personală este să te obișnuiești cu terminalul, 
deoarece acesta îți oferă un control mai mare.

<figure markdown="span">
![](./zed/zed-exec-light.png#only-light){ loading=lazy }
![](./zed/zed-exec-dark.png#only-dark){ loading=lazy }
</figure>


<!-- TODO: Documenteaza cum folosesti mai exact CMAKE -->

## Shortcut

Dacă doriți să accesați asistentul AI, foloseste ++cmd+question++.

Pentru a deschide terminalul, foloseste ++cmd+grave++ sau ++cmd+j++. Alternativ, apăsa pe :octicons-terminal-24:.
Dacă vrei să deschizi un tab nou, folosește ++cmd+tilde++. Alternativ, apăsa pe :octicons-plus-24: și "New Terminal".

Dacă doriți să aveți bara laterală, apasă pe icoana :material-file-tree: ++cmd+shift+e++, iar pentru a închide bara laterală, folosiți ++cmd+b++.

<!-- Evident, lipsesc shortcuturi -->

[În rest, majoritatea shortcut-urilor sunt aproape similare celor găsite în alte editoare.](https://zed.dev/docs/key-bindings)


Asta este tot cu configurarea. Poți acum să mergi către următorul articol:

[Mergi la introducere](./../../intro.md){ .md-button .md-button--primary }
