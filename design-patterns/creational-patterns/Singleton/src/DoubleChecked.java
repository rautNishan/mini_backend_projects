public class DoubleChecked {

    private  DoubleChecked(){};

    private  static volatile DoubleChecked instance;

    public  static DoubleChecked getInstance(){
        if(DoubleChecked.instance==null){
            synchronized (DoubleChecked.class){
                if(DoubleChecked.instance==null){
                    instance=new DoubleChecked();
                }
            }
        }
        return DoubleChecked.instance;
    }
}
