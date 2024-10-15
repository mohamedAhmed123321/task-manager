import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Task } from '../models/Task.model'; // Adjust path as necessary
import { TaskService } from '../services/task.service'; // Adjust path as necessary

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
  }

  // Load tasks from the service
  loadTasks() {
    this.taskService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks', error);
        Swal.fire('Error', 'Failed to load tasks. Please try again later.', 'error');
      }
    );
  }

  // Add a new task
  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: 0, // This will be set in the service
        title: this.newTaskTitle,
        completed: false
      };
      this.taskService.addTask(newTask).subscribe((tasks) => {
        this.tasks = tasks; // Update local tasks with the service response
        this.newTaskTitle = ''; // Clear the input field after adding
      });
    }
  }

  // Remove a task with confirmation
  removeTask(taskId: number) {
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
          this.tasks = tasks; // Update local tasks with the service response
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        });
      }
    });
  }

  // Toggle task completion status
  toggleTaskCompletion(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }

  // Get incomplete tasks
  get incompleteTasks() {
    return this.tasks.filter(task => !task.completed);
  }

  // Get completed tasks
  get completedTasks() {
    return this.tasks.filter(task => task.completed);
  }
}
