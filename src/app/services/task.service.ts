import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../models/Task.model'; // Ensure this model exists.

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'assets/tasks.json'; // Path to your mock JSON file
  private tasks: Task[] = []; // In-memory tasks array

  constructor(private http: HttpClient) {
    this.loadTasks(); // Load tasks from JSON file on initialization
  }

  // Load tasks from the mock API
  private loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe(
      (data: Task[]) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  // Fetch tasks from in-memory storage
  getTasks(): Observable<Task[]> {
    return of(this.tasks); // Return the in-memory tasks array as an observable
  }

  // Add a task to the in-memory storage
  addTask(newTask: Task): Observable<Task[]> {
    newTask.id = this.tasks.length + 1; // Generate a new ID
    this.tasks.push(newTask); // Add the new task to the array
    return of(this.tasks); // Return the updated tasks array as an observable
  }

  // Remove a task from the in-memory storage
  removeTask(taskId: number): Observable<Task[]> {
    this.tasks = this.tasks.filter(task => task.id !== taskId); // Filter out the deleted task
    return of(this.tasks); // Return the updated tasks array as an observable
  }
}
