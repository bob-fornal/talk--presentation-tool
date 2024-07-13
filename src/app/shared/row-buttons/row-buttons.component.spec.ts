import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowButtonsComponent } from './row-buttons.component';

describe('RowButtonsComponent', () => {
  let component: RowButtonsComponent;
  let fixture: ComponentFixture<RowButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RowButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    window.onbeforeunload = jasmine.createSpy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "addRow" to emit', () => {
    const direction: number = 0;
    spyOn(component.add, 'emit').and.stub();

    component.addRow(direction);
    expect(component.add.emit).toHaveBeenCalledWith(direction);
  });

  it('expects "removeRow" to emit', () => {
    spyOn(component.remove, 'emit').and.stub();

    component.removeRow();
    expect(component.remove.emit).toHaveBeenCalledWith();
  });
});
