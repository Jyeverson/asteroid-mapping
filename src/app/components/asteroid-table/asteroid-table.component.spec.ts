import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsteroidTableComponent } from './asteroid-table.component';

describe('AsteroidTableComponent', () => {
  let component: AsteroidTableComponent;
  let fixture: ComponentFixture<AsteroidTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsteroidTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsteroidTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
