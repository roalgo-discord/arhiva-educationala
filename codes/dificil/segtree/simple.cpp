#include <iostream>
#include <vector>

struct str {
    long long min_even, max_even;
    long long min_odd, max_odd;
};

class SegmentTree {
private:
    int size_;
    std::vector<str> segtree_;
    std::vector<long long> lazy_;

public:
    void init(int sz) {
        size_ = sz;
        segtree_.resize(1 + 4 * sz);
        lazy_.resize(1 + 4 * sz);
    }

    void lazy(int node, int start, int end) {
        if (segtree_[node].min_even != -1) {
            segtree_[node].min_even += lazy_[node];
            segtree_[node].max_even += lazy_[node];
        }

        if (segtree_[node].min_odd != -1) {
            segtree_[node].min_odd += lazy_[node];
            segtree_[node].max_odd += lazy_[node];
        }

        if (lazy_[node] % 2 == 1) {
            std::swap(segtree_[node].min_odd, segtree_[node].min_even);
            std::swap(segtree_[node].max_odd, segtree_[node].max_even);
        }

        if (start != end) {
            lazy_[node << 1] += lazy_[node];
            lazy_[node << 1 | 1] += lazy_[node];
        }

        lazy_[node] = 0;
    }

    str cmp(str lhs, str rhs) {
        str ans = {-1, -1, -1, -1};

        if (lhs.min_even != -1) {
            ans.min_even = lhs.min_even;
        }

        if (ans.min_even == -1
            || (rhs.min_even != -1 && rhs.min_even < ans.min_even)) {
            ans.min_even = rhs.min_even;
        }

        if (lhs.min_odd != -1) {
            ans.min_odd = lhs.min_odd;
        }

        if (ans.min_odd == -1
            || (rhs.min_odd != -1 && rhs.min_odd < ans.min_odd)) {
            ans.min_odd = rhs.min_odd;
        }

        if (lhs.max_even != -1) {
            ans.max_even = lhs.max_even;
        }

        if (ans.max_even == -1
            || (rhs.max_even != -1 && rhs.max_even > ans.max_even)) {
            ans.max_even = rhs.max_even;
        }

        if (lhs.max_odd != -1) {
            ans.max_odd = lhs.max_odd;
        }

        if (ans.max_odd == -1
            || (rhs.max_odd != -1 && rhs.max_odd > ans.max_odd)) {
            ans.max_odd = rhs.max_odd;
        }

        return ans;
    }

    void build(int node, int start, int end, std::vector<int> &data) {
        if (start == end) {
            if (data[start] % 2 == 0) {
                segtree_[node] = {data[start], data[start], -1, -1};
            } else {
                segtree_[node] = {-1, -1, data[start], data[start]};
            }
            return;
        }

        int mid = start + (end - start) / 2;

        build(node << 1, start, mid, data);
        build(node << 1 | 1, mid + 1, end, data);
        segtree_[node] = cmp(segtree_[node << 1], segtree_[node << 1 | 1]);
    }

    void update(int node, int start, int end, int query_start, int query_end,
                int val) {
        if (lazy_[node]) {
            lazy(node, start, end);
        }

        if (end < query_start || start > query_end) {
            return;
        }

        if (query_start <= start && end <= query_end) {
            lazy_[node] = val;
            lazy(node, start, end);
            return;
        }

        int mid = start + (end - start) / 2;

        update(node << 1, start, mid, query_start, query_end, val);
        update(node << 1 | 1, mid + 1, end, query_start, query_end, val);

        segtree_[node] = cmp(segtree_[node << 1], segtree_[node << 1 | 1]);
    }

    str query(int node, int start, int end, int query_start, int query_end) {
        if (lazy_[node]) {
            lazy(node, start, end);
        }

        if (end < query_start || start > query_end) {
            return {-1, -1, -1, -1};
        }

        if (query_start <= start && end <= query_end) {
            return segtree_[node];
        }

        int mid = start + (end - start) / 2;
        return cmp(query(node << 1, start, mid, query_start, query_end),
                   query(node << 1 | 1, mid + 1, end, query_start, query_end));
    }
};

SegmentTree segtree;
int main() {
    int n;
    std::cin >> n;

    segtree.init(n);

    std::vector<int> values(n + 1);
    for (int i = 1; i <= n; i++) {
        std::cin >> values[i];
    }

    int queries;
    std::cin >> queries;

    segtree.build(1, 1, n, values);

    for (int i = 1; i <= queries; i++) {
        int t;
        std::cin >> t;

        if (t == 0) {
            int start, end, value;
            std::cin >> start >> end >> value;
            segtree.update(1, 1, n, start, end, value);
        } else {
            int start, end;
            std::cin >> start >> end;
            str ans = segtree.query(1, 1, n, start, end);
            std::cout << ans.min_even << " " << ans.max_odd << '\n';
        }
    }
    return 0;
}
