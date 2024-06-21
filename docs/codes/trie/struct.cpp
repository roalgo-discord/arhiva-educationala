struct Trie {
    int cnt;
    Trie *fii[26];

    Trie() : cnt{0}, fii{nullptr} {}

    ~Trie() {
        for (auto &fiu: fii) delete fiu;
    }
};

Trie *root = new Trie;
