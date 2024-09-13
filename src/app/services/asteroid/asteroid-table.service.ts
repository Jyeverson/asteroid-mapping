import { Injectable } from '@angular/core';
import { AsteroidTableComponent } from '../../components/asteroid-table/asteroid-table.component';

@Injectable({
  providedIn: 'root'
})
export class AsteroidTableService {
  private asteroidTableComponent!: AsteroidTableComponent;

  setAsteroidTableComponent(component: AsteroidTableComponent) {
    this.asteroidTableComponent = component;
  }

  callGenerateTable(initial_date: string, final_date: string, risk: string) {
    if (this.asteroidTableComponent) {
      this.asteroidTableComponent.generateTable(initial_date, final_date, risk);
    } else {
      console.error('AsteroidTableComponent instance not available');
    }
  }
}
