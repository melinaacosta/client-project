import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientFormComponent } from './client-form.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from 'src/app/core/services/clients.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ClientFormComponent', () => {
  let component: ClientFormComponent;
  let fixture: ComponentFixture<ClientFormComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ClientFormComponent>>;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const serviceSpy = jasmine.createSpyObj('ClientService', ['addClient']);

    await TestBed.configureTestingModule({
      imports: [
        ClientFormComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogSpy },
        { provide: ClientService, useValue: serviceSpy }
      ]
    }).compileComponents();

    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ClientFormComponent>>;
    clientServiceSpy = TestBed.inject(ClientService) as jasmine.SpyObj<ClientService>;
    fixture = TestBed.createComponent(ClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.clientForm.get('name')?.value).toBe('');
    expect(component.clientForm.get('lastName')?.value).toBe('');
    expect(component.clientForm.get('age')?.value).toBe('');
    expect(component.clientForm.get('birthDate')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.clientForm.valid).toBeFalsy();
  });

  describe('name field validation', () => {
    it('should require name field', () => {
      const nameControl = component.clientForm.get('name');
      expect(nameControl?.hasError('required')).toBeTruthy();
    });

    it('should reject name shorter than 2 characters', () => {
      const nameControl = component.clientForm.get('name');
      nameControl?.setValue('A');
      expect(nameControl?.hasError('minlength')).toBeTruthy();
    });

    it('should reject name longer than 50 characters', () => {
      const nameControl = component.clientForm.get('name');
      nameControl?.setValue('A'.repeat(51));
      expect(nameControl?.hasError('maxlength')).toBeTruthy();
    });

    it('should reject name with numbers', () => {
      const nameControl = component.clientForm.get('name');
      nameControl?.setValue('John123');
      expect(nameControl?.hasError('pattern')).toBeTruthy();
    });

    it('should accept valid name', () => {
      const nameControl = component.clientForm.get('name');
      nameControl?.setValue('John');
      expect(nameControl?.valid).toBeTruthy();
    });

    it('should accept name with spaces', () => {
      const nameControl = component.clientForm.get('name');
      nameControl?.setValue('John Paul');
      expect(nameControl?.valid).toBeTruthy();
    });

    it('should accept name with accents', () => {
      const nameControl = component.clientForm.get('name');
      nameControl?.setValue('José María');
      expect(nameControl?.valid).toBeTruthy();
    });
  });

  describe('lastName field validation', () => {
    it('should require lastName field', () => {
      const lastNameControl = component.clientForm.get('lastName');
      expect(lastNameControl?.hasError('required')).toBeTruthy();
    });

    it('should reject lastName shorter than 2 characters', () => {
      const lastNameControl = component.clientForm.get('lastName');
      lastNameControl?.setValue('A');
      expect(lastNameControl?.hasError('minlength')).toBeTruthy();
    });

    it('should reject lastName longer than 50 characters', () => {
      const lastNameControl = component.clientForm.get('lastName');
      lastNameControl?.setValue('A'.repeat(51));
      expect(lastNameControl?.hasError('maxlength')).toBeTruthy();
    });

    it('should reject lastName with numbers', () => {
      const lastNameControl = component.clientForm.get('lastName');
      lastNameControl?.setValue('Doe123');
      expect(lastNameControl?.hasError('pattern')).toBeTruthy();
    });

    it('should accept valid lastName', () => {
      const lastNameControl = component.clientForm.get('lastName');
      lastNameControl?.setValue('Doe');
      expect(lastNameControl?.valid).toBeTruthy();
    });
  });

  describe('age field validation', () => {
    it('should require age field', () => {
      const ageControl = component.clientForm.get('age');
      expect(ageControl?.hasError('required')).toBeTruthy();
    });

    it('should reject negative age', () => {
      const ageControl = component.clientForm.get('age');
      ageControl?.setValue(-1);
      expect(ageControl?.hasError('min')).toBeTruthy();
    });

    it('should reject age greater than 120', () => {
      const ageControl = component.clientForm.get('age');
      ageControl?.setValue(121);
      expect(ageControl?.hasError('max')).toBeTruthy();
    });

    it('should accept age 0', () => {
      const ageControl = component.clientForm.get('age');
      ageControl?.setValue(0);
      expect(ageControl?.valid).toBeTruthy();
    });

    it('should accept age 120', () => {
      const ageControl = component.clientForm.get('age');
      ageControl?.setValue(120);
      expect(ageControl?.valid).toBeTruthy();
    });

    it('should accept valid age', () => {
      const ageControl = component.clientForm.get('age');
      ageControl?.setValue(30);
      expect(ageControl?.valid).toBeTruthy();
    });
  });

  describe('birthDate field validation', () => {
    it('should require birthDate field', () => {
      const birthDateControl = component.clientForm.get('birthDate');
      expect(birthDateControl?.hasError('required')).toBeTruthy();
    });

    it('should reject invalid date format', () => {
      const birthDateControl = component.clientForm.get('birthDate');
      birthDateControl?.setValue('2023-12-25');
      expect(birthDateControl?.hasError('pattern')).toBeTruthy();
    });

    it('should reject date with single digit day', () => {
      const birthDateControl = component.clientForm.get('birthDate');
      birthDateControl?.setValue('1/12/2023');
      expect(birthDateControl?.hasError('pattern')).toBeTruthy();
    });

    it('should reject date with single digit month', () => {
      const birthDateControl = component.clientForm.get('birthDate');
      birthDateControl?.setValue('01/1/2023');
      expect(birthDateControl?.hasError('pattern')).toBeTruthy();
    });

    it('should accept valid date format DD/MM/YYYY', () => {
      const birthDateControl = component.clientForm.get('birthDate');
      birthDateControl?.setValue('15/07/1993');
      expect(birthDateControl?.valid).toBeTruthy();
    });

    it('should reject invalid day (32)', () => {
      const birthDateControl = component.clientForm.get('birthDate');
      birthDateControl?.setValue('32/12/2023');
      expect(birthDateControl?.hasError('pattern')).toBeTruthy();
    });

    it('should reject invalid month (13)', () => {
      const birthDateControl = component.clientForm.get('birthDate');
      birthDateControl?.setValue('15/13/2023');
      expect(birthDateControl?.hasError('pattern')).toBeTruthy();
    });
  });

  describe('submit method', () => {
    it('should not submit when form is invalid', () => {
      component.submit();
      expect(clientServiceSpy.addClient).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched when form is invalid', () => {
      component.submit();
      expect(component.clientForm.get('name')?.touched).toBeTruthy();
      expect(component.clientForm.get('lastName')?.touched).toBeTruthy();
      expect(component.clientForm.get('age')?.touched).toBeTruthy();
      expect(component.clientForm.get('birthDate')?.touched).toBeTruthy();
    });

    it('should call addClient when form is valid', () => {
      component.clientForm.patchValue({
        name: 'John',
        lastName: 'Doe',
        age: 30,
        birthDate: '15/07/1993'
      });

      clientServiceSpy.addClient.and.returnValue(Promise.resolve({} as any));
      component.submit();

      expect(clientServiceSpy.addClient).toHaveBeenCalledWith({
        name: 'John',
        lastName: 'Doe',
        age: 30,
        birthDate: '15/07/1993'
      });
    });

    it('should close dialog on successful submit', async () => {
      component.clientForm.patchValue({
        name: 'John',
        lastName: 'Doe',
        age: 30,
        birthDate: '15/07/1993'
      });

      clientServiceSpy.addClient.and.returnValue(Promise.resolve({} as any));
      await component.submit();

      await fixture.whenStable();
      expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
    });

    it('should handle error when submit fails', async () => {
      spyOn(console, 'error');
      component.clientForm.patchValue({
        name: 'John',
        lastName: 'Doe',
        age: 30,
        birthDate: '15/07/1993'
      });

      const error = new Error('Failed to save');
      clientServiceSpy.addClient.and.returnValue(Promise.reject(error));
      await component.submit();

      await fixture.whenStable();
      expect(console.error).toHaveBeenCalledWith('Error al guardar cliente', error);
    });
  });

  describe('close method', () => {
    it('should close dialog without passing value', () => {
      component.close();
      expect(dialogRefSpy.close).toHaveBeenCalledWith();
    });
  });

  it('should have valid form with all valid fields', () => {
    component.clientForm.patchValue({
      name: 'John',
      lastName: 'Doe',
      age: 30,
      birthDate: '15/07/1993'
    });
    expect(component.clientForm.valid).toBeTruthy();
  });
});
