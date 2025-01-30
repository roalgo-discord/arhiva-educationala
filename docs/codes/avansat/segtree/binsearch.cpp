int query (int node, int L, int R, int Lq, int Rq, int x) {
    if (R < Lq || L > Rq) {
        return -1; // nu exista valoarea
    }
    if (L == R) {
        if (segtree[L] >= x) {
            return L;
        }
        return -1; // nu am gasit valoarea
    }
    int mid = (L + R) / 2;
    int ansLeft = query(node << 1, L, mid, Lq, Rq, x);
    if (ansLeft != -1) {
        return ansLeft;
    }
    else {
        return query(node << 1|1, mid+1, R, Lq, Rq, x);
    }
}