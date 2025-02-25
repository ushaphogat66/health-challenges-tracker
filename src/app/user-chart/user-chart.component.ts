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

    const ctx = document.getElementById('canvas') as HTMLCanvasElement;
    if (!ctx) return; // Ensures no null reference error

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: workoutLabels,
        datasets: [
          {
            label: 'Minutes Spent',
            data: workoutData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1,
            borderRadius: 10,
            hoverBackgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            hoverBorderWidth: 2,
            hoverBorderColor: '#fff'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#333',
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 10,
            displayColors: false,
            callbacks: {
              title: (tooltipItems) => `Workout: ${tooltipItems[0].label}`,
              label: (tooltipItem) => `Minutes: ${tooltipItem.raw}`
            }
          },
          title: {
            display: true,
            text: 'Workout Progress (Minutes Spent)',
            font: {
              size: 18,
              weight: 'bold',
              family: 'Arial'
            },
            padding: {
              top: 10,
              bottom: 20
            },
            color: '#333'
          }
        },
        animation: {
          duration: 800,
          easing: 'easeInOutQuad'
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
              lineWidth: 1
            },
            ticks: {
              font: {
                size: 12,
                family: 'Arial'
              },
              color: '#666'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 12,
                family: 'Arial'
              },
              color: '#666'
            }
          }
        }
      }
    });
  }
}
