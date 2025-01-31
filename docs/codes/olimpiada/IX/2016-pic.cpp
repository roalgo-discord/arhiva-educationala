#include <fstream>
#include <vector>

bool check(long long T, const std::vector<int>& C, int N, int M) {
    std::vector<long long> inflow(M + 1, 0);
    inflow[1] = T;
    for (int l = 1; l <= N; ++l) {
        int start = (l - 1) * l / 2 + 1;
        int end = l * (l + 1) / 2;
        for (int j = start; j <= end; ++j) {
            if (j > M) {
				break;
			}
            long long c = C[j - 1];
            long long oj = std::max(0LL, inflow[j] - c);
            if (l < N) {
                int left = j + l;
                int right = j + l + 1;
                if (left <= M) {
					inflow[left] += (oj + 1) / 2;
				}
                if (right <= M) {
					inflow[right] += oj / 2;
				}
            }
        }
    }
    for (int j = 1; j <= M; ++j) {
        if (inflow[j] < C[j - 1]) {
			return false;
		}
    }
    return true;
}

int main() {
    std::ifstream cin("pic.in");
    std::ofstream cout("pic.out");

    int V, N;
    cin >> V >> N;
    int M = N * (N + 1) / 2;
    std::vector<int> C(M);
    for (int i = 0; i < M; ++i) {
		cin >> C[i];
	}
    if (V == 1) {
        int max_sum = -1, best_level = 0;
        for (int l = 1; l <= N; ++l) {
            int start = (l - 1) * l / 2;
            int sum = 0;
            for (int i = start; i < start + l; ++i) {
				sum += C[i];
			}
            if (sum > max_sum || (sum == max_sum && l < best_level)) {
                max_sum = sum;
                best_level = l;
            }
        }
        cout << best_level << "\n";
    } 
	else {
        long long sum_C = 0;
		for (int i = 0; i < C.size(); i++) {
			sum_C += C[i];
		}
        long long low = sum_C, high = (1LL << 60), ans_T = high;
        while (low <= high) {
            long long mid = (low + high) / 2;
            if (check(mid, C, N, M)) {
                ans_T = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        cout << ans_T << " " << ans_T - sum_C << "\n";
    }
    return 0;
}