public class EagerInitialization {

    //The JVM guarantees that the instance will be created before any thread access the instance variable.
    private  EagerInitialization(){};
    private static final EagerInitialization instance=new EagerInitialization();

    public static EagerInitialization getInstance(){
        return EagerInitialization.instance;
    }

}

