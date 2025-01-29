
vector<int> prime;
vector<int> phi(N), compus(N);
vector<int> sml(N);

phi[1] = 1;
for(int i = 2; i <= N; i++){
    if(!compus[i]){
        prime.push_back(i);
        phi[i] = i - 1;
        sml[i] = 1;
    }
    for(int j = 0; j < prime.size() && i * prime[j] <= N; j++){
        compus[i * prime[j]] = 1;
        if(i % prime[j]){
            phi[i * prime[j]] = phi[i] * phi[prime[j]];
            sml[i * prime[j]] = 1;
        }else{
            phi[i*prime[j]]=(phi[i]/(pow(prime[j], sml[i])-pow(prime[j],sml[i]-1)));
            phi[i*prime[j]]*=(pow(prime[j],sml[i]+1)-pow(prime[j],sml[i]));
            sml[i*prime[j]]=sml[i]+1;
        }
    }
}
