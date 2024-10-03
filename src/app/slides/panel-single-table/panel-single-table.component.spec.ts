import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSingleTableComponent } from './panel-single-table.component';

describe('PanelSingleTableComponent', () => {
  let component: PanelSingleTableComponent;
  let fixture: ComponentFixture<PanelSingleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelSingleTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelSingleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
