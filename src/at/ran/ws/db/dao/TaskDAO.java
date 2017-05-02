package at.ran.ws.db.dao;


import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import at.ran.ws.db.DBHelper;
import at.ran.ws.sample.Task;

public class TaskDAO {

	public static void insertTask(Task task) {
		try {
			Connection connection = DBHelper.getConnection();
			Statement statement = connection.createStatement();
			String sql = "INSERT INTO `tbltasks`(`sName`, `sDescription`) VALUES ('" + task.getName() + "','" + task.getDescription() + "')";
			statement.execute(sql);

			statement.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public static List<Task> getAllTAsks() {
		List<Task> tasks = new ArrayList<Task>();

		try {
			
			Connection connection = DBHelper.getConnection();
			Statement statement = connection.createStatement();
			ResultSet rs = statement.executeQuery("select * from tbltasks");
			
			rs.first();
			while (!rs.isAfterLast()) {
				tasks.add(new Task(rs.getString(3),rs.getString(2),rs.getInt(1)));
				

				rs.next();
			}

			rs.close();
			statement.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return tasks;

	}
	
	

	

}
