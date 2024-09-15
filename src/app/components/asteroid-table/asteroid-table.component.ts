import { AsteroidService } from '../../services/asteroid/asteroid.service';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AsteroidTableService } from '../../services/asteroid/asteroid-table.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-asteroid-table',
  standalone: true,
  imports: [RouterOutlet, MatPaginatorModule, MatTableModule, CommonModule, MatProgressBarModule],
  templateUrl: './asteroid-table.component.html',
  styleUrl: './asteroid-table.component.scss'
})
export class AsteroidTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'date', 'diameter', 'isDangerous'];
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
