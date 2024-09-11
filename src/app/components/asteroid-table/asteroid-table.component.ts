import { AsteroidService } from '../../services/asteroid.service';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NearEarthObject } from '../../interfaces/NearEarthObject';

interface AsteroidTableData {
  name: string;
  date: string;
  diameter: number;
  isDangerous: boolean;
}

@Component({
  selector: 'app-asteroid-table',
  standalone: true,
  imports: [RouterOutlet, MatPaginatorModule, MatTableModule],
  templateUrl: './asteroid-table.component.html',
  styleUrl: './asteroid-table.component.scss'
})
export class AsteroidTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'date', 'diameter', 'isDangerous'];
  dataSource = new MatTableDataSource<AsteroidTableData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private asteroidService: AsteroidService) {}

  ngOnInit() {

    this.asteroidService.getNearEarthObjects().subscribe({
      next: (data) => {
        const allAsteroids: AsteroidTableData[] = [];
        for (const date in data.near_earth_objects) {
          if (data.near_earth_objects.hasOwnProperty(date)) {
            const asteroidsForDate = data.near_earth_objects[date];
            const asteroids: AsteroidTableData[] = asteroidsForDate.map((asteroid: NearEarthObject) => ({
              name: asteroid.name,
              date: asteroid.close_approach_data[0]?.close_approach_date || 'N/A',
              diameter: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
              isDangerous: asteroid.is_potentially_hazardous_asteroid
            }));
            allAsteroids.push(...asteroids);
          }
        }
        this.dataSource.data = allAsteroids;
      },
      error: (error) => {
      console.error('Error getting data from asteroids:', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
