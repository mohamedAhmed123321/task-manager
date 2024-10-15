import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[] = [];

  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  toggleCompletion(task: Task): void {
    this.taskService.toggleCompletion(task.id); // No need to subscribe here
    task.completed = !task.completed; // Toggle the task's completed status
  }

  removeTask(task: Task): void {
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
        this.taskService.removeTask(task.id).subscribe(() => {
          this.loadTasks();
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        });
      }
    });
  }
}
