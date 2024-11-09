package Databases;

import Connections.PostgresConnection;

public class PostgressDb extends DataBase<PostgresConnection>{
    private  static  PostgresConnection connection;
    @Override
    public PostgresConnection connect(){
        if(PostgressDb.connection==null){
            PostgressDb.connection=new PostgresConnection();
        }
        return  PostgressDb.connection;
    }

    @Override
    public void closeConnection() {
        PostgressDb.connection=null;
        System.out.println("Closing Connection of Postgress Server....");
    }
}
