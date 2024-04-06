import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTripleComponent } from './panel-triple.component';

describe('PanelTripleComponent', () => {
  let component: PanelTripleComponent;
  let fixture: ComponentFixture<PanelTripleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelTripleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelTripleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
