int a=2 ,n;
n=16327;
while(n!=0)
{
switch(n%10){
case 0: case 2: case
4:case 6: case 8:
a=a+n%2;break;
case 1: case 3: case
5:case 7: case 9:
a=a-n%2; break;}
n=n/10;
}
cout<<a<<endl;