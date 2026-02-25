#include <vector>
#include <algorithm>

using namespace std;

class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); 
    }
    bool unite(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);
        if (root_i != root_j) {
            if (rank[root_i] < rank[root_j]) parent[root_i] = root_j;
            else if (rank[root_i] > rank[root_j]) parent[root_j] = root_i;
            else {
                parent[root_i] = root_j;
                rank[root_j]++;
            }
            return true;
        }
        return false;
    }
};

class Solution {
public:
    int kruskalsMST(int V, vector<vector<int>> &edges) {
        sort(edges.begin(), edges.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[2] < b[2];
        });

        DSU dsu(V);
        int mstWeight = 0;
        int edgesCount = 0;
        for (auto& edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];

            if (dsu.unite(u, v)) {
                mstWeight += w;
                edgesCount++;
                if (edgesCount == V - 1) break;
            }
        }
        return mstWeight;
    }
};
