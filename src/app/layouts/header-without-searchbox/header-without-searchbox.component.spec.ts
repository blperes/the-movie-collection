import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWithoutSearchboxComponent } from './header-without-searchbox.component';

describe('HeaderWithoutSearchboxComponent', () => {
  let component: HeaderWithoutSearchboxComponent;
  let fixture: ComponentFixture<HeaderWithoutSearchboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderWithoutSearchboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderWithoutSearchboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
