mars[x][y] += k;
mars[z + 1][y] -= k;
mars[x][t + 1] -= k;
mars[z + 1][t + 1] += k;
/// cod din program
for (int i = 1; i <= n; i++)
{
    for (int j = 1; j <= m; j++)
    {
        mars[i][j] += mars[i - 1][j] + mars[i][j - 1] - mars[i - 1][j - 1];
        a[i][j] += mars[i][j];
    }
}
