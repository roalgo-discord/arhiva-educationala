
vector<int> prime;
vector<int> sml(N), mobius(N), composite(N);

mobius[1] = 1;
for(int i = 2; i < N; i++){
    if(!composite[i]){
        prime.push_back(i);
        mobius[i] = -1;
        sml[i] = 1;
    }
    for(int j = 0; j < prime.size() && i * prime[j] < N; j++){
        composite[i * prime[j]] = 1;
        if(i % prime[j]){
            mobius[i * prime[j]] = mobius[i] * mobius[prime[j]];
            sml[i * prime[j]] = 1;
        }else{
            int cltr = (sml[i] == 0) - (sml[i] == 1);
            int pl = (sml[i] + 1 == 0) - (sml[i] + 1 == 1);
            if(cltr == 0){
                mobius[i] = 0;
            }
            else{
                mobius[i * prime[j]] = (mobius[i] / cltr) * pl;
            }
            sml[i * prime[j]] = sml[i] + 1;
        }
    }
}
