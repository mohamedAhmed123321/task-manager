import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/Task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() completeTask = new EventEmitter<number>();
  @Output() removeTask = new EventEmitter<number>();

  // Emit event to parent when task is completed
  onCompleteTask(id: number): void {
    this.completeTask.emit(id);
  }

  // Emit event to parent when task is removed
  onRemoveTask(id: number): void {
    this.removeTask.emit(id);
  }
}
