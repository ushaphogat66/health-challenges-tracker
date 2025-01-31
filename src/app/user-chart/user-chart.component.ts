import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { User } from '../models/user.model';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css'],
  standalone: true,
  imports: [CommonModule, MatTabsModule]
})
export class UserChartComponent implements OnInit {
  chart: any;
  userData: User[] = [];
  selectedUser: User | null = null;

  ngOnInit() {
    this.loadUserData();
    if (this.userData.length > 0) {
      this.selectedUser = this.userData[0];
      this.createChart();
    }
  }

  loadUserData() {
    const data = localStorage.getItem('userData');
    this.userData = data ? JSON.parse(data) : [];
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.createChart();
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    if (!this.selectedUser) {
      return;
    }

    const workoutLabels = this.selectedUser.workouts.map(workout => workout.type);
    const workoutData = this.selectedUser.workouts.map(workout => workout.minutes);

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: workoutLabels,
        datasets: [
          {
            label: 'Minutes',
            data: workoutData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}