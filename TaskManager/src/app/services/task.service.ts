import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';
import { tap } from 'rxjs/operators'; // Import tap operator

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'assets/tasks.json'; // Your mock API
  private tasks: Task[] = []; // Ensure this is initialized as an array

  constructor(private http: HttpClient) {}

  // Load tasks from the mock API or return cached tasks
  getTasks(): Observable<Task[]> {
    if (this.tasks.length === 0) {
      // Fetch tasks only if the array is empty
      return this.http.get<Task[]>(this.apiUrl).pipe(
        tap((data: Task[]) => {
          this.tasks = Array.isArray(data) ? data : []; // Safeguard to ensure it's always an array
        })
      );
    }
    return of(this.tasks); // Return cached tasks
  }

  // Add a new task and return the updated tasks array
  addTask(newTask: Task): Observable<Task[]> {
    newTask.id = this.tasks.length + 1;
    this.tasks.push(newTask); // Add the new task to the cached array
    return of(this.tasks); // Return the updated task array
  }

  // Remove a task by id and return the updated tasks array
  removeTask(taskId: number): Observable<Task[]> {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    return of(this.tasks); // Return the updated tasks array
  }

  // Toggle task completion and return the updated tasks array
  toggleCompletion(id: number): Observable<Task[]> {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
    return of(this.tasks); // Return the updated task array
  }
}
