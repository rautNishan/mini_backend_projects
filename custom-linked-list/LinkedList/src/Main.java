import SinglyLinkedList.SinglyLinkedList;

public class Main {
    public static void main(String[] args) {
        SinglyLinkedList list=new SinglyLinkedList();

        list.insertFirst(2);
        list.insertFirst(1);
        list.insertLast(3);
        list.insertLast(4);
        list.insert(5,2);
        System.out.println("This is the size of my linked list: "+list.getSize());
        list.display();
        System.out.println("New Line");
    }
}