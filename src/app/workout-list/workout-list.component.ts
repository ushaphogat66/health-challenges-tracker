import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class WorkoutListComponent implements OnInit {
  userData: User[] = [];
  filteredData: User[] = [];
  searchName: string = '';
  selectedWorkoutType: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const data = localStorage.getItem('userData');
    this.userData = data ? JSON.parse(data) : [];
    this.filteredData = [...this.userData];
  }

  onAddUser(newUser: User) {
    this.userData.push(newUser);
    localStorage.setItem('userData', JSON.stringify(this.userData));
    this.filteredData = [...this.userData];
  }

  onSearch() {
    this.filteredData = this.userData.filter(user =>
      user.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }

  onFilter() {
    this.filteredData = this.userData.filter(user =>
      user.workouts.some(workout => workout.type === this.selectedWorkoutType)
    );
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredData.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  getUniqueWorkoutTypes() {
    // Implement the logic to get unique workout types
    return [];
  }

  getPages() {
    // Implement the logic to get pages
    return [];
  }
}