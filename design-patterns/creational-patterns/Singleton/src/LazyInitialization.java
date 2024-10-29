public class LazyInitialization {
    private  LazyInitialization(){};
    private static LazyInitialization instance;
    public static LazyInitialization getInstance(){

        if(LazyInitialization.instance==null){
            instance=new LazyInitialization();
        }
        return LazyInitialization.instance;
    }
}
