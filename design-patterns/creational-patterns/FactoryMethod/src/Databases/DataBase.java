    package Databases;

    public abstract class DataBase<T> {
        public abstract T connect();
        public abstract void closeConnection();
    }
