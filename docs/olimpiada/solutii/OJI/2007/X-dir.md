---
id: OJI-2007-X-dir
title: Soluția problemei Dir (OJI 2007, clasa a X-a)
problem_id: 769
authors: [aburta]
prerequisites:
    - expression-evaluation
    - strings
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/10/dir.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2007/10/dir.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2007/10/dir.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

int explorerPnt;
string fileExplorer;
vector<string> filePaths;

// Function Declaration

string getWord();
void evaluateFolder();

// End of Function Declaration

// Returns the next word in our fileExplorer which could be a folder name or a file name
string getWord() {
    string word;

    word = "";

    const size_t explorerSize = fileExplorer.size();
    while(explorerPnt < explorerSize && fileExplorer[explorerPnt] != '(' && fileExplorer[explorerPnt] != ')' && fileExplorer[explorerPnt] != ',') {
        word += fileExplorer[explorerPnt++];
    }

    return word;
}

// 

// evluates the folder to find all files
// it does this using recursion
void evaluateFolder(string folderPath) {
    string word, path;
    
    const size_t explorerSize = fileExplorer.size();
    while(explorerPnt < explorerSize && fileExplorer[explorerPnt] != ')') { // Until we reach end of folder marked by ')'
        word = getWord();

        switch (fileExplorer[explorerPnt]) {
            case '(': // same as evaluateStructure => it's a folder
                if(++explorerPnt < explorerSize && fileExplorer[explorerPnt] != ')') { // meaning the folder isn't empty
                    string newFolderPath;

                    newFolderPath = folderPath + '\\' + word; // = FOLDER1 \ FOLDER2
                    evaluateFolder(newFolderPath); // going deeper
                }
                explorerPnt++;
                break;
            
            default: // meaning it's a file
                string filePath;

                filePath = folderPath + '\\' + word;  // = FOLDER1 \ file1
                filePaths.push_back( filePath );
                break;
        }

        if(explorerPnt < explorerSize && fileExplorer[explorerPnt] == ',') { // going over ',' chars
            explorerPnt++;
        }
    }
}  

int main() {
    ifstream cin("dir.in");
    ofstream cout("dir.out");

    string word, path, folderPath;

    cin >> fileExplorer;

    // begin evaluation
    word = getWord();

    switch (fileExplorer[explorerPnt]) { // Determine what do we need to call first
        case '(': // meaning it's a folder
            explorerPnt++;
            evaluateFolder( folderPath = word );
            break;
        
        default:
            filePaths.push_back( path = word );
            break;
    }

    sort(filePaths.begin(), filePaths.end());

    cout << filePaths.size() << '\n';
    for(auto path : filePaths) {
        cout << path << '\n';
    }
    return 0;
}
```
