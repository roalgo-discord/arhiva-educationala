#include <iostream>
#include <stack>
#include <vector>

int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);

    int n, k;
    std::cin >> n >> k;

    std::vector<long long> v(n + 1);
    for (int i = 1; i <= n; i++) {
        std::cin >> v[i];
    }

    std::vector<std::vector<long long> > dp(n + 1,
                                            std::vector<long long>(k + 1));
    for (int i = 1; i <= n; i++) {
        if (i == 1) {
            dp[1][1] = v[1];
        } else {
            dp[i][1] = std::min(dp[i - 1][1], v[i]);
        }
    }

    for (int i = 2; i <= k; i++) {
        // value, max total, maxprefix
        std::stack<std::pair<int, std::pair<long long, long long> > > st;
        for (int j = i; j <= n; j++) {
            std::pair<int, std::pair<long long, long long> > px = {
                j, {dp[j - 1][i - 1], dp[j - 1][i - 1] + v[j]}
            };
            while (!st.empty() && v[j] <= v[st.top().first]) {
                std::pair<int, std::pair<long long, long long> > py = st.top();
                st.pop();
                px.second.first = std::max(px.second.first, py.second.first);
                if (!st.empty()) {
                    px.second.second = std::max(st.top().second.second,
                                                px.second.first + v[j]);
                } else {
                    px.second.second = px.second.first + v[j];
                }
            }
            if (!st.empty()) {
                px.second.second =
                    std::max(st.top().second.second, px.second.first + v[j]);
            }
            st.push(px);
            dp[j][i] = px.second.second;
        }
    }

    std::cout << dp[n][k] << '\n';
    return 0;
}
