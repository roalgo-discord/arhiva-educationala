for (int i = 1; i <= 26; i++) {
    for (int k1 = 0; k1 <= min(sz[nod], k); k1++) {
        dp1[i][k1] = min(dp1[i][k1], dp1[i - 1][k1]);
        for (int k2 = 1; k2 <= k1 && trie[nod][i - 1] != -1
                         && k2 < dp[trie[nod][i - 1]].size();
             k2++) {
            dp1[i][k1] =
                min(dp1[i][k1],
                    dp1[i - 1][k1 - k2] + dp[trie[nod][i - 1]][k2] - 2 * len);
        }
    }
}
