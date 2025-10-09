#include <iostream>

constexpr int N = 2e5 + 1;
int hotels, groups, rooms[N + 1], segtree[4 * N + 1];

void build(int node, int start, int end) {
    if (start == end) {
        segtree[node] = rooms[start];
        return;
    }
    int mid = start + (end - start) / 2;

    build(node << 1, start, mid);
    build(node << 1 | 1, mid + 1, end);

    segtree[node] = std::max(segtree[node << 1], segtree[node << 1 | 1]);
}

void update(int node, int start, int end, int index, int value) {
    if (start == end) {
        segtree[node] = value;
        return;
    }

    int mid = start + (end - start) / 2;
    if (index <= mid) {
        update(node << 1, start, mid, index, value);
    } else {
        update(node << 1 | 1, mid + 1, end, index, value);
    }

    segtree[node] = std::max(segtree[node << 1], segtree[node << 1 | 1]);
}

int query(int node, int start, int end, int threshold) {
    if (start == end) {
        return start;
    }

    int mid = start + (end - start) / 2;

    if (segtree[node << 1] >= threshold) {
        return query(node << 1, start, mid, threshold);
    }

    return query(node << 1 | 1, mid + 1, end, threshold);
}

int main() {
    std::cin >> hotels >> groups;

    for (int i = 1; i <= hotels; ++i) {
        std::cin >> rooms[i];
    }

    build(1, 1, hotels);
    for (int i = 1; i <= groups; ++i) {
        int required_rooms;
        std::cin >> required_rooms;

        if (segtree[1] < required_rooms) {
            std::cout << 0 << " ";
            continue;
        }

        int hotel_index = query(1, 1, hotels, required_rooms);
        std::cout << hotel_index << " ";

        rooms[hotel_index] -= required_rooms;
        update(1, 1, hotels, hotel_index, rooms[hotel_index]);
    }

    return 0;
}
