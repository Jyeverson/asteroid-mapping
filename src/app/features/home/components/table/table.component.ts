import { AsteroidService } from '../../services/asteroid.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AsteroidTableService } from '../../services/asteroid-table.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'asteroid-table',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, CommonModule, MatProgressBarModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class AsteroidTableComponent implements AfterViewInit {
  onIconClick(element: any) {
    console.log('Ícone clicado para o elemento:', element);
  }

  displayedColumns: string[] = ['name', 'date', 'diameter', 'isDangerous', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading: boolean = false;

  constructor(private asteroidService: AsteroidService, private asteroidTableService: AsteroidTableService) {
    this.asteroidTableService.setAsteroidTableComponent(this);
  }

  generateTable(initial_date: string, final_date: string, risk: string) {
    this.isLoading = true;
    this.asteroidService.getNearEarthObjects(initial_date, final_date).subscribe({
      next: (data) => {
        let allAsteroids = Object.values(data.near_earth_objects).flat().map((asteroid: any) => ({
          name: asteroid.name,
          date: asteroid.close_approach_data[0]?.close_approach_date || 'N/A',
          diameter: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
          isDangerous: asteroid.is_potentially_hazardous_asteroid
        }));

        if (risk === 'dangerous') {
          allAsteroids = allAsteroids.filter(asteroid => asteroid.isDangerous);
        } else if (risk === 'not_dangerous') {
          allAsteroids = allAsteroids.filter(asteroid => !asteroid.isDangerous);
        }

        this.dataSource.data = allAsteroids;
        this.dataSource.data = allAsteroids;
        this.isLoading = false;
      },

      error: (error) => console.error('Error getting asteroid data: ', error),
      complete: () => console.log('Request completed')
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
