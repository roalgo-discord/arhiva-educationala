#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
#include <iostream>

using namespace std;
using namespace __gnu_pbds;

using order_set = tree<int, null_type, less<int>, rb_tree_tag,
                       tree_order_statistics_node_update>;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    order_set X;

    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;

        cout << X.order_of_key(x) << " ";
        X.insert(x);

        // X.find_by_order(x) ar afla al x-lea cel mai mare element
    }
    return 0;
}