void cb3_patrascu (int n)
{
    int l = 0, e = 31;
    while (e >= 0)
    {
        if (l + (1 << e) <= n && conditie)
        {
            l += (1 << e);
        }
        e--;
    }
}