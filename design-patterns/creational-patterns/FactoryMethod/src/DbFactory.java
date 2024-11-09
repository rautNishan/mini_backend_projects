import Connections.MongoConnection;
import Connections.MySqlConnection;
import Connections.PostgresConnection;
import Databases.DataBase;
import Databases.MongoDb;
import Databases.MySqlDb;
import Databases.PostgressDb;

public class DbFactory{
    public DataBase<MySqlConnection> createMySqlDb(){
        return new MySqlDb();
    }
    public DataBase<PostgresConnection> createPostgressDb(){
        return  new PostgressDb();
    }
    public DataBase<MongoConnection> createMongoDb(){
        return  new MongoDb();
    }
}
