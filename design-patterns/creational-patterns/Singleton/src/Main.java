public class Main {
    public static void main(String[] args) {


          /*
             LazyInitialization
             Only create when ask for.
         */

        LazyInitialization lazyInstance=LazyInitialization.getInstance();
        System.out.println("This is lazyInstance: "+lazyInstance);

        LazyInitialization lazyInstance2=LazyInitialization.getInstance();
        System.out.println("This is lazyInstance2: "+lazyInstance2);

        //Both should give the same memory address
        if(lazyInstance==lazyInstance2){
            System.out.println("Complete LazyInitialization Singleton");
        }
        else{
            System.out.println("Something went wrong");
        }

        /*
             ThreadSafe
             Similar to lazy initialization but also ensure single-ton is thread-safe
         */

        ThreadSafe threadSafeInstance=ThreadSafe.getInstance();
        System.out.println("This is threadSafeInstance: "+threadSafeInstance);

        ThreadSafe threadSafeInstance2=ThreadSafe.getInstance();
        System.out.println("This is threadSafeInstance: "+threadSafeInstance2);

        //Both should give the same memory address
        if(threadSafeInstance==threadSafeInstance2){
            System.out.println("Complete ThreadSafe Singleton");
        }
        else{
            System.out.println("Something went wrong while creating thread safe singleton class");
        }
    }
}