import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { UserChartComponent } from './user-chart/user-chart.component';


export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'workout-form', component: WorkoutFormComponent },
  { path: 'workout-list', component: WorkoutListComponent },
  {path: 'user-chart', component: UserChartComponent}
];