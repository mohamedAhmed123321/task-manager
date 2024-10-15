// src/app/components/task-item/task-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task; // Task input from parent component
  @Output() completeTask = new EventEmitter<number>(); // Event emitter for task completion
  @Output() removeTask = new EventEmitter<number>(); // Event emitter for task removal

  // Emit complete task event
  onComplete(): void {
    this.completeTask.emit(this.task.id);
  }

  // Emit remove task event
  onRemove(): void {
    this.removeTask.emit(this.task.id);
  }
}
