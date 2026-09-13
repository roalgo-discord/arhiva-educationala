---
title: macOS
hide:
  - navigation
  - toc
---

Înainte de a instala un editor/IDE, avem nevoie de un compilator. Există
următoarele opțiuni:

<div class="grid cards" markdown>

- :dragon:{ .lg .middle } **Apple Clang**

    ---

    Apple Clang este compilatorul implicit pe macOS, fiind inclus în Xcode
    Command Line Tools. Acesta este o variantă modificată de Clang/LLVM,
    optimizată pentru ecosistemul Apple.

    Dacă vrei cea mai simplă soluție pentru dezvoltare pe macOS, alege această
    opțiune. Este recomandat pentru majoritatea utilizatorilor.

    [:octicons-arrow-right-24: Vezi instrucțiuni pentru XCode](./editors/macos/xcode.md)

- :sheep:{ .lg .middle } **GCC**

    ---

    GCC (GNU Compiler Collection) este o suită de compilatoare libere și
    gratuite. Cel mai folosit compilator din această suită este GCC (GNU C
    Compiler).

    Pe macOS, cea mai ușoară metodă de a instala GCC este folosind Homebrew.
    Dacă ai nevoie de GCC sau nu vrei să instalezi XCode, alege această opțiune.

    [:octicons-arrow-right-24: Vezi instrucțiuni pentru GCC](./compilers/macos/gcc.md)

</div>

Dacă ai deja un compilator instalat pe sistem (fie Clang, fie GCC),
atunci aici ai unele opțiuni de editoare:

[Vezi opțiuni de editoare :material-open-in-new:](./editors/macos/optiuni-editoare.md){ .md-button .md-button--primary }
