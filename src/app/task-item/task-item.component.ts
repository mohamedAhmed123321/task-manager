import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/Task.model'; // Assuming Task is an interface

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() completeTask = new EventEmitter<number>();
  @Output() removeTask = new EventEmitter<number>();

  onComplete() {
    this.completeTask.emit(this.task.id);
  }

  onRemove() {
    this.removeTask.emit(this.task.id);
  }
}
