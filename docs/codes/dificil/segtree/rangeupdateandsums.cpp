#include <iostream>
#include <vector>

class SegmentTree {
private:
    int size_;
    std::vector<long long> segtree_;
    std::vector<long long> lazy_;

public:
    void init(int size) {
        size_ = size;
        segtree_.resize(1 + 4 * size);
        lazy_.resize(1 + 4 * size);
    }

    void lazy(int node, int start, int end) {
        if (lazy_[node] > 0) {
            segtree_[node] += lazy_[node] * (end - start + 1);
        } else {
            segtree_[node] = (-lazy_[node]) * (end - start + 1);
        }

        if (start != end) {
            if (lazy_[node] < 0) {
                lazy_[node << 1] = lazy_[node];
                lazy_[node << 1 | 1] = lazy_[node];
            } else {
                if (lazy_[node << 1] < 0) {
                    lazy_[node << 1] -= lazy_[node];
                } else {
                    lazy_[node << 1] += lazy_[node];
                }

                if (lazy_[node << 1 | 1] < 0) {
                    lazy_[node << 1 | 1] -= lazy_[node];
                } else {
                    lazy_[node << 1 | 1] += lazy_[node];
                }
            }
        }

        lazy_[node] = 0;
    }

    void build(int node, int start, int end, std::vector<int> &data) {
        if (start == end) {
            segtree_[node] = data[start];
            return;
        }

        int mid = start + (end - start) / 2;

        build(node << 1, start, mid, data);
        build(node << 1 | 1, mid + 1, end, data);

        segtree_[node] = segtree_[node << 1] + segtree_[node << 1 | 1];
    }

    void update(int node, int start, int end, int query_start, int query_end,
                int value) {
        if (lazy_[node]) {
            lazy(node, start, end);
        }

        if (end < query_start || start > query_end) {
            return;
        }

        if (query_start <= start && end <= query_end) {
            lazy_[node] = value;
            lazy(node, start, end);
            return;
        }

        int mid = start + (end - start) / 2;

        update(node << 1, start, mid, query_start, query_end, value);
        update(node << 1 | 1, mid + 1, end, query_start, query_end, value);

        segtree_[node] = segtree_[node << 1] + segtree_[node << 1 | 1];
    }

    long long query(int node, int start, int end, int query_start,
                    int query_end) {
        if (lazy_[node]) {
            lazy(node, start, end);
        }

        if (end < query_start || start > query_end) {
            return 0;
        }

        if (query_start <= start && end <= query_end) {
            return segtree_[node];
        }

        int mid = start + (end - start) / 2;

        return query(node << 1, start, mid, query_start, query_end)
             + query(node << 1 | 1, mid + 1, end, query_start, query_end);
    }
};

SegmentTree segtree;
int main() {
    int n, queries;
    std::cin >> n >> queries;

    segtree.init(n);

    std::vector<int> values(n + 1);
    for (int i = 1; i <= n; i++) {
        std::cin >> values[i];
    }

    segtree.build(1, 1, n, values);

    for (int i = 1; i <= queries; i++) {
        int t;
        std::cin >> t;

        int start, end, value;
        std::cin >> start >> end;

        if (t == 1) {
            std::cin >> value;
            segtree.update(1, 1, n, start, end, value);
        } else if (t == 2) {
            std::cin >> value;
            segtree.update(1, 1, n, start, end, -value);
        } else if (t == 3) {
            std::cout << segtree.query(1, 1, n, start, end) << '\n';
        }
    }

    return 0;
}
