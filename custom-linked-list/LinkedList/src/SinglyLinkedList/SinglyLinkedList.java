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

    public void display(){
        Node temp=this.head;
        for(int i=0;i<this.size;i++){
            System.out.print(temp.value+"->");
            temp=temp.next;
        }
        System.out.print("Null");
    }

    public void insertFirst(int value){
        Node newNode=new Node(value);
        this.size++;
        if(this.tail==null){
            this.head=newNode;
            this.tail=newNode;
            return;
        }
        newNode.next=this.head;
        this.head=newNode;
    }

    public void insertLast(int value){
        if(this.tail==null){
            this.insertFirst(value);
            return;
        }

        Node newNode=new Node(value);
        this.tail.next=newNode;
        this.tail=newNode;
        this.size++;
    }


}
