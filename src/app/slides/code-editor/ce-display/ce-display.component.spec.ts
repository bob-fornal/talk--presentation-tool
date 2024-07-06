import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeDisplayComponent } from './ce-display.component';

describe('DisplayComponent', () => {
  let component: CeDisplayComponent;
  let fixture: ComponentFixture<CeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CeDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
