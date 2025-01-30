#include <iostream>
 
int n, q, v[200002], segtree[800002];
 
void build(int node, int L, int R) {
    if (L == R) {
        segtree[node] = v[L];
        return;
    }
    int mid = (L + R) / 2;
    build(node << 1, L, mid);
    build(node << 1 | 1, mid + 1, R);
    segtree[node] = std::max(segtree[node << 1], segtree[node << 1 | 1]);
}
 
void update(int node, int L, int R, int poz, int val) {
    if (L == R) {
        segtree[node] = val;
        return;
    }
    int mid = (L + R) / 2;
    if (poz <= mid) {
        update(node << 1, L, mid, poz, val);
    }
    else {
        update(node << 1 | 1, mid + 1, R, poz, val);
    }
    segtree[node] = std::max(segtree[node << 1], segtree[node << 1 | 1]);
}
 
int query(int node, int L, int R, int val) {
    if (L == R) {
        return L;
    }
    int mid = (L + R) / 2;
    if (segtree[node << 1] >= val) {
        return query(node << 1, L, mid, val);
    }
    return query(node << 1 | 1, mid + 1, R, val);
}
int main() {
    
    std::cin >> n >> q;
    for (int i = 1; i <= n; ++i) {
        std::cin >> v[i];
    }
    
    build (1, 1, n);
    for (int i = 1; i <= q; ++i) {
        int nr;
        std::cin >> nr;
        if (segtree[1] < nr) {
            std::cout << 0 << " ";
            continue;
        }
        int ans = query(1, 1, n, nr);
        std::cout << ans << " ";
        v[ans] -= nr;
        update(1, 1, n, ans, v[ans]);
    }
    
    return 0;
}
