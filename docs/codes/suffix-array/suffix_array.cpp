

void reorder(vector<int> r[], vector<int> &p){

    for(int i = 0,cnt = 0; i < max((int)p.size(), 300); i++){
            
            for(auto &it : r[i])
                p[cnt++] = it;
            r[i].clear();
    }
}

vector<int> suffix(string s){

    s += "$"; int n = s.size(); vector<int> c(n), p(n), nc(n), r[max(n, 300)];
    
    for(int i = 0 ; i < n ; i++) 
        r[s[i]].emplace_back(i);
    reorder(r, p); c[p[0]] = 0;
    
    for(int i = 1; i < n ; i++) 
        c[p[i]] = c[p[i-1]] + (int)(s[p[i]] != s[p[i-1]]);
    
    for(int len = 1; len < n ; len <<= 1){

        for(int i = 0; i < n ; i++)
            r[c[(p[i] + len) % n]].emplace_back(p[i]);
        reorder(r, p);
        
        for(int i = 0; i < n ; i++)
            r[c[p[i]]].emplace_back(p[i]);
        reorder(r, p); nc[p[0]] = 0;
       
        for(int i = 1; i < n ; i++){

            pair<int,int> last = {c[p[i-1]], c[(p[i-1]+len)%n]};
            pair<int,int> now = {c[p[i]], c[(p[i]+len)%n]};
            nc[p[i]] = nc[p[i-1]] + (int)(last != now);
        }

        c.swap(nc);
    }

    p.erase(p.begin());
    return p;
}

