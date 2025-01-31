import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private readonly storageKey = 'userData';

  constructor() { }

  getUsers(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addUser(user: any): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  searchUsersByName(name: string): any[] {
    const users = this.getUsers();
    return users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  }

  filterUsersByWorkoutType(type: string): any[] {
    const users = this.getUsers();
    return users.filter(user => user.workouts.some((workout: any) => workout.type === type));
  }
}