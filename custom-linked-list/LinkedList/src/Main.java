import SinglyLinkedList.SinglyLinkedList;

public class Main {
    public static void main(String[] args) {
        SinglyLinkedList list=new SinglyLinkedList();
        list.insertFirst(2);
        list.insertFirst(1);
        list.insertFirst(0);
        list.insertLast(3);
        list.display();
        System.out.println();
        System.out.println("This is the size of my linked list: "+list.getSize());
        list.delete(1);
        list.delete(3);
        list.display();
        System.out.println();
        System.out.println("This is the size of my linked list: "+list.getSize());
    }
}