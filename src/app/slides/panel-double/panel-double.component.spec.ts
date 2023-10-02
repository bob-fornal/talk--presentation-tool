import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDoubleComponent } from './panel-double.component';

describe('PanelDoubleComponent', () => {
  let component: PanelDoubleComponent;
  let fixture: ComponentFixture<PanelDoubleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelDoubleComponent]
    });
    fixture = TestBed.createComponent(PanelDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
