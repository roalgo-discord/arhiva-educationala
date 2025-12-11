bool del(Trie *node, string a, int pos) {
    if (pos == a.size()) {
        node->cnt--;
    } else if (del(node->fii[a[pos] - 'a'], a, pos + 1)) {
        node->nrf--;
        node->fii[a[pos] - 'a'] = 0;
    }

    if (node->cnt == 0 && node->nrf == 0 && node != t) {
        delete node;
        return 1;
    }

    return 0;
}
