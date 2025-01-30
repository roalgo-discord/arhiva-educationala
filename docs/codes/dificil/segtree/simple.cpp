#include <iostream>
#include <vector>

struct str {
    long long minEven, maxEven, minOdd, maxOdd;
};

class SegmentTree { 
  private:
    int n;
    std::vector<str> segtree;
    std::vector<long long> lazy;

  public:
    void init(int sz) {
        n = sz;
        segtree.resize(1 + 4 * sz);
        lazy.resize(1 + 4 * sz);
    }
    void lz(int node, int L, int R) {
        if (segtree[node].minEven != -1) {
            segtree[node].minEven += lazy[node];
            segtree[node].maxEven += lazy[node];
        }
        if (segtree[node].minOdd != -1) {
            segtree[node].minOdd += lazy[node];
            segtree[node].maxOdd += lazy[node];
        }
        if (lazy[node] % 2 == 1) {
            std::swap(segtree[node].minOdd, segtree[node].minEven);
            std::swap(segtree[node].maxOdd, segtree[node].maxEven);
        }
        if (L != R) {
            lazy[node << 1] += lazy[node];
            lazy[node << 1 | 1] += lazy[node];
        }
        lazy[node] = 0;
    }
    str cmp (str X, str Y) {
        str ans = {-1, -1, -1, -1};
        if (X.minEven != -1) {
            ans.minEven = X.minEven;
        }
        if (ans.minEven == -1 || (Y.minEven != -1 && Y.minEven < ans.minEven)) {
            ans.minEven = Y.minEven;
        }
        if (X.minOdd != -1) {
            ans.minOdd = X.minOdd;
        }
        if (ans.minOdd == -1 || (Y.minOdd != -1 && Y.minOdd < ans.minOdd)) {
            ans.minOdd = Y.minOdd;
        }
        if (X.maxEven != -1) {
            ans.maxEven = X.maxEven;
        }
        if (ans.maxEven == -1 || (Y.maxEven != -1 && Y.maxEven > ans.maxEven)) {
            ans.maxEven = Y.maxEven;
        }
        if (X.maxOdd != -1) {
            ans.maxOdd = X.maxOdd;
        }
        if (ans.maxOdd == -1 || (Y.maxOdd != -1 && Y.maxOdd > ans.maxOdd)) {
            ans.maxOdd = Y.maxOdd;
        }
        return ans;
    }
    void build(int node, int L, int R, std::vector<int> &v) {
        if (L == R) {
            if (v[L] % 2 == 0) {
                segtree[node] = {v[L], v[L], -1, -1};
            }
            else {
                segtree[node] = {-1, -1, v[L], v[L]};
            }
            return;
        }
        int mid = (L + R) / 2;
        build(node << 1, L, mid, v);
        build(node << 1 | 1, mid + 1, R, v);
        segtree[node] = cmp(segtree[node << 1], segtree[node << 1 | 1]);
    }
    void update(int node, int L, int R, int Lq, int Rq, int val) {
        if (lazy[node]) {
            lz(node, L, R);
        }
        if (R < Lq || L > Rq) {
            return;
        }
        if (Lq <= L && R <= Rq) {
            lazy[node] = val;
            lz(node, L, R);
            return;
        }
        int mid = (L + R) / 2;
        update(node << 1, L, mid, Lq, Rq, val);
        update(node << 1 | 1, mid + 1, R, Lq, Rq, val);
        segtree[node] = cmp(segtree[node << 1], segtree[node << 1 | 1]);
    }
    str query(int node, int L, int R, int Lq, int Rq) {
        if (lazy[node]) {
            lz(node, L, R);
        }
        if (R < Lq || L > Rq) {
            return {-1, -1, -1, -1};
        }
        if (Lq <= L && R <= Rq) {
            return segtree[node];
        }
        int mid = (L + R) / 2;
        return cmp(query(node << 1, L, mid, Lq, Rq), query(node << 1 | 1, mid + 1, R, Lq, Rq));
    }
};

SegmentTree st;
int main() {
    int n;
    std::cin >> n;

    st.init(n);

    std::vector<int> v(n + 1);
    for (int i = 1; i <= n; i++)
        std::cin >> v[i];
    
    int q;
    std::cin >> q;
    
    st.build(1, 1, n, v);
    for (int i = 1; i <= q; i++) {
        int t;
        std::cin >> t;
        if (t == 0) {
            int L, R, val;
            std::cin >> L >> R >> val;
            st.update(1, 1, n, L, R, val);
        } 
        else {
            int L, R;
            std::cin >> L >> R;
            str ans = st.query(1, 1, n, L, R);
            std::cout << ans.minEven << " " << ans.maxOdd << '\n';
        }
    }
    return 0;
}
