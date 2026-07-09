import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ClientListComponent } from './features/clients/client-list/client-list.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CardComponent } from './shared/components/card/card.component';
import { ClientStatsService } from './core/services/client-stats.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClientListComponent, NavbarComponent, CardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  protected readonly title = 'Clientes Registrados';

  protected averageAge = 0;
  protected standardDeviation = 0;

  private readonly clientStatsService = inject(ClientStatsService);

  /**
   * Subject utilizado para controlar la finalización de las suscripciones.
   *
   * En Angular, los observables que escuchan datos en tiempo real (como
   * Firestore) pueden mantenerse activos mientras el componente exista.
   * Al emitir un valor en ngOnDestroy, todas las suscripciones asociadas
   * mediante takeUntil se cancelan evitando posibles fugas de memoria.
   */

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.clientStatsService
      .getAverageAge()
      .pipe(takeUntil(this.destroy$))
      .subscribe((average: number) => {
        this.averageAge = average;
      });

    this.clientStatsService
      .getAgeStandardDeviation()
      .pipe(takeUntil(this.destroy$))
      .subscribe((deviation: number) => {
        this.standardDeviation = deviation;
      });
  }

  /**
   * Finaliza las suscripciones activas antes de destruir el componente.
   */

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
