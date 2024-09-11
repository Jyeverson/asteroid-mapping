import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@Component({
  selector: 'app-asteroid-filters',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './asteroid-filters.component.html',
  styleUrl: './asteroid-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
})
export class AsteroidFiltersComponent {
  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });
  readonly campaignTwo = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  selected = 'Todos';

}
