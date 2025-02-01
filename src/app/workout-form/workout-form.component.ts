import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule
  ]
})
export class WorkoutFormComponent implements OnInit {
  userName: string = '';
  workoutType: string = '';
  workout: string = ''; // Ensure this line is present
  workoutMinutes: number = 0;
  availableWorkouts: string[] = [];
  workoutTypes: string[] = ['Cardio', 'Strength', 'Flexibility', 'Balance', 'Endurance'];

  workouts: { [key in 'Cardio' | 'Strength' | 'Flexibility' | 'Balance' | 'Endurance']: string[] } = {
    Cardio: ['Running', 'Cycling', 'Swimming', 'Jump Rope'],
    Strength: ['Weight Lifting', 'Bodyweight Exercises', 'Resistance Bands'],
    Flexibility: ['Yoga', 'Stretching', 'Pilates'],
    Balance: ['Tai Chi', 'Balance Board Exercises', 'Single-leg Stands'],
    Endurance: ['Long-distance Running', 'Rowing', 'Cross-country Skiing']
  };

  userData = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    }
  ];

  ngOnInit() {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
    }
  }

  onWorkoutTypeChange() {
    this.availableWorkouts = this.workouts[this.workoutType as 'Cardio' | 'Strength' | 'Flexibility' | 'Balance' | 'Endurance'] || [];
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const user = this.userData.find(u => u.name === this.userName);
    if (user) {
      user.workouts.push({ type: this.workoutType, minutes: this.workoutMinutes });
    } else {
      const newUser = {
        id: this.userData.length + 1,
        name: this.userName,
        workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }]
      };
      this.userData.push(newUser);
    }
    localStorage.setItem('userData', JSON.stringify(this.userData));
    this.resetForm();
  }

  resetForm() {
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
    this.availableWorkouts = [];
  }
}
