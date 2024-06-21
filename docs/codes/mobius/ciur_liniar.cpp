
vector<int> prime;
vector<int> is_composite(N);

for(int i = 2; i <= n; i++){
    if(!is_composite[i]) prime.push_back(i);
    for(int j = 0; j < prime.size() && i * prime[j] <= n; j++){
        is_composite[i * prime[j]] = 1;
        if(i % prime[j]) break;
    }
}