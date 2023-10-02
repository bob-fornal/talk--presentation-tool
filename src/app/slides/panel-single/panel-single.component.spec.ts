import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSingleComponent } from './panel-single.component';

describe('PanelSingleComponent', () => {
  let component: PanelSingleComponent;
  let fixture: ComponentFixture<PanelSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelSingleComponent]
    });
    fixture = TestBed.createComponent(PanelSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
