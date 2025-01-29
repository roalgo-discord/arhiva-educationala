mars[x] += z;
mars[y + 1] -= z;
/// cod din program
for (int i = 1; i <= n; i++)
{
    mars[i] += mars[i - 1];
    v[i] += mars[i];
}
