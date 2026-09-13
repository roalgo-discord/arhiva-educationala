for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        sp[i][j] = sp[i - 1][j] + sp[i][j - 1] - sp[i - 1][j - 1] + a[i][j];
    }
}
