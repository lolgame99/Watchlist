package at.ran.ws.db.dao;

import java.util.List;

import at.ran.ws.sample.Task;

public class TaskDAOTest {
	public static void main(String[] args) {
	
		List<Task> tasks = TaskDAO.getAllTAsks();
		
		for (Task task : tasks) {
			System.out.println(task.getDescription());
			
		} 
		
		Task task = new Task("test ", "test", 5);
		TaskDAO.insertTask(task);
	}
}
