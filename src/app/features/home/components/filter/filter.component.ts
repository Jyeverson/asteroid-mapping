import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NG_VALIDATORS, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {AsteroidTableService} from '../../services/asteroid-table.service'
import { CommonModule } from '@angular/common';
import { dateRangeValidator } from '../../validators/date-range-validator';
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
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {provide: NG_VALIDATORS, useExisting: dateRangeValidator, multi: true}
  ],
})
export class AsteroidFiltersComponent implements OnInit{
  readonly end = new FormControl('', [Validators.required, dateRangeValidator]);
  campaignOne: FormGroup;
  initialDate: string = '';
  finalDate: string = '';
  selected = 'Todos';
  today = moment().format('YYYY-MM-DD');

  constructor(private asteroidTableService: AsteroidTableService, private fb: FormBuilder) {
    this.campaignOne = this.fb.group({
      start: [this.today, Validators.required],
      end: [this.today, Validators.required]
    }, { validators: dateRangeValidator() });
  }

  ngOnInit(): void {
    this.asteroidTableService.callGenerateTable(this.today, this.today, this.selected);

    this.campaignOne.valueChanges.subscribe(value => {
      this.updateDates(value);
    });

  }

  updateDates(value: any) {
    const start = value.start ? moment(value.start).format('YYYY-MM-DD') : '';
    const end = value.end ? moment(value.end).format('YYYY-MM-DD') : '';

    this.initialDate = start;
    this.finalDate = end;
  }

  filter() {
      this.asteroidTableService.callGenerateTable(this.initialDate, this.finalDate, this.selected ?? 'every');
  }

}
