struct cmp {
    bool operator()(int a, int b) { return a > b; }
};

priority_queue<int, vector<int>, cmp> q;