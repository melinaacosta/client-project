import { TestBed } from '@angular/core/testing';
import { ClientService } from './clients.service';
import { Firestore } from '@angular/fire/firestore';

describe('ClientService', () => {
  let service: ClientService;
  let firestoreSpy: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Firestore', ['collection']);

    TestBed.configureTestingModule({
      providers: [
        ClientService,
        { provide: Firestore, useValue: spy }
      ]
    });

    service = TestBed.inject(ClientService);
    firestoreSpy = TestBed.inject(Firestore) as jasmine.SpyObj<Firestore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have addClient method', () => {
    expect(service.addClient).toBeDefined();
  });

  it('should have getClients method', () => {
    expect(service.getClients).toBeDefined();
  });

  it('should inject Firestore', () => {
    expect(firestoreSpy).toBeDefined();
  });
});
