import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsteroidTableComponent } from "./asteroid-table/asteroid-table.component";
import { AsteroidFiltersComponent } from './asteroid-filters/asteroid-filters.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsteroidTableComponent, AsteroidFiltersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'asteroid-mapping';
}
