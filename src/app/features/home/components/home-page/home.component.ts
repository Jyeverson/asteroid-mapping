import { Component } from '@angular/core';
import { AsteroidTableComponent } from '../table/table.component';
import { AsteroidFiltersComponent } from '../filter/filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsteroidTableComponent, AsteroidFiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
