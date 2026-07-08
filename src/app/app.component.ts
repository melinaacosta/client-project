import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientListComponent } from './features/clients/client-list/client-list.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CardComponent } from './shared/components/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClientListComponent, NavbarComponent, CardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client-project';
}
