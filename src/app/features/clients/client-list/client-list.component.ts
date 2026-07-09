import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Client } from 'src/app/core/models/client.model';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent {
  dataSource = new MatTableDataSource<Client>();
  displayedColumns = ['name', 'lastName', 'age', 'birthDate'];

  constructor(private dialog: MatDialog) {}

  openCreateClient(): void {
    this.dialog.open(ClientFormComponent, {
      width: '500px',
    });
  }
}
