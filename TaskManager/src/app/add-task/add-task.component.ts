// src/app/components/add-task/add-task.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup; // Form group for task input
  tasks: Task[] = []; // Array to hold tasks

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    // Initialize form with validation
    this.taskForm = this.fb.group({
      title: ['', Validators.required], // Title is required
    });

    // Fetch tasks from service on initialization
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  // Add a new task
  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: this.tasks.length + 1, // Simple ID generation
        title: this.taskForm.value.title,
        completed: false,
      };

      this.taskService.addTask(newTask); // Add task through the service

      // Update local tasks array and reset form
      this.taskService.getTasks().subscribe((updatedTasks: Task[]) => {
        this.tasks = updatedTasks;
        this.taskForm.reset(); // Reset form after submission
      });
    }
  }

  // Handle complete task event
  onCompleteTask(id: any): void {
    this.taskService.toggleCompletion(id); // Toggle task completion
  }

  // Handle remove task event
  onRemoveTask(id: any): void {
    this.taskService.removeTask(id); // Remove task from service
  }
}
