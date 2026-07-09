import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientListComponent } from './client-list.component';
import { ClientService } from 'src/app/core/services/clients.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Client } from 'src/app/core/models/client.model';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const mockClients: Client[] = [
    { id: '1', name: 'John', lastName: 'Doe', age: 30, birthDate: '15/07/1993' },
    { id: '2', name: 'Jane', lastName: 'Smith', age: 25, birthDate: '20/03/1998' },
    { id: '3', name: 'Bob', lastName: 'Johnson', age: 35, birthDate: '10/11/1988' }
  ];

  beforeEach(async () => {
    const clientSpy = jasmine.createSpyObj('ClientService', ['getClients']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ClientListComponent,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ClientService, useValue: clientSpy },
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    }).compileComponents();

    clientServiceSpy = TestBed.inject(ClientService) as jasmine.SpyObj<ClientService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource', () => {
    expect(component['dataSource']).toBeDefined();
  });

  it('should have correct displayed columns', () => {
    expect(component['displayedColumns']).toEqual(['name', 'lastName', 'age', 'birthDate']);
  });

  describe('ngOnInit', () => {
    it('should load clients on init', () => {
      clientServiceSpy.getClients.and.returnValue(of(mockClients));
      
      component.ngOnInit();

      expect(clientServiceSpy.getClients).toHaveBeenCalled();
      expect(component['dataSource'].data).toEqual(mockClients);
    });

    it('should handle empty client list', () => {
      clientServiceSpy.getClients.and.returnValue(of([]));
      
      component.ngOnInit();

      expect(component['dataSource'].data).toEqual([]);
    });

    it('should set sort on dataSource after loading clients', async () => {
      clientServiceSpy.getClients.and.returnValue(of(mockClients));
      
      component.ngOnInit();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.sort).toBeDefined();
    });
  });

  describe('applyFilter', () => {
    beforeEach(() => {
      clientServiceSpy.getClients.and.returnValue(of(mockClients));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should filter dataSource when called', () => {
      const event = {
        target: { value: 'John' }
      } as any;

      component.applyFilter(event);

      expect(component['dataSource'].filter).toBe('john');
    });

    it('should trim and lowercase filter value', () => {
      const event = {
        target: { value: '  JOHN  ' }
      } as any;

      component.applyFilter(event);

      expect(component['dataSource'].filter).toBe('john');
    });

    it('should handle empty filter', () => {
      const event = {
        target: { value: '' }
      } as any;

      component.applyFilter(event);

      expect(component['dataSource'].filter).toBe('');
    });

    it('should handle special characters in filter', () => {
      const event = {
        target: { value: 'John@123' }
      } as any;

      component.applyFilter(event);

      expect(component['dataSource'].filter).toBe('john@123');
    });
  });

  describe('dataSource filtering', () => {
    beforeEach(() => {
      clientServiceSpy.getClients.and.returnValue(of(mockClients));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should filter by name', () => {
      component['dataSource'].filter = 'jane';
      const filteredData = component['dataSource'].filteredData;
      
      expect(filteredData.length).toBe(1);
      expect(filteredData[0].name).toBe('Jane');
    });

    it('should filter by lastName', () => {
      component['dataSource'].filter = 'smith';
      const filteredData = component['dataSource'].filteredData;
      
      expect(filteredData.length).toBe(1);
      expect(filteredData[0].lastName).toBe('Smith');
    });

    it('should return all clients when filter is empty', () => {
      component['dataSource'].filter = '';
      const filteredData = component['dataSource'].filteredData;
      
      expect(filteredData.length).toBe(3);
    });

    it('should return no clients when filter does not match', () => {
      component['dataSource'].filter = 'xyz123';
      const filteredData = component['dataSource'].filteredData;
      
      expect(filteredData.length).toBe(0);
    });
  });

  it('should have MatSort view child', () => {
    clientServiceSpy.getClients.and.returnValue(of(mockClients));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.sort).toBeDefined();
  });
});
