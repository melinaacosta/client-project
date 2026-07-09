import { Injectable } from '@angular/core';
import { ClientService } from './clients.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientStatsService {
  constructor(private clientService: ClientService) {}

  /**
   * Calcula la edad promedio de todos los clientes registrados.
   *
   * @returns Observable con la edad promedio.
   */
  getAverageAge(): Observable<number> {
    return this.clientService.getClients().pipe(
      map((clients) => {
        if (!clients.length) return 0;

        const totalAge = clients.reduce(
          (sum, client) => sum + Number(client.age),
          0,
        );

        return totalAge / clients.length;
      }),
    );
  }

  /**
   * Calcula la desviación estándar de las edades de los clientes.
   *
   * La desviación estándar permite medir la dispersión de las edades
   * respecto al valor promedio.
   *
   * @returns Observable con la desviación estándar.
   */
  getAgeStandardDeviation(): Observable<number> {
    return this.clientService.getClients().pipe(
      map((clients) => {
        if (!clients.length) return 0;

        const ages = clients.map((client) => Number(client.age));

        const average = ages.reduce((sum, age) => sum + age, 0) / ages.length;

        const variance =
          ages.reduce((sum, age) => sum + Math.pow(age - average, 2), 0) /
          ages.length;

        return Math.sqrt(variance);
      }),
    );
  }
}
