import { TestBed, ComponentFixture } from '@angular/core/testing';
import { VisitComponent } from './visit.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { VisitService } from '../../core/services/visit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

describe('VisitComponent', () => {
  let component: VisitComponent;
  let fixture: ComponentFixture<VisitComponent>;
  let visitService: VisitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [FormBuilder, VisitService, DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitComponent);
    component = fixture.componentInstance;
    visitService = TestBed.inject(VisitService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize visitForm with default values and validate required fields', () => {
    expect(component.visitForm).toBeDefined();

    const visitForm = component.visitForm;
    expect(visitForm.valid).toBeFalsy();

    visitForm.controls['NOME'].setValue('John');
    visitForm.controls['SOBRENOME'].setValue('Doe');
    // Set other required fields...

    expect(visitForm.valid).toBeTruthy();
  });

  it('should format time correctly', () => {
    expect(component.formatTime('14:30')).toEqual('14:30:00');
    expect(component.formatTime('08:15:20')).toEqual('08:15:20');
  });

  it('should call newVisit from VisitService on form submission', () => {
    spyOn(visitService, 'newVisit').and.returnValue(of({}));

    component.visitForm.setValue({
      NOME: 'John',
      SOBRENOME: 'Doe',
      // Set other form values...
    });

    component.submitForm();

    expect(visitService.newVisit).toHaveBeenCalled();
  });

  it('should handle error when newVisit fails', () => {
    spyOn(console, 'error');

    spyOn(visitService, 'newVisit').and.returnValue(throwError('Server error'));

    component.visitForm.setValue({
      NOME: 'John',
      SOBRENOME: 'Doe',
      // Set other form values...
    });

    component.submitForm();

    expect(console.error).toHaveBeenCalledWith('Erro ao cadastrar visita:', 'Server error');
  });
});

