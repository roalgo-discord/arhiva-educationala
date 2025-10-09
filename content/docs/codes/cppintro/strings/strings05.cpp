// --8<-- [start:strlen]
char message[] = "roalgo este cel mai bun server de informatica";
cout << strlen(message) << '\n';  // 45
// --8<-- [end:strlen]

// --8<-- [start:strcpy]
char sursa[11] = "hello";
char destinatie[11] = "world";

// Se va afișa "hello world"
cout << sursa << " " << destinatie << '\n';

strcpy(destinatie, sursa);

// Se va afișa "hello hello"
cout << sursa << " " << destinatie << '\n';
// --8<-- [end:strcpy]

// --8<-- [start:strncpy]
char sursa[11] = "caine";
char destinatie[11] = "paine";

// Se va afișa "caine paine"
cout << sursa << " " << destinatie << '\n';

strncpy(destinatie, sursa, 1);

// Se va afișa "caine caine"
cout << sursa << " " << destinatie << '\n';
// --8<-- [end:strncpy]

// --8<-- [start:strcat]
char sursa[11] = "hello ";
char destinatie[11] = "world";

// Se va afișa "hello world"
cout << sursa << " " << destinatie << '\n';

strcat(destinatie, sursa);

// Se va afișa "worldhello"
cout << destinatie;
// --8<-- [end:strcat]

// --8<-- [start:strncat]
char sursa[20] = "informatica";
char destinatie[20] = "mate";

// Se va afișa "informatica mate"
cout << sursa << " " << destinatie << '\n';

strncat(destinatie, sursa, 4);

// Se va afișa "mateinfo"
cout << destinatie;
// --8<-- [end:strncat]

// --8<-- [start:strchr]
char str[] = "serverul roalgo este plin de persoane pasionate de algoritmica";
char *p = strchr(str, 'p');

if (p != nullptr) {
    // Se va afișa "plin de persoane pasionate de algoritmica"
    cout << p;
}
// --8<-- [end:strchr]

// --8<-- [start:strrchr]
char str[] = "serverul roalgo este plin de persoane pasionate de algoritmica";
char *p = strrchr(str, 'p');

if (p != nullptr) {
    // Se va afișa "pasionate de algoritmica"
    cout << p;
}
// --8<-- [end:strrchr]

// --8<-- [start:strcmp]
char str1[] = "abc";
char str2[] = "abc";

// Se va afișa 0 deoarece șirurile sunt la fel
cout << strcmp(str1, str2) << '\n';

char str3[] = "def";
char str4[] = "ghi";

// Se va afișa -1 deoarece primul șir este înaintea celui de al doilea
cout << strcmp(str3, str4) << '\n';

// Se va afișa 1 deoarece primul șir este după cel de al doilea
cout << strcmp(str4, str3) << '\n';
// --8<-- [end:strcmp]

// --8<-- [start:strstr]
char str1[] = "abcdefghijklmnop";
char str2[] = "fgh";

// Se va afișa "fghijklmnop"
cout << strstr(str1, str2);
// --8<-- [end:strstr]

// --8<-- [start:strtok]
char str[] = "wow-ce-multe-cuvinte-in-acest-sir";
char *token = strtok(str, "-");

// Se va afișa "wow ce multe cuvinte in acest sir"
while (token != nullptr) {
    cout << token << " ";
    token = strtok(nullptr, "-");
}
// --8<-- [end:strtok]