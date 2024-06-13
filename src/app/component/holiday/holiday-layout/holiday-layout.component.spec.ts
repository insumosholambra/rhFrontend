import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayLayoutComponent } from './holiday-layout.component';

describe('HolidayLayoutComponent', () => {
  let component: HolidayLayoutComponent;
  let fixture: ComponentFixture<HolidayLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HolidayLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
