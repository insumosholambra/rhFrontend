import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugestaoComponent } from './sugestao.component';

describe('SugestaoComponent', () => {
  let component: SugestaoComponent;
  let fixture: ComponentFixture<SugestaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SugestaoComponent]
    });
    fixture = TestBed.createComponent(SugestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
