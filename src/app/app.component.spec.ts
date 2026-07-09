import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ClientStatsService } from './core/services/client-stats.service';
import { ClientService } from './core/services/clients.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let clientStatsServiceSpy: jasmine.SpyObj<ClientStatsService>;

  beforeEach(async () => {
    const statsSpy = jasmine.createSpyObj('ClientStatsService', [
      'getAverageAge',
      'getAgeStandardDeviation'
    ]);
    const clientServiceSpy = jasmine.createSpyObj('ClientService', ['getClients']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ClientStatsService, useValue: statsSpy },
        { provide: ClientService, useValue: clientServiceSpy }
      ]
    }).compileComponents();

    clientStatsServiceSpy = TestBed.inject(ClientStatsService) as jasmine.SpyObj<ClientStatsService>;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have title "Clientes Registrados"', () => {
    expect(component['title']).toEqual('Clientes Registrados');
  });

  it('should initialize averageAge to 0', () => {
    expect(component['averageAge']).toBe(0);
  });

  it('should initialize standardDeviation to 0', () => {
    expect(component['standardDeviation']).toBe(0);
  });

  describe('ngOnInit', () => {
    it('should subscribe to getAverageAge on init', () => {
      const mockAverage = 35.5;
      clientStatsServiceSpy.getAverageAge.and.returnValue(of(mockAverage));
      clientStatsServiceSpy.getAgeStandardDeviation.and.returnValue(of(0));

      component.ngOnInit();

      expect(clientStatsServiceSpy.getAverageAge).toHaveBeenCalled();
      expect(component['averageAge']).toBe(mockAverage);
    });

    it('should subscribe to getAgeStandardDeviation on init', () => {
      const mockDeviation = 12.5;
      clientStatsServiceSpy.getAverageAge.and.returnValue(of(0));
      clientStatsServiceSpy.getAgeStandardDeviation.and.returnValue(of(mockDeviation));

      component.ngOnInit();

      expect(clientStatsServiceSpy.getAgeStandardDeviation).toHaveBeenCalled();
      expect(component['standardDeviation']).toBe(mockDeviation);
    });

    it('should update averageAge when service emits new value', () => {
      clientStatsServiceSpy.getAverageAge.and.returnValue(of(42));
      clientStatsServiceSpy.getAgeStandardDeviation.and.returnValue(of(0));

      component.ngOnInit();

      expect(component['averageAge']).toBe(42);
    });

    it('should update standardDeviation when service emits new value', () => {
      clientStatsServiceSpy.getAverageAge.and.returnValue(of(0));
      clientStatsServiceSpy.getAgeStandardDeviation.and.returnValue(of(15.3));

      component.ngOnInit();

      expect(component['standardDeviation']).toBe(15.3);
    });

    it('should handle zero values from stats service', () => {
      clientStatsServiceSpy.getAverageAge.and.returnValue(of(0));
      clientStatsServiceSpy.getAgeStandardDeviation.and.returnValue(of(0));

      component.ngOnInit();

      expect(component['averageAge']).toBe(0);
      expect(component['standardDeviation']).toBe(0);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroy$ subject', () => {
      spyOn(component['destroy$'], 'next');
      spyOn(component['destroy$'], 'complete');

      component.ngOnDestroy();

      expect(component['destroy$'].next).toHaveBeenCalled();
      expect(component['destroy$'].complete).toHaveBeenCalled();
    });

    it('should unsubscribe from observables', () => {
      clientStatsServiceSpy.getAverageAge.and.returnValue(of(30));
      clientStatsServiceSpy.getAgeStandardDeviation.and.returnValue(of(10));

      component.ngOnInit();
      
      spyOn(component['destroy$'], 'next');
      spyOn(component['destroy$'], 'complete');

      component.ngOnDestroy();

      expect(component['destroy$'].next).toHaveBeenCalled();
      expect(component['destroy$'].complete).toHaveBeenCalled();
    });
  });

  describe('memory leak prevention', () => {
    it('should use takeUntil to prevent memory leaks', () => {
      clientStatsServiceSpy.getAverageAge.and.returnValue(of(30));
      clientStatsServiceSpy.getAgeStandardDeviation.and.returnValue(of(10));

      component.ngOnInit();

      expect(component['destroy$']).toBeDefined();
    });

    it('should cleanup subscriptions on destroy', () => {
      clientStatsServiceSpy.getAverageAge.and.returnValue(of(30));
      clientStatsServiceSpy.getAgeStandardDeviation.and.returnValue(of(10));

      component.ngOnInit();
      
      const destroySpy = spyOn(component['destroy$'], 'next');
      
      component.ngOnDestroy();

      expect(destroySpy).toHaveBeenCalled();
    });
  });

  it('should have destroy$ Subject initialized', () => {
    expect(component['destroy$']).toBeDefined();
  });
});
