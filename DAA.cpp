/*
1. Recurrence relation: T(n)=3T(n/2)+nlogn
2. Master Theorem: a=3, b=2, k=1, p=1
    case1] a>b^k
        T(n)=O(n^(log(base b)a))
        T(n)=O(n^(log(base 2)3))
3. Operations=105
   Depth=5
*/
#include<bits/stdc++.h>
using namespace std;
int ops=0, depth=0, finalDepth=0;
void complexRec(int n) {
    depth++;
    finalDepth=max(depth,finalDepth);
   if (n <= 2) {
    depth--;
    return;
   }
   int p = n;
   while (p > 0) {
       vector<int> temp(n);
       for (int i = 0; i < n; i++) {
           temp[i] = i ^ p;
           ops++;
       }
       p >>= 1;
       ops++;
   }
   vector<int> small(n);
   for (int i = 0; i < n; i++) {
       small[i] = i * i;
       ops++;
   }
   if (n % 3 == 0) {
       reverse(small.begin(), small.end());
   } else {
       reverse(small.begin(), small.end());
   }
   ops++;
   complexRec(n / 2);
   complexRec(n / 2);
   complexRec(n / 2);
   depth--;
}
int main(){
    complexRec(8);
    cout<<ops<<endl;
    cout<<finalDepth<<endl;
}