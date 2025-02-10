---
title: "Xcode"
hide:
  - navigation
  - toc
---

# Instalare

Avem două metode de a instala Xcode (evident, o să ai nevoie de un Apple ID):

## Cea mai simpla metoda (recomandat)

Deschide App Store și caută Xcode,
primul rezultat ar trebui să fie similar cu cel din imagine:

<figure markdown="span">
[![](./xcode/xcode-appstore-dark.png#only-dark){ loading=lazy width=65%}](https://apps.apple.com/ro/app/xcode/id497799835?mt=12)
[![](./xcode/xcode-appstore-light.png#only-light){ loading=lazy width=65%}](https://apps.apple.com/ro/app/xcode/id497799835?mt=12)
</figure>

Acum instalează Xcode așa cum instalezi orice altă aplicație!

Aplicația va fi disponibilă în Launchpad și Spotlight ++cmd++ + ++space++ .

## Alternativ, prin browser.

Du-te pe [xcodereleases.com](https://xcodereleases.com/) și descarcă versiunea de Xcode care este compatibilă cu versiunea ta de macOS.

<figure markdown="span">
[![](./xcode/xcode-page-light.png#only-light){ loading=lazy }](https://xcodereleases.com/)
[![](./xcode/xcode-page-dark.png#only-dark){ loading=lazy }](https://xcodereleases.com/)
</figure>

Vi se va cere să vă autentificați cu Apple ID-ul dumneavoastră! 

!!! warning "Atenție"
    În funcție de mac, extragerea poate dura mult timp sau poate fi rapidă.

După ce s-a descărcat fisierul XIP e.g. `XCode.16.2-xip`, extrage-l iar apoi 
   mută `Xcode` direct în Applications.

<figure markdown="span">
![](./xcode/xcode-extract-dark.png#only-dark){ loading=lazy}
![](./xcode/xcode-extract-light.png#only-light){ loading=lazy}
</figure>

Aplicația va fi disponibilă în Launchpad și Spotlight ++cmd++ + ++space++ .

## Configurare și utilizare

Felicitări! Ai instalat Xcode. Acum când deschidem Xcode, vom observa un pop-up care ne cere să selectăm
pe ce dispozitive dorim să dezvoltăm. Tot ce trebuie sa faci să dai click pe 'Install'.

<figure markdown="span">
![](./xcode/xcode-installselect-dark.png#only-dark){ loading=lazy}
![](./xcode/xcode-installselect-light.png#only-light){ loading=lazy}
</figure>

Va apărea fereastra 'Installing system components', iar când vi se va solicita parola, 
introduceți parola și apăsați pe 'Instalare software'.

<div class="grid" markdown align=center>

![](./xcode/xcode-installing-light.png#only-dark){ loading=lazy }
![](./xcode/xcode-installing-dark.png#only-light){ loading=lazy }

![](./xcode/xcode-installsoftwarepass-dark.png#only-dark){ loading=lazy }
![](./xcode/xcode-installsoftwarepass-light.png#only-light){ loading=lazy}

</div>

Pentru a crea un proiect C++, facem următorii pași:

1. Apasă pe 'Create New Project'.

<figure markdown="span">
![](./xcode/xcode-welcome-dark.png#only-dark){ loading=lazy}
![](./xcode/xcode-welcome-light.png#only-light){ loading=lazy}
</figure>

2. O să fii întâmpinat de mai multe categori pe care le poți folosi:

<figure markdown="span">
![](./xcode/xcode-newfile-dark.png#only-dark){ loading=lazy}
![](./xcode/xcode-newfile-light.png#only-light){ loading=lazy}
</figure>

Evident, pentru scopul nostru, vom selecta 'macOS' si vom folosi 'Command Line Tool'.

<figure markdown="span">
![](./xcode/xcode-cmdtool-dark.png#only-dark){ loading=lazy}
![](./xcode/xcode-cmdtool-light.png#only-light){ loading=lazy}
</figure>

3. Vei observa că poți selecta mai multe limbaje de programare, pentru scopul nostru vom selecta C++. Numește 'Product Name' și 'Organization Identifier' așa cum dorești, eu le-am numit ambele 'cppintro'. Apasă pe 'Next' și salvează unde dorești, locația unde salvezi nu este importantă.

<figure markdown="span">
![](./xcode/xcode-cppintro-dark.png#only-dark){ loading=lazy}
![](./xcode/xcode-cppintro-light.png#only-light){ loading=lazy}
</figure>

4. Acum, dacă dăm dublu clic pe 'main' și apoi apăsăm pe Run :material-play: ++cmd+r++ , vom vedea că Xcode funcționează!

<figure markdown="span">
![](./xcode/xcode-code-dark.png#only-dark){ loading=lazy}
![](./xcode/xcode-code-light.png#only-light){ loading=lazy}
</figure>

Asta este tot cu configurarea. Poți acum să mergi către următorul articol:

[Mergi la introducere](./../../intro.md){ .md-button .md-button--primary }
