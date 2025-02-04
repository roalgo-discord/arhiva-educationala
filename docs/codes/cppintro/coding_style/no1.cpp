int s[100],n,p,x;
void f(int k)
{ int i;
 if(k==p+1) x++;
if(k==1)
for(i=1;i<=n;i++) f(k+1);
 else
for(i=1+s[k-1];i<=n;i++)
 { s[k]=i;f(k+1); }}