vector<vector<int>> trie(1, vector<int>(26, -1));
vector<int> cnt(1);

void insert(string a) {
    int root = 0;
    for (char i : a) {
        if (trie[root][i - 'a'] == -1) {
            trie[root][i - 'a'] = trie.size();
            trie.emplace_back(26, -1);
            cnt.push_back(0);
        }
        cnt[root]++;
        root = trie[root][i - 'a'];
    }
    cnt[root]++;
}
