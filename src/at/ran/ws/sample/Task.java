package at.ran.ws.sample;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Task {
	private String name;
	private String description;
	private int id;
	
	public Task() {
		// TODO Auto-generated constructor stub
	}
	
	
	public Task(String description, String name, int id) {
		super();
		this.name = name;
		this.description = description;
		this.id = id;
	}


	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	

}
