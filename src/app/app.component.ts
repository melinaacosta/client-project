import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientListComponent } from './features/clients/client-list/client-list.component';
import { ClientFormComponent } from './features/clients/client-form/client-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClientListComponent, ClientFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client-project';
}
