---
title: "GNU Compiler Collection"
hide:
  - navigation
  - toc
---


# Homebrew (recomandat)

[Homebrew](https://brew.sh/]) este un package manager similar cu cele întâlnite pe Linux.

##  Instaleaza [Homebrew](https://brew.sh/]).

Deschide un Terminal. Cea mai rapidă modalitate e prin Spotlight: apasă ++cmd+space++, apoi scrie „Terminal”, apasă ++enter++ și scrie comanda:

```bash
NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Homebrew se va instala și configura automat. Opțional, poți adăuga Homebrew în `PATH` cu această comandă din screenshot.

```bash
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> $HOME/.zprofile \
eval "$(/usr/local/bin/brew shellenv)"
```

<figure markdown="span">
![](./images/brew-finish-light.png#only-light){ loading=lazy }
![](./images/brew-finish-dark.png#only-dark){ loading=lazy }
</figure>

## Instaleaza GCC


Pentru a instala cea mai nouă versiune de [GCC](https://formulae.brew.sh/formula/gcc), folosește comanda:
```bash
brew install gcc
```

După instalare, GCC se va instala sub numele de `gcc-14`.


<figure markdown="span">
![](./images/brew-gcc-light.png#only-light){ loading=lazy }
![](./images/brew-gcc-dark.png#only-dark){ loading=lazy }
</figure>

În cazul în care dorești o versiune specifică de GCC, poți instala, de exemplu,
versiunea [`@12`](https://formulae.brew.sh/formula/gcc) folosind comanda:
```bash
brew install gcc@12
```

Pentru mai multe informații, consultați [documentația oficială de la Homebrew](https://docs.brew.sh/FAQ).

# MacPorts

[MacPorts](https://www.macports.org) este o alternativă la Homebrew. Dacă ai o versiune mai veche de macOS (de exemplu, Catalina) sau dacă Homebrew nu funcționează, folosește MacPorts.

## Instaleaza [MacPorts](https://www.macports.org).

Pentru a descărca MacPorts, [accesați acest link](https://www.macports.org/install.php#installing) si descărca versiunea de [MacPorts](https://www.macports.org) conform versiunii tale [macOS](https://support.apple.com/en-us/109033):

<figure markdown="span">
[![](./images/macports-browser-light.png#only-light){ loading=lazy width=80% }](https://www.macports.org/install.php#installing)
[![](./images/macports-browser-dark.png#only-dark){ loading=lazy width=80%}](https://www.macports.org/install.php#installing)
</figure>


După ce ai descărcat și ai rulat fișierul .pkg (e.g. `MacPorts-2.10.5-15-Sequoia.pkg`), apasă pe "Continue" și "Agree" la toate casetele respective pentru a instala MacPorts.
<figure markdown="span">
![](./images/macports-finish-light.png#only-light){ loading=lazy }
![](./images/macports-finish-dark.png#only-dark){ loading=lazy }
</figure>

Pentru a verifica dacă MacPorts este instalat pe sistemul tău, deschide un terminal, folosește comanda respectivă:
```bash
port version
```

<figure markdown="span">
![](./images/macports-version-light.png#only-light){ loading=lazy }
![](./images/macports-version-dark.png#only-dark){ loading=lazy }
</figure>

În cazul în care comanda nu există (adica afiseaza urmatorul output dupa ce rulezi `port version`):
```
zsh: command not found: port
```
repornește terminalul pentru a actualiza `PATH` sau poți rula MacPorts direct din `/opt/local/bin/port`.

## Instaleaza GCC


Pentru a instala cea mai nouă versiune de [GCC](https://ports.macports.org/search/?q=gcc), folosește comanda:
```bash
port install gcc-14
```
După instalare, GCC se va instala sub numele de ```gcc-14```.


<figure markdown="span">
![](./images/brew-gcc-light.png#only-light){ loading=lazy }
![](./images/brew-gcc-dark.png#only-dark){ loading=lazy }
</figure>

În cazul în care dorești o versiune specifică de GCC, poți instala, de exemplu, versiunea [```12```](https://ports.macports.org/search/?q=gcc) folosind comanda:
```bash
port install gcc-12
```

Pentru mai multe informații, consultați [documentația oficială de la MacPorts](https://guide.macports.org/).

Acum navighează aici pentru a vedea ce editoare ai la dispoziție:

[Vezi opțiuni de editoare :material-open-in-new:](../../editors/macos/optiuni-editoare.md){ .md-button .md-button--primary }
