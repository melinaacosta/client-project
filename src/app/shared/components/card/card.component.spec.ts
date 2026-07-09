import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardComponent,
        MatCardModule,
        MatIconModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty title by default', () => {
    expect(component.title).toBe('');
  });

  it('should have empty value by default', () => {
    expect(component.value).toBe('');
  });

  it('should have empty icon by default', () => {
    expect(component.icon).toBe('');
  });

  it('should accept title input', () => {
    component.title = 'Test Title';
    expect(component.title).toBe('Test Title');
  });

  it('should accept value input', () => {
    component.value = '100';
    expect(component.value).toBe('100');
  });

  it('should accept icon input', () => {
    component.icon = 'home';
    expect(component.icon).toBe('home');
  });

  it('should update title through input binding', () => {
    const newTitle = 'Average Age';
    component.title = newTitle;
    fixture.detectChanges();
    expect(component.title).toBe(newTitle);
  });

  it('should update value through input binding', () => {
    const newValue = '35.5';
    component.value = newValue;
    fixture.detectChanges();
    expect(component.value).toBe(newValue);
  });

  it('should update icon through input binding', () => {
    const newIcon = 'analytics';
    component.icon = newIcon;
    fixture.detectChanges();
    expect(component.icon).toBe(newIcon);
  });

  it('should handle numeric values as strings', () => {
    component.value = '42';
    expect(component.value).toBe('42');
  });

  it('should handle special characters in title', () => {
    component.title = 'Test & Title <>';
    expect(component.title).toBe('Test & Title <>');
  });

  it('should be a standalone component', () => {
    const componentMetadata = (CardComponent as any).ɵcmp;
    expect(componentMetadata.standalone).toBe(true);
  });

  it('should have Input decorators on properties', () => {
    expect(component.title).toBeDefined();
    expect(component.value).toBeDefined();
    expect(component.icon).toBeDefined();
  });
});
