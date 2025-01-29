void cb1 (int n)
{
    int l = 1, r = n, ans = -1;
    while (l <= r)
    {
        int mij = (l + r) / 2;
        if (conditie)
        {
            ans = mij;
            l = mij + 1;
        }
        else
        {
            r = mij - 1;
        }
    }
}