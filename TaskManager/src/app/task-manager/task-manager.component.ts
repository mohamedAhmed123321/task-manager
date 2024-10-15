import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    console.log(this.completedTasks)
    console.log(this.incompleteTasks)
  }


  // Method to load tasks from the service
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = Array.isArray(data) ? data : [];
        console.log('Fetched tasks:', this.tasks);

      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      },
      complete: () => {
        console.log('Task fetching completed.');
      }
    });
  }
  // Method to add a new task
  addTask(): void {
    if (this.newTaskTitle.trim()) { // Check if task title is not empty
      const newTask: Task = {
        id: 0, // ID will be set by the service
        title: this.newTaskTitle,
        completed: false
      };

      // Call the service to add the task
      this.taskService.addTask(newTask).subscribe((tasks) => {
        this.tasks = tasks; // Update tasks in the component
        this.newTaskTitle = ''; // Clear the input field
      });
    }
  }

  // Method to remove a task with confirmation using SweetAlert
  removeTask(taskId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.removeTask(taskId).subscribe((tasks) => {
          this.tasks = tasks; // Update tasks in the component
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        });
      }
    });
  }

  // Method to toggle task completion status
  toggleTaskCompletion(taskId: number): void {
    this.taskService.toggleCompletion(taskId).subscribe((tasks) => {
      this.tasks = tasks; // Update tasks after toggling completion
    });
  }

  // Get incomplete tasks
  get incompleteTasks() {
    return this.tasks.filter(task => !task.completed); // Safeguard
  }

  // Get completed tasks
  get completedTasks() {
    return  this.tasks.filter(task => task.completed); // Safeguard
  }

}
