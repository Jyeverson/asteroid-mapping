import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsteroidFiltersComponent } from './filter.component';

describe('AsteroidFiltersComponent', () => {
  let component: AsteroidFiltersComponent;
  let fixture: ComponentFixture<AsteroidFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsteroidFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsteroidFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
