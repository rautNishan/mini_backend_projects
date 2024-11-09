package Databases;

import Connections.MySqlConnection;

public class MySqlDb extends DataBase<MySqlConnection>{
    private static MySqlConnection connection;
    public MySqlConnection connect() {
        if(MySqlDb.connection==null){
        MySqlDb.connection=new MySqlConnection();
        }
        return connection;
    }

    public void closeConnection(){
        connection=null;
        System.out.println("Closing Connection of MySql Server....");
    }
}
