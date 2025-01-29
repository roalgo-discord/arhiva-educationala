for (int i = 1; i <= n; i++)
{
    mars[i] += mars[i - 1];
    v[i] = mars[i];
}
