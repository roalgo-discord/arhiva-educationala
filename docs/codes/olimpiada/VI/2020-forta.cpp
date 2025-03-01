#include <cmath>
#include <iostream>
using namespace std;

const int MAX_N = 100000;
int arr[MAX_N];

const int MAX_SIEVE = 45000;
bool isPrimeSieve[MAX_SIEVE + 1];
int primes[50000];
int primesCount;

void buildSieve() {
    for (int i = 0; i <= MAX_SIEVE; i++) {
        isPrimeSieve[i] = true;
    }
    isPrimeSieve[0] = isPrimeSieve[1] = false;
    for (int i = 2; i * i <= MAX_SIEVE; i++) {
        if (isPrimeSieve[i]) {
            for (int j = i * i; j <= MAX_SIEVE; j += i) {
                isPrimeSieve[j] = false;
            }
        }
    }
    primesCount = 0;
    for (int i = 2; i <= MAX_SIEVE; i++) {
        if (isPrimeSieve[i]) {
            primes[primesCount++] = i;
        }
    }
}

int getForce(int x) {
    int force = 1;
    int temp = x;
    for (int i = 0; i < primesCount && (long long)primes[i] * primes[i] <= temp;
         i++) {
        if (temp % primes[i] == 0) {
            int cnt = 0;
            while (temp % primes[i] == 0) {
                cnt++;
                temp /= primes[i];
            }
            force *= (cnt + 1);
        }
    }
    if (temp > 1) {
        force *= 2;
    }
    return force;
}

int main() {
    ifstream cin("forta.in");
    ofstream cout("forta.out");

    int task, n;
    cin >> task >> n;

    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    buildSieve();

    if (task == 1) {
        int maxForce = -1;
        int bestNumber = 0;
        for (int i = 0; i < n; i++) {
            int f = getForce(arr[i]);
            if (f > maxForce) {
                maxForce = f;
                bestNumber = arr[i];
            } else {
                if (f == maxForce) {
                    if (arr[i] < bestNumber) {
                        bestNumber = arr[i];
                    }
                }
            }
        }
        cout << bestNumber;
    } else if (task == 2) {
        const int MAXF = 2500;
        int freq[MAXF + 1] = {0};

        int maxCount = 0;
        for (int i = 0; i < n; i++) {
            int f = getForce(arr[i]);
            freq[f]++;
            if (freq[f] > maxCount) {
                maxCount = freq[f];
            }
        }
        cout << maxCount;
    }

    return 0;
}
