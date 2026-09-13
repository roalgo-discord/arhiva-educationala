#include<fstream>
using namespace std;
ifstream f("numarare.in"); ofstream g("numarare.out");
int n,a[100002],lg[100002];
inline int Minim(int x,int y){ return x<y ? x:y; }
int main()
{   int i,st,dr,sol;
    f>>n;
    for(i=1;i<=n;++i) f>>a[i];
    for(i=1;i<=n;++i) a[i]-=a[i+1];
    n--;
    st=dr=1;
    sol=n;
    for(i=2;i<=n;++i)
    {   if(i<=dr)
        {   lg[i]=Minim(lg[dr+st-i],dr-i);
            if(lg[i]==dr-i)
            {   st=i-lg[i]; dr=i+lg[i];
                while(st && dr<=n && a[st]==a[dr] ) {st--; dr++;}
                st++; dr--;
                lg[i]=(dr-st+1)/2;
            }
        }
        else
        {   st=dr=i;
            while(st && dr<=n && a[st]==a[dr]) {st--; dr++;}
            st++; dr--;
            lg[i]=(dr-st+1)/2;
        }
        sol += lg[i];
    }
    g<<sol<<'\n'; g.close(); return 0;
}