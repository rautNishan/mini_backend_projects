package SinglyLinkedList;

public class SinglyLinkedList {

    private int size;
    private  Node head;
    private  Node tail;
    public class Node{
        private int value;
        private Node next;

        public Node(int value){
            this.value=value;
        }

        public Node(int value, Node next){
            this.value=value;
            this.next=next;
        }
    }

    public int getSize(){
        return this.size;
    }


//    [] head=null, tail=null, next=null
//    head     tail
//    [1]->[2]->[3]
    // [1] tail=1 head=1 next=null


    public void insertFirst(int value){
        Node newNode=new Node(value);
        if(this.tail==null){
            this.head=newNode;
            this.tail=newNode;
            return;
        }

        newNode.next=this.head;
        this.head=newNode;
        this.size++;
    }


}
