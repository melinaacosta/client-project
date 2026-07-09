import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Client } from 'src/app/core/models/client.model';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ClientFormComponent } from '../client-form/client-form.component';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format';
import { ClientService } from 'src/app/core/services/clients.service';
import { MatSort } from '@angular/material/sort';

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
    DateFormatPipe,
  ],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  protected dataSource = new MatTableDataSource<Client>();
  protected displayedColumns = ['name', 'lastName', 'age', 'birthDate'];

  private readonly dialog = inject(MatDialog);
  private readonly clientService = inject(ClientService);

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients: Client[]) => {
      this.dataSource.data = clients;
      this.dataSource.sort = this.sort;
    });
  }

  openCreateClient(): void {
    this.dialog.open(ClientFormComponent, {
      width: '500px',
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
