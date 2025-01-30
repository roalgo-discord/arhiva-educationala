#include <iostream>
#include <vector>
 
class SegmentTree {
    private:
        int n;
        std::vector<long long> segtree;
        std::vector<long long> lazy;
    public:
        void init (int sz) {
            n = sz;
            segtree.resize(1 + 4 * sz);
            lazy.resize(1 + 4 * sz);
        }
        void lz (int node, int L, int R) {
            if (lazy[node] > 0) {
                segtree[node] += lazy[node] * (R - L + 1);
            }
            else {
                segtree[node] = (-lazy[node]) * (R - L + 1);
            }
            if (L != R) {
                if (lazy[node] < 0) {
                    lazy[node << 1] = lazy[node];
                    lazy[node << 1|1] = lazy[node];
                }
                else {
                    if (lazy[node << 1] < 0) {
                        lazy[node << 1] -= lazy[node];
                    }
                    else {
                        lazy[node << 1] += lazy[node];
                    }
                    if (lazy[node << 1|1] < 0) {
                        lazy[node << 1|1] -= lazy[node];
                    }
                    else {
                        lazy[node << 1|1] += lazy[node];
                    }
                }
            }
            lazy[node] = 0;
        }
        void build (int node, int L, int R, std::vector<int> &v) {
            if (L == R) {
                segtree[node] = v[L];
                return;
            }
            int mid = (L + R) / 2;
            build(node << 1, L, mid, v);
            build(node << 1|1, mid+1, R, v);
            segtree[node] = segtree[node << 1] + segtree[node << 1|1];
        }
        void update (int node, int L, int R, int Lq, int Rq, int val) {
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
            update(node << 1|1, mid+1, R, Lq, Rq, val);
            segtree[node] = segtree[node << 1] + segtree[node << 1|1];
        }
        long long query (int node, int L, int R, int Lq, int Rq) {
            if (lazy[node]) {
                lz(node, L, R);
            }
            if (R < Lq || L > Rq) {
                return 0;
            }
            if (Lq <= L && R <= Rq) {
                return segtree[node];
            }
            int mid = (L + R) / 2;
            return query(node << 1, L, mid, Lq, Rq) + query(node << 1|1, mid+1, R, Lq, Rq);
        }
};
 
SegmentTree st;
int main() {
    int n, q;
    std::cin >> n >> q;
    
    st.init(n);
    
    std::vector<int> v(n+1);
    for (int i = 1; i <= n; i++) {
        std::cin >> v[i];
    }
    st.build(1, 1, n, v);
    for (int i = 1; i <= q; i++) {
        int t;
        std::cin >> t;
        if (t == 1) {
            int L, R, val;
            std::cin >> L >> R >> val;
            st.update(1, 1, n, L, R, val);
        }
        if (t == 2) {
            int L, R, val;
            std::cin >> L >> R >> val;
            st.update(1, 1, n, L, R, -val);
        }
        if (t == 3) {
            int L, R;
            std::cin >> L >> R;
            std::cout << st.query(1, 1, n, L, R) << '\n';
        }
    }
    return 0;
}
