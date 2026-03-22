import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDeckComponent } from './print-deck.component';

describe('PrintDeckComponent', () => {
  let component: PrintDeckComponent;
  let fixture: ComponentFixture<PrintDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintDeckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
