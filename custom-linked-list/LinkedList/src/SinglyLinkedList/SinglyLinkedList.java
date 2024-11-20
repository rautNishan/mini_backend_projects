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
            System.out.println("This is next value: "+next.value);
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

    public void insert(int value,int index){
        if(index>this.size){
            throw new IndexOutOfBoundsException("This is the actual size: "+this.size);
        }


        if(index==1){
            this.insertFirst(value);
            return;
        }

        if(index==this.size){
            this.insertLast(value);
            return;
        }

        Node tempNode=this.head;
        for(int i=1;i<index-1;i++){
            tempNode=tempNode.next;
        }
        this.size++;
        Node newNode=new Node(value,tempNode.next);
        tempNode.next=newNode;
    }

    public void deleteFromFirst(){

        if(this.tail==null){
            //Or can throw error
            return;
        }

        this.size--;
        if(this.head.next==null){
            this.head=null;
            this.tail=null;
            return;
        }

        Node headNode=this.head;
        this.head=headNode.next;
        headNode=null;
    }


}
