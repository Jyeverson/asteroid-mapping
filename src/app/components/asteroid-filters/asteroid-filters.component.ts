import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {AsteroidTableService} from '../../services/asteroid/asteroid-table.service'
import moment from 'moment';

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
export class AsteroidFiltersComponent implements OnInit{

  constructor(private asteroidTableService: AsteroidTableService) {}

  dataInicial: string = '';
  dataFinal: string = '';
  selected = 'Todos';
  today = moment().format('YYYY-MM-DD');

  readonly campaignOne = new FormGroup({
    start: new FormControl(moment()),
    end: new FormControl(moment()),
  });

  readonly campaignTwo = new FormGroup({
    start: new FormControl(moment()),
    end: new FormControl(moment()),
  });


  ngOnInit(): void {
    this.asteroidTableService.callGenerateTable(this.today, this.today, this.selected);

    this.campaignOne.valueChanges.subscribe(value => {
    this.atualizarDatas(value);
    });

    this.atualizarDatas(this.campaignOne.value);
  }

  atualizarDatas(value: any) {
    const start = value.start ? moment(value.start).format('YYYY-MM-DD') : '';
    const end = value.end ? moment(value.end).format('YYYY-MM-DD') : '';

    this.dataInicial = start;
    this.dataFinal = end;

  }

  filter() {
    this.asteroidTableService.callGenerateTable(this.dataInicial, this.dataFinal, this.selected ?? 'every');
  }

}
