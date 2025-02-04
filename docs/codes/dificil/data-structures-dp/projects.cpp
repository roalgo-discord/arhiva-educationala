#include <iostream>
#include <vector>
#include <algorithm>
 
int n;
long long fen[400002], positions[400001];
 
void add(int node, long long val) {
    for (; node <= n+n; node += (node & (-node))) {
        fen[node] = std::max(fen[node], val);
    }
}
 
long long compute(int node) {
    long long ans = 0;
    for (; node; node -= (node & (-node))) {
        ans = std::max(ans, fen[node]);
    }
    return ans;
}
 
struct projects {
    int L, R, val;
};
 
bool cmp(projects a, projects b) {
    return a.L < b.L;
}
 
int bs(int x) {
    int L = 1;
    int R = n+n;
    int ans = 0;
    while (L <= R) {
        int mid = (L + R) / 2;
        if (positions[mid] <= x) {
            ans = mid;
            L = mid + 1;
        }
        else {
            R = mid - 1;
        }
    }
    return ans;
}
int main() {
    
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);
    
    std::cin >> n;
    std::vector<projects> v(n+1);
    
    for (int i = 1; i <= n; i++) {
        std::cin >> v[i].L >> v[i].R >> v[i].val;
        positions[i*2 - 1] = v[i].L;
        positions[i*2] = v[i].R;
    }
    
    std::sort(positions + 1, positions + n + n + 1);
    std::sort(v.begin() + 1, v.begin() + n + 1, cmp);
    
    long long ans = 0;
    
    for (int i = 1; i <= n; i++) {
        int pa = bs(v[i].L-1);
        int pb = bs(v[i].R);
        
        ans = std::max(ans, compute(pa) + v[i].val);
        add(pb, compute(pa) + v[i].val);
    }
    
    std::cout << ans << '\n';
    return 0;
}