import Connections.MongoConnection;
import Connections.MySqlConnection;
import Connections.PostgresConnection;
import Databases.DataBase;
import Databases.MySqlDb;

public class Main {
    public static void main(String[] args) {
            DbFactory myDbFactory=new DbFactory();
            DataBase<MySqlConnection> mySql=myDbFactory.createMySqlDb();
            //Just checking if it is creating double instances or not.
            MySqlConnection connect1=mySql.connect();
            System.out.println(connect1);
            MySqlConnection connect2=mySql.connect();
            System.out.println(connect2);
            mySql.connect();
            DataBase<PostgresConnection> pg=myDbFactory.createPostgressDb();
            pg.connect();
            DataBase<MongoConnection> mongo=myDbFactory.createMongoDb();
            mongo.connect();

            mySql.closeConnection();
            pg.closeConnection();
            mongo.closeConnection();



    }

}