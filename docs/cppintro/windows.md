---
title: Windows
hide:
  - navigation
  - toc
---

Înainte de a instala un editor/IDE, avem nevoie de un compilator. Există
următoarele opțiuni:

<div class="grid cards" markdown>

- :material-microsoft-windows:{ .lg .middle } **MSVC**

    ---

    MSVC (Microsoft Visual C++) este un compilator proprietar făcut de Microsoft
    și este parte din IDE-ul Visual Studio 2022.

    Dacă ești sigur(ă) că vrei să folosești acest IDE în particular, alege
    această opțiune. Dacă l-ai instalat deja, atunci alege această opțiune,
    deoarece articolul include și niște sfaturi de performanță.

    [:octicons-arrow-right-24: Vezi instrucțiuni pentru Visual
    Studio](./editors/windows/visual-studio-2022.md)

- :material-sheep:{ .lg .middle } **GCC (MinGW)**

    ---

    GCC (GNU Compiler Collection) este o suită de compilatoare libere și
    gratuite. Cel mai folosit compilator din această suită este GCC (GNU C
    Compiler).

    Pe Windows, cea mai ușoară metodă de a instala compilatorul GCC este
    folosind MinGW-w64. În caz că nu folosești Visual Studio 2022, ci alt editor
    (de pildă, Code::Blocks sau Visual Studio Code), alege această opțiune.

    [:octicons-arrow-right-24: Vezi instrucțiuni pentru MinGW](./compilers/windows/mingw64.md)

</div>

Dacă ai deja un compilator instalat pe sistem (fie MSVC, fie GCC prin MinGW),
atunci aici ai unele opțiuni de editoare:

[Vezi opțiuni de editoare :material-open-in-new:](./editors/windows/optiuni-editoare.md){ .md-button .md-button--primary }
