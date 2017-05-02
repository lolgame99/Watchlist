package at.ran.ws.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import at.ran.ws.db.dao.TaskDAO;
import at.ran.ws.sample.Task;

@Path("/tasks")
public class TaskService {


	@GET
	@Path("")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Task> getAllTasks() {
		List<Task> tasks = TaskDAO.getAllTAsks();
		return tasks;
	}

	@GET
	@Path("/{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Task getTaskForId(@PathParam("id") int id) {		
		return new Task("Test","test",id);
	}
	
	@POST
	@Path("")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addTask(Task task) {
		try {
			TaskDAO.insertTask(task);
			return Response.status(Status.CREATED).build();
		} catch (Exception e) {
			return Response.status(Status.CONFLICT).build();
		}

	}


}
