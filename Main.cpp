#include <iostream>
#include <unordered_map>
#include <vector>
#include <queue>
#include <climits>
#include <stack>
using namespace std;

unordered_map<string, vector<pair<string, float>>> mp;

void addEdge(string src, string destination, float dis) {
    mp[src].push_back({destination, dis});
    mp[destination].push_back({src, dis});
}
void Dijkstra(string src, string destination) {
    unordered_map<string, float> dist;
    unordered_map<string, string> parent;
    priority_queue<pair<float, string>, vector<pair<float, string>>, greater<pair<float, string>>> pq;

    for (auto &node : mp) {
        dist[node.first] = INT_MAX;
    }

    pq.push({0, src});
    dist[src] = 0;
    parent[src] = "";

    while (!pq.empty()) {
        string u = pq.top().second;
        pq.pop();

        for (auto &neighbor : mp[u]) {
            string v = neighbor.first;
            float weight = neighbor.second;

            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
                parent[v] = u;
            }
        }
    }
    cout << "Shortest distance from " << src << " to " << destination << " is " << dist[destination] << endl;
    stack<string> path;
    string temp = destination;
    while (temp != "") {
        path.push(temp);
        temp = parent[temp];
    }
    cout << "Path: ";
    while (!path.empty()) {
        cout << path.top();
        path.pop();
        if (!path.empty()) {
            cout << " -> ";
        }
    }
    cout << endl;
}
int main() {
    addEdge("Flipkart Office", "RailWay Station", 3.4);
    addEdge("Flipkart Office", "City", 1);
    addEdge("Flipkart Office", "New Model Town", 4.1);
    addEdge("Flipkart Office", "Hargobind Nagar", 3.8);
    addEdge("RailWay Station", "New Model Town", 1.7);
    addEdge("City", "JJ School", 3);
    addEdge("Hargobind Nagar", "Friends Colony", 1.7);
    addEdge("Friends Colony", "Shiv Puri", 1.5);
    addEdge("New Model Town", "JCT Mill", 0.9);
    addEdge("JCT Mill", "Thaper Colony", 0.9);
    addEdge("Thaper Colony", "Sham Nagar", 2);
    addEdge("Sham Nagar", "Shiv Puri", 0.5);
    addEdge("Sham Nagar", "Pipa Rangi", 0.6);
    addEdge("Shiv Puri", "Board Thale", 0.8);
    addEdge("Shiv Puri", "Onkar Nagar", 0.7);
    addEdge("Board Thale", "Urban Estate", 2);
    addEdge("Onkar Nagar", "Urban Estate", 2.5);
    addEdge("Onkar Nagar", "Board Thale", 1);
    addEdge("Urban Estate", "Industrial Area", 1.5);
    addEdge("Industrial Area", "Central Bank", 0.3);
    addEdge("Pipa Rangi", "Onkar Nagar", 1.7);
    addEdge("Shiv Puri", "Ratan Pura", 2.6);
    addEdge("Ratan Pura", "Central Bank", 1.6);
    for(auto &it : mp) {
        cout << it.first << " --> ";
        for (auto &edge : it.second) {
            cout << "(" << edge.first << ", " << edge.second << ") ";
        }
        cout << endl;
    }
    string start,end;
    cout<<"Enter Starting Point: ";
    getline(cin,start);
    cout<<"Enter Destination: ";
    getline(cin,end);
    Dijkstra(start,end);
    return 0;
}