import { Component, EventEmitter, Output } from '@angular/core';
import { User, Workout } from '../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
  imports: [FormsModule]
})
export class WorkoutFormComponent {
  @Output() addUser = new EventEmitter<User>();
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  onSubmit() {
    const newUser: User = {
      id: Date.now(), // Unique ID
      name: this.userName,
      workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }]
    };
    this.addUser.emit(newUser);
    this.resetForm();
  }

  resetForm() {
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }
}