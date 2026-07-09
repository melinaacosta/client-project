import { TestBed } from '@angular/core/testing';
import { ClientStatsService } from './client-stats.service';
import { ClientService } from './clients.service';
import { of } from 'rxjs';
import { Client } from '../models/client.model';

describe('ClientStatsService', () => {
  let service: ClientStatsService;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ClientService', ['getClients']);

    TestBed.configureTestingModule({
      providers: [
        ClientStatsService,
        { provide: ClientService, useValue: spy }
      ]
    });

    service = TestBed.inject(ClientStatsService);
    clientServiceSpy = TestBed.inject(ClientService) as jasmine.SpyObj<ClientService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAverageAge', () => {
    it('should return 0 when there are no clients', (done) => {
      clientServiceSpy.getClients.and.returnValue(of([]));

      service.getAverageAge().subscribe(average => {
        expect(average).toBe(0);
        done();
      });
    });

    it('should calculate average age correctly with one client', (done) => {
      const clients: Client[] = [
        { id: '1', name: 'John', lastName: 'Doe', age: 30, birthDate: '01/01/1993' }
      ];
      clientServiceSpy.getClients.and.returnValue(of(clients));

      service.getAverageAge().subscribe(average => {
        expect(average).toBe(30);
        done();
      });
    });

    it('should calculate average age correctly with multiple clients', (done) => {
      const clients: Client[] = [
        { id: '1', name: 'John', lastName: 'Doe', age: 30, birthDate: '01/01/1993' },
        { id: '2', name: 'Jane', lastName: 'Smith', age: 40, birthDate: '01/01/1983' },
        { id: '3', name: 'Bob', lastName: 'Johnson', age: 50, birthDate: '01/01/1973' }
      ];
      clientServiceSpy.getClients.and.returnValue(of(clients));

      service.getAverageAge().subscribe(average => {
        expect(average).toBe(40);
        done();
      });
    });

    it('should handle decimal results correctly', (done) => {
      const clients: Client[] = [
        { id: '1', name: 'John', lastName: 'Doe', age: 25, birthDate: '01/01/1998' },
        { id: '2', name: 'Jane', lastName: 'Smith', age: 30, birthDate: '01/01/1993' }
      ];
      clientServiceSpy.getClients.and.returnValue(of(clients));

      service.getAverageAge().subscribe(average => {
        expect(average).toBe(27.5);
        done();
      });
    });
  });

  describe('getAgeStandardDeviation', () => {
    it('should return 0 when there are no clients', (done) => {
      clientServiceSpy.getClients.and.returnValue(of([]));

      service.getAgeStandardDeviation().subscribe(deviation => {
        expect(deviation).toBe(0);
        done();
      });
    });

    it('should return 0 when all clients have the same age', (done) => {
      const clients: Client[] = [
        { id: '1', name: 'John', lastName: 'Doe', age: 30, birthDate: '01/01/1993' },
        { id: '2', name: 'Jane', lastName: 'Smith', age: 30, birthDate: '01/01/1993' },
        { id: '3', name: 'Bob', lastName: 'Johnson', age: 30, birthDate: '01/01/1993' }
      ];
      clientServiceSpy.getClients.and.returnValue(of(clients));

      service.getAgeStandardDeviation().subscribe(deviation => {
        expect(deviation).toBe(0);
        done();
      });
    });

    it('should calculate standard deviation correctly', (done) => {
      const clients: Client[] = [
        { id: '1', name: 'John', lastName: 'Doe', age: 20, birthDate: '01/01/2003' },
        { id: '2', name: 'Jane', lastName: 'Smith', age: 30, birthDate: '01/01/1993' },
        { id: '3', name: 'Bob', lastName: 'Johnson', age: 40, birthDate: '01/01/1983' }
      ];
      clientServiceSpy.getClients.and.returnValue(of(clients));

      service.getAgeStandardDeviation().subscribe(deviation => {
        expect(deviation).toBeCloseTo(8.164965809277261, 5);
        done();
      });
    });

    it('should handle one client', (done) => {
      const clients: Client[] = [
        { id: '1', name: 'John', lastName: 'Doe', age: 25, birthDate: '01/01/1998' }
      ];
      clientServiceSpy.getClients.and.returnValue(of(clients));

      service.getAgeStandardDeviation().subscribe(deviation => {
        expect(deviation).toBe(0);
        done();
      });
    });

    it('should calculate standard deviation with different age ranges', (done) => {
      const clients: Client[] = [
        { id: '1', name: 'John', lastName: 'Doe', age: 18, birthDate: '01/01/2005' },
        { id: '2', name: 'Jane', lastName: 'Smith', age: 25, birthDate: '01/01/1998' },
        { id: '3', name: 'Bob', lastName: 'Johnson', age: 35, birthDate: '01/01/1988' },
        { id: '4', name: 'Alice', lastName: 'Brown', age: 50, birthDate: '01/01/1973' }
      ];
      clientServiceSpy.getClients.and.returnValue(of(clients));

      service.getAgeStandardDeviation().subscribe(deviation => {
        expect(deviation).toBeGreaterThan(0);
        expect(deviation).toBeCloseTo(12.02, 2);
        done();
      });
    });
  });
});
