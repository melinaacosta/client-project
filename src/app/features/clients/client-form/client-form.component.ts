import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientService } from 'src/app/core/services/clients.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent {
  clientForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ClientFormComponent>,
    private clientService: ClientService,
  ) {
    this.clientForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(120),
      ]),
      birthDate: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        ),
      ]),
    });
  }

  submit(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const client = this.clientForm.getRawValue();
    console.log('Cliente a guardar:', client);

    this.clientService
      .addClient(client)
      .then(() => {
        this.dialogRef.close(true);
      })
      .catch((error) => {
        console.error('Error al guardar cliente', error);
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}
