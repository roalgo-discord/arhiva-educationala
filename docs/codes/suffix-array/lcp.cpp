```cpp
vector<int> lcp(string &s, vector<int> &p){

    vector<int> r(s.size()), l(s.size(), 0); int n = p.size();
    for(int i = 0 ; i < n ; i++) 
        r[p[i]] = i; ///r[i] = pozitia sufixului i in sirul de sufixe
    
    int fun = 0, j;
    for(int i = 0 ; i < n ; i++){
            
        if(!r[i]) continue;
        
        j = p[r[i] - 1];
        while(i + fun < n && j + fun < n && s[i+fun] == s[j+fun])
            fun++;
        l[r[i]] = fun; if(fun) fun--;
    }                   

    return l;
}