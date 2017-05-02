package at.ran.ws.db;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBHelper {

	public static Connection getConnection() throws SQLException {
		// setup the connection with the DB.
		Connection connect;
		try {
			// this will load the MySQL driver, each DB has its own driver
			Class.forName("com.mysql.jdbc.Driver");
			connect = DriverManager
					.getConnection("jdbc:mysql://localhost/dbAPI?user=root&password=");
			return connect;
		} catch (ClassNotFoundException e) {
			return null;
		}

	}

}