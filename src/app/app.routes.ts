import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home-page/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];
