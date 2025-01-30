int query(int node, int start, int end, int query_start, int query_end, int x) {
    // nu există valoarea
    if (end < query_start || start > query_end) {
        return -1;
    }

    if (start == end) {
        if (segtree[start] >= x) {
            return start;
        }

        // nu am găsit valoarea
        return -1;
    }

    int mid = start + (end - start) / 2;
    int left_result = query(node << 1, start, mid, query_start, query_end, x);
    if (left_result != -1) {
        return left_result;
    }

    return query(node << 1 | 1, mid + 1, end, query_start, query_end, x);
}