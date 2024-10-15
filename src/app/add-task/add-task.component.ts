import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task.model'; // Ensure this path is correct

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  tasks: Task[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    // Initialize form
    this.taskForm = this.fb.group({
      title: ['', Validators.required]
    });

    // Fetch tasks from service
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  // Add a new task
  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: this.tasks.length + 1, // Simple ID generation
        title: this.taskForm.value.title,
        completed: false
      };

      this.taskService.addTask(newTask).subscribe((updatedTasks) => {
        this.tasks = updatedTasks; // Update local tasks with the service response
        this.taskForm.reset(); // Reset form after submission
      });
    }
  }

  // Handle complete task event
  onCompleteTask(id: number) {
    this.taskService.removeTask(id).subscribe((updatedTasks) => {
      this.tasks = updatedTasks; // Update local tasks after completion
    });
  }

  // Handle remove task event
  onRemoveTask(id: number) {
    this.taskService.removeTask(id).subscribe((updatedTasks) => {
      this.tasks = updatedTasks; // Update local tasks after removal
    });
  }
}
