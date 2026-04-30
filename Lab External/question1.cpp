// (LIS) Given an integer array, return the length of the longest strictly increasing subsequence.
#include<bits/stdc++.h>
using namespace std;
int lis(int n, vector<int> &nums){
    int count=1, max_count=1;
    if(n==0) return 0;
    for(int i=0;i<n;i++){
        if(nums[i]<nums[i+1]){
            count++;
        }
        else{
            max_count=max(max_count, count);
            count=1;
        }
    }
    return max_count;
}
int main(){
    int n;
    cin>>n;
    vector<int> nums(n);
    for(int i=0;i<n;i++){
        cin>>nums[i];
    }
    cout<<lis(n, nums)<<endl;
}
