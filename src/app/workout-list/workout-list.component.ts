import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../models/user.model';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule
  ]
})



export class WorkoutListComponent implements OnInit {
  userData: User[] = [];
  filteredData: User[] = [];
  searchName: string = '';
  selectedWorkoutType: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;
  
  displayedColumns: string[] = ['name', 'workouts',  'numWorkouts', 'minutes'];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const data = localStorage.getItem('userData');
    this.userData = data ? JSON.parse(data) : [];
    this.filteredData = [...this.userData];
  }

  onSearch() {
    this.filteredData = this.userData.filter(user =>
      user.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }

  onFilter() {
    this.filteredData = this.userData.filter(user =>
      this.selectedWorkoutType === '' || user.workouts.some(workout => workout.type === this.selectedWorkoutType)
    );
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredData.slice(start, end);
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
  }

  getUniqueWorkoutTypes() {
    return [...new Set(this.userData.flatMap(user => user.workouts.map(workout => workout.type)))];
  }
   getWorkoutTypes(user: User): string {
    return user.workouts.map(w => w.type).join(', ');
  }

  getTotalMinutes(user: User): number {
    return user.workouts.reduce((sum, w) => sum + w.minutes, 0);
  }

  getNumberOfWorkouts(user: User): number {
    return user.workouts.length;
  }
}
