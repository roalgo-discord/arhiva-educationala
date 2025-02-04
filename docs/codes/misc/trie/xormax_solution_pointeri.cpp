#include <iostream>
#include <vector>

using namespace std;

struct Trie {
    Trie *_next[2];
    int _pos;

    explicit Trie(const int value)
            : _pos{value}, _next{nullptr, nullptr} {}

    Trie() : Trie{-1} {}

    ~Trie() {
        delete _next[0];
        delete _next[1];
    }
} *root;


void add(const int val, const int idx) {
    Trie *node = root;

    for (int i = 29; i >= 0; i--) {
        bool has = (val >> i) & 1;
        if (node->_next[has] == nullptr)
            node->_next[has] = new Trie(idx);
        node = node->_next[has];
    }
}

int query(const int val) {
    Trie *node = root;

    for (int i = 29; i >= 0; i--) {
        bool has = (val >> i) & 1;
        if (node->_next[!has])
            node = node->_next[!has];
        else if (node->_next[has])
            node = node->_next[has];
        else
            break;
    }
    return node->_pos;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    root = new Trie(0);

    int n, x, sum = 0, value = 0;
    cin >> n;
    vector<int> sums(n + 1);

    add(sum, 0);

    for (int i = 1; i <= n; i++) {
        cin >> x;
        sum ^= x;
        sums[i] = sum;

        value = max(value, x);

        if (i > 1) {
            int qry = query(sum);
            value = max(value, sum ^ sums[qry]);
        }

        add(sum, i);
    }

    cout << value;

    delete root;

    return 0;
}
