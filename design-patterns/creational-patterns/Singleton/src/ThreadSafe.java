public class ThreadSafe {

    private  ThreadSafe(){};
    private  static  ThreadSafe instance;

    public static synchronized ThreadSafe getInstance(){
            if(ThreadSafe.instance==null){
                ThreadSafe.instance=new ThreadSafe();
            }
            return ThreadSafe.instance;
    }
}
