import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MoviesService } from '../../services/movies.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {

    const spy = jasmine.createSpyObj('MoviesService', ['setSearchTerm']);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FormsModule],
      providers: [{ provide: MoviesService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    moviesServiceSpy = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    fixture.detectChanges(); // inicializa el template (HTML)
  });

  it('the component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchTerm when the user types in the input field', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'Batman';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchTerm).toBe('Batman');
  });

  it('should call moviesService.setSearchTerm with the correct term when clicking the button', () => {

    component.searchTerm = 'Superman';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    button.click();

    expect(moviesServiceSpy.setSearchTerm).toHaveBeenCalledWith('Superman');
  });
});
