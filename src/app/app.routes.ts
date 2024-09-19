import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home-page/home.component';
import { OrbitComponent } from './features/orbit/components/orbit-page/orbit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'orbit', component: OrbitComponent },
];
