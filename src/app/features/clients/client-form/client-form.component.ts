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

  constructor(private dialogRef: MatDialogRef<ClientFormComponent>) {
    this.clientForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      age: new FormControl(''),
      birthDate: new FormControl(''),
    });
  }

  submit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
