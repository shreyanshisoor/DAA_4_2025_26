// implement queue using linked list
#include<bits/stdc++.h>
using namespace std;
class Node{
    public:
    int data;
    Node* next;
    Node(int val){
        data=val;
        next=NULL;
    }
};
class Queue{
    public:
    Node* front;
    Node* rear;
    int size;
    Queue(){
        front=NULL;
        rear=NULL;
        size=0;
    }
    void enqueue(int val){
        Node* newNode=new Node(val);
        if(front==NULL){
            front=newNode;
            rear=newNode;
        }
        else{
            rear->next=newNode;
            rear=newNode;
        }
        size++;
    }
    void dequeue(){
        if(front==NULL) return;
        Node* temp=front;
        front=front->next;
        delete temp;
        size--;
    }
    bool empty(){
        return size==0;
    }
};
int main(){
    Queue q;
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    q.dequeue();
    q.dequeue();
    q.dequeue();
    return 0;
}
