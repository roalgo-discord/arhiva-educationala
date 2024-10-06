## Un ghid pentru începători despre funcții lambda în C++

Funcțiile lambda au fost introduse în C++ odată cu C++11 și au devenit rapid una dintre cele mai puternice caracteristici ale limbajului. Ele fac codul mai expresiv, concis și, adesea, mai ușor de citit. Dar dacă ești nou în C++ sau chiar un programator experimentat care abia acum explorează aceste instrumente utile, ele pot părea puțin intimidante la început. În această postare, vom analiza ce sunt funcțiile lambda, cum să le folosești și când pot fi utile.

## Ce este o funcție lambda?

O funcție lambda este, în esență, o funcție anonimă - o funcție fără nume - pe care o poți defini în linie, adesea în punctul în care este utilizată. Ele sunt deosebit de utile pentru fragmente scurte de cod care sunt puțin probabil să fie reutilizate, cum ar fi comparatoare personalizate în sortare sau callback-uri.

## Sintaxa unei funcții lambda

Sintaxa de bază a unei funcții lambda în C++ arată astfel:

```cpp
[/*capture*/](/*params*/) -> /*return type*/ {
  /*function body*/
}
```

Dacă dorim să dăm un nume unei lambda, atunci putem adăuga în față `auto nume = /*lambda*/;`.
Această sintaxă poate părea ciudată, așa că hai să o descompunem în bucăți pentru a explica părțile diferite în comparație cu o funcție normală.

### Captura (capture)

Captura permite copierea sau modificarea unor valori. Există mai multe variante de a defini captura, fiecare cu scop specific.

- `[x]` copiază valoarea ca `const`.

  ```cpp
  int main() {
    int x = 15;
    auto add = [x](int cnt) -> int {
      return x + cnt;
    };
    std::cout << add(10); // 25
  }
  ```

  Dacă încercăm să compilăm varianta de mai sus, aceasta va funcționa corect, însă varianta de mai jos nu va funcționa.

  ```cpp
  int main() {
    int x = 15;
    auto add = [x](int cnt) -> void {
      x += cnt;
      // nu va merge pentru că valoarea este constantă
    };
    std::cout << x;
  }
  ```

- `[&x]` face referință la valoarea inițială, permițând să fie modificată

  ```cpp
  int main() {
    int x = 15;
    auto add = [&x](int cnt) -> void {
      x += cnt;
    };
    add(10);
    std::cout << x; // 25
  }
  ```

- `[=]` copiază toate valorile, similar cu `[x]`

  ```cpp
  int main() {
    int x = 15;
    auto add = [=](int cnt) -> int {
      return x + cnt;
    };
    std::cout << add(10); // 25
  }
  ```

- `[&]` face referință la toate valorile, similar cu `[&x]`

  ```cpp
  int main() {
    int x = 15;
    auto add = [&](int cnt) -> void {
      x += cnt;
    };
    add(10);
    std::cout << x; // 25
  }
  ```

Putem defini și mai multe valori care să fie capturate

```cpp
int main() {
  int x = 10, y = 15;
  auto add = [&x, y]() { // x poate fi modificat, y e constant
    x += y;
  };

  add();
  std::cout << x; // 25
}
```

#### `mutable`

Există o situație în care nici o variantă de captură nu acoperă ce dorim, și anume atunci când vrem să modificăm valoarea fără a o afecta pe cea inițială. În această situație există `mutable`.

```cpp
int main() {
  int x = 15;
  auto add = [=](int cnt) -> int mutable {
    x += 10;
    std::cout << x; // 25
    return x;
  };

  int y = add(10);
  std::cout << x << ' ' << y; // 15 25
  // Observăm că x rămâne valoarea inițială în afara funcției, dar e diferită în funcție
}
```

### Tipul de retur

O funcție lambda trebuie să definească tipul de retur, similar cu o funcție normală. Acesta este definit prin adaugând `#!cpp -> tip` după parametri.

```cpp
int main() {
  auto gauss = [](int n) -> int {
    return n * (n + 1) / 2;
  };

  cout << gauss(10); // 55
}
```

Totuși, funcțiile lambda suportă și auto-determinarea tipului de retur. De reținut, totuși, că o funcție nu poate returna două tipuri diferite, chiar dacă tipul de return este determinat automat.

```cpp
int main() {
  auto gauss = [](int n) { // tipul a fost determinat de compilator
    return n * (n + 1) / 2;
  };

  cout << gauss(10); // 55
}
```

## Utilizări practice ale lambda-urilor

Cea mai comună utilizare a funcțiilor lambda este pentru a putea adăuga sortare personalizată la sort-ul din STL.

```cpp
int main() {
  int n;
  std::cin >> n;
  std::vector<std::pair<int, int>> v(n);
  for (auto &[x, y] : v)
    std::cin >> x >> y;

  std::sort(v.begin(), v.end(), [](std::pair<int, int> a, std::pair<int, int> b) {
    // sortăm descrescător după a doua valoare, dacă sunt identice, crescător după prima
    if (a.second == b.second)
      return a.first < b.first;
    return a.second > b.second;
  });
}
```

## Resurse suplimentare

- [Lambda expressions (cppreference.com)](https://en.cppreference.com/w/cpp/language/lambda)
- [On lambdas, C++ and otherwise: the what, the why, and the how](https://nor-blog.codeberg.page/posts/2023-12-02-lambdas-cpp-and-otherwise/)