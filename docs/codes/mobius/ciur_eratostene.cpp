vector<int> ciur(N);
ciur[0] = ciur[1] = 1;
for(int i = 2; i <= N; i++){
    if(ciur[i] == 0){ //numarul i este prim
        for(int j = 2 * i; j <= N; j += i){
            ciur[j] = 1; //j se scrie ca i * p
        }
    }
}