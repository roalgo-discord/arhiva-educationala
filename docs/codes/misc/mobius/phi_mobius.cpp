vector<int> phi(N), mobius(N);
phi[1] = mobius[1] = 1;

for (int i = 2; i < N; i++) {
    phi[i] = i - 1;
}
for (int i = 1; i < N; i++) {
    for (int j = 2 * i; j < N; j += i) {
        mobius[j] -= mobius[i];
        if (i > 1) {
            phi[j] -= phi[i];
        }
    }
}