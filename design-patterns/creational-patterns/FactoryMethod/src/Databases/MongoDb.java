package Databases;

import Connections.MongoConnection;

public class MongoDb extends DataBase<MongoConnection> {
    private static MongoConnection connection;
    @Override
    public MongoConnection connect() {
        if(MongoDb.connection==null){
            MongoDb.connection=new MongoConnection();
        }
        return MongoDb.connection;
    }

    @Override
    public void closeConnection() {
        MongoDb.connection=null;
        System.out.println("Closing Connection of Mongodb Server....");
    }
}
